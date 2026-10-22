# Finny Assistant — Technical Documentation

## FinCalc Pro — In-App Financial Guide Robot

**Version:** 1.0
**Date:** October 13, 2026
**Status:** Active
**Sources of truth:** `static/finny.js`, `app.py` (`/api/assistant/chat`), `templates/index.html` (widget markup + `show()` hook), `static/style.css` (widget styles)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture — Three Layers](#2-architecture--three-layers)
3. [Frontend Module Breakdown](#3-frontend-module-breakdown)
4. [Question Flow — Local Answer Pipeline](#4-question-flow--local-answer-pipeline)
5. [The 3D Avatar — Layered Artwork Approach](#5-the-3d-avatar--layered-artwork-approach)
6. [Animation Contract](#6-animation-contract)
7. [Launcher — Drag, Clamp, Persist](#7-launcher--drag-clamp-persist)
8. [Backend — `/api/assistant/chat`](#8-backend--apianassistantchat)
9. [Security Reference](#9-security-reference)
10. [Accessibility Reference](#10-accessibility-reference)
11. [Known Limitations & Future Work](#11-known-limitations--future-work)
12. [File Map](#12-file-map)
13. [Cross-References](#13-cross-references)

---

## 1. Overview

**Finny** is the dashboard's built-in assistant: a draggable 3D robot that explains what every calculator does, what each input field means, and answers general finance questions with web-sourced results.

### 1.1 User-Facing Capabilities

| Capability | How it works |
|------------|--------------|
| Explain a calculator | "What is SIP?" / "How does EMI work?" — answered instantly from the local knowledge layer, offline |
| Explain input fields | "What do the inputs mean?" — reads the **live DOM** of the active panel and explains each field |
| Parameter lookups | "What is CAGR" style single-parameter questions |
| Open calculators | Answer action buttons call the existing SPA switcher `window.show(type)` |
| Context awareness | Announces the active panel via the `finny:panel-change` event; greets with panel context |
| General questions | Unmatched questions POST to the backend, which searches DuckDuckGo and streams an answer |
| Streaming + control | Answers render chunk-by-chunk (SSE-style); **Stop** aborts and keeps partial text |
| Personality | The robot idles, blinks, waves when it answers, and reacts to panel changes |

### 1.2 Design Principle

**Calculator questions never leave the browser.** Only genuinely unmatched questions hit the network. This keeps common interactions instant, private, and free of rate-limit consumption.

---

## 2. Architecture — Three Layers

```
┌────────────────────────────────────────────────────────────┐
│  LAYER 1 — LOCAL KNOWLEDGE (instant, offline)              │
│  calculatorInfo (26 calcs) + parameterHelp (47 params)     │
│  Alias matcher → live-DOM field reader → markdown answer    │
├────────────────────────────────────────────────────────────┤
│  LAYER 2 — STREAMING BACKEND (fallback for general Qs)     │
│  POST /api/assistant/chat → session auth → CSRF → limits    │
│  SSE-style stream: event: sources, event: delta            │
├────────────────────────────────────────────────────────────┤
│  LAYER 3 — EXTERNAL SEARCH                                  │
│  html.duckduckgo.com → HTMLParser → titles/snippets/URLs   │
└────────────────────────────────────────────────────────────┘
```

| Layer | Location | Network | Failure mode |
|-------|----------|---------|--------------|
| 1. Local knowledge | `static/finny.js` lines 1–286 | None | Returns `null` → falls to Layer 2 |
| 2. Backend chat | `app.py` `assistant_chat()` (lines 517–670) | Same-origin POST | JSON error (`429/502`) or `event: error` |
| 3. DuckDuckGo search | `app.py` lines 549–613 | External GET | 502 JSON if search fails or no usable results |

**Interaction diagrams:** see `Diagrams/finny-sequence.html` (question routing + streaming) and `Diagrams/architecture-diagram.html` (system placement of Finny).

---

## 3. Frontend Module Breakdown

`static/finny.js` is an ES module loaded once on the dashboard:

```html
<script type="module" src="{{ url_for('static', filename='finny.js') }}?v=8"></script>
```

| Module | Lines | Responsibility |
|--------|-------|----------------|
| `calculatorInfo` | 1–132 | 26 calculator entries: `title`, `description`, `aliases[]` |
| `parameterHelp` | 134–181 | 47 plain-language parameter explanations |
| `panelNames` | 183–185 | type → display title map (plus `HISTORY` special case in `titleFor`) |
| Widget + state | 187–194 | DOM refs, `currentType`, launcher pointer, click-suppression flag |
| `closeFinnyChat()` | 196–204 | Hides panel, restores launcher + saved position, focus return |
| `findCalculatorInQuestion()` | 214–226 | Longest-alias-first matching over normalized text |
| `getCalculatorFields()` | 228–241 | Reads live `.field` labels/selects from the active panel |
| `answerCalculatorQuestion()` | 243–286 | Intent routing: inputs / parameter / calculator explain |
| `addMessage()` | 288–309 | DOM-built message bubbles + calculator action buttons |
| `openCalculator()` | 311–314 | Calls `window.show(type)`, refocuses the input |
| `escapeHtml()` / `renderAnswer()` | 320–367 | Escape-first mini-markdown (bold, italic, code, headings, bullets) |
| `setChatBusy()` | 369–374 | Toggles input/send/stop during a streaming reply |
| `appendSources()` | 376–401 | Builds https-only source links (`rel="noopener noreferrer"`) |
| `sendToAssistant()` | 403–521 | Local-first routing; streaming fetch client; abort handling |
| Panel event wiring | 523–670 | Close/outside-click/Escape, form submit, auto-resizing textarea, Enter-to-send, Stop, prompt chips, message actions, `finny:panel-change` listener, initial greeting |
| Launcher drag | 552–633 | Pointer events, 6px drag threshold, clamping, persistence |
| 3D avatar | 687–893 | Layer data, `buildRobot()`, `initFinny3d()`, animation loop |

### 3.1 Widget Markup

The widget lives in `templates/index.html` (lines 978–1021): `#finny-widget` wraps the hidden `#finny-panel` (header, context bar, message log, prompt chips, compose form, privacy note) and the visible `#finny-launcher` button containing `#finny-canvas`.

---

## 4. Question Flow — Local Answer Pipeline

`sendToAssistant(question)` runs this decision tree:

```
question
  │
  ├─ answerCalculatorQuestion(question)
  │    ├─ normalizeHelpText: lowercase, strip non-alphanumerics
  │    ├─ findCalculatorInQuestion: exact word-boundary alias match,
  │    │    longest alias first ("step up sip" before "sip")
  │    ├─ falls back to currentType when no calculator is mentioned
  │    ├─ intent patterns:
  │    │    input/parameter/field  → per-field explanations
  │    │    formula                → included in the description flow
  │    │    what/explain/how/use   → calculator explanation
  │    └─ single known parameter  → parameterHelp entry
  │
  ├─ matched? ── YES → renderAnswer(markdown) immediately (no network)
  │
  └─ no match → POST /api/assistant/chat (Layer 2)
        body: { messages: chatHistory.slice(-16) }
        stream: event: sources → event: delta × n
```

**Why the live DOM read matters:** `getCalculatorFields()` inspects the *actual* rendered panel. When a new calculator or field is added to `index.html`, Finny explains it automatically — only `parameterHelp` copy may need an entry (a generic fallback exists: "The value this calculator uses for this input.").

### 4.1 Markdown Rendering (XSS-safe)

`renderAnswer(text)` runs `escapeHtml` **before** any markdown transform, so user-entered text can never inject HTML. Supported syntax: `**bold**`, `*italic*`, `` `code` ``, `# … ### ` headings, `- …` bullets, blank-line paragraphs. User messages are inserted with `textContent` only.

---

## 5. The 3D Avatar — Layered Artwork Approach

Finny is **not** built from 3D primitives. The character artwork (`static/img/finny.png`) is cut into six transparent WebP layers, embedded as base64 data URIs in `FINNY_LAYERS` (lines 717–730), and rendered as planes in Three.js.

| Layer | Content | Animated? |
|-------|---------|-----------|
| `base` | Body, head, legs, static arm (507×637) | No (root) |
| `arm` | Raised forearm + hand, pivot at the elbow | Yes — wave |
| `antL` / `antR` | Antennae, pivots at their bases | Yes — wiggle |
| `eyeL` / `eyeR` | Eyes | Yes — blink (scale.y) |

**Mechanics (`buildRobot`, lines 732–803):**
- Pixel→world mapping: the 507×637 artwork maps to 3.6 world units (`unit = 3.6 / 637`).
- Each layer is a `PlaneGeometry` + `MeshBasicMaterial` (transparent, `toneMapped: false`, `depthWrite: false`) wrapped in a **pivot `Group`** positioned at the layer's authored pivot point, so rotation/scale happen around the correct joint.
- The forearm layer is coupled to the animation's elbow angle through `body.mesh.onBeforeRender` (`lowerArms[1].rotation.z → forearm.group.rotation.z`).
- Placeholder slots (`headPivot`, `arms`, `lowerArms`, `legs`) keep the animation loop abstracted from the artwork.

**Three.js loading (`initFinny3d`, lines 805–893):** Three.js r180 is loaded via dynamic `import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js')` — modern Three.js ships only ES modules (the UMD build was removed after r150), and dynamic import keeps it out of the critical path. The CDN host is already allowed by the app CSP `script-src`.

**Renderer settings:** `alpha: true` (transparent), `antialias: true`, `powerPreference: 'low-power'`, `setPixelRatio(min(DPR, 1.8))`, `SRGBColorSpace`, `ACESFilmicToneMapping` (exposure 1.15). Lights: hemisphere + key directional + blue point rim, plus a purple floor ring under the robot.

---

## 6. Animation Contract

One `requestAnimationFrame` loop drives everything (`animate`, lines 851–887). All values are recomputed each frame from the clock, so a pose only needs to write during its window.

| Behavior | Detail |
|----------|--------|
| Idle float | `position.y = -0.03 + sin(t·1.55)·0.055` |
| Body sway | `rotation.y = sin(t·0.46)·0.1` |
| Head turn | `headPivot.rotation.y = sin(t·0.72)·0.07` |
| Antenna wiggle | counter-phase `rotation.z = sin(t·2.1 + i·π)·0.09` |
| Leg counter-sway | `rotation.x = sin(t·1.55 + i·π)·0.025` |
| Arm idle | asymmetric base poses: left arm rests (`-0.38`), right arm raised (`1.08`) + shared idle sway |
| Blink | every 2.2–5.0 s (random), eyes scale to `0.12` for 135 ms |
| **Wave** | `userData.wave` envelope set to 1 by an answer delta, `finny:panel-change`, or opening the panel; decays at 1.2/s; forearm oscillates at 9 rad/s while > 0 |

**Performance & accessibility behaviors:**
- `if (document.hidden) return;` — skips rendering in background tabs (rAF continues, cheap).
- `prefers-reduced-motion: reduce` → static pose, no idle animation.
- `ResizeObserver` on the launcher keeps camera + renderer sized (fov 42, camera z 4.8).
- WebGL initialization failure is caught and logged; the chat continues to work without the avatar.

---

## 7. Launcher — Drag, Clamp, Persist

The launcher button is fully draggable anywhere on the viewport:

| Behavior | Implementation |
|----------|----------------|
| Drag vs click | 6 px movement threshold before treating a gesture as a drag; `suppressLauncherClick` blocks the click that follows a drag |
| Pointer capture | `setPointerCapture` keeps tracking outside the button; `pointercancel` handled |
| Viewport clamping | 8 px margin on all sides (`clampLauncherPosition`) |
| Persistence | `localStorage['fincalc-finny-launcher-position']` = `{left, top}`; restored on close and on load |
| Window resize | re-clamps a dragged launcher back into view |
| Click | opens the panel, hides the launcher, focuses the input, triggers a wave |

Closing the panel (✕ button, `Escape`, or outside click) re-shows the launcher at its saved position and restores focus when closed via keyboard.

---

## 8. Backend — `/api/assistant/chat`

Full request/response reference: see `docs/api-documentation.md` §10. Summary:

| Aspect | Value |
|--------|-------|
| Method / path | `POST /api/assistant/chat` |
| Auth | Session required (401 otherwise) |
| Rate limit | 60 per minute, 2,000 per day (per IP) |
| Request body | `{ "messages": [ { "role": "user" \| "assistant", "content": "…" } ] }` |
| Constraints | 1–20 messages; each 1–4,000 chars; ≤12,000 total chars; last message must be `user` |
| Search | last user message (first 500 chars) → `html.duckduckgo.com/html`, timeouts (5, 12) |
| Result filter | snippet ≥ 30 chars / ≥ 5 words; first sentence only; ≤ 150 chars; DuckDuckGo redirect links unwrapped; **https-only**; top 2 results |
| Response | `text/event-stream`: `event: sources` then `event: delta` chunks; `Cache-Control: no-cache, no-transform`, `X-Accel-Buffering: no` |
| Errors | 400 invalid shape · 401 unauthenticated · 429 rate-limited · 502 search failed / no usable results |

The client handles `event: error` inside the stream, `AbortError` (user Stop), and non-OK responses with a friendly inline message; a failed general reply pops the user message back out of history.

---

## 9. Security Reference

| Surface | Measure | Where |
|---------|---------|-------|
| XSS — answers | `escapeHtml` runs **before** markdown transforms; user messages use `textContent`; sources built with DOM APIs | `finny.js` 320–367, 288–309, 376–401 |
| XSS — backend | Backend never reflects raw HTML into JSON errors; snippets pass through `re.sub` normalization and length caps before streaming | `app.py` 615–640 |
| CSRF | `X-CSRFToken` from `<meta name="csrf-token">` on every POST; Flask-WTF global CSRFProtect | `finny.js` 433–441, `app.py` 75 |
| Auth | Session required; anonymous users get 401 and never reach the search | `app.py` 521–522 |
| Rate limiting | 60/min · 2,000/day per IP on the endpoint (Flask-Limiter, Redis in prod) | `app.py` 518 |
| Input clamps | Message count, per-message and total character limits, role whitelist, last-must-be-user | `app.py` 531–547 |
| External links | Only `https:` URLs are rendered; `rel="noopener noreferrer"`; `target="_blank"` | `finny.js` 387–393 |
| SSRF surface | Backend fetches only the hard-coded DuckDuckGo host — user input is query-only, never a URL | `app.py` 549–559 |
| Data exposure | Chat history lives in the browser (rolling 16 messages); the backend is stateless — no chat storage | `finny.js` 316, 497–498 |
| CSP | Three.js loads from `cdn.jsdelivr.net`, already whitelisted in `script-src` | `app.py` 678–681 |

---

## 10. Accessibility Reference

| Feature | Detail |
|---------|--------|
| Roles | Panel is `role="dialog"`; message log is `role="log"` with `aria-live="polite"`; context bar `aria-live="polite"` |
| Labels | Compose textarea has a visually-hidden `<label>`; launcher/panel buttons carry `aria-label` + `title` |
| State | Launcher carries `aria-expanded`; stop button `hidden` until busy |
| Keyboard | `Enter` sends (Shift+Enter newline), `Escape` closes, focus returns to launcher on keyboard close |
| Motion | `prefers-reduced-motion` disables all idle/wave animation |
| Live regions | New answers announce via the `role="log"` region; typing indicator carries `aria-label="Finny is thinking"` |
| Contrast | Widget styles reuse the theme's CSS variables (works across all 5 themes + light scheme) |

---

## 11. Known Limitations & Future Work

| # | Limitation | Impact | Suggested direction |
|---|------------|--------|---------------------|
| 1 | DuckDuckGo HTML scraping | Class names or markup changes can silently break search; may rate-limit datacenter IPs | Move to a stable search API, or add a graceful "search unavailable" chip |
| 2 | Inline base64 layers (~170 KB in `finny.js`) | Larger JS payload; layers not cached separately | Split layers into `static/img/finny/*.webp` files (CSP `img-src` already allows them) |
| 3 | Chat history is memory-only | Conversation lost on refresh | Persist `chatHistory` to `sessionStorage` with the same 16-message cap |
| 4 | No automated tests for `finny.js` | Regressions in matching/rendering go unnoticed | Unit tests for `normalizeHelpText`, `findCalculatorInQuestion`, `renderAnswer` (pure functions) |
| 5 | General answers are raw snippets | No LLM synthesis; quality depends on DDG results | Optional answer synthesis pass or curated FAQ layer |
| 6 | Source relevance unfiltered | Off-topic finance results possible for vague queries | Add finance keyword scoring before streaming |

---

## 12. File Map

| File | Contains |
|------|----------|
| `static/finny.js` | Entire assistant: knowledge layer, matcher, chat client, launcher, 3D avatar |
| `static/img/finny.png` | Original character artwork (source for the WebP layers) |
| `templates/index.html` | Widget markup (978–1021), `finny:panel-change` dispatch in `show()` (1387), module include (3877) |
| `static/style.css` | Widget styles (4569–5008): launcher, panel, messages, sources, prompts |
| `app.py` | `assistant_chat()` endpoint (517–670) |
| `Diagrams/finny-sequence.html` | Question routing & streaming sequence diagram (archify) |
| `Diagrams/architecture-diagram.html` | System architecture with Finny integrated (archify) |

---

## 13. Cross-References

| Document | Finny coverage |
|----------|-----------------|
| `docs/api-documentation.md` §10 | Full `/api/assistant/chat` request/response contract |
| `docs/user-story-map-backlog.md` | Finny user stories and acceptance criteria |
| `Diagrams/finny-sequence.html` | Runtime sequence: local match → guarded fallback → SSE stream → stop |
| `Diagrams/architecture-diagram.html` | Component placement: client layer, Flask application, external services |
| `README.md` | Feature overview entry |
