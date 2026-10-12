const calculatorInfo = {
  SIP: {
    title: 'SIP',
    description: 'Estimates how a fixed monthly mutual-fund investment may grow with compounding. Returns are assumptions, not guarantees.',
    aliases: ['systematic investment plan', 'monthly investment']
  },
  LUMPSUM: {
    title: 'Lumpsum',
    description: 'Projects the future value of a one-time investment using an assumed annual return.',
    aliases: ['lump sum', 'one-time investment']
  },
  STEP_UP_SIP: {
    title: 'Step-Up SIP',
    description: 'Projects a monthly investment that increases by a chosen percentage each year.',
    aliases: ['step up sip', 'step-up']
  },
  SWP: {
    title: 'SWP',
    description: 'Estimates how a starting investment may support regular withdrawals over time.',
    aliases: ['systematic withdrawal plan', 'withdrawal plan']
  },
  PPF: {
    title: 'PPF',
    description: 'Estimates the maturity value of annual Public Provident Fund contributions over your chosen term.',
    aliases: ['public provident fund']
  },
  EPF: {
    title: 'EPF',
    description: 'Projects an Employee Provident Fund balance using salary, contribution growth, service years, and interest assumptions.',
    aliases: ['employee provident fund', 'provident fund']
  },
  NPS: {
    title: 'NPS',
    description: 'Estimates a National Pension System corpus by retirement age from a monthly contribution and assumed annual return.',
    aliases: ['national pension system', 'pension']
  },
  NSC: {
    title: 'NSC',
    description: 'Estimates National Savings Certificate maturity from a deposit, interest assumption, and term.',
    aliases: ['national savings certificate']
  },
  FD_SIMPLE: {
    title: 'Fixed Deposit',
    description: 'Estimates fixed-deposit maturity using the deposit amount, interest rate, and term.',
    aliases: ['fd', 'fixed deposit']
  },
  RD: {
    title: 'Recurring Deposit',
    description: 'Estimates maturity from regular monthly deposits and an assumed rate.',
    aliases: ['recurring deposit']
  },
  RETIREMENT_CALCULATOR: {
    title: 'Retirement Calculator',
    description: 'Estimates the retirement corpus needed from your current expenses, inflation, retirement age, and planning horizon.',
    aliases: ['retirement', 'retire']
  },
  INFLATION: {
    title: 'Inflation Calculator',
    description: 'Projects how the cost of an amount may rise over time as prices increase.',
    aliases: ['inflation', 'purchasing power']
  },
  CAGR: {
    title: 'CAGR Calculator',
    description: 'Calculates the smoothed annual growth rate between an investment’s starting and ending values.',
    aliases: ['compound annual growth rate', 'annualized return']
  },
  EMI: {
    title: 'EMI Calculator',
    description: 'Estimates a loan’s fixed monthly installment and total interest from the principal, annual rate, and term.',
    aliases: ['loan emi', 'equated monthly installment']
  },
  HOME_LOAN_EMI: {
    title: 'Home Loan EMI',
    description: 'Estimates monthly repayments and interest for a home loan.',
    aliases: ['home loan', 'mortgage']
  },
  CAR_LOAN_EMI: {
    title: 'Car Loan EMI',
    description: 'Estimates monthly repayments and interest for a vehicle loan.',
    aliases: ['car loan', 'vehicle loan']
  },
  GOLD_LOAN_EMI: {
    title: 'Gold Loan EMI',
    description: 'Estimates monthly repayments and interest for a loan secured against gold.',
    aliases: ['gold loan']
  },
  EDUCATION_LOAN_EMI: {
    title: 'Education Loan EMI',
    description: 'Estimates monthly repayments and interest for an education loan.',
    aliases: ['education loan', 'student loan']
  },
  FLAT_VS_REDUCING: {
    title: 'Flat vs Reducing Rate',
    description: 'Compares loan cost when interest is charged on the original principal versus the outstanding balance.',
    aliases: ['flat rate', 'reducing balance', 'reducing rate']
  },
  SIMPLE_INTEREST: {
    title: 'Simple Interest',
    description: 'Calculates interest only on the original principal, without adding earned interest back to the balance.',
    aliases: ['simple interest']
  },
  COMPOUND_INTEREST: {
    title: 'Compound Interest',
    description: 'Calculates growth when interest is added to the balance at a chosen compounding frequency.',
    aliases: ['compound interest', 'compounding']
  },
  GST: {
    title: 'GST',
    description: 'Calculates Goods and Services Tax on a price, or backs it out, using the selected GST rate.',
    aliases: ['goods and services tax', 'gst']
  },
  GRATUITY: {
    title: 'Gratuity',
    description: 'Estimates a gratuity benefit using salary and completed years of service.',
    aliases: ['gratuity']
  },
  SALARY_CALCULATOR: {
    title: 'Salary',
    description: 'Breaks down annual compensation and deductions to estimate take-home pay.',
    aliases: ['salary', 'take-home', 'take home']
  },
  BROKERAGE_CALCULATOR: {
    title: 'Brokerage',
    description: 'Estimates trading charges and net profit or loss from the selected segment and trade details.',
    aliases: ['brokerage', 'trading charges']
  },
  CRYPTO_CONVERTER: {
    title: 'Crypto Converter',
    description: 'Converts an amount between supported cryptocurrencies and currencies using the displayed rates.',
    aliases: ['crypto', 'cryptocurrency', 'bitcoin']
  }
};

const parameterHelp = {
  'monthly investment': 'How much you invest each month.',
  'yearly investment': 'How much you invest once each year.',
  'total investment': 'Your one-time starting investment.',
  'amount invested': 'Your one-time starting investment.',
  'expected return': 'The yearly growth rate assumed for this estimate. Actual returns can differ.',
  'annual return': 'The yearly growth rate assumed for this estimate. Actual returns can differ.',
  'expected rate': 'The yearly growth or interest rate assumed for this estimate.',
  'interest rate': 'The yearly interest rate used in the estimate.',
  'rate': 'The yearly rate used in the estimate.',
  'step up rate': 'How much your monthly contribution increases each year.',
  'annual salary growth': 'The assumed yearly increase in your salary.',
  'basic salary': 'Your basic pay, used to estimate contributions or take-home pay.',
  'da': 'Dearness allowance, included with basic salary where applicable.',
  'years of service': 'How long you have worked or expect to work.',
  'years': 'How long the estimate covers.',
  'current age': 'Your age now.',
  'retirement age': 'The age when you plan to retire.',
  'life expectancy': 'The age through which retirement expenses are estimated.',
  'current price': 'The amount or price today, used as the starting point.',
  'monthly expense': 'Your current monthly spending.',
  'inflation': 'The assumed yearly rise in prices.',
  'initial value': 'The value at the start of the period.',
  'final value': 'The value at the end of the period.',
  'principal amount': 'The original amount borrowed or invested.',
  'principal': 'The original amount borrowed or invested.',
  'compounding per year': 'How many times per year interest is added to the balance.',
  'loan amount': 'The amount borrowed, before interest and fees.',
  'withdrawal amount': 'How much you withdraw each time.',
  'ctc': 'Your annual cost to company before deductions.',
  'bonus': 'Extra pay included in the salary estimate.',
  'professional tax': 'Professional tax deducted from salary.',
  'employer pf': 'The employer’s provident fund contribution.',
  'employee pf': 'The employee’s provident fund contribution.',
  'other deductions': 'Any other amounts deducted from salary.',
  'original price': 'The price before GST is added or removed.',
  'gst rate': 'The GST percentage used in the calculation.',
  'age': 'Your age, used for this estimate.',
  'quantity': 'The number of units bought or sold.',
  'buy price': 'The price paid for each unit.',
  'sell price': 'The price received for each unit.',
  'brokerage': 'The trading fee used to estimate your costs.',
  'segment': 'The type of market trade, which affects trading charges.',
  'from currency': 'The currency or asset you are converting from.',
  'to currency': 'The currency or asset you are converting to.',
  'amount': 'The amount you want to convert.',
  'mode': 'Whether each monthly investment is made at the start or end of the month.'
};

const panelNames = Object.fromEntries(
  Object.entries(calculatorInfo).map(([type, info]) => [type, info.title])
);

const panel = document.getElementById('finny-panel');
const launcher = document.getElementById('finny-launcher');
const launcherPositionKey = 'fincalc-finny-launcher-position';
const messages = document.getElementById('finny-messages');
const contextText = document.getElementById('finny-context-text');
let currentType = document.querySelector('.calc-panel.active')?.id.replace('panel-', '') || null;
let launcherPointer = null;
let suppressLauncherClick = false;

function closeFinnyChat({ returnFocus = false } = {}) {
  if (panel.hidden) return;
  panel.hidden = true;
  launcher.hidden = false;
  restoreLauncherPosition();
  launcher.setAttribute('aria-expanded', 'false');
  resizeFinnyView();
  if (returnFocus) launcher.focus();
}

function titleFor(type) {
  return panelNames[type] || (type === 'HISTORY' ? 'Calculation History' : type);
}

function normalizeHelpText(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function findCalculatorInQuestion(question) {
  const normalized = normalizeHelpText(question);
  return Object.entries(calculatorInfo)
    .flatMap(([type, info]) => [
      { type, name: info.title, isTitle: true },
      ...info.aliases.map(name => ({ type, name, isTitle: false }))
    ])
    .sort((first, second) => second.name.length - first.name.length)
    .find(({ name }) => {
      const alias = normalizeHelpText(name);
      return ` ${normalized} `.includes(` ${alias} `);
    }) || null;
}

function getCalculatorFields(type) {
  const activePanel = document.getElementById(`panel-${type}`);
  if (!activePanel) return [];
  return [...activePanel.querySelectorAll('.field input, .field select')].map(field => {
    const label = field.labels?.[0]?.textContent.trim()
      || field.id.slice(type.length + 1).replace(/[_-]+/g, ' ');
    const normalizedLabel = normalizeHelpText(label);
    const explanation = Object.entries(parameterHelp)
      .sort(([first], [second]) => second.length - first.length)
      .find(([name]) => normalizedLabel.includes(normalizeHelpText(name)))?.[1]
      || 'The value this calculator uses for this input.';
    return { label, explanation, normalizedLabel };
  });
}

function answerCalculatorQuestion(question) {
  const normalized = normalizeHelpText(question);
  const mentionedCalculator = findCalculatorInQuestion(question);
  const type = mentionedCalculator?.type || currentType;
  const asksForInputs = /\b(input|inputs|parameter|parameters|field|fields)\b/.test(normalized);
  const knownParameter = Object.entries(parameterHelp)
    .sort(([first], [second]) => second.length - first.length)
    .find(([name]) => ` ${normalized} `.includes(` ${normalizeHelpText(name)} `));
  if (!type || !calculatorInfo[type]) {
    if (asksForInputs) {
      return 'Which calculator do you mean? Finny can explain the inputs for any calculator in this dashboard.';
    }
    if (knownParameter && /\b(what|explain|meaning|mean|does|do)\b/.test(normalized)) {
      const label = knownParameter[0].replace(/\b\w/g, letter => letter.toUpperCase());
      return `**${label}:** ${knownParameter[1]}`;
    }
    return null;
  }

  const fields = getCalculatorFields(type);
  const matchingField = fields.find(field =>
    field.normalizedLabel.length > 2
    && ` ${normalized} `.includes(` ${field.normalizedLabel} `)
  );
  const asksAboutCalculator = /\b(calculator|calc|input|inputs|parameter|parameters|field|fields|formula)\b/.test(normalized)
    || Boolean(mentionedCalculator?.isTitle && /\b(what|about|explain|how|does|is|use|using|mean)\b/.test(normalized))
    || Boolean(mentionedCalculator && /\b(use|using|inputs|parameters|formula|calculate|estimate)\b/.test(normalized))
    || Boolean(matchingField && /\b(what|explain|meaning|mean|does|do)\b/.test(normalized));
  if (!asksAboutCalculator) return null;

  const info = calculatorInfo[type];

  if (matchingField && !asksForInputs) {
    return `**${matchingField.label}:** ${matchingField.explanation}`;
  }

  let answer = `**${info.title}** ${info.description}`;
  if (fields.length && asksForInputs) {
    answer += '\n\n**Inputs:**\n' + fields
      .map(field => `- **${field.label}:** ${field.explanation}`)
      .join('\n');
  }
  return answer;
}

function addMessage(text, { from = 'assistant', actions = [] } = {}) {
  const message = document.createElement('div');
  message.className = `finny-message${from === 'user' ? ' finny-message--user' : ''}`;
  message.textContent = text;

  if (actions.length) {
    const actionList = document.createElement('div');
    actionList.className = 'finny-message-actions';
    actions.forEach(({ type, label }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.openCalculator = type;
      button.textContent = label || `Open ${titleFor(type)}`;
      actionList.append(button);
    });
    message.append(actionList);
  }

  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

function openCalculator(type) {
  if (typeof window.show === 'function') window.show(type);
  document.getElementById('finny-input').focus();
}

const chatHistory = [];
let activeChatRequest = null;
let isChatBusy = false;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function renderAnswer(text) {
  const inline = value => escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  const lines = text.split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];
  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${paragraph.map(inline).join('<br>')}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    blocks.push(`<ul>${list.map(item => `<li>${inline(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  lines.forEach(line => {
    const heading = line.match(/^#{1,3}\s+(.+)$/);
    const bullet = line.match(/^\s*[-*]\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(`<h3>${inline(heading[1])}</h3>`);
    } else if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
    } else if (!line.trim()) {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line);
    }
  });
  flushParagraph();
  flushList();
  return blocks.join('');
}

function setChatBusy(busy) {
  isChatBusy = busy;
  document.getElementById('finny-input').disabled = busy;
  document.getElementById('finny-send').hidden = busy;
  document.getElementById('finny-stop').hidden = !busy;
}

function appendSources(message, sources) {
  if (!sources?.length) return;
  const list = document.createElement('div');
  list.className = 'finny-sources';
  const label = document.createElement('span');
  label.className = 'finny-sources-label';
  label.textContent = 'Sources';
  list.append(label);

  sources.forEach(source => {
    try {
      const url = new URL(source.url);
      if (url.protocol !== 'https:') return;
      const link = document.createElement('a');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = source.title;
      link.textContent = source.title || url.hostname;
      list.append(link);
    } catch {
      return;
    }
  });
  if (list.children.length > 1) message.append(list);
}

async function sendToAssistant(question) {
  const text = question.trim();
  if (!text || isChatBusy) return;

  addMessage(text, { from: 'user' });
  const calculatorAnswer = answerCalculatorQuestion(text);
  if (calculatorAnswer) {
    const reply = addMessage('');
    const answer = document.createElement('div');
    answer.className = 'finny-answer';
    answer.innerHTML = renderAnswer(calculatorAnswer);
    reply.append(answer);
    return;
  }

  chatHistory.push({ role: 'user', content: text });
  const reply = addMessage('');
  const answer = document.createElement('div');
  answer.className = 'finny-answer';
  const typing = document.createElement('span');
  typing.className = 'finny-typing';
  typing.setAttribute('aria-label', 'Finny is thinking');
  typing.innerHTML = '<span></span><span></span><span></span>';
  reply.append(answer, typing);
  let responseText = '';
  let sources = [];
  activeChatRequest = new AbortController();
  setChatBusy(true);

  try {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    const response = await fetch('/api/assistant/chat', {
      method: 'POST',
      credentials: 'same-origin',
      signal: activeChatRequest.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || ''
      },
      body: JSON.stringify({
        messages: chatHistory.slice(-16)
      })
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error(result.error || 'Finny could not connect. Please try again.');
    }
    if (!response.body) throw new Error('The chat stream is unavailable. Please try again.');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    const consumeEvent = block => {
      let eventName = 'message';
      const dataLines = [];
      block.split(/\r?\n/).forEach(line => {
        if (line.startsWith('event:')) eventName = line.slice(6).trim();
        else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
      });
      if (!dataLines.length) return;
      let eventData;
      try {
        eventData = JSON.parse(dataLines.join('\n'));
      } catch {
        return;
      }

      if (eventName === 'delta' && typeof eventData.text === 'string') {
        responseText += eventData.text;
        typing.remove();
        answer.innerHTML = renderAnswer(responseText);
        messages.scrollTop = messages.scrollHeight;
        if (robot) robot.userData.wave = 1;
      } else if (eventName === 'sources') {
        sources = eventData.sources || [];
      } else if (eventName === 'error') {
        throw new Error(eventData.error || 'Finny could not finish that reply.');
      }
    };

    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
      const blocks = buffer.split(/\r?\n\r?\n/);
      buffer = blocks.pop() || '';
      blocks.forEach(consumeEvent);
      if (done) break;
    }
    if (buffer.trim()) consumeEvent(buffer);
    typing.remove();
    if (!responseText.trim()) throw new Error('Finny returned an empty reply. Please try again.');
    answer.innerHTML = renderAnswer(responseText);
    appendSources(reply, sources);
    chatHistory.push({ role: 'assistant', content: responseText });
    if (chatHistory.length > 16) chatHistory.splice(0, chatHistory.length - 16);
  } catch (error) {
    typing.remove();
    if (error.name === 'AbortError') {
      if (!responseText.trim()) reply.remove();
      else {
        answer.innerHTML = renderAnswer(responseText);
        const stopped = document.createElement('span');
        stopped.className = 'finny-stopped';
        stopped.textContent = 'Response stopped';
        reply.append(stopped);
      }
    } else {
      reply.classList.add('finny-message--error');
      answer.textContent = error.message || 'Finny could not connect. Please try again.';
      if (!responseText) chatHistory.pop();
    }
  } finally {
    activeChatRequest = null;
    setChatBusy(false);
    document.getElementById('finny-input').focus();
    messages.scrollTop = messages.scrollHeight;
  }
}

document.getElementById('finny-close').addEventListener('click', () => {
  closeFinnyChat({ returnFocus: true });
});

launcher.addEventListener('click', () => {
  if (suppressLauncherClick) {
    suppressLauncherClick = false;
    return;
  }
  if (robot) robot.scale.setScalar(1);
  panel.hidden = false;
  launcher.hidden = true;
  resizeFinnyView();
  launcher.setAttribute('aria-expanded', 'true');
  document.getElementById('finny-input').focus();
});

document.addEventListener('click', event => {
  if (!panel.hidden && !panel.contains(event.target) && !launcher.contains(event.target)) {
    closeFinnyChat();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !panel.hidden) {
    closeFinnyChat({ returnFocus: true });
  }
});

function clampLauncherPosition(left, top) {
  const margin = 8;
  return {
    left: Math.max(margin, Math.min(left, window.innerWidth - launcher.offsetWidth - margin)),
    top: Math.max(margin, Math.min(top, window.innerHeight - launcher.offsetHeight - margin))
  };
}

function setLauncherPosition(left, top) {
  const position = clampLauncherPosition(left, top);
  launcher.style.left = `${position.left}px`;
  launcher.style.top = `${position.top}px`;
  launcher.style.right = 'auto';
  launcher.style.bottom = 'auto';
  return position;
}

function restoreLauncherPosition() {
  try {
    const savedPosition = JSON.parse(localStorage.getItem(launcherPositionKey) || 'null');
    if (Number.isFinite(savedPosition?.left) && Number.isFinite(savedPosition?.top)) {
      setLauncherPosition(savedPosition.left, savedPosition.top);
    }
  } catch (error) {
    console.warn('Finny launcher position could not be restored:', error);
  }
}

launcher.addEventListener('pointerdown', event => {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
  const rect = launcher.getBoundingClientRect();
  launcherPointer = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    left: rect.left,
    top: rect.top,
    moved: false
  };
  launcher.setPointerCapture(event.pointerId);
});

launcher.addEventListener('pointermove', event => {
  if (!launcherPointer || launcherPointer.pointerId !== event.pointerId) return;
  const deltaX = event.clientX - launcherPointer.startX;
  const deltaY = event.clientY - launcherPointer.startY;
  if (!launcherPointer.moved && Math.hypot(deltaX, deltaY) < 6) return;
  launcherPointer.moved = true;
  event.preventDefault();
  setLauncherPosition(launcherPointer.left + deltaX, launcherPointer.top + deltaY);
});

function finishLauncherDrag(event) {
  if (!launcherPointer || launcherPointer.pointerId !== event.pointerId) return;
  if (launcherPointer.moved && event.type === 'pointerup') {
    const position = setLauncherPosition(
      launcherPointer.left + event.clientX - launcherPointer.startX,
      launcherPointer.top + event.clientY - launcherPointer.startY
    );
    try {
      localStorage.setItem(launcherPositionKey, JSON.stringify(position));
    } catch (error) {
      console.warn('Finny launcher position could not be saved:', error);
    }
    suppressLauncherClick = true;
  }
  launcherPointer = null;
}

launcher.addEventListener('pointerup', finishLauncherDrag);
launcher.addEventListener('pointercancel', finishLauncherDrag);
restoreLauncherPosition();

window.addEventListener('resize', () => {
  if (!launcher.hidden && launcher.style.left && launcher.style.top) {
    const position = clampLauncherPosition(
      Number.parseFloat(launcher.style.left),
      Number.parseFloat(launcher.style.top)
    );
    setLauncherPosition(position.left, position.top);
  }
});

document.getElementById('finny-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.getElementById('finny-input');
  if (isChatBusy) return;
  sendToAssistant(input.value);
  input.value = '';
  input.style.height = '';
});

document.getElementById('finny-input').addEventListener('input', event => {
  const input = event.currentTarget;
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
});

document.getElementById('finny-input').addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (event.currentTarget.value.trim()) document.getElementById('finny-form').requestSubmit();
  }
});

document.getElementById('finny-stop').addEventListener('click', () => {
  activeChatRequest?.abort();
});

document.querySelector('.finny-prompts').addEventListener('click', event => {
  const button = event.target.closest('[data-finny-prompt]');
  if (button) sendToAssistant(button.dataset.finnyPrompt);
});

messages.addEventListener('click', event => {
  const button = event.target.closest('[data-open-calculator]');
  if (!button) return;
  openCalculator(button.dataset.openCalculator);
});

window.addEventListener('finny:panel-change', event => {
  currentType = event.detail.type;
  const name = titleFor(currentType);
  contextText.textContent = `I’m here to help with ${name}.`;
  addMessage(`Now viewing ${name}. ${calculatorInfo[currentType]?.description || 'Ask me about this panel or choose a goal for a recommendation.'}`);
  if (robot) robot.userData.wave = 1;
});

if (currentType) {
  contextText.textContent = `I’m here to help with ${titleFor(currentType)}.`;
  addMessage(`I see ${titleFor(currentType)} is open. ${calculatorInfo[currentType]?.description || 'Ask me about this panel or choose a goal for a recommendation.'}`);
} else {
  addMessage('Hi! I’m Finny. I can explain a calculator and its inputs, and answer your questions..');
}

let robot = null;
let renderer = null;
let resizeObserver = null;
let animationFrame = 0;
let THREE = null;
let resizeFinnyView = () => {};

function material(color, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.34, metalness: 0.22, ...extra });
}

function makeSegment(parent, radiusTop, radiusBottom, length, color, y) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, length, 20),
    material(color)
  );
  mesh.position.y = y;
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function addJoint(parent, radius, color, position) {
  const joint = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 16), material(color));
  joint.position.set(...position);
  joint.castShadow = true;
  parent.add(joint);
  return joint;
}

const FINNY_LAYERS = {
  base: { x: 0, y: 0, w: 507, h: 637,
    src: 'data:image/webp;base64,UklGRtbdAABXRUJQVlA4WAoAAAAQAAAA+gEAfAIAQUxQSAgcAAABFMZt20gy+y97MjPJHv+ImIAcIiE/CzMvxYmOWpkXK7/AcPrl9Ybs25INc+4UCcni6oHMMLUam3fa9FDl3NqkzKX1AkedC1q072qSTRohcdoDKZvKOD5JUpUhjVUSsXCBD9r/12kd6WcJjJBFqgfiEpxetu9CMvammXG5pBdPerW1vffe+9/pkZ1efCe94ct4YLPFHgaC03vjxiYm5TZdhGw4HM3V+Z3vORJf/T6f79aIgAXZat3mWqodjKR2mokdrDfYH3IcSXIkaRpY6Yh+v+FUv4+eyt7E78Sl1VlVkR7ZU9gVIkIWbLtx2zyvHC1pSwRKQIAEQLofBRDL1rkVh4YreZbhoaLLWk7rdpsgseq+iaPH8ixHJ/ZVc78HV+rYHZmNk9h0rT5zMc8yU69N53gP7mlvfXYNeEtLZuMkNr+02ljPszRWl+ZzvAcD2tvzHst8vrTHtmQ2TmLNVhTnW6JWM8d7MKC9hvcsB+Pp8Zf22JbMJkisnX/J8x4MaK/hPTHjsQFvh7+0x3bJ7CrxFtFew3tixtMfxx1W3tcSb4e/BMde0W4t74kYzy1TwnFHNUqkUMp70rx9/nIFvoWMZ+5C+rgzrPmg44YYibfzKTN54kyKV8BfmIxHOO6cPrzfP+joRIWQfRNTt9TOzi4KvFeOt/Rx59rlc95Bx9ulEVwcXbx99QtzS6v3bvSKF3/daXoHnc4u/5CjDsdynnRCpiRHF29fYz35lGmHYfEOOsmu5JCzp1zUhqmcwEzpHF2632d70fEPOScmRwecU8Uymef4gpty74a4Lzi7mquLs285NV4tFxVtlPYRRCnjkrPRWHn/L5yYTE429DByQgkV++ba4mz99OFkgzpZUh5KGJdo497OyYaeDdhbw72gBOxkI7XBGSXZOny6LlBCu6Q3RgcII3bi3n/49LnL1yRKkDcu1U+NV4qOLI6B0ckTtXOXV5tpSqg31lfeXztCVRquWK6On3rL7GJny6eEfGNzjas0vHPKX3j/SmOjswVgoSqNTjzeOeXaZq64Q58GP6Eq46fql5Jzynb2Evw0EiI7oY7U3r+yHuXgQJCGRyQn1LnLnXjagBaBSE2o1aYQDyTigUFHTagUFRTx/Is6XPSEQkW8eZURrm5CGSIxp5iaM5QtEnOKqblCWSMxp5maIxS2xF7YcQTADR7ISUWX2K0hdk6lf+F5n4rWBfjbpRvS6G+9ejMn1R7fLkv64n9RDm+X6J3C+DO9ZaJ36uM3TfROZ/wWcmrjsJHTGoeRnNI47O2kOOztSmOnzntsBneucri+kniDOzc4Xru83vFkOJgxvOj917fabSrc+VNjpTB5aENRu82FW6kfrjiUvsNEhlu/XBsfdCb37fbW9fe/qBOByX27nYocqzd05Dk8IZEDFR5SEjlO4SEnkaMUHpISOTThITWLzwNPeEgOD7jY2eHBFjs5PB0SqNgJWhCRxNg5IqGhpWNniYSG5sfOEwkRjSgSIBpVJDg0skhoaGSRwNDoIkGhEUZCQiOLdOk1+0pAaGyRVs8dqTgUNMZWp4O/Ku17zaWERtnqrZ1V4NdHzq1KNFunUNp3WlwTlsJoMezrt0prvlL4zpsnyg5AEqSRGredrLrQJ8EbNpZ+8dBg4JMgbonWEjEyjCRIEyOjSII0MTKEJEiTJ9Unyy70a/IiCfyauUgWa/tKENbEXUGAEIuVLxy68mQ919rG+QVc9eRtjdTa3BGX9tUWN1KgMOJgXyrkMOJgc3MYcai5WYw4yNw8MgeZm0jmAHPTyewqxy6ux95H0MVjFRc4biaZ8yFo3FS+HHK5EDJuJl/OTFXyIWzcPAaemx7Jh3BxU4lWkiXYdZZdI9NzIgLKTV6W4BeNJ4NfGXn4Ly21QgY3tFPc7NTU/f5fnE7G1fFLH1yL2iFDZWpGPTfmDnUszXvj6ljbbAcNVe84SOcStZr+uDrkM84whW4Rg/TgVzLPOAMqR+LzjPPAoAuTHIngJdWNJhLkSLi70UTKa5idJaTkNdLOEjLwGnn/ufCLELH3nwuhCNEuDW+LVzO5dn5LnLikxxy1xFmu9JjLXOI1SxN4LAVctDSBxcL/jj9KRq3WkjSB9ZU1JGkC6ytr7JA0gcuioM5QI01grtJ+P4RqSl4eZUWgrFU2OwRqSruL5aqfR5nzxZcnWbYTRGvvf/HDD0ye+MUkj3IKlpUnZX2PuHn1A7/2y2eT0QG1e7zwWRa036pgTV+xXv706k6MDojNsqD99fLJ7xIOLNGNnRm4KZtlQav9hOGf/MevZfVAl3q0+qqGLzd48CUf+UHeQwvx4qQg9GqJdylyv3VW0BorcJ6evtIFoGPxtEuROzlDA9CxeNalyN9973P2FvupY/G2IG187k8fPeD6o2PxFsFSbb/uH8VRv9tyJkFr+VcOlnRfLZp483e69uxfO1J+jfiebr1drx25JAuQReDRodfgoV9cahkH6L3fvxa1TQ5XTrjbXcKsmQVc9UTOIl32zSyQUaTLNFHhO1q3TVT0wfCNw4geDN8+II+uYHEIhbctDrnwtnUECvB+uawjUID3y2UegQJ6i30ECuAtFmKkbjESqFuMBGy7gY1AbTcwEqjtBkYCtN3ASgALEywkQQYLE6wtQe50vmoiCTIWJpIgU2EjxociqE7PWQrENiOrw5ckGR2eJMnqSDitDytdPIDCTBcPmLDTxQMkzHTxAAkzMTJhJ0YkDMVIhKUYgTAU49pj6Qu4ZiNTsQAbiy0VEVFFxFCiJKBimNnRYfx//3Hfh9P9PE4PRDA10zA7vOxBhoLVa3JpzEwpbXvDShmBCzoZjZQReL/ZsT43fT+74+Kx+2D0qOJ7ZqYeWAh9VNTNAsd9CHlU9M0GxUjB1FH1wg2rFMzNKPUaXC1MVKa/A6UBTVSmvwOlAU1Upt9VCloDWqhMfwdaAxpoTwKtjBba46pqYaHqe0r7CloDWmjP0GRBa0ADFfhJVE6lNqCFOI8V1Aa0EOd0wd6M8UaKs2ZxNG476XHWC2oDGud1OeGcKfRxQO5HG+SdCBb6PSDto8nz3hsFvQFts/aPCIU+3kH9wML8t0ahj3cwP5y41Le/fu65MPODCEyhL4aCao/B5ihHufuX5A8jL4B5kfNBQUcwL3I+FPAI7kXCB39/iuHuszTfUz7QQQWeinM9wxMdHLV/8rDVFNTBCr/EwhwvZOOc2YxE3Xj+zE5kgp4LSwNQZL1CZgOfAU/2KaIqOXNl3uPnvZT2sLFHWRUUSJovK0cJCXdidaJ+Gh3K2TO+2ljzZuAySNMJ4/5Hy/OehrgTyp5y0eX/NLhL44Mxx5oUry/83jOOJ2qB9iiuG2kPPHkXnA8jcGv1bU9+UFob7F0Ke04GwUNyXqjnbgrA50W8cBR8LUNQXqhH9HN/IXOLwfTU+u2JoZT89rI+j45FyBLtOXuWPonu19Um0Y77CZS0bzXmcto0651eDiYnS7SgSSVhmruiyV7rbsOu8+XpBg90r5BTLmfJtNxpeOVyblzrmnzb/GvTzoitE3SyGpPMXdBBtbzKtLbwpMgWK4IKvbMIJp4K3bTizK811nNYMgOPM10dPHW51y/MSfYLQeX69L5S+JRkPzF1i2C1FGubzK6D9CVjyLdVjNRcjm4Ze9KTBQvlGHl4Ri4CM+sswHnzNttVLgJDKJ7GqesHg2gjZHG6fojTNFQrjnQGh2tFkabwgK0I0g8gphWfasKrRlXYLEweRmGEM1VqFEaoIiBrNAqjVR+ItRqFcaT0T1wpUKTqU4gp0KLHY0unkO2hpUCPQncRpUCUfldDnwLZCdZo/s+qLnfrMf/P602gweEC+3Vk1tYWPPp1ZKzFNCQ8fLWYBoUnpqnFNKwK3DWuFuZdypHkUTmGkkSmqGe2kgST3jZXSYJJ71s7XMWX5SzkpDT6fG+KPYlhg7aomFhTaNbwQpG9TOC0gRlYcgVKqECdqajA1bHBBRWwsVwYhUrxDPrGXVCZSRGcVQsxFr2xzNfJIW+ux3XRStU0XA/yrf6iGqC5nljeIsFmhSD3ZMaRYKlGIIlCT2bCvIVfwEAAKWJPZugwWyKdGyExPLWE0k1PZuCnCWsjbW5uaYojxESZ0huQvkj4RiaXRaGCCGoj9UViB0zLzrki7g0g/NIXCddrW1rbfxg4QwxDclDr+ReJtCXs1c7BjubavRtBJ8h9kdu/p9zjrWHBEvaaeJPLNCe1QH+BbGb0Rc713JTWBEvYY8CI3MJrV2S+0RDugOTACaa0JphEHgemIxdSbN915e216XRf5Hodd5YprWUAvGHwhZI13vzm6597aMQ3EMYdObqmv1VlO/TmANgMpF5Toh987JWHdju3g+fUGX8FB0ZA6Nn8oX/QCWWNumq+SeM3/cO0fTcG8pQjTjkt8jMa7PsxyyYIA+i0CE45sOrJfJaAGH4nkZgTYv+L4q6AO9erK+ScWP2jL2xrRcF2xXJVyhczC1qMPnL5jqC57I4EZHYl5Rf22nDTd1ZMvfIZf/rZVhyyytTl7kOI1mDqFXx4y+xiowOrASW7Ko/69eVWHLQmFEQ71BSswXS4vLsy/qLzK42e6VyqQMpG5eff+r2twA3uTPg+NCNYg+nRJz7+SV7h5vjq7IJzLqvhvrB1WKo0LEhBBGswnXnH37+zx+UdmDDZ0eRYHcTel8SN2ZMPfIiQ5UGyBtPG9a+vJcUbmYJgsqOeBbWGsM818cbSrzzhRWcv+RmdMkYTsNnzTI8E5BJPm+yoZ0GtQexpUfT9j/3LR27XYe2ADBiKYcpkRz0Lag1j/6o2f/D1H2gpwogdXgUA19ImOxq1moHsVVnniNJuawVYQ/VaWRezCIW0L3XcO3xD9aIGeNpnY8dBa7KDA4Cu16/dNrhL1+bJCzA21kGMw9dEDzewcMNceGOjojk+yPW1t3lYEJsWnr1RHCwfTLfNYm03sPcxP/5Sr0Ume6M0+qy//JuPeN7czlUOv/lzX0myV9ABkFKES42bnLS1jPMKIT8wd5caMDa2SgtAelqc5X0boWfGWd634XlynOV9G5vnx1net4F5ihwqb3EIniVn8I4vRobtUPz9n3R2hSSfrs4CSGbvsSf9zsI6Q95rus2vxAZJZu+zCz+KSKIszp71q3vE0iEmfg4vQpN9fiWvFk41Tlnce1bj684563rJzurnLtQzG183rI+zrGteMrB4Z1jZoWRX/bJN3Yv7AHkyJAXZnzGCJf0b1guSAvn+CQB2/xRQ4ePNtbSk4NjR3J8xZr1ecPPq+3/BlxQILfMgrHSVCvsUSkkKHMxKV6kwGDmg3aVJFeVkAY3ZXGZih46JGLtxQ8hEifEfwmQiYzxJYGtgJMMUdw1eA2Ocnig1nH3a01MDI4guUl0Cai3pafv4hn9dUO4i1eiAs3K1+qlbXUPuIpWZq9WP7rgyf/FixrSJmbla/bi1/AfPPH7smDRtYoZuMiten3/m3j3ChUG43RJnYE7xd3m3sArkzsizYKYomIcgwINNwiBuSoMsm4RZSquuHhiAHLKcn9SYowzKnJ8kMKLNEMJFViC0GUK4sNdOtLJDNkw5ErbskBiJAsACfSxIFCB7HiQKSD0hQOyJECYB9kwIk7B6YwfM8nwEBHrBgBFGiBcMeAHOCwaUBIR5wYCTgCgvGLASEGPstAREGDsxjOBiZwfYYjc5MmJnJip89bFRExVBTHF040Zkpqi0MUXN1eXP3hGBjArFFBypGhr7W3/9T5dbMSZGUDRFo+G//f21I4969vw6KFBDi+5YOHtqvPKAp8/dB0wBmaHFreXfe9LYoK/MIEwBIdFUVXfzoJKv1RxUARHFqEyVhSldBtknYHE0mWAvbVrtS6sri0ZG+GqlUqfLQkKBnoMadRpsJBPwdcm1EWv7v4ADmCTWojZVwJMEay9ATJufPpbq9BxEoJgsQ20ReZpJswp6EX4pFLD7KgrDmD8IwMRY6uP0FZMGK38QGNGxYk5UFw/QXClUK0REdfEAThJaLx2gYgRCY05MKzrgoDFnqxMeYNCYs9WJDzDkh9DZ6oQHFPJD7G/c6IBiTZWzWQetiJdaJ+ZBK+Jdc+yIAipmsw/ahnyqcN08aBvyscOTwAMGTuygRPgAgZNaLgMEBk6sCoWFwBUkpTRHax1QNSjS+uI1DbhtRoLiaG0D8Jbhp370rm32gF/2l9QtJP4wWOybUGVJ85ALxVFvSPY6Df/dPMEKhXTvNxSa+zxC4Oi8nNKm5Ytjr1zYAJYTGEaXBdcilR1KcAOP/vMv32jbpuiHb+ifKgvCFUdf/h/WKfDlRqbnldXWVnWyogPM0mUG8SxQ2fE3Q78JkDrKcSJduBtEPhFlx98MtUaQeFuhoOdvWdvxN0uPpJhuJhYoNfUpO/5i0wj1NoTbgijrE0HZ8ReaRqij9W+JfRWmIl9g7B9/kWm0Irpjof78UaEWFyryBd68ej51/A0PM2t4gYFCAUqsumz5PtdhDInoeP4ZD0yaX4ASq67e+eeq7hlPLY1Q9ijsFFgmM5wKOrHsAR6TzQym4Q0+9sSxHyav6lLANLfDwJ7tTfGuc442Gl5H3fOrLgXK0BMY2BPd9c21hnS7UC/OviV3R9395thx3P5JFOyJm59+7TsvSDcJ9hnvPiHupupfSHd/Eu4SAFurb3/mk6bEW4N7T7nYZYXfQNZgONO0gB6aeUOAd1s9GJA1GM5sl73Ffnt3uYKxBsMJEqp0u4IxshwwnEihCiR5UmpkOWg4iUKVvPIkDPfoGxwAf9TKL09CcJu2UYBo7V1P6uZTF5I8yR9IFAWIN7/2d4/bvROVvof/lqwj4cf1dzwxyQjdexKCGzEPjSQpNXA+lKRYosGRJCUaPR2nP2XiuNHQSJJSPbTP8aIu8LdaIRxJUqqH9km+Ewb8BktExGlk5upSLtQDRMSE3Jgcsu5hHiAiKOTG5JDlKWmQb6FKVMjt2CDNP9oA64UKFpKjMDk8xylFjykYOQqTGQ3BMN8VLpDkCXZd2ZT2nQ7nKm4t/dKh3Tk9jOZU3ewgdo0cfe9aFEo0P/W8sT1DRWSd1TWzfnKD+5/x2m9uxsEsy/2Hz5yaGJVLc8PpAlGqzWPKSU+9bfmu7ZCOD3TmTf1ehwN+YcQ7IRmY3O0h1VJMMjsX+WpuAVJPYzIOr+ko3hbHeM5ATgH5NvjJaTAO+DDSIOUUSF0PZylqIkWHkQZLopD82aRL8KCx/jDSSKjMo21GlY/zUvdnbBDV1YNsGyj5hyugbvtOXOALEsOBWAo38IQFA0FiOPJW3S+gwPX7bbT/tsJfMAHs99tQr42lG3ZjAljMMtVXa83iJEjIF7OklGsWJ9GB/3fFjHLV4iRQSD+ptlx7ERPSTyot114EhfSTSsvFFzEh/aTCcv2BCAACoSpk5foDEUAEQlXIygcRdQgRLTBc/v3y5vEmKx9E1CFg2l0hPAnLZ/EGcSseQaCgK5/HG1ht99ub211/2RKW698AlzG6+zt3RzsqYjH2j8bTgoO6HWAR3/jSez/b3O5SsOroWpv4XN/I/DXSv4NwB7Vp2wEWzYW/O/+d9airC+iG7jYJT+oO/00l/hrNjZsb4jTXXZy/ckekawdatK782a+/Nek5TRdVG8lATJWPr86Qq1eX5oXfYuHLC+I01x1/dqLGHl3jzAFL3vreu557TNKtTRxnzETUp2cXOkVQYqp8PCWmnHnjG89MC7/FK//sleI0193PU2OPKkZAEPRX98hH+Br1iW5ubngP3g1xJqKEiqDEVPn4D3iQn/u5fVXhtxh71Jg0zXW7PDX2KGNEK0bcWq0/4X4HEz0aXV39ytcWPrXkqVwnzERU7pGE8X6KQ/IDuaQ4kJrmOqnVD9CMOmpQtJGP7B6dPHHmjfW//JtXPbvmK1ooykSU7kjet33vZJeYGcXXgGlxUaJfo5+bePRjx+6/b+KoMCNNUpsPRwssVz05673VAe+QkoPE13j/I31gsCgqVUps8+Gokz047g+YS9kOPJeL5RxWnpEm7Ra3q31x73NuvR4pvHIEB4m/SYu3uF3t3cCj//RzyQULbTswA+I6p41Up+9snSZhEl14+vE7E7q/rzpGNAIFEfJ1EQzr3lWOX0ygjhGOQCEDGXsC617G5RQyghUo3JOcVuU7Q06sexWXU8gIR6AgcHllaMt3kJhY9youRx1jussr6UDWvYbLaQQeRsXQIyVB9fdVGBAdo5AhIBaaHsk/F7HuZdAYEB5jJ7NVJ8tVups7TkPvupB1r+JyCgPCY4zuuPKvSZYrqZs7+edi1r2Ky/EjQh7SvUqyXPnd3NEx0A1m3Wu4HF+McWN2eu9IkuVqT7moZbQTzLrXcDmGGIfU+nf5Wa5UdKyMCw2XI4Yx0pzLUz+druEMUc2vNFFWoGZMdFfHbzkYFc6Q2rLWGi6nkxHPqpseYRD21FvWWsLlADOmjocSZ/bOl7Gn3rLWtiHyIdLVYKqzgn7bUjSo/d/Ph8indjY3MGlo0S/S8eakRbkiMf/3VTubG5D0Mil1VrAAAorPbRBpY1PqrCAMsDRhM4nVeQmT/YoDRE3MkTDZr4HE949PjwawGnRSe563RtB7njc5rJcVoPc8b3ZYLyNA7/9+ups49lGdnlON2SYL3oBqK9YMWyZH0nroZ9/w3a32f7ujUHpI0nVdrgAn6xESbHeKvFIBrqPaArNjR0Tr33rTxBBqeDm7pTA7nj4RNdQgb2RZ1Ee6MzueFSWhQw3iTJjEimpI4Bk50Rmu5+4tFYiAV1c63c8Hs+D6Rs1mOo8/Ut0wklzfoFmu5gK25paS6xs2y9VkBdMJyfWt5CxX4ylJqDMbvuKpZFs/RO12qj3Pmzf4qtjWD1BrvWqz4QvMS7FJjOcqtNps+BJSp56UrCwiWhldrX7Kjqo9WGgU0pRGytQeLjQKaWxFWqa9l8qsn91Ip/m9ob1XJ60U7EY6z+/B9l6CJ4Jzhjnze4XyOfESBXKS5bZ/fH7+aFOYnKiVKPBU3Iv85Pw35qmkH/d3OwGfU8zIE8jZNvDdkTWwIlBWhC1oNSiGAfK2OSE3mGYYIMWLXjJN8gTqY1O5w85rMJn7S9CHzgl+cnQCZ7BWt5krCl0Zxxg3OoFzWKvbGi0KXbxCvqjRCZzDB+5Xn0Why1fIV4z04bgDyaST4xWFnrNkqvQ9+obAk/Tf8fFOhs8wFyhxjcu286Tp9IYnNzC6s7br5PddrZFhLlBJ64top01pJ85xekNSANl2nXrX+bw2gwiCpotnZHOBSnojPdHIes+a7u6ViqcUFnjbdWpkPArW8r/TAvflGr6mi/M+8c+SVo1Uw/u7e8QqqmdWOMoR9jTyEo3FRn4AtDVbUTdP+TVRA3dVBc/5NPHpheb/3fLfPEH2onpmJWsTo2tDNBGd1GPfTXgIuHXxbG87Jmvgzqn6w8WHltqe8IfJPqWe2azuXvFGGBqWH/Zw07X6TP4n+ps4gwjq/nDxUcUWEP4o2edTzyx1u1LP/DjhgR/XxXM8Tq2KXJ38gHILCH+c7Cl9pMRJj/m5fn16z6X+5oDwB8me3gcJXX8/s+u2iPCP7T+PugJWUDggqMEAAFBNAp0BKvsBfQI+CQKBQIEuAAAQllbuFvDjP+gZWnw50QTwo0Xcz+G/3P8Rv1g/oE1/5hx3wrv9Jfz/yA76eW/VP9H8uPzA+XzkHqx9L/jv8P/jf3P/0f3F/u//L9kvax7//zv+16Ffnn7N/l/8F/oP9J/bP/z9SP+D/yv9N+1nzO/pP+Q/4XuEfqH/ev7T/pf8V/bv/x85/7k++/9x/+d7D/6N/af8h/gv3G/f/7ev+L/yP8z7z/8H/rv+V/vP9V8hP9T/sP3lfHR7MH71+wr/Vf8j/1fZ6/5f/e/1374/TH/XP9H/0v8f+9n0N/0D+1f6f80P3//8n4Af+r20f4B/6eqn7Z/6X8PPeB5O/tPy387/yP6Z/A/3v/P/5L+8/+f/S/L9/k+BLsn/lf7D9zvdX+Ufdr8T/dP85/r/73+4v0f/zf9H+7H+M9i/np/f/nJ/oPkI/Hv5f/e/7l+0/9+/+X+u+sXuf5VfDf879oPYO96fr3+Y/vP+h/2X+L/bb6Jfs/93+bnvT9mP95+c/+W+wL+df1T/If3j9sP7p//P+D9//8j/yeQF+B/4//f+6L7Av5j/Xv9N/ff9H/1v8F///tn/rv+n/pP9h/9f9Z///hb+l/5z/qf5X/Xf+b/S////x/of/Lv6z/pf7//mP+l/i////3Pvk9m37g/+/3SP2I/8n5/q8hmmnJUc/q8tR+b4ZLpAY392ObxsZ3R4B219FmK11FUa0uR+L7n7nOxHllCIaDsMJ5L3WMDh4ZQjx76GBkh3kFoZ5ZafdMCdUOcuUZHYx+kvdkspdhf+kxcenrC/SdxpJhFZjAstkkcHKavFM0hKzjWpfHoceKxwQoyjfTJN9lY6r0Ay0n1qJaCsAkO4spZoxxbvoEJRqCWDK3PB+dbi6rA+Mf0jZQs2zo2/+HnU1+HWZYEBvUdZq9ID8bEeWFg/ytGUZgJF0XUcZxK8YflhVGKZm1r3aJNRSKC5+k20dHZqGKln38r3UpsmdF9O1IiyuWR04tcoM4umAev11kZ9yXDmKE2WaSIBVTViVg9rHszUNECMwHlPVNnVQ9jtuBrsP9ZkdPQY01bN7IJJnULEvhHsTdDyx7EKHbi09BnPDDvxy6h2avHNKdlRwK2IbvUYmpDxViL7S+wIjNBhCGwjrdR3v59SbrwxYFDTGh7tz7/esLI5j80OtVjhr0RGSa04RftkJxpwPxBJnYIfCy6CDg9RYDVhRziO5vz0U/Lj5BcJkczUu8KGreYJNySTxmECV9h7GEB24YxJkoFr5I2+wqDVTzuPGRM5noGyECnt3qCEPDdwsRKiXPbD5Xr7+iaeRuL4Cf1P1ZrfIXvA+05mFHK3z7Q2qjkeg7QorJvLeOTpmopGQa1YyDLaVbKcrBvvvm+8mjTH6GE+0bwhtOMWpzPV/z2CxVIgdtHbHcqK55Xa/iaAjsDQ5hVZWFPcPvvICCnW29qMrA57gjI0mUKsnnTq4n3QoRctxyhzkq+lpTnA0ls8lftakjq5z7i4J8VvPZUL3JyoqJ4SdcR4adpDMoXyxcfZuJQ5FQ/pk/+04z1GFVr4ltYNMBe3g7Rz//s0l9nVcqby1JseMoqoQwZAfNYqu/D96g7X1ptFAF9T446ksUEqV4xG9FkC46aNariQtGciJEWBAYccpRZUJH4oeMiYH52du+ys7zXBMldbLpQQI/TN3KrcnD4I+TXHx8At3aGWylLzYlwBB8Rzo/taOArR1lgmCAuP4B5E7MBIeB331H55q8zYSRP6vv/2A8m1npwIWwwKLsbBku6j81Tiejg/BKLL40LlglcwYWqHD1cTQQElq/DXpyfTT+y2qinaQJxRhakYcsOLavUbg6OuR4D0U/2lQCp8RdSA9gbLxZgQKlZA+bz8cpAtrAKFgxW4LMX1mKZvMS79OO/hpItUw5Oyl3FzYWsOiLlgG/LJR7DN/ctgGck1MnDi46O/VSm7DBvrj6Qyjog8sY3AJuYEmNC1k9Tn7e96T+VcLUwLCNMJyPfGTXc28xWm5FRwAwWLLzT0ht1EgssS3ebhHzuVFPM4yG/+kiR7/2cIWIYWnLNmU5JbOiwyac4JYbgakcuL75l5P3rQkckf/jIEFNVqs3Ozj0DXnCLop2ZpVPYkwA8sYvRVsUkTsjwE87kmF3dTknYdlOWjruKUqPFdZ23htw24yj+BjUontqOlckfeAt70jKzSNpi+oXFgTUMkpZWV4QNU6oSHQDcnadbFBt9QE23wTXYC6d2Ut9XrvHvrhDmf/5kQ4Za/VX2nqaFt7ysaqlv53BLUS9IOWhEXZzSI46/CvDIgFUB8c/qungvtCTVVmbDmtTTM6ZNvPh47FFJNiUoVk/TRIqWbXuKwCpq+9nbP0WRos9AOFKi5WneoRksY0aDWfMAMD8QPy12aKoi8v82kIddaxgWtbosvvjhKjRm7U/3En2HfYQytLNWTiB9Cne9tiO52tK+w05cAlE3DmittfD+h0lwOxqV8BkoJNaiEjr43J0XVzeUJ/W5bAFSYeFjvDBzNKnUE9cvkY2XObwwmdujPvpKPLT83FrDQTfqUuBj95QkPzuNw5cTlYAJlfDMs/shR4Y39X40gwuYr+Qqs44y6L0t2TBrBZbrcldjdi1yIYiaVarfnTH/L32Pbg2ExvF/hwFV/NBcy9dxBJ+WfmFo1P1CCN1EqWzaOKY1lntn2dVldq07ohBw2uACFb3fVv/2pBisUrEfQED3qbjGp/hvLV2OW127ZqgrsNRwVvyh6Sniix/dmBPyUfs3RESpc2u+mBprj7I+9DReaZMEpIaBa+7u+QkgWb0Iqdx0U7a7rufDod70VJOPO8AbEDFqKL53AJYPYjN3Yo4gdUc9aSG8I0s26d3VEesjtqrv7Kn9T706M8m7U98bHAv28vC2WxxD6yYw+lf6teJmG6LMimA79BX+PDHMKWPvqc17l4RU0mACdJZkBDC+8DuwjJ6G3BrjyLiuGAVb36cOZZivC/sRZmX6c+95y7wAVlcx+ti7cBSR7Yp8ikVTW7IA6w4uuyg3nQVLU4F/gNx8kjbsAdEF+Nh5Z0hc8+eOL3phIChCAxe6nNr7ZiCHVFn4j5MaKwqMl0U8TadaFr/4Cn2Q8Td1YolIjw/MGGDuCTy7XLC4fHmPsqfDJWiOTh6OtihmTxg9ffWp76wirFD4tLM63jiJl9GSUX0ddoOmhrvIaFvqrA3qOiUSN6MkFOV4uIp23TyN7mJT5iUGDRzq6WmHH6AjEOKdoEL/q/Ngoh/38Z2+PcUpy0uJYLklpJCLZHO7/P/jg+KyfOEQew6TDC9/WeoBGCC3ckRnoiuI7CN6thX4UPzw3F89HcbqQ3BxEg/fNNpCMrafFfvbTwDNm+8+l4XnyJLetLF/Ei2BjtB+lPRIbdvY7KQjnXlevQ5p4z2nQXcbk5LomIi2S4E7oG+ZsWIi6zSlkg3GQRTeEZtFP1LqgfZYfMUtFBe0K7UgmsL67BZ6hdAvRc9TvFrNgqpsOUkNzVMyiz6K+VftuyoAyHr9GctvLj2yO2+9fo4pv2m9CiKaZnUUl8C3aLi5TJdCyx2Ua/X4t+UnFpwqtkhxvj6WYNIX00U3fXb4YGoZNfqr7rZhAlyoMLGlIab3I7OYSglLEPFlN6QpTrPmGUfjXv+Z2m34cxtb7K2jhT///sx62x6JEUuBO6BfVNjYZp0X28mGeEbO7cks9s3yXeJcDIz/ZGLrbhWT/rBQVHdI0Hyh51sI3gi5DLpGztFkEQDwmuEKKf//+SkpZVZnzfVDjlrwLS9XyvURnRQtn9hqnJDv//lEoj0OMVmWQA+w+PE8R34kSXI0U8H18je0UXCHd+yvs0NJWOK3T1dO61hx4YukG4Bb4l1uHDoVtXn7FlHH649lN/xhlzcKl4NCHwYKBH1+MaasAhudYqs9MYvIFzhd07AUNHXOXIw7G88bawJtnUZhsQqqgvVQb1QNAdQZRHuMl7I6ILREks9MYoc6eFWJIjuweDSMaQNe1fgsLgPvOsXvQ5zRgfMhxnosWpDhSOh4FByYRMu24iVM9LNGStY+pVyKX0eXkar6ZW/ZEBX9saFQW8HfZEJEgQ1IDPyJGKuMl+nQGWNZLhuGR4j1Lbx0GL+vy90Qp9MFB8uNNCQMHzYHoEnaDLrfGKqbYB7TKkMR00i8YZSZUvICwHrnwPiLMhFXKeBDNMRJUbe7IxnK52WePbrh01KNd+ov3FWC1vNFYuhq3COPHCbZRXeYO/vRUf17Y5ydNNz73jL9jytdXUDp8RinsAUoAmIuAHnXn+n5G4E7nzgxodujnQrgqlK8xQZnSqFcYOAezvHf320ejGyKR3ChAty8ZZ30KCumVBo5Lr4PfGjfJGRKXdxT1Ic1ig0ZC0+HnSxcIsMOVK7yKEalkQzFJuSDW6Z1gc/i/0p6aMoWZIScxsEnEdpt9t4aehyFOeyKs9sIt5MJzjq+8fs+ldf3+uC7IE5wFdUOwQH6ll4MNXqAU6UzSrja20HiEw2C5so3ew1uvJ44lg7bwIXaaahGmjvf5eT2IURTTEOY+S5KIRPCeNQM1QlXdIHIm9ofoUtDoR20XfVaOLxdIuUL8/EegOPjcjw7mYzXqi9zGBS4lm8RH4OWIvG51neFHM8Gh2zhkCXhavaiEGnlsiGL12ujcqxkAYTjjG0Qs2AJ2Jx/aXDY6lpBoM9KZpBaGUth+LnYQBnJODPLUDRLR8rFTBQTptEbHsu6qQCfhBTLz5pwLRCeG2cUXcckKhF5GOh/FxUgrxab31bbyP+K9EFkjod0GMHHmZ9J2ZcHjzugGj6RrMiHmMTXXRw62P/aIYQW0WuRH/FTeGuPfLkQ2VYccGS/DAEkytvbuHxIwVPANiPoTIofU0dzzcB0cMIUB17fxgU7HJMbuzBUlPegkJqVXVUgac/dgot9JiPbCnqyHiCO5gpuQYWILvG2Au9xAjPCx3tcVWmJJK8543c6g3ONnr+Phd92GuPEKRmCLJmEoARKzQCdg+oaKf8O593v6PAeu0t29odzcpAjpvDorRL6ttYBSk2NBZbUjbRoOsRsLUH6MP5MDE+6hdco4C8FUfLk7ZtJz2gFheRvZtlKsSlHzt0Txz09UoiI+dt72XWkQgJ09XJtKc8epc1b1NsFR8EKfTNlPOkYtcT73ChOG424IumNkW59D7HNM3HvctL0X2aeqcSTBxAT02FDQPQwrfMlvu27SICqOZGb9drq0hR3srvGlaSgGjztdego1q585o9gDSmDsYhO+lU/jOtBrAkOyqECA1wvO7bXj8JMPcYv/F4vWoXOtv9Emoc8oao4QAt10KqCY3dEG8R7otOL82Mui7jOHKNRha7xC9kKCeDtruf6/Lc18Ar+xJT12ZNkFWv3UqnpmRrFboGZcyIWOxi2m2LEcEzIxAc2wMrdQOfOPuqIr/RJqKRj547McXQv9A3QlGVvez9vkkZbQoPWV/52ZaCM3eEZvBJEyonKs9iE54czQ+FQI3nM/psJHy8yu085r/KbLr0HZTU/25r1U7zcHRCDUxidN36Zllrgf/t+Sabap8maSUCc8eK/xs1QVmkLl2GaaikZAh8KZXDj1qpI08AQDVKAk6kSrKUiSGG2cS0+sA0470zWite1EYG6s9N2AXWrYP1j3Z2zDqvqTKHrBZXA52dEQBsH3HBPhNwkEIS61u+3/+ZNAnmEuX/7Vu/Zq6dS4pTkdWimFQ7ByRvaQzTT/UCAhM5gf3JVdgD1b6pwnbLJASsH6JlFzcjcy672Kx3P1KERw2tLcjoGfTzzykZWIWq/vd5kuOmN+34MJo2jFI+8sez3bFVLatPefrF9SfSiPLA4HjCLnkK6MoWMiygik0AtYFc2jfvQyRCsFgD7COLeXNShk5V0YkmNlG73a8nRHvQuvf7esDZwUOxxootqSZ8sqsLF3PDF196LzxUN3cfjc+FI9do9sicNX74isgoWaaikZQsw/WnsRfjcbkFiyd7zhYbjX6gL547lR04/Gq7BY8e3fscwW2DK9c+8oJJwp9ooDvh6nfqdg5ZlwJJS1DlOnxtwDs2QZbz+BxQD2AZK9FNmhpBaGelMRCzTSyV/8T3bWinzGncD/x5iyFi0ESuSfkQkUC7bkcVHM4WWOH+xcNDeLj8s6FMEIg8tiHc7iKja5jRQxnIlGA/X20L3u6bjl/ZkFFIyhZpqKRXdwInF9GtuI0ANX3WLgDEtrYfi+d9TCLhd0mfG8i1dOhGXhAhFHTMg6lOixuyM+xQ1AoBjFprXp+czT41O7Qf0CujKFfgAA/v2fIAy3HExDnvs6gNms+5PeD5qvAT2Tt4dBYJhwjYhRaMUQYu48tNTUoTwe2EjaANMv41tEolSuvXo6hpUjGMAhm8rKB6uUw8UOpYVJVYYc05aFpG9xd49B04nfIdiXSNygYDrfKJWscFQHNJDohAeZOFDq4V5QH/C8KgNsMwclTTA5grXoFvsGcxgGbKmcxXLDhbVYOvvXbCRzAu2GJprLzNXYinp9/AADsfd8pbivXOUClPXFe5StoXHddT3z5d1VbmXW6MrbZwzV2GCAAtj06qNKRODRxHCTGR6qVI/8fgQbX/YBXJR66ERssIRkg/GhjNEp90y6u9IFfaxvD0JCI3sh7ed2IQwgWDYbd1ArnG/oEhpwVXuR8OXYbHGecpgR4wFSuwzh892kMkl4pNV2a+RimDEDjJllHC/ndFA6xKViR0nWVAIV/SEv/z//ixbRV4wGc6ZQEhW1ZxTYNm7HAjWSVJQWyZDAgtLnbvbRHSRARDO3rQoZf92+HGbGeYWu85yPQnUTROdyBYQCtVWBTHfVmtKXfLKMb/pcONRnEfIMaUFdKNDBqjn1T6Z/x7MBFwSwNfPzMBjZuK5leE66I3YMq8FUtaGAHP2jYy8mt/W2n9new3eOXy6r9i1gjvkHpVUMAtXWCG5t1LBP0nu0ZbWxpekQ5Y9sHaSQgp/Fa4Fh3uRS3J1GS0ejHson9OvWItBIeyp1SKjWaY5SS4GQj1Ez0Aagj5Bg45yhgnco5ikBLhUiPb+O/vt/O7tXpG++VvAVPhM+Qv4hR/MTGJYs8NR0QEuEnnPa/PWtAqAxoGTNhIWndzSJxz7PodI1Nd/Ay/nFDlefuHuuCvIKxXuFglx6foRBDqWRM4a1CKmRLuRRr0MKfMPDfrkbllQYYEYOZVZkis00bFmFPs2d9ySz8mh5mbaTyQQbwKr3LrOnSt/brfk//loy/gG96eOCKO6I4PUxplDLk8YJyBrH6DwZu5FII/izJGbED/9LE61LsA+fn81qnJAuRH+24+WSWfKYWCNzb3qwNCteZx4fe+/iXnrnVE3TTbEg08Nu1BdAZLCmnFoTqvq5m+tn7O0CC8T+0rOnfe+YwYmLEy1+xlPVieqPI4AixdO7UNFtn6cmCkJ5fkLDgcJbrdN+nr8DgWZZ74RUKn962JChl91A/og/QScLQhh6A1sgyhw039Yy06a5KINsPNgizH2qWcIXtME2I+l3t6qTVD+crKEi8oEQA4d7eJ7YQgqd4MQAAFjnFusJctQ6SnOreGlAVIgdFyK5SOzd2HTsz5sD6xLSY+IrGbaJsdww1j+iKH6Y/yEv/yEux9pmT/wj3/CO8sbKBr//qI7IH9zNNrvfMj5tKC/6MayzqXOYKIqbRbDT5zYfmcC2k/6hLi8GD3F0rv7pzl00IF/Qlwk1gESDgTY9yuhZXwEVVilOXO895yQWnVX55zLYd6ABIQDv84qmDfGCpQYLcdaaZqCyz9QdKdIwYeSqfXAX9haxk7B9xfJJ+6Ta8yeH5XmJCuZ3pAk2RAst1gbtE7j52e44aWc94uQslAH/JJehtBC6p4TG1WkDOXq7eDS0mZOesLkJ85W62awjgfqozywx+8qHMPX1lRkI5GAs3IsR4gUJMDtQNsBtSmqy1ZNsMWFuK/lXCH/0qWJIrUNEKsMoA3YPRv+wocSrx2Mw2SMEY1tAo+UvHJ3sYElVicc7AkAUV2+Bv976/xHjuH1SJXt2NmCuF9Sqx+Rv01igmBuownNwfx50f7SWWkqIB+A+vHWwhsx867rGn6sJ0ySnhzM2icaeaJhWMpYhx62xT0zR51MTdZEK/cFxQIPfOl2SlsTbWHy8FydgpDTWW7Y4LhLe/m2ZT5RdVi1sV/6uyUSVXi8ZQf6pyaiP+I09ZYP1p0H3EBZ2eV8gLNT+EokB69OVoAVg0W4Igro1habDiSsc47pq3Z46cs+krlTN1YoIbHF5yXmABe0J5pEJNkWxx3TJDmztQOoVd8rlV1O1yYpoUxpvB4fCKYtzgVogqtbnh3BAKSEKMd1Ba29j+NYHuVVkmzywzy/jtWzs5ZXOBkMpRNTUIt0aS4Z3ZzcQyHR4CL6y9rE8rKLIFSJ3WZHeg/XnmFKQDDcS/4CmEz7BgaWTl5yKSEWQpCmH46XgVmEAyGT+bGu5PmYTQIBYSlcs718mmRP4JpgSHQsc3uccbiNJlIg8Q41fCoOHKc549Ttoe667xwXRgJmDonWkSHf7b5ETKAwKXxconBIcKDX5p6XD/yxMI5Yoh6yLBJ+jGCCRwF3J9oOdyNKiIZTeA2cx1N63NmwG5eaSSuBIrIQBLoyUpjf1VU7ZkrjrJsJX+Bk9yLKnv6lL5OXqVbcVIlA8sQF+BVoEWHcVKhpcxPh9YSofNIyIk9CEDI/K5APHcUf0OP9RDKhj0uwKIlWo+BhgqXqmTxIeuoS0YjNDJ9fQb4BiDPtzfsT1c4qExfo95F5fUvMqEyZzwWtA97sqhsrWDS3eXdek/O5A4MU9Xks7HCKVQ5twBeoxIAnhK/2YnPSL3SKpUwnBoKXFH2vSqHds+tbmJ0zunYvoGFuFQOURiShOeep0NVbE9EzR/Wa2YCuYnzxAVZqptVlCltNFXviWi6Ur/laUe7W46cK6Z2mslx02vtQrGj2vEdxCenQbDq5Wunt/+UOBqNg5LhY3FKJxcjaZIR96bn4jt/2SX9UxRmlyOVV8I2k97CdvD4oaVAaNSYNKNTxV8yfCyhCdnyp0fJTuXa0cmmomUS6vDukqmqakaDzbiibtxbhxCDiGUNoLhS8xook89ai55n5Azo1dYwzpP5ZqDaOvq4EpuFozaTXlGyeKtp9xygmJMMEtjS9rG4Pfnoc6LS5biM6ad6TsV0DkVJWlfzpsPSblyKqyKU8K6W1HWZW0KrJIBM5kZ1Dx3fMAAujwYJ5W0TsTje0iAGW0HY+iJG9aIyt0kDA4f4N18wUPdRuJhUlWPaHJuinCFCMpNFlepL/vdexce0o2ZCZTq4fd+TxEyWaLFK0mwQF1jbXUCdvOE0gL74eDfwDdQMw+hySHtLwbDWlHdg0PtAXO5iztyQovXbFeFaTMgVyRDYhXBjTVY5n5rg0SJyi+byqIg5/oulMijH8x6RwTJ9eDT5DyjdbNfWM7o6z81FfRe4dbLn/ggb8ToCRNvD9n03efQMgbPOdSdWtlCe18cQ4iRb+YwEVIWmRO6QydohOF+R9glxpODkh11sL1x7/D84QV4T7qYW6xndrV6eFgvviijWnABNJQUmnHnLCGI/PwixdLoKwPUuiV/rCyR/mW58oZMVtQma7DOq0oVPpS1VS0e9cF/CG7rYkn0to5M+bq2k8sXQUArUtx3z1W0aaZAcF0YrVc9KZ4SmsDhTD+sI1SMiO/JvNThD3Glf3ZWBJNVnsCWLwvnurOskXvJv//2n77aj9vigZwdgrQjo2SnSiQk5lpWXvBk2JhHJNuDY9l1Ypjsrg9p87ILaYoxpr7FoujlajgiP2/5EovgRrYSpv1tD7Mkzmh9EcLbh9UUxGRDV00eStg81JhxuY41MA+ckUjWrxw0/aHdX/aIN2OpC4eS2Bx9Lq50MuboBMRzpZoyVnYFXPAFbXyhFS6EPizG8IJGsmByr6Q/BopoZjAYVV+hsZaVlEo062erEA7vU0I4oCDIA/4k7st5B91ihSqr9B7yxNNRg8ZpGlnEC9ksr6zNDciX1nj5iMLXUzl4jrBwa9ne24LhGiASCWv9wWnIqWha2VyLYh/2vt9e42JRIWqMVsYVeoOcMZRqon5bqYnt0nlNlijAJHK1KnP9d6ZGeSVRQnnQIWTS4hw5peFMfooXlI5dH+dlvdQZhnHNK1BPh2NJii7U6U+5n8mR+JIUnOdWmTGPmSM2R2/RQERZFP5YGFVLibQVgqS8Qi7YPx9fbYh2u/S680HIQXYMUQCs4vBK7Mzkg6FJKz8ZWO2iySX39WCMy8PBh0K5gw1NXZZfq1ldYoE4fkqZI+pmH3GpqoxaykX1jXGYUqjxPB3fU8U3Wn2VbSmwzolLDH5n9ZGZFdOOIwXBGa/juraKANFlpcSjT0iIKNUA0eP65X+xa75Brh2IL13YgG6oOmCCNiORc3BR2Zi6P4N4NqQpuXKF2QvDrgrJjmvpUlLpS3gV6U0yCuB5t8KtU+tjwx3RRVILZTA85CeKCyNzIIci8mzJD59FFvCnaBnb5Jkgv8sQO5TY7+bjw+mCWWgxXpQE4hukS//KqBS9sE6+qdxIeADJuAhmN8MUtXJiNFjET6TXb9zI6ZePQQSRQRMkPmS7yt9N+kWogwuWeE8opN3D6t2kafFcZdikg82sa4mgbjPgOSNPVTYRiLtaFSlqpFSSzMMd4g4l0s3OJDvnfQPdDX7ezdxfFciHK5KTG6dAiNchztVD6KmsghT7tDN8GfksVMctzxJ9ZXn/OUlYmeTBlqrxElTiL87AtZmwAuYtkP/iAhg6n/WcmilxbhAqnGFwsMsImnLX2wJQepi38xJ0Sf5O3MwQIgLBV0FNj2PNGF9FXBStfv15ri/20QFj/nkzBG850xyQsnl7aKxtpZnv8dQLKIG312Es7r6d+rsJyiGXwjKOCddIOJTKR/wjkD7Q0R58heVo//YZ3UQqox1RryzfmyigyhYZHk76YBPujnno10W+btXcW2nKY7TKz7KuX5vnI6//LsE/25g4kP0T+QXXT5QdZQcSmgC/Q8HCL4MyhTQKQxDLaHYipgq0OmQHe2pb7Jso6H4+jLREjuk67QMHWeLqNInzh2UJNez1sPTC1VXUTuYKW4sMoCsoABTfHFIU9HbN4oZUrY5DVidFifD/h+uEv978eMzhY63dDpu11aij6ZzA65lVNevKgaIBHzBLI2+A70F5qzjXvruLUFx3VkH818us5jAmNkvqTo8Kcks8VvTlYee4ZLpHu93uYaeuZY6PNosq3jYQ/xpBV/P7Cr16MrrNhAZEhQTzDfknnBQ96cuqyRkGvTyXAiBnny8JO03BDA5Kii5HIPmIMQLQ6HDeN1ds6rqJrJSeEwwQOlWW4YQkd+5mpxG+/Hpfnufn5uCaP5u2vJWVAuaCofrlkScMSWjqgPTmCdO3cnPTLqUE3Ht0gX0t3qkqG3oES8iCeDo9Me6ZfwPODrnveicm2WGn8rZyt3TQjOXtxNWLUDY7jUkY8CDn7mJjpIiZ49F4zTVxHZZaKPfHeSs0wPuBB/g2V6tw5PuJiFzELAUXPPIChrcoPn+TanQPxue+TnfQMm1GkFP1ja5Y1w2kB6pFY4BMHyrYatYxc5H5fKky+ERGcWcrXmijSj/wmAIAyGLBZmWAxpJfph18j7mjR4fwgpzwJAdjxeoad5xMrhoV6MSwuPV5VhqRFIEKDAZ5AgOC3AI2HPg6zo0NyZdej1s4Ot6/lrKoJieleCEdc79yyyDl1DzVtlXAzclsue4ZUICTlWGwmvdLY+YDDNM2OdMJuNGD9aPFXQErvnX2sL6POQCvKbIi476C9uG0vfETk/1BXVyzggqx6FL4nPQoZB1rxmgRashuLHS1mIGGmexYG/rJBysdjgRU7z08NvOMhJRnBJGHa1zBC0pfEKspErdYjhobQVPBawYkvYCQcqWa9JDuUpF1lzh/sFRTWmFsP1H1QBqEZ7n1I4WugGk0pFB3mGuJ7Qbae17cWY6FWnnPNSSVyPgZ91pgcGYm8dfdBApsFOiA/RrpEwrP6zxZiDmiwAIlo5fgMb3NvorFfEx6IDpx99+k/t10YBt5m/dBXauk8IEQFWFplUF32K0ZSeYKUzFYqzsW1aB+zR5e0M491A4UIkn9wetLidmu517kIyAq2E7tDxtkBICpPgIvVnlf5j4TTPwDVJjUl+oQs/lJwgIujIMVemq4+dXnpT711HmUvm3z0i8cHQIw+5jjWcM/eAyhGyDW6KP3xPJWXWds1DYwXcYZIFVewVWP67DbDrzSWy4ijlwBuvRvVXacIx9+rEcpQ21WdpThJp2eKI6P8ZPW3YteJOrAkL7mwtzysmDLttBuhv9zkuprIors9OsDdscAB+py1l1Q0Cf0U4wPeQh08Wm/8+jqa1Y+PSYoGCVX2xQEw1Z70igEEB5L3xCWezkKfJY2A1vF/fDQ4PmuVnaa+Sgt1vIqsuQ156eGPgukd7yupQSnMkZI9FgBC4lbW1lwFvx1QuzQTsBFrnJJvaemHeAyJvhpqW0qGGzl52eJc33NjA+wzTe/koRgXsOKt2ncmgK3SDmmfLRsJQq8ZWW5E0cgnuo/JQ2AhaJ85otpecCyq1xxeQu160v8tH4IYyh50xJ+U99P78KDLJbQSbUaYf0BPar9XTIdd5ov0YBxqtdpiPJ19re5G+GDAv7hQEYeR1TVSA5WBGJbU4z47EECaKJnc1xiYmMASAdPn0tgT2TEzu520QhKiuXdc/Bm0AQyhIu5V5d/OyloG9VdapDuV3h3UPmDUVLY6thbmYIFT2LeSPUFNGPZcr3tPQ8xP3RLZOVJIbQ/NX3JTbcHSA4GBD7kSEQpQ8+ryYNqQCyxfYHbXsBoon5zRdCz5UPtwPyrg2NoicRhSDTaGBHi4cj5cBHQw+EVq7+LG4Dbu5c0eWJCFTZUPEIg0Ms5xeweuffLcrYUoBVVliL++ZtD/AwG6IeYZDU1f0to0LTg1CGgqRwA2M+fjNh6CwQ6jnYwjTqZrzCX/tXbSuxY/hDTEWMjQoDANwFUL53TT566wnsikNRJ6gONVuVczy4XHD2t/DbaGyYnwvd8mtXJg0eCRQ0nuHIr8fnj4MK7SZjxD8GErk7TPq+RBnrhuMhmfHClVJ1MCWSPDfajZZzV962/xqJkkhSa4cgH/Of1qBzarR8WrY2LCioeltUkMKmeVd/H0G86XXAHE4HtM87zfcBObuMswL2ulRVKr1AtmPu+rTgQ+h1I5ibnWB/N5dCGDHs715xk++UabqkJM0qlwRhOy9rjV4wj9dmHmdZdEYh65VpQqFu1Jv4XpZT1jJhPhzm9IiBT0Th41+LwPVRBysZY52FGF/iWH5yyoT9H4gTe3//2+TGTXG8nJlFxyj0cTNeMtQk4gKNEXq0S/GsMTPpDX/ggwc5GH2mj9pLThjghpFI3/5Y02F+S35qFiliD90ym7SxbbnxW5gQ5UHRPoOv+CQ7mAv09fI7V8tMueDp7AEwaGLA/JApu2oq0NNyrKXRx0JugYgSrPz84mf1LBZtD0Ga8lbDn9ZiXvQB4Kgh8FqM/QRjuCuuodyNU9mSg8/woB2ONBcOZC74P7mbzv+N+pjyNfF3uyHwgAw9RH4qx9b07AP9wAgnhG0c+vyWWoEvKoduTrs9bhfXtP6fuwYzUPk1qcWMtYA470rB0g6g4o1i0fpxM0OPY9I2dgClcdQjsz1s1tcUQXsJjbrC8HYhqL2r2RkG42fS+KxRm3mkzTQHZ3pTcRmhHdKdW2Z0DpZyDvTy8RM5kY0wknwpaE2vjV0w2WRZ5R6Jvg4Z2Bdi5LwUSEkGn/poWAbjiRAgJb297V3XdpP3WgBM9F5+rTkrEy2Ehc2j0UXKmomY9Lg5My0mP4t0kF67nIsMc2qTQnIdHedUclx0ke6R+N2ZZkGstoOzND9HUAzc5fYAduH2Y5mGieIPMpki6AIYAa3pGzJy8FGzpqQ7nwQYNCF+ayc2lsuRVeJjCmCU//w/xn1Olqz6h+GxmHtfaj/F7Mt91H7+tY1RM7taUp57XsCBgyZZ0g5qgHKWF6dc0NRtj1yWzVH/dYrlS9Aj6+/FKi3SgbE5ePjJ+gu+IDCt4ugqHbkdNcqJM1nfnyjgFu0frWBAu8krU6A4hg2e/991onwRJkkVkAEfu11Aw1Mk6qPKRnOUa1ZQRQB6DgmqlMEJwTCswAIsQjKbjl1KnCLE/6AGlKJf9hQplyYFfkoVIM32AGCf5RF4zWjWrpIod7p/1377ACFwUMgZp35l0IsC8GfVzfI6gfIHfu0Povb0Ygp2ynZgbR02dy3dypu1L3uLf385dhEXKu84fg4NfUMzi5UEuR0i+vPvg0eBA9uWe1njIBzAIPoID2i6QK4lh2Iw9JOWEznFQVXhwoJ00U7w7wd4dxGMwGpeeQu2wPbjIwx6+ESTNa3DhAIDQT9nAfsPR0gzRSO+awu0yRcLbTC++9DATQg9MrHcj+jor+9Z910E/oVIyYg5Hzy7Lhf22rSrDVytMuDvL2DbtM32veJ9b8VGpJ00UpPDi1OFkC2zMsdKQeE3BvmWtjlfWEa0hRG3OR1Y2Fbaanc1AH1CUI/6jDZqzavEUSNcRyGMqEJDKlqzwD4vsgVO2qih9Zq5uINvxfrzj8ebwIa7PUnGWBC0aZq4l7T6VB8qiefv0WMOJWhjzC5LVYygaCbyVFRH6b5t4XZo1P9zj5ug5Th+5YWNv0bsXdM7CwwhNPEAQjwx0u19vMOK2HC1UPnpMkgInII6+3C1fab2+V/00vZHPRvnQPdDARC6tUWW0ubvyWLXdHp9KGdZH+Rs7YH9qxJvklAjEg50rVBcXrhR2gHlzhAGQcDZEk0IVl9w2K+VQ1YcB1Fn/9ttDC4yaQ56yV5yV3/pL6px506nyX0TaOqkZS5EqbtE4X0kFvtB2FDhq/HMP1aw4OreNJRpdROAE7IsSMckLR71YBPGRQN77ug11L48Kd0szsmGlHystgOPzK27J66ewqRRhpX3vVnM5GmGKt+Gg+e9LKByuZXDrTY24zIv7FMYjG4P/+80B+GtLTlx2PJ7pkeqcwu76KNOdTnAFM5ojF+XcDb3hT662LuFzTtnwqirckK+8V0PsbhUBXoHgmli/svTpQ+Ai7fyGsSPyLzCSclcNdMEM9ioMWur1zlfHiB8ykF14eFF/2OElw0ruCqi634aqcZRhFLx6RJSk8TrzVmrq5qA1uHj3OJczIkXMkBtqVsl/stOWKnjcJkQXHGLuQ26GPuriP/7fkJBq2oz6sH3VWYYRDHNz+We4fNgJSng8tBZ04TNPA/yS13D/lC113uRBmnCfg+LEkCzzOCzIZ/opgBnf8QltlhJUvXwpQXllHt9ry+6xgJ4vZhFb8vqx3l70tn7tg4q8b7SjTeDD1mQ2hXITLBQN5uXzZvpN5e79UVH5K+P+txWIjKC1n5TuuCQIHACwVn+w26TJ373MPwpyx/4hTU+rNiyr5VFazSH18kVYKtWHW2ufgBoHn7ShE26HJy8q7Z6aWRtosfEcrYgxJ1Uhhg8j/rwiSsCQYj8KyXxjQ5jUuR3xnAtEDIko6u2OLEDL6BswLB15QEvoIE7TnrAZF8HfeZh3SYSuUHn1bTEha/yLLj+U+SBkfKyTKrMZZLMVhFMrxNREHeIeGBFzjn+lhYNi5wY9L6TNXY9kuxgli7HVAH3LXZV7h/ePjNpvK3gGIxgmw/F4YL8JfnFazl2pKsxSFTlfx/6aE3kY69+COBYjdjUVCfudseuNj794gjFKqcwJhPpjIQpE1H76zCD6IXxmJECIXKCajzHl4F8An6lnUdfaUtMXDtH5bdG0z0RdnCr844BVAOHEq/11TwDVvSKOLKIv0OOHFZgA9trry2QY1L/E9C+iep9wH/EVs4ozHc+EdNNfzEqHyBUxcGx/FmimGbJ5TS536qwkYI0D6kWERSzQWyHFNJ7T+vn9JSo7qDA7u6AjsCrpBRaDRAUgjuEiN6oj5JDUKeCZJB9DlhV+hf7bFZ+73MuN4sz07LeDxp2WwDq2W4hHfKoQ7YBCBsmg21p6Ohgx1Vr1VrzuikuqZj+DXCGAL2668KZSmlWcaNpwWlP82ST3io2swgZU8Kdf8CO9qX8Vxsaq5SHkkBQal+QSZ0AsIhRJGSLfL4IVGckW65IxFCEJyGvkty1fJwXRiIZoYiYmfCNG4GWW1q8XzBEW30Lwobk5Ma7Uu2kWuQKxu5wAubqut/vUpwC7Kz2+NYggRndCqyJ4jUiGp6eje5yO0iQBmchsZcoBq85bY9M8lLn8O7Aeh9zxdaNpTMFhZXGtZapMNGXL0LqwHSvbvV/IDJu3d2qTEVHYeMQIrlXkN+39JN98evqyqnjiY87GPGfR0fhXVY4NW75lE7GPs7EoBA8DUsSu6nRkVWiD4F9zvY616nmMfa/Qq1iZcZWTsz8FyvkOivVyjHiNt57VOQ/teJvOKIFdrWCmOu5MbZd18IPUUQfKsWr/ir0usfSRo8+ZGRQnc6vt7Q5UlIM7XmAmWYoDuX2TaXVigIu4V03OsNCl0u583iJgz1w0HzocvUoIK+Y2PWLfyon9+zAvoK1mBNoOa6IJ8HTgJdM868dy+PDLtXwnZSDIdXMU+HTXwnE8WLMV9OsclQGNyXUASt32AXv90RPuQaq8jMP7GSCb0r/CRd5l2eZGclFpn5hpD1/9PvhG+OCRCDltCLMjuFoYaDGf3pYhiZ0usnPQiWU8V1jlGwfS1mwIkhz240gweCN4oCYmtjzWhaMIBoRH07D+6Y5YUtNm26t0Zx9gziY728Wd1Kvz0zzRuK+7WqINJCDFfHv4oNeaT1F8c94za+TcjJvsTEYpwJ6XHyOBW5vMSggFYMpoWohRbZW+0uCHRYSTDoPHffx5+Oa5uWQZj818LX58RurLcfpDbT/20SF7BaXmnd4KThDPtuLATsNm4MLFsPDKGzh8Nl5eT+dOsYv82GUzADv1edYiBYd3YuptYSWcmi40IimrVuqDfEhOXJpWrxWb2Gzxe1SWrtOPjnJGamnxx7QThs80Qptm5d3WFnK5Cdz5TxPBgHy8OWeECpHy4OSJnvBoXr1wM2I0Q0/TXih3Nw/JXc4kFZszUXD+C8AL61omc6pW2Modb9KZliQZ3s5iZqgd6A6zzmfuHWvndNF4HiLNPw1gsySiusZcuo1mMFwP8to641xTxMF2LxSXutawcPJbdU2FZHcM2UIyse5H4bjyzaFSQyiqTMHh47CiXqUZwU/UJkiMcfJZ33Zk8QtEJsXTvheFfE7Rwy5VjjguOF2Hv8VDfASI4ilmXMJblwZ4s10lMUyKhEL6AMTp2QqABg1Bwc2TRsw9Rqf1AdZnPr+uyHZtY7gL8nvl4FJnPz2Dt9COG41Wcq+OJS+WV9bCRXDhL3UtzDDQEKKUoRbCvqX9r5HppN0wJoWD/NywiZFG/WII1NfW9knADr0TXK9YV4JHAxwYsEReDxIuByUaeJAji1vv7VeWEc2vyHbvIR2gTBnjlzjNyzuvs4JYRRASLjLETBAHWn+oqTUuM0SDchwc3JjV39jjrCnwZAfklM4/vOP9qBG2PvwaTrS5QWbQOwCpc6UOOdjfuV7CuE67nfIdBVDsO97v931spNpU/Dzan/DrGBQRucoyjqaQKifeURirPuKVZOPO2o2ThU0ieW6HZqdnC63CJlfQinDFgJj+6HFdS//qPGYpBI2F3OFg07PRNc0ozUnrS40gYeo6PakGMfC6Y23PxTKOb30FfT/KjbNi58hwo5Jy1FGBjSOgGIQgIc60EQjEK5o/Xra2kaHvqXP7lks8NkCOVE7cwzaoZomg+iw3tphJdHhDPEhFHvU/r5IjOymZjLWabomW4EMfJOgmopWoEYebtfVFYvOczjN/9+JhBebsu/eFMhJvhOdxtGKXYcqTXLWoI8V2Joi9ybaPufRz/Sr7fXBpCaQ5RC0CRnDLM4QupzPkEeI++uSiFrNB8McL156DJb1lNKmH1GSUE0HvFkMmKxK2qJEc/7jk3TVoewqjhNb5glZ/T75Ppx2UiO8xrHNWRcAbzDMvbkifWeZIXI7hoz7f2IlWwtFxIhWOloDuSfCI199YTY7Uu4NKbsAU3sXsdxQdGopnze4VHQkBjkzEKzWE06pODHIwic6WVao+gC4pmOb9n0mRoKW/Q0sfMxXWl+/6kdTylwW6SjFw6NdoEsLAjOznzpsPI4pbmOLd+VCB/XwivdViJpbWNMbT/J7ICG1V/ygG2qaKia68T/Xz8z89swIteZGKOAHeI26Jxgj8C3NFyGKzCPgS1R+r6T47m5HWj8MoYqNqCMEgu/R8c7E2MYqtgPlh1KuGfP/jdtqMSBDxqfjDs0YcDHhfL8d+cHCiF1zFn/1STyk8lk5ty0WQgs4fRAzETtXgGwBkDZsw0Ql18EBSXnNpUK0mdmbgldO40NjrQ0nEQZDYGKaZ3lWesgZ5jFv+iURjX4zQKIATsT2xfHiVVUpFnCuU4/eDnaZang4FZH1zXphoHUgbXfmOS0rH7HTX48r3JQX45hdoK5NK0oZqm3due3r6YsfWf2Wqo5xCF/bMm6LhtodkaGtz86/sV0O2mIDKs8Rdqpse3nucR4ajBHn0nJpsqJdGp0aZrzpF44MXwmjS3i2UBuzcEtE3nGWlxu+VPGzoS0UpkPY3XAtT9hADzlglq48ylMiXUaN+EhhrlOwBAi0fUs6JaymTO/eslH11nuJR+xXTiL77wdrFzajD+xYNEJOhhqs2mfIjxP+VbpRct34dYkyVDhoI+kslOq53QPDyvx+z5YeVgeawqo58To0LA0TB8rb+hizbZzqXA9EUpqakKhePAoK6sNRUGInTtYZKpIsFQ2gO/57E1Kb6ytL4THILmjktKUK/HPqG989tGHlmodyUYQLjHyxchkfXczujB7Z9nvuFXxhiNAk054vHKPm3EQkyzZbnTThVFG2VaLq82AV7uC7/Yeb1St1s3ZcvgxHoisFo76eMbQsHi8d+qORFH4i7I0yYN1yz4PXNlUQTdS59kTQhP0MMTUQAKgi6r9IXpLjP6h7J94W7YzTsvm7PfQOGwSZiBKerlTK2a+yYGoH6JufZzoDWLHCG9zyIX7lWgaOl8525clgPkk9UjuYx4T0/UhXGdhFaoehuDg51loazCFflKA6xyCkd7ux6g7/sXzMJsJ/j7HnAiuMFnK3Hh+0CRR9Yv4+Hbk+IdpH1qBq2BVEEYB5XkhXz+EKLOhSbWFUK+CA7ZfLse9UqiHGxxEYrApZUmB7HS4w3Y/Y72O9nRkKhH6CmCvSwST/v4VN6FKEcfTDvH3LF32ccX5ydwCzb/5TZwvng634ON3OGjiz/jVleNPLI6UUVU6zsvuJswf2jxNiOD4c7Iv8SghcPzr6+xBneq2vX2G2+IfITZZsiV5p2T56p9q60SsyISNPwUUCuy0Tt8E/SRODJ6z4nPNZZXmpbcfkETo5MTQUn30i0RQf2dZLO5PDERTU9nRw1LfdP0xZdUTBe7eQrCcZg0Ub8sdPICCR1LGRtLX0w7zEwrZOOY1mCB5vyamyzwVY4SI3fl6W0eI+SPXWXEQ1mxrpVdd6nxJEQDKGtKBaTWwRllq00SgxG10HS4YRtuKgHmDj0eGL5BYqKehROlXkcYMjpcD26N31Pq2O58OQb3+APuMBdTzuW4+4/dqbw7XQmptmt6g+LoWkPQrRAhGY+dI9ByDpANyiDvJdkFmuQdaVF/5fbxo43RlQ20+oX2pQ4BH68K9h2lAw9qz0ePJYXhWGFsV5Ahs2x8C2smADO520NRbE2SZfqulDsxFvd5ctBc7asEnZqNacWARGo/NU0sdKWtzlafW9tgSJ8jBrtz8VBnlKDH8ovkg7YEdJ7UsqyuTnuwmB+NcilyRr/mD+KhHmfZGO/gfC3r6UbluQvVgVY1Houof9/iNL2Q1/pqIWVXjWCzHtgAMhS0AFVcw06i/lPtt48iRgC1NacYMmutxZ44xj9r6gKGBxgQQeKFyU6ZP2ZWu1I42Et3BdDuYYC+q+628Jl+GTmRid8qi3TreBx8LwUHhVbkbYs6158bfFfG3YS7U6mJ8YZIJNyBuF46PXZVlAvQMjekU12MZDb4R6XFzny2xt60pko5TZJXA6CCgzHUjJSAbbG3IulknRrL3MxkGkKMtrrrjTM/ZSxEFvDi3GWjJHozrCrvlIn2fB9aa7ySYkG6fmhJY7mfvtLm3CRFpU1AQ595qbWOe4HRwwzHQwFvt1fW68/gVGlBIWceK+ElzcugBnty70OyUgvlR7oY2DEldxUl5eLhOx5cuSIBchgbqygwlrJEvNPX799IcZyxc3AJVrcL8BTaapvgli2GaY+fycVgIgrslVVF5H+SquOv1KC3opHe7cQsM/vNdvli+RsMj31pM3x9IietkDxF/atdtP/tqYx2VShQyQjg2q4dZw7/2b5zH41htSnMRyMmHZwLJ8zCy8oA66DQLRPWItGtgvI25IYVMg2HmrGcTp3BObwQfKx7TVbbVeISkIgNvGaLT/+fnKaRD89j3LIj7ixCzf22ntIsXBw8jtR6t5IfNK6SxHzL8QFqDFT59O2wc3ODcbM2VhLaF8cRtTGGG0egD8QdDRBvDmmjcd2n6VkcslvtBRYGyJAGBwBgliArsg8TWklBEJFypftLd02cXAURJ8rTCD+2NlYMz7DHqj5/q6DCsSqOe/ePIcG+fMD89djlridrBQgpfODOEsf4ljAdYZQKj4VG2NAKhnWaBqBajmCPOcLj+P7l6kB80GfX5mlp4a4bRW/NfpaiJmLekL4uMLqU0NyT8FZ0XWR/D3yH1IvNH3m94gkRwfwmLpJO1jJvr4qgFw4oqBrMLmn6GB7/VzFnG+/lS6ByI2TkDkmkeTU+gR+PhkYqd6m3wWAaJswI5ruBBTg9/21v4PssGW4JTvu/dpO9mZTUlOCIWZptUwQTW10sFGn6zsb8KAyCbA7sKsyOJXNqetzn5TqcF+bGnwBeYOTHJ2/WTlr4TuS1KfWcliQ2c1V8Gt5zEbzLHMtmrACh0QLjfh4zByoe/WIERcpwIdgLChF8QwT3bWncNQM7TQMucjO7WWvJ3MJsg6d9Yhj5b1sOfEthlAI6/eI8ffCMzrF63q2VoNmdsE/ygP0tCmG5fJfQrpOQE2Eb8FEIr62LqOMnMs1GVdIUWAoHhfi3U0oMauoYAOKtoSQW1ULFJGZRpLIOl/oEw/sRI3zk8eNmAbUW4vPc1x+kEfwNwJCPA0cdJXjbbTsCFGGTpT3apiSMwIbtq3jCuSkDblO3avIDzF+4/tJgmFTCFRNewvWfiNdiRXYLrxIApkygH+hyaTUotBCq/sQADnZR8t/G2fD7XsAj7z7LPr56U89SrbHR4UWOTK86vd37jNwmJIUCb/Eh09XK2fxTix6wFLfhNZ8BwDTNjGgG9N+I1hAXhooUsyx6vTElztcT9FrXTzuMadkTyEdrk+IFc2/jJ1nxBZAcQlmh4wxFcghFzPRWb9YnoqdsJxbhaAXFph1R9n5UMFvHQy/LQNxfvCdG5NCNlB9Kl0OQdCbykykXCcBKtQbs0dE3TLfeHMbjRGzywXJQ2XR/mscAktQJrwn/P88+HR0wKK+0Yk0bmlqlyFVxuyZdz/fmlCBpYx7N37OQmILhevLJegWpJpTKjM+SM/fa8bwmRxvLNVwbbV2CIMVChOELlKe5U5E3Y3fwleVfqKAbzGbCaqm0ZOvvm/jG95w6tOyC/pLxlPn2qw33+lWNA8UEFoCNpvDL0Rb/RsUijRKbm5lBRx9KYe7K4p1/jsodgzYDZErKKefPhMx4F+0ZmmByfBHbvLbFEbCHUAHuMP3thmzoGI4CEjZ8KkEYEKf7Wt7MkAFSikZC8fnedxawX+VjxFE7n4MmutfOJH++8fYcProztv5N+pktqkzamYmTuqcrGiHu6P9n/QKeZRZGd9aSlc1pAA6W2XlFH6n0nh+eTSCd7JPafRKB2NPyRvhJ5wySnxj7w/dLmBVSTQff9VyeEpvsTjfIo3iXG3yaAwTb/nGg29ULJ6Y2NRbjbN7t76/YZ1BYkAqkhyuxk3p7Ofb7+t31iZlxMPfGlqfGvq6TLE7ysnxVz4ke2PFMv3MoeV/Rft6+IT5XeivQXcpxmzntfFpFeG73t0D4JZ0ECY2jF0TpNRfoKf/u88DPM2kI6KTMj69TvUjzo4E3jaKltgcYbsXx6uC+yU1eeY4roOpNpBG6oumpITOCgMd/5x561F1AKzF3vz8lnlCpAul/yq5Ix9F3pJ0ZaSWNYSwdsQdBY+EyVK3iah3t+UwrfBjAzU2+JRzPrbv58AJyFSpRcWMkiBkjhf/HnFLpS80qSU2wUUa+ctwgqmuGeTkP/YxEjihwGnmUOOqSNkt4zfoOS0krnGJy3NeN7cw58tAnVtZu/2YOfgEuV7i9Nfo9BT8OQIRDHLeQfqSSwAzsElYo2w4AYGmX+euXx5q5UXvMIaDCwP2GOMiG0p8xmqh9yZgl4XvYYRjPjlyMChCGkcnAjy+lxGHg/FWQ2OgnleGUoAs5Zm0ANTAhRfi/zRr68xhSRmbikkd2p3/zdSF1omXKujgehFynY453Fi3z21JiNaJlWMWJdnp8EJiaifz+GBY1kUYcn/Q5LZpR8ap//l+0Pw74KSLsrMbYmpW23trRPYI9FTymRXyYVgnsDuQg6Ded12IQ4NWjUpq0dHIAxG3jJYMfFW3oX2tokjWr7G6BnTa9euebYEoH5oh1JDPxrk7Ko3Zh+ri6LnsG294lELiexEsBpPgB4ijUiKf4gi+AgAAYo5nkQzEoNwlYjzfCDxTnS7KBqzgPjjVI8vQSkUhLEFNqFyhRMNRpIT/EZ75XuD4h+q/qjqcg/rue/NRHgxj/6mXtBSZg8bCel/ux8svcnAWiuQLU39AFquRpeUvlTsj2vSPV1mG97BwmQijq3nDmjJ/8wP0HCKOthduMYYMbG8aPJgfP5WIsQefA1+NVO3vj8yRXpkpOb9c85vSRlIvy4d756tGojnCKICd1Al9lwLNSFjbyuEHv637TYKBRdFf59nZ6evd7UAl6EBu9ZGIvhCDAryF/Rir4wlgSQUOH/MFuW6T+IOPsaVuOzicNlaZTZ3GclLCc/9pu4eLFBQ4dpboujIt1WCrauUO/Vz2oMRxXiD2IyvY0XK9AxdF24x1SeovUZamUGy5THAQYMAxWGObHQpdjwo6dJIeifxGqBvB5B/10f2XQg2Jqh3oRbt6C8TmIODOvQr18b4qYkOHno2mO8YzZ1tBjLupeDurmqdIGRqnx6cUgc6sYIra2Bm+8SyMnvOm0HoG9kIEq51BxvMYfthjBp8L+JqfJiWe+aLPzNZJYyhHkUeGGZ2VUdzR4op4kHpS9KOFRWbI41dSAV3yIqXJDiucNaReAbPAsRCsmiaU6ow55X1kS9Hf7Ytx6v86dG9/Q/DAXR80llXl7V0kg80nfvgwoAE3LXi4Uk5EzP0g6mD2LK7qXsGprPjxlLaRVnBRSqHffyA4SecfQ1HoDrtEQbcgbvk0WYmW3pPpXFkce22fcdKNJVJZXjKkMkj5qIWEQqIlGaz+lSkedfX03w0L3Ct7bkTOb5FNf32HqHiBXB10UGkGlORbXqIb6puPadjPZzka1aecfoz+rm5B2Sx3wp/2skQtBrtxpbHz4oEdlA8fhOEUW4RiMIsd3FsD5h2ph7JRjmJZJF1/aTo7Mr0MrN5O8pWX5SBlY5qf9+9TBzzu9RuzhfRkHZtSRagi1eDvNHr9D2gcfO+6UaTIqdJIQoPf4lPpIGj0Ne1Rs0+hmxPZ723vve37Ak/0N2gP/QFVWt7sJNiWKG63c5pdIluvBp9djS7HcvGjBl66C3Ky/lO6bLk8UV8mkFJHoIOpn2uuKgnow1fXbG1Ah3T7jI4sK7Py4YeVfN8G/lYi+SFdvBF9hDaTtWWBOhqMlGhLsTtfkm5z+j2MZpAx0Q8Akhfh0XLRT9GE7U3mFa34YYxKrF52nADVXOJYir7DDnOc/4V+BJEK4bH9/URqF/KDgHTI6PLcIYj+vihNhXDtbuPpCh3K8UFW6zoOzoi7D6hGI6j1y3winZR0yXLv6HqvECFIgENo6GM6nap+/Ntb4XBn5XMGgT0W0MpA0AQAV1YYdIZGfz+UQfyAPuE3G2t+XuKRMP/zncLispaGcdwEacfflmWA5wZoU6voySuOqASd87cBQnc34J1fWgxFI9EbwAwOoazWYBX2iCBPQJC/UBvT0HDdoc7cHMlt6dlrD+NKWkTc1NvIfX8pYF8P2ER5zmNE03whkULHw5mg6QHKjBAZOTbN6X5q1rDCbcznDORvXfF1vrGpXHxqNPCZDpw44zpZIaV52LKWS/hWHVUiXcnFgtIPwsJv+Ibb1oeNb+PwIE44nRdgDYuIZS6hrYxdAyhE7wyUjLCv7fJRPLRBAmzQrGRbgk3ZU2f8lVzP1CqUJgdPWHJvQX3MUUgt6ehN+Pz2s02+WZOaN0dyqmWfbx9iPJGG8/Knlegex+pSJ4CRU5+uxJ6a+BZCclvbQE4nsB+OXrq/Hxn8TreGUw9oMJxCIRcV/KOTErmitwqupTSyjouqy7+YeBwFq/M3RbO26iJNSI/bCxANmf7TJf6goyu0+tUtmTvekN9mFTU1DLnkztFdPZi7GqnyfpE1z7b3R1i1kpv/lEdr4Z5cLxmO+XIHrjkDBtiv8jtMHgLFvvoLUPX5DKX0PG+qCJmWMTJbohbJg2CHY+GKXexnh0uXh+V46Kf/XklmnZBAei4oZL7BLzwptp1pCgaeqJrmmtbjcZa9d0kA5Qv/8/S4F2x3yOwdjCIOnctp1Hi9hjYctmA1tCZyHErY6M+wUOeXBLHIesfR0pb6R1uHA08ZYYMy7fKVrpWb/ewfkLVp10uFZ2Nj1PryCaQ+8A/99wGfRkEnRKBoSGlSNQSkf1YVQ7yGJt86k9o8dTISwOA2S9cKUP1FOMG2x5nKJguGKAulQytkNdlfoKarUa7Dyg2H9ms7RTOpgUFnfW4+0ZgWKFFMXI4VPmbIAugTZG05AHb0XyODP20VbdYJjY1uFHtcDxACk8t0HVWSwUl27EUuYeMBT07i0St3yQEf7C6MJ5em60mfgh0lh7VzAVEGxmlhdPkkSBXS7LS4vklPHPTp01NOo4nnzBB04ZVI85Y3rL5kuc/Et7VyMT1m/4bq8mWAEoia78RKW2F9N5Kcg8qEJZFKd1RTbvg4Be5DkL24AzrYLU9cIbe9gade8MaCeL2z98wmYit7wDR7QqAjktYt04fn+funJ0+gGPm/KCPOv6x1LKJWL308PjRgheFQGIPA13eyahmeoWwto8MAGUkuhbi9I4K1ccTkJ5or9U8h6qxobRwoiN2vDNazP6MAA+LuOUZmCeFmnkE4JORKNiBdU773wpKpYcUlA/z5WZi1IEXGt6ZtHfjSBTGwfRPL/oJqbM8cxOopSyi/tNTLNjaEygLsJ0c+XvUlmXgrrC948dHx1agtlFgtJrKbGknFZmXQp6Oxsbz6rZV6GFDB3V0QxFsuuz7bnxhV1r/Ru4w/zacUtdkyi7hdaHV4ufsOucyOg54yi5bTStomPXkIbmi5wq7J4AB715706e5W6lTnSSa3GIca8vVvJ6Rt0qHkTRuTCIaXR50m5xGZLc2qGJtou00Bhb9wk+6DOsXBfHdYX/ggREfavGm5eHvXjwuGHRfXxM34SjiI9rkKAjdcQET4nkCzzFXLcnN1ahqpPDmTizcdU2rUtQ87zKeHp+Xxz3hSOkpob8w67Px9WD0mqDS19p/Sgh1ITwz8fEedkWzehodNe7EG4zz/x4+3L+p5mTuMfNwd8nhbs4VwXYphwmCWq+mlJVJq5eUZNGYn+uUCJZwZ+Ur0fqeEYWQXD9gh84vyNfk8aYbYbGMWlLlijq3Oj6p15VoOYf6HWfVODwcocu1+OEHauMXy89rPLqHfwwL/T3VcsNkVZYXJry4nNn9c4DISbTVo8R7MUjrpqtxGC3sD1CW0x4i5IPZFuBJ+rc2eWmb+mZ7RjQJNLnQFc9fd3mGybEPmb/o47eI9ht6e9r9LaHJwZTW6Cf4X0fqy7mCL+Oi1vE9bWrYM+xi3evIPjQDVY5ii4XOo/Sbkv9rtUsoMn7nbHnnVqfcus3dMIIsiFf9vzWDRpzF0lLYlbN5hIx6P5SWli4jgEjrHlnUsPfolzRRQUDe/s16lVOVg3lA2RvgJZJ57ZbK+Vx4OaCn+huvZ5774wuhkm8MWfjejTu0+d37dEW8sTfU5O1uRfNQ5HbB2bJOr7psc3KXvu7hzrWnvn1ObFspslSf3aKGadidhJVNWMLJ297E/kVIGRrGwJa38czeDITrnDm3jXu1k2nVj23tADhdskD6HzQLgmbWWxNOh1IN2kjZICzgr+2P+hXyKOsK6UGevLr0vYZ3MsBlmzcdhigQ5VyYJY/SYO9EIRUgOIQCFDi91Q1cI0JmsFEwgOKplvjmw/Q4BgqbcyJFEPgSqGgTPHT6eUgblp3C5JcM68NDX+N2oC3ySI9R/5/p7eOxp1tCJWSeBHgb5GQpHL1Cd1QDyWPQD4zOSaViqmhOIB6aBlIyKJNznVAUokSmwqUFI4wwAFpGFaDFp8EqhpudBrhNiGKsP2AO5qlJJvXYNxZ+gakpWeuW2frkhe0dbbEX9wbmWglTQEiyPvrqhn/Ae4t2XXpVBu2W2pPR7KY8389Dkw/REUGLfGNVC8T1nJOql8qcl1J9xuDdmtOssiNuSqISS/HpOFuKjDURaa14DayHVxT4BMCUCxTcIoUxVHvPPpTndcla8sITpqeWsu3AsxMsU53UPkj0dQzk5wO+72/K4END761c1uhswRW8k6EyT4EhsbXmOBrhICrxjM4K2YKWNlI8BdiRnAs97yI7VU6UDyJP5zXAhuLCnVteaJndTZp0SERnqTWu80Ycgp4kxPUzvVV4BvGl2iqjKgMFBFVZN/HvO6+Jx6BF1b0EC1x6mHzBihDpi7U+nTe8/iD9ITjSHZ8z47AwMzZFHNbvi3Ew5Du8txyeVTVTwpR6zxuLbZh73dPMBBrRdUmnb1M9WZNO2+rSvJy/Qtb/BrwycDFHAsSzlyUpjcxQBVRpDl18gS8sV8JIrDbibjCv7HEajNsp95kIfGrZiWjmCDnftjdjkS+HOSacamqZT4n5HaJwKZx2xVzwnXJdoHuHcghyJ8YwemGCrnle4SxvpJ4KJxdHdiDZi98frdLC9Q4x2ykL6j9dCbEYdqs25vrCM8dG+j03aQTd+RHoShsnVzOYV/Hj0dGJWQwo9bEyneYcoJb/09t52soAFYkwAIArNBjZLR39OT18NucxKRFUD97MvY7Jr583lWyv4scPpcmyjd5X+sdwGgrJs8Ql15bWS3JEuswP/GAiLkVNvpUGBuQNCOdycGTydqWRVrKaCSfKkFT0NlJ5EsNju57TIQqLAtxUfA2xK2Rakm8K34RqM3DR5YMQguXrI4FRzPuZWBD3fO5dBLjGfUISsHHGbGH5wGoEbbwZ8LOpx8TlGNSSgQetLRIfo94WpmFlzj7ci+Q5Rl5gytJY2XgkC91ldh48TWeKo5CZHAvPLP5EABqBKz3Flc7n0AmbfpzWtuKgr5qnOZREuEsoSRU3mJ2bTr/lIoVLBPlMa5YLjyrITBZ4W++L15Y9yRe7uSunkqPuiE3r1oBRE78ywmeX452ZFeXRpFEG5MLdvir1+qZH5OIFJhAnf6NNkXegNuCPL71ZhV0EGundXApHgMi0huCVbd0U5VOwpQrQ0M8yTfbob3x9+Nm6OEld2eZGVJPHIWy2Gc89nxZ23CCskkX+LXfuS3AVCrNXCzpH/rtlEgXXwR/QPAOFAM1y51O99BgTLpPReCQ2oW1dsZ4ga6oAdURBjymgrk7fPc8TkRQFaoxqVjqaQe5WA/wDggk5L1OevLKWFbRMxA6yNeWBUxSgyu36flFGt/ihaY/jXmlQfbUNe3oSokt4qq5Nd+CO6aHWtHhdA48fHIdXYaZBmFhVQ6vYBZh7HvyC2bU6ltX8MLvo+ju9KsqIap+8tx8vQfeW/5JQl0GbZIFBdKZgZi7hknrEhAxghbaX+bYgNg/X58xTr6ygky4otjhwPk0xRnjY6aHki2jReXYCzmCLGkQWtVg86/UD+apry9uC26fPPumjloa+v5b7D3BZmg8/8vgoamn+DspIgbfk754DY+kEKt/YKjyJlDfDFOrvVGewXLrnuyDut8iDlYkqeZocBYVYmFtgDYhKQ1oUXgkuk4HKVHes3qmmulPYu3miX3UhyfUKCPIA7ozDamS571a/Tyeid+5v98SZRD8y0EFqf+HHRU2pNYwAF56JMARQHEMLEsxSiU83GQaAd+bgHkH3V+RYnCnEwouVjnxQ+YZw/NHwpizFqTwDXBRP48S1YBt5VhrFShVeVY3DDV9JNLv6lrVr/Y0ef8/kCwue1WLL892dVCws0eVjdUvH+hU4NnFNyCmm4ul2u9aTItJg5Q3PZJUWp4dj/G0VO/o8Gtka/A9XNEg1jX2VDI2txExHLPJX+y87pAEsosBZbmylojbTRvFvxB56NuO0KwKImv9PwM4Hx3paj/H2riK+gjE+EcVMsRcCU/N2NP65hS/WwLePc5ExmBSBmR7eNV/o3Pj3l0uZYw9b5RzSNJluiWxX214EsOXnQIfAGL28d/4/v/pye9BLQX9k5qJvbViH2OFuzyJnhqD+RzgRD2bXoMn+b42K359QbTVRicCZDC90cfWYJITxYTQYHJM5u3KPY1xHcL7f+5qRTCydz3pqs5siKzbbgHG21Gpa35NX/3odCa95YG+y07TTSQUMHeTL7vr3PsAXvlxqrHAzTQc+Fg3le5F/3aBI2/ReOqRHb/+/Nhq3pKqUe3REbf6kUapr4h2OMzKfCc8nxV4M7VwnO0R5vJdebW6OHM2uwkVIjHOOqw7rS/sbv8t97Qo/ZgNC88pTGEGqcnCB4j5gGHq76klI3p1wfxQfkntzIS8AiteIfR8BHMnz/XtT16dDkIGTCwzBLM+DmWbAwv1eLDDyaYeF76YqraQCziUbOTRtgU2BtxlZy7FOuAaYJ+n96RkI8MkOfnSHxuQ+FB8e+wp4SGFMOMyektDzn2nMG3xp0OVDVbsucOodDk9OfU4zRCY5/xr74G4YUB/pctlhIk/K3Os+vCgulIuqHg6Vb9y8HzwPYeCrjToOjb3vC8uGhYlwFfJ48ibY0aXNec098nTbdklT6fGmLmwhZnyRs986aCrN5hpgWI7PeAUJipsGRotGHe/mLXQrV9/Ubr5BQ9YDfn7k3PQfeS5w1ThWRag28r/zUtHDYpy2zf6wjOFq5RA8CNSTP3v1h0vI1fHijcHbzjoqDodVZUHxw97ZRNc+ydiB6WpAPD/xM+aQZMNpvY8eLWHTdJr5n0iRqBLT3FFxTjWLLY+79LsP0ZPWr436VQpKmajQdK4AoHzP9qiHiq2PYwsWEsuEhYEKR2EDnH19ieirirfbH4DxH1qGVLPDOeP9myGe7x4Wcyy2pGRk6pR15UimNkuaNHej07kgPt7WVETxnPASuoDg/R7Z4XkJnT7HrAC8bvmaL/SNV4od9NIGPs8RVMzHPaFUqCeDCJc5YRuDidcOgHc60GHAsQcHYmlkDN8HmmLz122IsKH7SInDQHK8TmdfP05q0PxzhdE0TUCvyGDvWX9Ngrz5Swa1dPlsI6+L5FQhktg55MWjbhRKbDVyp8x+b/UhqQBw0pzIsBonHjEbYQnwz/oF/MKqG5oA2g0M+sQushP0ap5/VokLfjnBuECJcXXkwFsie2H9XhyAPJP/aMhjc6nAHZUGWBdkdaLO/hEmHNYvNiTXh75owhYqsh+wDs8lNV+Nv1a5eCAA5pxg7SVoVpaGlcRGo7qbtQ9z9TmYnT1VTKz9R20DsLLxs8LUHGy4CBz6hz3jj2mclKHyxc+D/0gYVRXc6cbBhKVQ1Bo2RX8mnYyzDg71KiD952Xs7YmJqq8hw/+F2EhPzBfPuaPemv5cLwAmbWSHhst1eP8bse5DXklbzU5C3wsR0GLGXOu/SvEyb55xm2jbvJUeNMy27j05e3YlwegxD5yXaUtobD3kzl6/spovU+OHcLRUx0r8BGguGdDG8A5D+d4BYx+ycD7Xx0yYh4VijYFPM8u/EZ/2MpAQ7Xx1RzCRDd9NUN4y8A/hkPyBhGdM+i90flmnlBvX+p+ENpuGsff11XZoICqfzEAwpbi6/HJ6FoitVRSPhBLJv2f3DTCrM9frF7fIvZ2BaN3+7kT/9wH2yKFKfsFCbVj8iO081KZmZHq3OSBEvbciVPsIWLu+BcOqGo3BUZb2k0P0/ngpmkB9QS5Cnh/rBmhVX3oZT/bAuIivNUHbkMEJlu6yS43dO0NRYbtNPWpEfm1yFho93wCJaJINVfNWclhTCrUQ8lWd3OsQvyKC9jFPUMrNo1l5KgoI2DoMGsRBnq3Jz8TdiOhFoe9O07n3f1jxD0N1phSBTyP4xIFNKqq8PrLFTtdTEtwZGZaWtssXVtB3u5ynvDwpLRArbMgSVfDCoXWBpid3Wpdc4Cv+v4CzC5TceUGuNcJckezwa3uWLNqlm8jEgNJVBH2E5M3CWClmX+QinKvLPdJ9KidxVucZXsngP2sHpj910GXOt0YoatgOS/S0gZLAd+tMIYTb/FQxo7Hpmaycz/4ct8yfogKJicQ+LYpDD7AaEXi3qksTMkruf8h2wAtgTNwg2imhy6vu5c9YdjKz8YdoEy2Q/nXgrj/BuCP+F1tT63QvoENrZWMtoElMTqvuVtQcSOJQ1kcZGkvGOmkbHtGS7wlO4bsf2RfTpOTC475nXevUUh6MLrilGcvZSr2lgRcK4rfisDuBfihhhPDtluHT4XsTFLQOEPxC4+cyU5eQaGRXoLrl7RzGx6/WaaJkRFuzuUHhHsMo1i8vD1wnGx1pBR4J04kTM4KZWUpLrsUGaQJJO5X6C+JSqyR6VoodZS4+LaAhG4CJ8SxDdClHgsuE65+LohswN+8FcPyu/qJXoz8imFhUDMLVoEewvCXteiEKNLVGMlHRitjGoN3SEWnLr2p0UkqWv7jusE7DORArL+F2SLj/FKXY/wlADfwGkthaPXJ4PdHap09yWIVJYo2agsJPug7T01GKsER97//WNCmvxgCiO+suxsVLhxBCUXqigoj9bfTTinZ13DACXcelFHgdFhNU/7haj63uBlaocpLeoyNDpDje0zSjj79cLEe0RO1eXt/wMJcjuE8UjFHiR2P516tkh5H2Y6B/snfSdkdTk6R/BYud0RKfHtMmxX6D7urCs9pjXG+Ltg62WR8+EriqSr+Z7eaLhXbYLlg+pNR40pAXkKxAV4fy+T//i48033zi3zHaxPOOYVqT567lpuxOsQbMYcuUppxhprTZqkuI8H+6HURfQRZX8/COpS7r5BK/sJZdnt5TKF4wzCyVeo7Gv1PIhPs5ly2brU/f9nToC9v0yddcPGIRxjKtKxPOVNVMVMt4ZQccwzRmbjEypSKbQn3TGll6+yuYIkVXBU6DAvsdb64RZu8CknLMABljqL280I6hP0KQUqMKvjIgCtYihHrZTvxQsDHGdFkgBmfDqR/YpTXGthOlOfBfnxGnt/jmCP/oc05TmFBxzJ/4J0nc/FySz3ExpbPjpDtQapyc3msK9c9snzI5nS/2UdxzbWggPvVLZgBsS3oarL64wPwjGx/avQUW6CE9uR0wdYacQlgFZrjky9KBR0twBV2Ul/oFh1MAAACmcqBk9cR3Tqa+kWVB1532At56s/22gbhriYh2SdRrR3w58PS0jDueZyfkPsxiodyRHfPfp3n7vSrx7rxrjgZhoeLQNonvcKbxBKHjdS4zFEz7zNRaPwdLAmziG0h7b7QUWcb+8/fafa9GG4MP51/2pXGPoBMCMXmPeqssqF/7/dT6MKQh28j+FfH1RAoACEDGx2mAoGJfE+DdP9u0ljzJv3ea7IFjOc8c3b8nwEYST/XHOcJJYjiRlPw5X/RvPvwT6OvQQcgHxddC/pnRswzdBhDrgnoljz7IKc835ow5eTSOsOwjauP75onEH+cxJFUoINjHWR0MnIKJzKZdpbaOovP73QOuZooD1t1o4TwaYXSevI6LWkBRhJxBxHnhihZBJdnGLSYKsnFQbCO6lA/ehJHUI449InWpqX7CK9Z60yt9sAI1eKjirl7Jxh8+nEmohVtgKoIJCbOO59THgxLwjdLCFwp+dpwukA1nJsSUGvz2PcSDnye35RHvAVKxZcfhN1+1Mip+aFvPY8jhynm31BFllEinM2wAN4GTnoV/f+8QM2Mn04lR+UyjhMzhPWM4I8nUWi+cHxcx2yA4cvP9UCIi0hahYy+SWjoQFqeMxKuib9DvxJ5zp2tW2SCCuOZc3X3PuEbm910BdeCkw9uvJIorU16na/GT1tAcs6h8Z+3d+PAoVZjivaOHSJdF/nKM/PHBJVhddgSFx1jBsCYD4fIujQug56OkElDzqh91HSDDjuyYMFfmyQgStMuUFCWsF7ymxneMeGjbb82QRrje/8e1FhN9R3tE3tpXtNSJjV/EKQ60YqiTbXrwk152CLdsQ/qS9ksQYG/TMP1BeXl/N+1wwe0YDqMyPxcxv0oUaIG7XAWPH77zEan4q7kE39SA4iQIReBchD7tbHh0TnIx20gt/A32PY94TkJN9HtkNhpDAYThOme+BzBkEemHNem+RsQaqRnu18Bwdzf1rXvnURlds5ZwQTHohs+eZ/9B5f5PK/oioPYiRtr/VsKZ7RR7r9cTYlRa+V/nlxFnIRx5+mUkdTJmQpjM0Hn2xf5aNuOz4jF6+lcMFTxhbC7KWE3QhbJKLu4BSvWxyvVJ+G58Rxn4w22NKJb4b+ieKiuXhEy2/+x3I7osTcynblO2gSnFs8YWBUUozs6zlLnpud/DRejC3FH4RXkM9LC79iYv+rfcxgbuKKy/Dql0HNWOGP+W44UR35OUXSlN4SCQjUq/hBriSDzfvbcGc2lzWnu12LKmdbHRJfWF2WFStbTJHNXfc6ZAPKM6z86cDn8bKK8p5ZrmklpLlC5lbqFehIf1mgnl3/kmOZXT0WySlDoTN9Jv1BtIKbn07Omu5SXfl579UiGiTtco26a0TRGTpk6Q57+c06gqxiX/icZgXJ0xrcdxkpkvYBNTaSV8pFCXWjfX7AyeqODiqLUSNwL6LfDbj/4/klIAkSl9gKUsad8s6bkD4uQKgt+a5tiH6mU99yWQCblAjV7Hy8jLltq1v1eRiag/DQHLVofCP2n47BZ4NAFRg/vytNNYNtrO3nIbpwMCrF3f7fbPwZ/69NzuWDJX7fo/psOr0iGK48khscer8d8nD0pE1alwryktWRCr/9hhO9/pTPROIALH3A6HxF/v5vMYAvUt5BDtef5QAQfEoA9Fwqq0usr69eSsFYZRxNhDyctep4l+x4WYKJuKR4GBmrSSYeinDPh1Kg3hJXjFef9HdQJmF52vyqy8NTDDgWtzLtl1CP+3mThNtN8l2oNvKjP5Gwx8hnf1l74ZEHiq6Mq3PtbCx2zz/fq6pZZuEGbFTRrG2pcczjWg2mwzfuEQG4XGtt/7ApCp+TVdWHey5uLlqdkeq3sZWroYOdEy+ekxr8uCe5ExwPSDBmO7q9tkhcfLEFlpLz6b7c5o5GGbTVKhWTkVQq147eEjufwtmHs+4k1/7KiMO7fQYDk+GeKxeM/ddpLbdPxL1+FZSd1L1fnavzMmkZ81w3iNtBAAQYzUTMwvqRlSJwlr2AH6SW31rRtFTpMqOmOrJ3tC64R+Mj1obRbTo0KWhVR/VK7EZpBCvxkfWRN7qLfDCyAXvNZyQog5yBZvr4DzlLYqHsLt2YW6OZj3zT2Tusgqx3B4MJVruWAhPHXKW3W1RrW9VjHdbLDiacJYLByqppnZ86eRU7qS1pGs4huvl71BOvi+s505uOMaYM/bJsyRJHhJ7wJQ/cAsKCvltW63Gh4v18hG6UfOK63umSycjpNNfc2QdvPjdzOvVjtac+zxiwxtD49Th4b+e2nW9Pi+qGmZTU+S058O/iQrlyTKzxCdPvTGFIvXXiOY+BuRqsrafxfsA6UPKOkcHrs9ymL0LrpvZqpn3LORSup9KkFQvFRaH43ZLwsbiN8kSwh1+eRxktpkD/RRUH/xIUDy6vLzgK9ePodfW7NikjmH45Jqjf7GrF8Kl5+ZbLtwaki0Ie4gf610rT5N9DL8ZytcUmIy+at39qbv9rxhvw3ByRRkvX+lrwXQc3CxLrKsqWrNyL0z3nAMb0vd/1Hje9ByuWfL9EoomzIuHK4M/vVDYdITr35zYGzh/d3n06QHBsxQnz9IfELPnmh9aXnzNReg1soepAYxTlgR1rPcMUi6LuKtY6MvUl8pSalGfHUnSfGF3t28W26hEgIf/BEW6lwlx/0s41enHSvb5+4zHVPPxroPGZWfHoXBZkR2jEVi95CJB+H0ZRBqw1+W14ntYlpOAc/3f5pC6GGNK22CzJrifMsh81xdeR3tXTl2wyKi/ViubWOHxDDAGm+4Ae2BH22X81hCgHWqitNriUjypUgakXY5Xp28yVHZ1XeifHm0GT9ZpZy6KeLETqik/DlzmjI/TsUgdtaJ4dyfu+0syfGBPh2Y+3JY4EXF/7AqYtOo5DXKRk6rKghzcZswROCRbl4ErkmPVCnmMDoziSO6apgBLjO1Do+5nz+I937BQiOb/g4AFpDBsE7KAaSyK/MvKPfkmERF+MWUOlEAn/hpVRVGYsbITqPqn/JmfnaBBXpnDfhySu1uvEZTE4quS5hPwqJ8LUU0sT9afqF3RdFWfvfsCJ2vbu9klxwY3md6yqNpMqx25gFJGeRnw+p2ui8XqoT6n5eNIx8qv7UQG0BDrLWdjrRgGHob1aF16fLFwUCSUJDfx3GUWB2UhZRe1Np2ekQ289+LVK6yDQ1E52DeKGtTf3fR9vWRf19W198tMsc7VCg6OdlZbTYSeUApK9AzHHK5K4X9NcUfZT47CmhG3jXdY2RmB0kBzAfEuRmjwytAanQXrJCLSxDbzgEnSOP7g9YP2IvTD+uyhab9VYddEyl214rXgrOzuS2WqjENO1i8BTCz3+qK49XC2Eg2Y8KNmx0St0tyu5lzwCHI5NsakqnbydN4LXcC3T8/iXxyZP2pDu3pm658zAGjFgfoF3D7qp1BN/h4FUzFnS8mkwKK4olGjwFCJQXQL8rAPld1+lGCPolWtlqaW7zoe6/F2H+KpWAoDRvuU+1e0yyLMQOt0NIyTkfB+aOOwqXCbnUQqKSH673lxSmBIqfSeh+3cRfZ2THrvRGFdJ46fsyjO+IIRwnqZhhmC0GZOJDZSPcrB/OYjWxGf9unv7vLCj4I+9rYUXtLpo4XpNu2jCB71ELCIDMiNW/iVACm1UJ/xDuHUslwZltmB7O1AW81c//NEv5ujE9mY0c2/yjnmwX4AAFWUwbovTW2w7/OjZhPLr8fUrX/Qc2nijNhwJx52FWLpQH3L5+/X3O3U4TsC0JJ/tk0H4PF+eDUkpaUT4s42rIR0PcFWq2i6yjLcL6qv5dqMK4cPw4Df5mQtyp2KQ1jMqk/BtioMJF5hDfNdepx232qHmtd/n52mfRJe9MVyCqYCurmzXFyhMccTstvBG5OK8m6xkfqztzfe/OafxMbmaaZCPziyrdm5kIszsg1Y0oCLrf7YPVcHLaLmcb2GkSJ1AWHOC0yz4ZheG+RIO0sery1GeklbgfP4iDBytUhLIHcAkGS+hCV2zvKJ4Bt2tKBS7qG8KNavL5beDrnwl7nLna4L7BJEY5tHsmecj7pws6p+9jz22Fhx46BNq8/lIPKjQI/qfNnTCtuKaNJGGaNeHR2oK/uPCRdcoiP7Pna0dodEcqCjzJd4DQ0PvqiSqyO0ZXOSlqoCJ8427lQ185itCsZ/FK6gOJ3ufgKyXaBgCUV7cGTN9nA6hP45J9/AdpyYbiMYtftKudCKBiji8bFbjzrwfIm0LEvol61IsvL43jn6USnxnh8D7cjjlfQN2m7Xm1lSFEX71inZ+BiR0X/McHQLY2UWIkOl69aYSSeGEjKBrJS4t+kfzMGpvtRsMrAzsJhJjPGvVA1rqSn+rjLej3Z1XZuUUYmTJcIK8r5SW9O2x4BE7EH70mb4ZLYEedppT8OT9yFVwMETbYu0vkOJE4H0uNcZ8wvrfEQWsINu+Dly9d5guU3gyy0hsac8DcyluY3LQ7+b5QGsnOG1vYe/jbKeQIgOGeLGgeZ/h3jyoflkUbpjohumtFBM8g5AvH0I93uMtEhQdoR8e3tY5LHGVHs/OTsqrFd3k+k3gTA6UbL9E7O03V67SKAVBJxz6nqLBjSesRB93LuRtc1pf8NkwRZMQZ7GMjuhulbEtTYyjVaLByaO5h7kT7nlEeWUgpjnpbGlcDyZ7Yk9Wz86CkoeiRWaKyjptUMa9OwVDuKpkyxaXvFQQGitCP6okX5InGGyxQctqM4AQQQkO9PnIheDxdx3kNjOxHZpDN5ObdZ7lDIpVwyrFwlBQGSCT9itoq2TASv+JeKhPrcvXC1deWexUX4oMV8ZLNDtyvRKL+ED7Eo7EZftK/75utnyqITFE42jH6RZFV8NWLPSnPP+GZIf00Jq5F+GHYUQAQlS/bpqIQPD5WRLOQFSeVgIE+fIuhGajr2mJfBVeuULJ0XuHW4BOz0QJr8i2lyybjm/iK3yyNY7FdDTzDHX9noja6jnEIxocedT5X0B9eLlF1sN+OTHSaJkuIxUYcTKyzP5flPXja7qJgVplia1DiaskHXhMjGbGBY6j06Ao4jJeQbafQXje2XW+XlI3Y/W/iYQeOXx5cClnJQmC28srvxBdniIwAuU5YvEKsJ182CWunXwSJnmZ1/pf7rPQpc++I20xBRVjfpTvB/j9GqIT8EAFn/kGEUj9OZggi5JIfaudlJ4iJ0cIze0p6UB/7TIT6MHeEAIyeueyK4OIXq8kBXSMgG0/GDMLLzFrDaCNbP1XvExKN+Rr0trGt9/kab/pz1PzvKyYc8YcDAMB8jrr4+t6RUcIKTvB5kbJx+IhohoA9PNYpX01emmL5LIWZFy3gi6I3fV1fVkwXXkfOtF80mBsMKIJ8Xbt897tG+anQyHHZdjQ2tsdFWxlJruXO3m20j5h4UzzLXJ+ry68/WNhfY1mnlsnF81MH1bjfFq76wCwL98d1HMERICMy2RxL/mKeV29/Hqs3zYNut7tiFU5wMQj+YPqCKhqBI5oy2IEHoOe94SDgAWlTRFMGe9sntwEzpOYCtsfaCOW3SHxukOlNS13FvJFhFm+osz+g6gSpPz0XvrPLJfdIX3qccYdvB6Iv43ybMWOsJqEKkwuzDenj2EBySHdW7FDkyVTT75e83B2U01uBfbqRZeYLKp4WCMb6Yy54BSB+EV4R7i34t3FFNnjxIcp3bA08EraBH6wc+w/nCiOcWJTlDIaRWIaAGEisThQiW7fYiNBn1pvS3Fu6fAkEubzl/Th37mLM2ox8IeJEqnBA/OJUog7fwLTUYXlWmOs4Vd5meEPEzT/U/TziB5vJ/uHeJEHqggAV8Gh2CvzOGUNJyPZEDnrNfdcU3xpYvlmE1ZblPsVU9XspkXNOb/3diMx9qRW238Vc1S4tHhpIns+12C8S0hIJegPoestyp3tnb96fG5gD/EZsYdVueTgIeR8soaiDqixZ8lMZwSEUEeqkuzZkafnjPXNvhzF2zIOkms1rkkt9EYymZp5RR1LkKq1QewftbtjH0sQnODc02eeDBuCWrMxhmL2a1laXlh/kuGsDlLxJHDMxgYhUQRyjhNP8+7LQmIB0Jo5oKoyAK888pavxrPzsbaovYqFUZCIB1ios9zAqaoXPO92lrFCiYLDBpgPKB7+7bXf3iIWZUE42+x3wNVB+uuStJWhLt5Wl1mBMa6JkQAJGbCws69kon1eMJ8paoHfBALLmN8IB+c7zwT7JxBhQBzPmJb/FReQMHcs2VXH2qKKwrqPwIM4mpptxcpuQmqnGweYmAe2KXUhxZYSSSkw78pLdYq/0iilGkUvy/NZRK94tNB2JOofJIzNmofxx6cWOwLNul4iVRfu4qdTPbIWMcyQ5TP1Zky2yh6aM5DSSVupjs9vLmNEFz2Y+pIlq/0fNM7mv1TABs/CyjpZ+pI1KNtQYd76mU2l8mGx0wYg6t5X1KUwKS36iy26xUVql2+YrDb9F1gzuxesur3+PMyZCwfY7sKw2hwRZYvhW84ISTDAh533YwDnnt1aPsbXKzkpo4eCzItYs7mNIi+0R5lKxDHS1iPHptLOgUbmH5e7agNtaMH1AyQUB/G61+JvelIrAywCmievP8yOgOpOXRgzqaTGrCnnuSKBHStrMDyA9HXdNngf3A/8awITWh/R+c/454yhzDKGEHkpDl8pHpXkyb0ukmjncmgUjtyjJawWQoR1P13AGXJTP2ZJdOQojdPvpFfw2Dp/bXgHYP5MdNXk1TDAJafED2sLsj/lw0tF/05wu4JYfe0k/tG4CJn7SKAtG4BQhjeX5qIXDfAMLYCMDTR2nVU/uywP2+U/PHY7jIVPKc8XeMmwfRDLbnVuGKlGkO6h0rkU3D33UgePRfL0w5ZYGZRr2tyQzns8Bocv6so2UBqwWKb0IJcoX4oP+LI07K4X6QxTbk9ysnuuUecZUUwmCo8BjTN7EwhyKwJNylXiDdelYpcWbY6Pf+DWrO85+L/lwi24xvAJy2OnokJLAAOjzC7cDnCcyU2lFxF48zQqTNnYbBQAkuRDRREakpeQRcm9dX6T7okJuqBrTdGyd5VboOF9XgiieFX/EfpN/r4xWqmoAdZfodaKnoM1mkUAs9ruZ3No2dX7P8tDF2MlYGm99W2qMZy/LopUSrabcZcXT6KHOPZUoojFu7i1Ezsz/duK+khGoZtYBgQMuceXxOUmzYp07Sl2aYWuD822eTo+xNbmLLAy/Tnw1vpNtNLQe3RuBbk3Rfb28Pi0qU7Yx+BR49NRbBlKGTnUqVOKDr/2pqSeU/Om7Hc3WtsirgiPBkkNekEUz9t+aQaWUiFWHZOtalLWnKzX+LRPskkdCBdnBMIsGaedY1wRNGw1wN+wP9btY1pm+lCMwlDRKt3nfXCuwyDwNfDzGfDhwu5jSJqygL9UGPECzdjr6as/ZkY1Vc7YOjwf5K7wzwg3ma41txcJ1VkhmFflBAPfFNVkGZYGKS19YgHjGUR/0hka/FzaHW2lf32UfAPGmbKmtMV9GGpij6aYY4mlE6mlSYeghYI0GHXJesPITJgsd6oHaNJli4UTTVUnTO6LTm9T3l1OwbHzR2dkkc1AELOar3TcjAEcBzqNvYZZ9GozlqNe/qPy+3JmxCV7Ub2SwkjCbtChCybeh3iE3i0o+G+AytnQYZJ4e/2Mjs6A/Egh+zHUhhUf3tGhnTMc4I5yviIZFLufNNK921EZSF94Y/9jMV0j/JjssLJIFDfmzvNW2thLqJj3U3tfIrjUVY4TTzkazyXaNJusqo3JqPSITnvT+M+0bsOV3VKdSuugLwDZC5dScZPGXgr6Kd4XV3syzgIB8vhubX8Ro7GFuShpUwUNyMv09xLxjIw0kuh4cgTw9kCOWM+N5EsdG2d5q1LA/CgYaZddCS1wWkkz3hOG7ac9XB2RpKe2xAHw7rgXBK2tkMG06qfkmK+DoVShcLd1F6FBmFJ6vBfHYutGyfAkY/ndfPfcOaV5RhtkP1HYgvD15/dQZo1/6kjdxgiJpYDw2SSD1/LlPf4ffesFRiqQoxGR7KHjQfDtZ1GpthgwxXzaAsFRC2qy/La6tfxwroICoJquYtNR7ooYIWSrkHtst9sLXigV+M6IGIzwMVWZxY2HeTfscUXlCZhDEF6kWlJNK5Qi3+wDHYO8ibE27pxOXtaHHlK4tfasr2aIRuDhbXdrnT5NtRY+eM1+RMNr+qSkQgYbwEbfHUG9NjQt9ks8GeAyCvrCPupghJgXLqx1ml3y4oeC1Rlv3qJt4S35wjPpOS+LY9/YzIJxQCO53d18kyZ8ANQPuw1ZZdCbDqhGq1ntDmk781C3QkyU9A0/kqHoxy6AoNmGL5f4ikbXYg4BeV38MUcjJEBYjb8ujqfQBT49371UtZiMLFIPkx3gHv9ZHBR2Vvpak9Qim1f7ohnoKB9VqmerNR7QmyUsE35Py8f/AVa0zdWoGNcO59AAUPfOf3YqNpb8Q56uPxywiqMwn3BftqsRpXBGjml4Wa576/Batdxg3OK0vq3V+5X+l3DteGxIz/Giw09KsSMNxMTynFmWn9DDOYIB9mnZxrA22wrBX8vVvrzowt7t4+NLAjc+02BdrYAitSJBLkLTXDxY5Cb2eY2tEHIk+3TzC2zPbrAviE5t+OoAX8rrkSIEC79f+mKPy5p2mhXxOHTWtMOrJhinM7hzsgQs0UTb3penrilVVLiC1FoSdnU/TNd9sn5cNqfrontttuJbX50ekjuPVnscpZa1VF/0TAwChp/cxWRokBqTJ9DOokpn0l/o/pwsnRkFaI5T1aHhcs4RLiR5MTS3ddmKM6zeONn2qIZK0AmU/ipq1nRik2yor3VrzNOQFDofrkrSahqI0eIfBiafYoZgyDT9FlUJ6cum7VNqYYsXcM6eNJswVN0wpgtjSEySxjyWfsA+2jd8oIATDqd+9Ixk0XsbO2JEG2D60lIymjDcDZq025AFvI21JGPQas1fmKObZveFDk2fVV0YzHVyp/9oI5igy0udtV62IfIGli/G4gwhQZKz/eKWDNvUO+qNWx4sWmx4Rcgh4h0IylLKGa5LrfDBGvEclgdU8mFffZJ2V7JPsbeqSolPME15LpVTEG03DpGUminG2/eORyw86ujOVjh4jlCo/SoZHdhVEe7IKsHEq6EMKg8hZVo/+rtSjSUsaGwxkM64MXfsoLLOqAKvM+J1f8Kj/6CrB99rpr8PKDekEWRgHJGj4IIcTZE/8tLSZzkDGPxZZ4wIyiXj529tRQJe9wKWWxlLWFIUW6JbsVUOUzynCsCMoANyHkExU14dVf/sNRJZ1vBktBIk8B6dmV9/Ab2bnnAkcWHokqyI56/rb5X/tdSZ5HtSeiaWS/sntbEP2jxz00TylBBotcdiTTc/LNlzis0fbFV7DVENDiTVib53vDYgt9bsiqZSUMrAt2FCN8l9EGgkOlyNOhvN1PHcV3cAWQvAzbV5t9QEEUULRxXZwFYajrHSMb6bw4yYvJhW4GbArnawDZqkcf58SLaAF65stBRq8OFmIHpgYc0WNZqA2B0FoEBb1UOGn6ZTFAMdn5k9hsjun9zsCvVJLzKDzHul4P+HB0WbSkAFnP7vOYzhsiImZpPnD/myejgydIh/ImrCa+f8zArh8n1nr+3aHNx+5I/8xIZyHBh9Jnb2Wez4kQJ8AiHIqhS5ECNXeBDxhSB8gPN+9pgP03dPjLbatgyo2w8sRa+U1KcMumA3MBh3QdSxVBd1yS81AhRjVRTOAyY/7tgR0jqFhaeOZ+avCgrDPkspi71+ZDpHdYEGOf8woG+AJovok0dSd+zJTqyyjG2nVs/N+5tKQxK/2qGrjNrG8MRZv6hBvCm/QS6PXPvsAm2wHV7o+e9xtgnKZaVOquCD40hOLf3fphQgHWBbxjcnnJSZIC+EG2TPyEsFqNK6GlOvu2QUSGNVljjxdcI2DI1baZ3dOm6Q9jhpK7hiGfbDideb5nb69b5UIoKK8TZSiUO+wRlgS19+mxG/bYgwqLexDOxprG1eyjbjyElImNtrh/+B8LX/BmYPTVc4AiIu2IlysluVcifUiIevOzKhSFXkyyXnfjSI5eGOvxRDkF/Hl9GaHvP9/WbVxdgRGIyKmzyNK4/pOJOwZJM1YxlMSUWdPJg9camu3plcJO6ESL4C5X5txDjLPPggHcFdJm7Ne717rR34gGT6I4r9yddBimKu5HFzdxNNQF1vBxoL+hyMiTcb512HX1y1aDNtUYk0dq6PggfoVxaFiewTQdBjT4NtFUSM0mVmy5oVf1UBOdV52fs1A2c8O/E8Vt5DTvrSZay+im5gzvcMAt8hWxOYzOF17zGG4atc78RBLQXCSGL5Y5piO4kqo0kJzJiKWMINrbnQ6zBAZS62yQxN7YakMUU/ygcpqWcVkRYaXPHmtWa/PBqrwNBLOmjwIslqGuFTZENKM+nhcg0q4taLyfOuIvFgtr5JH6C4Ctxv3Egn8LYmiLuWfY//4FbqZroASaIs+bUFbbW4fr4HJfY2NIJHWJ5uscwZ2cvfBYqwdjBcbwiA9wnqA8OMgfLkkZrFzHmMRd8GyU4+jTEKg4fWTSDZuhSFt00vOCv+BywdIJ6k+Pwe1istzx50Lnbfm+/UilXODFB6P/SH98SS+ixBE1m92AxKnTPQhWRNGS230PbrJe30pRg2kL08x4lVmX17ZKFEtshhgPybkjQVtb4DZ5NzzC5TjziUljAloH0k4CD2pq1J6aTbp3DtpcI9Tj1m1CQgp86u6g3gRn2IQ6HWgRzUJmgewBLWuzzfwcFgPrkP34dY0HGQIEIt0Rtrn/hrDWD/8xqigWqOneDczMf4qUnK0cmwVfKeluS2+V6wyrhY+5FfmrI6kooKrb8q00tpvyrgb1R/k6bVhFEysNCgDT/4CynuCmm+hH/579/bCueYHElddM2RTKgzYsSm4EqeIB/4c1T4NkxMYH2DcuMKJlbesVjJpyOP6EG6uGJeBXvEF+tgpMDLOE4KIU33pNi3vaaD1FbNa3Ogx2EflPEseq/yKfXoYLBmeoED3zYPLeQiF13RuySwmefAzYVouMqyHKqmOpwVtgW7Gq6y+yNLzg/nSzNWr5Rvw5RVvN0rPIktnz3u+zwbf+6n7GVcQIyvwqXHhP3RcSRNp3yZoQonsG9jonVDX7ssSB++Hj4Cte/RylKXlu3MYEWul24C+UntCiDXMEcGX+yNAv6TzeznSrrF9KbIeCSLhTkiBesJwHlsQ5OhZMb+Egt9VChg2jsJd1NzDNZdlQDf/pBNPqGxangRRXUnyzzwHiJunBR61LRkun6ZxlrOhBWImTBb4bWBpPt0nscV21LxfOdrgWdFOipU/Toz1UJgwHjhJRCEQ8AxxdhRxbaJNDyK3K+UM5py7rwSBI6njWOtKOUry4PiPKWvWPIxHgZuIB1ZYqp9Yic/BeZviBBcdhSdKSSeDeVYxMOQYP1LIZTBrlbF/m3mmHFvBuN1Z/hDvdPglDQqyGAznEgluSDO/+MEl5fSf81X3W1a0ZeiwjY3rQFHH3UmbhaPLzI2k+8pvZFKOdj2yuvB6NcEiih7sQIrTn9jYMURUNbWbbUQBnvnMHTaHCe8OQg242nHGiRHbRFWa+A4uPV2rYAAAAAhSwbdzEJo/o1lUV9cSuj/gKFroHtTYjjLWpnY8Xt5+4Vv+tLSs0q4CXsaUB0alPqM86kN1NFCO3FS5YeUShi5xkQ5E5FNocTX+ePdf7PxUO1jPuC10Yiu61nvT+CSFTyGlWfJEfy/TkKJu1XL6jbBs0ts+IVigHbiQF3pgmiRaJ455V2d40IrWvvibph5SzYZh5C0Rwp3uRctIrLG+kr7yK/MQkkH3wnVNadcHd0JeLUlLOXp3SYQPXQ54ON6vxheQCKIdWJKUxbzB1TgfAPEWFQjIVehnhcUVSiaxq4QdC+YBskP7lAsCOy4jqByMGDV0BPu/bQgQCHffweiZMC1oewuFBqSUJc0rcrOMiR+lbFVIOEw2KjdQjQFz0pkVGJ4XyAurlzayuifyLaseShzLjOc2CCrztziSqNZHSZ4HIVRI52IEoGiEhszhF7SprHm4HvRk9lrJM5+XscbFzWswm+utHLlyY9VGpR1lw6CjkWZl7o3o7rg35HX9JDaPw0uhxZEILunY2Qgz1WMa3rntuEJy0Scge5E2UUFXPGYO3Qns04NF753Ckmom+cuE6dBXWTc2WJJPDi/UsMR0cKTkrXWW4Hpk/qy29Ger54h+SlvYK1w/x7qkvbi1NcXzdxQogXBVbZZR0lEO4ghGa2SeMmYypaOcJwY5h+hNKtF55usSKqmneXB9nRaAPT4JZCnTFUeCVwMPxqLoHQOmkCCs57u6h1GaveYAegjp7/pWHaEw7h7oFylSXYrCkQjpvaUIqk8WeDrrd730ZAph7IegzbqbQ9lPUe0Yj6nnwvSgTnomeicNDrnPoOSgFIJeJnlggtPOTotmmb0gEJeckcVcqBhpcVZlboRGzYm8AG2/Pri3cDenA9ASn+Sap0BK0W2YRNfb5BXfn3UEkzwwQkO1w88AGLWYVihLf2gGEO15cmO06zEEuvME5uGbbXLyQj6smRzsUhfMkiaCnStmowKy0AHsmPHK+zxbbXcTV7IqarfyQ21IE8sVxtUCQuTJXu4Eaw77X56Aot/uBkCS9ZxTHuEhXDArgrq2Nbv8OsBhleyqqDxyMPCG1yGdhDnHYujXhUYFml6fHYx2S36s6o1PaJhvZuxiguy6lwwB8JLB/oXgG/FhMRRTbgymPRg0JboySdTE1aUgfARkHlMfs1ZeGelXn6S0YIOE15ViZfhFL+Ne/ljKlNR2w0LlUEzKUC63lSLWRLXmZks24xkSELP0PREigBVqB3SUqRNp0ZqIF//edukYMFpySee3YJKgnqgJTdXGNfzJg+brDN61Tmnml28hFaFlzvNrRk4Kc0J3iCtwZqU3h3Et3XARo3ByC8AwWFaD2I2+tE0S3xaKvmQmlqYz3l/XMhVjMW5kC0iU5+xwGXtrFordkouEKzot7fHpzYWGyBdBFEPm8hXOw4gd+F8nknr6h5bIE28pzlc2omL2t+9+Ha+Lt/LI5U59A4accWw+ap9vY67xgKqaT2gzXYDqAsnSuPQOB60TcIOKZ6OGFy0DfqiYZr2OvoGG0v9J76H3KnpDUJEv30GL5vV70tWjLpcq5nM3xTE7XYd0Ze07sF3G0GGwjx9a6/zOBHgW2ZshRlYSERg29NUkhvIwre7Pvanq4vHmYdKb58zcNDcNMz4iXrmY1DNIPI2u3oN1NZ+zkyZcfeXjirZWBTlNjW+7XHrTS6KVX+osKsGsFbAyJtafm0+e/wCo2/g9STWvL1L896a9HC1NsGUjCbCAV5Lp6ihQDvbws9PGzw4ko0DidjKMJq6a0JVqC0LSSopCeMfaudUIMimOPzG89MErBwEbr3+0zSzPor8Ur+NiE6dWcINoKo23nrgply4yD+vjm7+NOlj2ke56WIlXmUxI6YQM8CW4TIWi4T16aWTdHR9/VA+NVWa/h9mf+7p0GuMKCpiYDYNKtPn/Vc+YK3UF2aMZLVAKGitcbjYSIRi4CJHknkQgpNyYBH7NGnvUMe++72VYn7OkQZosjMroEXcwaB/7pZk4nduP6FOck8wRnDSvL6PHxfPIqGGcRgSn3VIoouQiVcERp8rnAVf+fdTeAs7V86h6Av/bU5MY066PKc0Fe2ohrCEUYyQ+mBt7CcRXlT6x14N/jCbYJT+KFuuOPuD4eyePPnrmpXHAD3v//m5WPknb3FuirwgjOdDRKU0cIa11+w484uncVf4IOR7JKtZS5iZvCWdYNwT+s0K5bHOxjjIQMygwUtgUgUhbfxsRMRcpauGdDJ1l+wgVYnt3BUozfmiKiEdWgc3d/Ux7IwYo/B3azepQ0AN1Wphy0qyGLZPHtd6qcYchNsJ+sF7nzA/LfSes/IQ9SwJAJwCBvkfV89pl1xY8lrw8MwbDGn68YJdqVXDksFAAMW/U31UBWsniER4q6m0G71DujxBNaZiglINYjTU/BLzLivF68y766efPraC2Fq0yzZuoABDEOVsQ//wEGJjus0naU4zUwy+VVG7nn3thqxfFA2A5wHGlPvGaSOp9hJeeHYk6w5f8t2mnPgjKbdahoVLEHae8FKimmW2SPDYoFzqdB9g2SUjpy4gFQ/nXHTtAKNLoAo5l+vcbWv9C8lkpg1iAG8KfA8E5KmukmY1z3lQx/sm1m0KX3H0JTrPNJa5sP/HjWPKnYI03+wf6o9mmosenZJoExvFvAf/OXnGFHtMgUbH/L85eKwYGpcw462VcxPDgP0jKbpNwpYaY+lV3UajjeLTKLcXCAiWyjOZuYEynKG2mMumODmnZU3oqDWcAXb1o6maTR5ViiepZc13q22xTck36C79w24+vuRRI3HahFwENZADd0+IiucOXv3VZZNy5TGLbDLOtMvu8uwC3ctQ4dtSpzY6btFsvK75TlMzFn7uBGJZgPlL/18RuVFlxTW/1eXhavMvsOwI+G5QF8fKO8pTLMkDdN0eXfMyyI1imYstcSg953s1D385vuCPfFg5Bu4COolQYTWzBK1jTI10R4D006GqIDEk0he8Mw1gRtUID+lilyG1mv95GsDohSwZZDFEOpvokO4Rp7C63fMwx9tedQd57pcvedHUhIjTVQ+t/j6ktTAdb5nknXsKXAaC+3A9E/RYDiV4jxQ2ZJm0aFccAFV22RszeHl+z5H3Qeb0JLitcbo3m3QC0twm9aKkw7nuecRfq+gC8YDXol1ZuIrTsju7/vYEo7/ozG0RoD6Tr7rRNmWU5R6xJjOWSYmanVfO/k7HIuC8Vml7ZR+2/wQcMqVGBZ/ZyvPqpBUNViW2rgb6tkEtSFApFjSVqAPpmf72q8dGm4LYvuzBkMFVs407B5hXE017+GQjk3BfDrnxHIg41IlhrAOM7d2h06efu+UKKgK55UjmJMTkYsUbPEZnrzlnje+V+b9lLxuuQbjGRrzQIYLU5UtZJDM2JRPu5hDFdghAaOoiFU6UkSJkFJKsZ0dYqKv5Y7a0zZ2ojIPyILFf5u2UCEj+HJ+wd8pPSOwDTXbQWmqZb87Nlrq7MGK95C5Cu/gUdbIFJhc+G5Ae6X7TUKyekFVPDXclMb24iVOfYRWcHtQY4gbtoJguwEqVZwejG4WCN7swc8/3RyIrpPVa4xxwh6ttFwfx9CTEvqAxGmhs7KakDk2as+zIgnn0oFNhtFTkm+nAOpTQBFDh/ApbXpYdwvGXMxeCXvZS4jQig2NpGyjFrwKkc2jd+cs+5zX5HfohI/GZpgwhfmET5ceNPYyNgFZfXHAo6cKwZlE/qiliBfuahcoMxxlIYvGIJX07+RgCiT74pB6zwnH7IoJos8jTcjmuB3O6qlU7OnotA3OoVIDBMA2i3+hUQRD8cw1XQECwsZe/W9n8fDbwp30Z22wQPS0Qi0qbomRbuqF1xI7Nlvz9wWpOmmRfdEYTZdZrPMQfw98UKf4lpJp9xS/XeFwyC0KXjWpyWu22pDN7zXiAZV4jB7eFQK8JwoSkU1GYSSeYUeimPcdZ6jS7lVv0Dn7PTEpMrOLN+5NmCdK61SbK2xe6RJNthrODuk7wnQYQfxloDtX97EEfT+XTqcRfTdyy8Q3Tqwm43UlWNe+30GUd/+RVxDDs1o6iCVBmt6X+nGAt4uOrEBfcyqeqrRovv9tAL+lgFGtu7UsvxmGUhJE9kG9XrV1YA7cUrcYc8pq42M77+ZrQ2PNflHfrxwmXm4Lv6UeoUFSnCEeb22lDv/fHPttB4C6m65rtYj9EbQzel/QJk3qAZ09nW1+BO/6A6BFgFJyVwjUpFCBBlXTCzcRwfFybrmu0XrK+e21k/f/yiASWBUS3YnUv0PyQEIBE08/5grAePX7vVSLB84RzIRk+E0bpMEso2778rBS2zX0c+h9j5N6H7HxUAoemt69TdpjgxPbc7stwBQmzQLz2iXyjt6B6zG1LGGNoIBqfXPaCfdNx2FVp9VAn/pEgZ2fvEC8TKXegAYcY2Z3NQGjNTYgAAMXjj7mDpixZOBQ//9goWKtRZAWW7OCS0AryN9qn/5pdI/jy6zQX8AABV+kdG9FNZ+HzUTsajYT4mEZTQgWkJoRkVYaZoCB1m7o18W4pDKqig0WxRkYwJcGe36+zzqCVmEi9fp8ZrbQVYRqnn4Djfuwr5Upde83AEV5wHq7IJ7d38J9pW/H8ASDiPRU1NPnajZGbD242uMO8WCYwZip93uBV1ir+zojSLDsgbuJ52Tin+NYudUI/FIrhTqa6mYejXAltaXwcRF8ViV3+BdJajzaagXY1cdP7uJzLFr05UAsG8BMab8UMM1tPVzecKuN5jKa/oxGtDFZjkDeBZcBW/WNYxzjy92RE0i/u8Cr7qOIdfyHKur7YztRHSm37FCCZeE68enUgH/LLI7pkyrohr5zzwBC5ggoazRMgOX3V1XLhEjtKVdITSTKSuGAxLzNt0yyaOu4RKnoATL6YPGAeUiGVUCVQ++/N6oA6qXJuzKKDo5x03Brm7e8opjYcxNHXA2Ue5M6+vGAq6hTEaMFP3vBRQFT2PmEDmT/hnMWs4cfnKUt/VbF8Ltz75k3IjEmrC9vX+YxyBEV7ioPUEe3pIJd5vpqSHA3K7C1vB4/dU1KBaZJayN7xvlPx8Xg4XUTVmYkn5xRcBUjxfrecycnq3evj1cJVJ2x3uSbSWatuqr2xncIzuKyJJI3/m8guJ70fijWsO69qiTXd3W+LKpY/+YpYc0D6RxYja6JYg3lgbrBWO7uw1aOvb3vgKFjtcGSENO0pm814F3+Eh4YbI3U96o/Bv+CyiTrDSkZUT/VzQZ91ouT72QAsb7BMsk+3kWTw8+dZMhhJs+S7MW3lKq4YXV3lTklKPYiPgfGih0darVfmgF3y/C8UoKrxgO8lr93oBRez4s10Me1VmZ4AgYL1nUgd+AXtUyCJlph/4oPDr0PnXAs5MbTAdmyBGuwxMUV2MNEi5nIx84JrIIEDHQpbedVkWoDFtBnfO8t5QarXFQGBA3QlRCMnKhGjOHx7XvYxhKnzaSQGVvQaIZHGR/jCVTXsrNGEaFeBM/rGAQJrVCz4cWEb262I2I0TEd01cL842uHKEJH5+WP5ZWdZMNJ0cD+UrRn1+Wp6d1DZTS7RCIEoESnDtLRMRrWEtgP7NpTFmH0UnDaK0VMsPIINjRDdBUKZt/EkXSCK8HKZKK3JcokKB7OfYj3ht94rgeZUQT4cxSiM6nspxZyoZC+oKVObH5B2euGnUQ7MJ0M9Lu4KeZr1sEjhW2vSyE4foB84qiqXdahJEOkTBNw7XKtTISL2RXx4i4NPwCKlsz+tqXR7/LgVgJOz8F8tRgij7n3g3CARAsAvMXyW702McrAsWSnEQaUPwfPiUnjvykaVSP1RchX6w1LlBpmnvnvvi1BpNe4AAECyufs4eGjcpoUN3afrDeMD4thnNkhVud02Ctk5mAlbnuFJcTDOTgzidDPMWYUZ9HpyfUWUua6eRvXibniNfhGD8RxEzE7tfp+mh5GezMv+bAilpgpkFRfJHm4U8rwMSWGJik71smPk2Q4aAFYj1MsCPfrBmiCiGZNx0zqy1xFcdqe4SAjF4IucnzihtXug3LXs7gfvD1E56AUZDXmDxqvr+WsVo5IKFbesVRLhxvik1jCUvEmqaeH+/wP/HVqFD+fy9zDBWEG1EzFYWn8ohVuMEBUCDv/qJQvcHHFocCvU3OAcDUjt/zTloE5zGDgacJipumIU1nzcCmbeP6335N9kSowDi9yc8TwuUQHO4TYbLkwhV1OnR7lvFuaoYs/HXR8ngCpwv9m78z7Dza6zVAJ73rC1NAFsp83a+pi8Um8OufaV5xtL4zT+QWhUrU1o9gr985UhqmhPQRWbPRA/DHNyFYDz8AOdK/dWVc4N3XLUzBIau4VplaieUFhvFyrzpfvr4D6NRwpHf33PftE5r+KWMYvYtCgkFqJ1aSf4ulT9+vs9IluEH06GfAS3ywyZfrtz1Fyb7HUVYuwftg/9mnz1bn48j/esm+2tu01LEEm/lCJwuJdODrnEv+BcxEOZ2Ubz4riuOhN2cR71cNdFTvdlIYKtHb5d14iju/xhq+RVPOHss4+gkxdHdpIuGiCB5nzfAhE82xHqZYv4Lvmtzszfzmhr2l3WQu6BEeCj5k2a5cUhWARgI/5Cm+XvzMiM3oKfebUMWbVFVMTsCESW7defG/zDLJZTBVM7fm0BXMF3mUcX+qx2waPJuTyXq/mWAAtQtn9Fyw6/tHKaUpFtBEmH6TP4woj/YqqQ2kZZt6IFu3QGvmqxXIqPKEmcxVz3qwIWn53KbBDmawm7c/i1Inic5C+2cwGXnevldU8jowvhsVYp//9wxTIgMzbuJwL5xkVMdKXtQZpn/vIm5vXPT97XIS1RXlXIBPLuPIFrF8leU/nD4qCtSgrPUYW5onWBOpgsrZ6jZweS6Cr++sbmcrBbmxroX8M3AxSLu+BgaAHhFzDPdb+PX07uSAIwbJoDmDgIplw32lQ5ZdPhx6ERiZZEEQHmdBOOJXY8LBEq/WWMTkn8QVU3BW6ZGEfdaAHC9UAqI27Gl7Z6rPLIy/eaIh5TMXFKdR8kNVcbNx8on5jyLFRxhjYQtVj6atk82Myx7htJRTzROJs3oHbxZwiIYQTB7atSZQDChw1GZXwHto08XoEdQflnSiiC1o4eZKz0zmqMaiSMgD/Bpau2/PyZBOlIm7VrOCWM8AkCBerJ2jgaHP/3H9CDZCzRx+cCqp+rF9McQfNHFYsl3a86JO1zqp/a/BgdEMAX6+aGeNtILiVIDI/eQgmanttfYELGLRhOMruBJ6vfh8YltuezfVR/EQxB4t97RRWRQD98VeMqLM3PFJc15oKYrd8VA5VTD4e9e+dL7RcQpdaEQTM4/l80xikpKVpHaVemUH4tRx0MqRrqiywDO8HSNbo4jm3c2CLXU+3iQ2SO3sxbhldJilJsLh1JlLmYDt8RLn8UWAENFBsp1Uw5byRJh2/LR0k5KvZUl1VCeAGDiD5642+CTGp9KZBX+A756fbWEndZB62NvGMXJosb1fLp8K2ZwJhROLSpEWKXZh0JIwjJ/f5Kwr699OCRWBQ4di/kSkRpogqFvltLpLRse3XjzgQuLoU+lBrnzafk0QipJfEWKPAU3zmyvrRS43Yi9I1lWmZ8ddM9eTjt8BhWmJya0FIL120QoB3MZmxE9z+5VwqasTI8xELmPsibaoTG156XuWiDYxMUkbQ5vZTcOKDKseehNLbvJZgBrFiMNGoZ1OZMeKDjwIW0IkIis/Obl51vMJDcN+l0i8IwIHil7GjrdZMJ0h3Af8gt4lwkbLgnL4fC6aXXsxu+tS1qVLGCHyOjT81NqljiSuBBBR4YB+4kmOE0p7nMQ8v6zeMqi7mglXIZXpuSCqFvuoWobmlueHsoPuo++apmpWBEJJLDdi0BsKTfiG04YVznONeBHJG82zsjVQr/VUemfj8YvFng7zwrUk4H7sygAF6EgTBpUHafi5HmEMqNmzxQlWN50U/ILK7DrIiuGM/xVemrwWan8OZ3K+yAAroU09IytEgT7mi+rMgJPTZk3z8SKItgHuodFDPKcTWNACXmSlLO1tc4v7iRybgHTBQ4t7mBR5IkBqeYV4qIvuC62PlkGyMpq8kuIGZQjGEFHlzMGiqABeK+x7d+P5/CU6Ek4jx5RxvV6DLsObXbTq4B1LqHpdQV7RDF5YV6QpaD98F0STnmhq+aqdmnwVZXVUHiJElDcOmqBP8yn6urjUqX4AgylvLj2f39AniobqvYuJPp32w/7DE9b/DQklJQhb3mErmy5dHlZEM4MJrykjPGAsYY9d5Xos2FoXNOxxZPfts2HP+4lGKMdBt2oJHwMXXmLxB4dhngYtrAilxl88V7W26TYswYk1VF/DuDZJ+/W3KmXswyCY0//oGzX0UhGqSxupCnm6SPicK8fIoxBPuO6o4SWuP//3vUljEIuK0sPlo+HBvHHMZO8C9y8abVh+kUuVLNyYIFAhB8xwMOYmOgaMtoA7bgMgPBlp0o38Se9BvP7Tlqaq1XNAMKWBFp1U+xtg+aXoABicjLSn4ZeGYUGG99OZAlRnc6QAUdf+CClRWNclnDa0fa2VDPxfFSKdFDyOnXMansu16b5OyP795gCRiUWqaTbvVg7PZ+PRpDLAc/2ofAGqsi6ceRFMmBXcc+zNmUwpjm2Bq43dOA8hkDHiHse/rE+7lhhDBQxno6ZuVAAr5QTEsGgShZJnRqu/t67YGJXPyogxT+9Ooels5C16w62XiNTYPXbJy59uWCoBIYxvR26J4VZn67D5n8FzGe9tpLUWT/8GyKR35MUPfDw7Z/+lsfmuhtZUo1meCkZkcWZfg+MliH1bac6/DN0iUBZ8rRVMhg8Os6HOwUtOSY+qBO8azKreKMLdmtbNFaF1ZQ8v5a6DNJd2N8CtCFRw2OiyVZ13BsTY+fNS2He1kaFiRRQ3BXQavAm1y1qTeigEVi7xwHsS/XdI7jpQj4Gepm3vWjmpJ2/14ZNrKfXF9bd1rm9oFOMmhmjsE0pz7S0gFkepbgtMrGIiXS4gppow1+fzMxhyzVmAp0XrnRWl1Lspmr9/S0HvXU+KxFu0qTVlyk1vteN+QADTdjdaXtozUhOmTBK89BrYsbLcCK+u8qGZN3H+szK+iSRaR7XZ+tX/07DynBKWbGYjfOA4Px6NjLDYtsANcbEzp34Wwdt8fCplHGLobwf6pd1J/bVfVj9wfGW7qinpHCESJ0qjqOPXbWti7s+P5aokLgtF0IlNVfYRWmdVUYLO+x4Ym0lautwLsM2gvOdSiaffDKLW3uohKRkjYnoxFuTlNC+Kb+1NOHv7GICvsLOvF8e7efUrQLKD4H5YNByjjV7NBypMn0wpOAQYDGICkfjqXdxWCVQkWB+WQDzm6+DWf6H7fA19mdnPV00I9TCJwSqOJbmwTNQOca1KQNMS4i+D7KYaui/UgIvCKAe0Otqufd/sZ2cqWFiTZaWtmabc1qFy+jB08tlZJJ8vJtan03XtotH4UgthIO7qE8TRlSze0tN5NyNaRCerhQVA1MJf3JVwPxcfMyD0zteFMwf8zlUgiqfI5szph3x54qt3v5jnYbsyfHFTSeqDmcRBcEEkG3SGFw31NWSvLey8eAOLoqNIsnnCPcIfjyt+rPLsRKUL9t9lm1J8ZAW1kLUXwpALVr4GBBMjMbB27tagkBO7c1g/4TQKC3Lm0+LzuAO77lDsYpR031YcAsalBEQgsRSfPWSWDueG9cb/0NJ4Y5P5e3xh44JIA1MXP+ogwZFmYHnMgFgwB8rq4AQvMIUXUvsrBMHwXYeaKgR5Axq1+QPijKCfbZgOTqo7cHmECg4cG+IilBKoUym5iY/MMPPIcClLX5fZRG5UjT/b0SDBo2lusLQFmlyaKYxwCWT0a0uzQpqcfNbEmgDGdGtwKnuTZhicJ8WRm/MtnMzLILjraYWOn05RG4vuz55ijiooCnhNY9VmZNf/YpgwvHVL2ZihkcryxTpV2e17n5i4zjvpQFWfVI12ydNWFVLx7Elwa1ZsU1TPTV7NaAqESlHeocy+GdBcqlEUa5L178HqEk9DgE1kgMM5axV4KWshzh3tvFeLPZxOWi1Yi+9+FbjDrfANM5dNOkSXpGGtEaRn6xFHMUr300o2uEu/Bjct0u80icbUmM1lJaB9goVPqhBI6jkSFFW5SWL6iRLoSem6dMHPWz5C3FcCjY5BF3R5I1N1uWR8X5wRN7EPorZs+pVF3+vLC+9ib3FKL4x5n24mkboG2UZL9WM4Aqxl/O31scObrWkDIw2PuvKykyygDErADRCr171TfCP2YKAegkVC93WErfAJzsaBuS2LolQ+uTUB07x2P/SQMa+upLI7pMpyIkxG/Tigdf/FcXJbwRqRBvcvZDTl2AXMPS5Dj6th/Xj0PnlUWjioANchoxIL+A8LBo/YyQfEKv7S8gtbb2z5DcOSCfocZ1coNaNRuGcmKbqmMx8TWgGb5hpu9xgCsL4br0XS5Eb+m7Y8+yMYmDLM/p812zd+NDV1sNvUy3DN0Ys22/Kb3iOO3F69OnVB51ZYuTw9xKAGOlQz1YwwhlcSqtrO7UkqqHmTrRD+N3A0uQS/vzCfj58DCoNVB5dVUXzrP38AXfBX0jlZzBQvcxlU6dYNdLokAm9GqFzxK+v2BR1uc2+bjZp26WR77apFcEhpH0Ibtxmf4ygzoTKzRQhV5fiD1BWoFcVkqapxOjQ4mKz8t/MlF9mos1aB0zVOL7w1v9oXWgESc5NwO8CjPtGC2OvN0HRYK9XHOhKA5cWM1CtIGwAAQh26IVimXU2td17Gn6ls22oXZon2HMax9odfNXrkjLfvzLKo3OtHWon9Zv98rnwyXf43hgXx1x4f/YNWAEojTRAkeelmdV/8GyRtj5pSESvJNULftfIOCAzrTTLljoZxztIL8YG6FbV0ZQOXmXzooc+ozjf5N8jB+gZPoKsx4ykHK/p5Vh7BVP0zQjGfc3QTwgbBlEiY6MFgGB2enevU6i9jugqI404lCtdO9sUFxWJZQTK+cd3XXrOFUipa4FHoZEA/u3r8BJX2WcQIqlv2X70h+p5zE32go2u0zp8WrVFycW721dONTM6/hrM60A5QiwYhUvu5GkzNxHOZdRvFV0yiXzuyQQbqAtkrtd6nCD/ukjiNt2kPkt3BDqMEF/iUVmeS4re3McpE2+Az0fsTaQd7Ls9Ml2fnruSuynSk0sCeiWuQSfcX1C5fH4X6IcSaiZmilF/iqvYl24FmfJvIheDcnTqSHaAHE3Qvhg12xYD+Myq+guXkO/MUaCpdoVkesBG9yl5JBG6NVym0WhkmtDn1ZYd1g7QTly9VEQ96ZXdEPvZJKydrR+rOyyDPoloV6d86SDPn5HGIVzbF2eHRg4P0il34NyVkLbg5dXTiyUfrgHBPKShMTLuLrdIaTEc62S82w5l3DjHN/P+S63elbqFxH8O1Rh3lsAdTjHBHM5fsKB0UDwx7iLNNr+dOS4msAohzx2Jo/CsRlRtX0oZaFMO6a91gpq5Ki32wNess+hUucR30ZqbBjkEBHGLp3TiASWLdlODx5DY9aSsbLMvZKLQvYKFANUS3/KgE5BK3MXp/yTiWzF7oanb3SDTx6B3+iYRTukjjSBnS0jPFvB+mQoclZIwAdIRq2XkEw+Ug28sCOp84anzQU+x0/uT4Hb4EFs6ukAtoGipEXfRM32NNcQqwC1IK6sJUmgEdC0RFla6C3xMBHJReDY2qjGcwKRivbUcOtDreXu4NOZ702TiiaIwfkPBAYTJky2x8Zo/pfZ7IWgGUKgO/UKOyOY7GeiKd2ssonSFYcaZJPS7GVwUjTyOmouR2RMESL+XFDgePZlYWJj4V5r2Elnpc5JyoPmvoir5C52mfgPsDi519wLy2NPInit9lxDHTnXsy6t0WnvdLrWKUfWWGRlOW8mFgIyNT2ki1+m0B4gf7oskzKOWAvloltzp9iAAAGF7RuZBobvHpvlH9psZ97m964uw0AoKCVLbdPVTstGo0//4y1z8wauA/c5h2Ai+STSMMbidpOkAMgiszHSPZp5vL974CsIFkWrpDPb97QfCNU7w/Ce4XAJomV7Aqrq75NGPwj8XhVAnt2saOkSPjS59dgFhmBIOvwM++fD1MpO+axPRmCfN2tyYIs8w4ylsuDze0P9T/JDZ4Z+Hi/GBlqpM4mEaOUlwI8FWIBnSnquL1PvyRpRlPuH6EYBSit/nr/dK8FZVAuWvUbFXQ0lloBat+K3KrRon4/CMj7KdI/l5cL88UvJQzM//SuUuPsMC+YUVDKrVZc1T6+wuB0Yt87gAq/ErkzKT5OenbqHnlDP//xZgh1ZNK0qZhVrAdZl4hIynIfd+DYa54CYD/FaROihMdDk9Oy2rqzXzfeQF4nSIhu763M9AVoeF+5B5RXmYhWvtnM6h9zq2auWcu9GDHioEns9+E69IRX1EOf+AgtTrlA+16BHCMMoYsHvLTxd+Jg6+rnv4Wkd0TzcDTK1SzKgTK9X2PdQtjxJGPAPoqfglfA8T4Qs9QuN7cIH9KeRfqM4QAw/yqiU5ZJPCSGsQdCwzCelvwhZlUVB4mlKcGEtcwiS+VWUc+qFuBbekWBt02JVhNccOkQgXsHW23AcJunBOkTltOd0cQHjF22co+TveeWLcuaHf7BT289ENc9jY4fDZ+5QeGFU82XPLgGF6TZXSac1JBSYERqtgKm/V+qyIBR1CJCdQrmDBkQRkVXzIm4px3E0DCygK1U91VvwSMRh3Tsc341S6hkRkWbuaCNrJPkyS0tTHBUPyGUbyQH2k3SMH3/e+qVylkZpzT4Tdko45TeMju5+12+aZhQ7U1aCfWG8j8gYnzKOC6av5C+gFPTcyFIpTuzU3vOQJvMJXUn7pSDTHVzOf+gtKrvFP9Fn0VxIHI/xH0RshLUjsVE3it/E0wZNJ7jrbx4GbtJyu+T1tDj4QEys5g8BHjvcwCeXhXmOQI2qWD+RRMFcnv7VElR4u4hMcMj+bTXeX4sOId5fjI0CxAuvqOIrG9jkmkLjwaejwzw5Y8kvwe+ZumkgsPs8u4l+2Fsebf3VfgvFnRHDl1sihLxlpmnWUUM5llwyCFxFybgPkhowNPZ1TfsW30wyoRyDbXIdxfBqoIuKD8l+v4Kecn1hp0+pIO7u5AZG1JN7m3tS6KSemtIwLhgrSFQWz/33xsJuIxTVB+hRXrMAdvO3Fh//q+8LF87LbMf5FO78ZiiqeCRy6fWkcbBU5rbUJFjAC/kbvaL5JtasEgAf2QQrIEd6JUxaGqsqsOt94s4/rl9mXCC3nqF62IdoUwE9HbtcqFt4vUI7DMhh1NEF/UGAvbQ2MG+2X1W+O/yoWo6/BA9NjIz3kXu24GHou08TDzZGkB1e9zd6b8o1GavofeOjuGyDEYslq4PY1+jCF28kBcdBcsz6bJMWK7PiX7wzqffdXWSqaa4vyeZZ0Uf3w0Bm7BsE6YdbZg7yqRigmpHPIPqlaVh4Xmjm1QrZO6aJP41Wz2BP+7gT3dhLqepUzvDrq2qhs0pEb7u099NImv9g13okiIE1yn8wV7KukvphPGcc7q9cfXIrf1N94dAohfFXuIEE3JYz1VOGFktlrI06ZGuTCG7CgsqtGTm/TLBFBGbpL2RB1YeK9wGfENI5nSEOQ0N18w61C4bqtzOEylaw4+TKsKBSr4u/bH8+j8SdL5uiSjOwYnrMbI0TvOQPkXJyZf9f45HlO0Pz9jkkfZRQ4tYEY5upEwUV6V9D563pFWxewIWieFMgzzq3Kz33/1qF0G9qC9mFur72wO0ecSjvVotkK4f/zsJh6x3oSKZs9U++c6IQcRQFESe6FP7OmhZZe1C0MtdVqYYH/2C02m/IxkIRd4Fl81NaxfZ/3oDAWfZ8ny5GPxa801K1l5W7vDpFB7MJncAcfxSO1NRjjsYBfpqL/20mPDGgxFMjL00IoZslbS0DHMZUWLY0DHAvgSZOtntbEb2kexWIfItVN6VOoeMcmVACAvit8DaPQy/zDBMRa2TGD/XeTwlt4aB9SlyrDXViuR3RmXuSHsCWf652TRDn4Bydd5QWTgU3H/VcLbbueeBQ9XwZBf8SU15PmtA/Gc0SC8lUzzVNSY50nFK9Er99u58Nlc5cGw5twJiE0Oe/6gqz6SbYWJj+cpoxlxKk4lYwZeWvyZcOyxwS3Urz6LD3dMOi9mgwQ6LJT2gpcCgwSP03GNJwGRJ+T4Z+7M2m2WYbKyYxsNEeUkmlahTAC6fUeBP4K+xT7oirbIJshsMZlh4l+VJL5YbuhPqmSO1ISjTsyCAXGz7JTbfRsrTRPwZDrNK+GSqjLQ8OV6GVpOlUxvnB+8avkg0J4pu07k9a5bdkHW6WcK7T+CVZ+V7E+T0mqoienbkwR0WHsS9hADc/MImrEPH4I1v+EuVC+S5Isp0b7R9EOZWIBET7HEv4xL6hRxSZ8V9kqfNpPryjcD/5h0oNXhvXU8AzPKOF3A46wBFpK8VKEqJK2aP/Bw8JR4U9cM4/DGEl+j/Dm9htV+S0phmio4H+/DvyNt5015tx/hdm31mAOF9l61XE4YT4q9Thm++alzfzpGYQFuZKMn/27eDfO/PnCxnPm2bw6aOsYkuTVIUsEhVW75Pqic6GgTrTKQzeCGDFMbNGmHDKb8upjEi/cela9fOR2SDozO3ZJOF5bCVCd0yhMtyedrBZ/932QbTD7M1iA5qT4vcJgODXG9TmraxcFc5gY2mC6AiPjWmpr5sAGvp46rQbsoKXbbqhOefHrkOBEqD8Q9QaEehASMxaS5k6uLcd5VXwdRgaYqKSLYkboOhF1aPyeJSUJkMHOcLnwnhzFHeKpKqRxmI8iQp8V3LrnKz8xF0kBLXYVI3uEzC4torfJJUU7W58Dk5XfOcnF5y2iUe3leqKMsPVpYJYnIssMPSmv1XSxDjYBjNCo2gMdMwx+RVQf8F9kXaTQYl9WZzpXPknt5VTNt/MZDhI63B2rQgFaskzoW54oWm9JE5dbLzUH2pK0uxylZuWNqAv/xJKk7eqa2f2Gzn76DuhEFDptBpnSkHGM4EiP3pji0rqTfqckfvZvXNAoo/9DFgi9So1HdoKLwfK0SIGSuHz5UwXAuxeBwUcdMDq3SLn+0JzNpiIp77s3yG/LTNX5s/9+4yxAQlYzvhJGBjbdkCDHLm1MpCj2Qp1uexJEcjCFZzJEBUtaxNopmBG3CMtpwXThY+gUbfdmqVWBrIKm2z9NvJWe40rsU2aZdgYFPW2zF3AWmW8z79lrXWpwwArV4HEq1QwFr2TU0UeydN5gk8eBBSeHbK2Gu0Gnff7wVJZ0mWmAtHxWZsZe2JZp8W7CaIs3pADVMYSOBocGSZjwNdslofZNgeV1InBFwKlG6ux7KcT4LzLvEVJ7+NmiLfPavZU2d5yQpijo8eT1X8mWSyoPSwRfHxg9AckaoAQxwJquELhkoZ7fhwqbzsEiXIHLNrc8TU9Txnn/EqGPMKXtPIwNcbIDf/8HlZ8e059A9QUPimVY3+d/zQtRSXjP53EM1doDmaf3NFlAXYrgp7KUC2xe7ishhYl6Xx0duWMxkyROv2OHnQUo6tFVRrsaJVHpl2no7yi75frLi0xI1OhrBo/RXKXjx1ixOgSAG7vw5077DAiUzbcSjoxcxA6/CwnWE5pT7649TIJCSzW9yo4Qb1Ch1EKrY3+Wdd24+XP3193ak76cGZhxEu0pxk1beij+I2Eu8vH7hiz8xFSsYWgoTkddIreK2n8is+V39a5hLCYML004EYa39CSZkmTaSlsh+gVSUeQueE9GrZ5pgMQAWVuzBwzvfUqKmIc3L1QNRp+mYc5KXdcd7NnqRddeIDLOoZKIdgGu3aVFTapM/juB6691x8Gh0s3jyb1vq1YaEnacGvCsaemajIJjynM0v9/Am0a4fI9UxI4dt2DQLk6kxZs8oEdHT5QzLolIaNSuVrSynEcnPslV0atCFO6u59IyfiyaDgSupQnPedzFAKsat4s5VRKmpGjxEPyLwrJHsbLqGyXCpaA6kjFoiqGKnMwy4ju60ZN2sYlK05Gm2I++ADIraYZAFIYCCxCdS2WuKi/gr2cLV57DAh1rvDrepmFLim8QcLE463NzbWhck8/MrH3Clu3lg+2YNBaZx2TJLx+vEEoym0CPJ1PIgtqzqlYaKtiw0u4pDXWJjUDIPWl0wSLsimIRgADc6FnIDxX12Aj1/YyPf6JMhYCt0BCJQEnmxo5WPasBeJ7J4K+o7QYhHqM6eMVz+terIzon6I8vhHOAaYDJMwXmwjvDKThz9kJ5aZHDtcROaBVdZcWqNtAuw0ni6J9G/3CTk/PM6oEEiOOpgV8QrCzrZYLVddXRqyGftnbyNwJiwyNJtfrkDdHnrEeojOCEUI1JNvFZ+MDeuMGvxq3sZoBhOUL0F2h884ipWXs6Bh9b/u2VzmVdKeu/RNgqJI4FFxsOH4v/E+89Fh8oEDW25Y8bcAee0knfKtaObtQdBym0dyv4krool1kgABMRCTaVfkij2AEgO7VXbrraaQ05MtxMuZvbvhZcNd6WM8jY/81OV+1H+gIYytEmTF60T2aVezHJjNEMF3Olj52jylkUYnIdS/5FyK1OusmdiJcejty1vk2KFKWRcVAC/MFTvf5Qy4EN9FlpOAjh1JAsPjuKhNK/obJ7qtpAj75CfOw7ywmupC4viLLNjqSfdJ6gG5W128tWthvfp+vO6Z5M7bld6E9CyBRy5CTDyfUQ2TGzQJ3Zmcj/bDHXV0dmsJmIc/wUu0B31mTUuOTxFiBJzM3CHmYdxisRcYWtURKOM7V+ibpeMJGedqqpyGlws1P44DDdIn9PsqOGrhGfuavknrPj4naK//Ypre6QGScK6dDiEQd8SHn6Gro9jlZS+KoosGZRvolqJ5nJy4JjaHlvYGxb0/SOl1n+jq7W1QCZp2gPVazHWeGFCErDdEEeJ1m+djXnCcCJ+kTf3zxMvxOwHM8WDsynp1BjF5NQcyY6ZFB+U+mrzWENocDrGwU03whBzWWyEvtU/ImdAB711sq8TWuDhCcgyxEtFZBJgSfX7evioAddmM/U6NRvt0DTjeVY+3RxAnq9g6Xni93wdXZuF+O6eC+6Cdgdf74+t8pBXi4e+vhp8p1mT5l8fqq2ot1t0dAHHi/VqNdlllNcXeBf8z3fkOA1otF/j6cAGqAr/SY1814jxKjveRi1w6jAa/KCc7y1yJSJVK99jopYOol5w9rqf9QTQj3zgi9vL56ZKE5WWGW1XW1wsNDcw/G3iKLAb5WYjVqkgqx8UdxgPeKs2yir0myyFuj4dF1xEw8DMoXRUQlW9tOkDXNFPZafCNPpnjrEaM3iQnuAAFYV2QyXpyjSm88aywQ7OEeIRfLaWmCK5QDVC/oJXaFPh+fyhjfj3kxj0Na8wn4a9n7tsUM5c1ELDYPOprVoWz8kUoIOtk+8S4ZM3W5JXP5/VmMsEMLassn305ovVbtqZDClmCgRhqSe49hd6y0C8TjxoDnPmk7NyPxzdXRlsaiSyMI1CcyehxOaycnes0R02E11/INX/x9LupJeqeEcTcAJPA8fxTcEi2b/ksqIia+vexiyfjz8Cimfst7FAWd4yXbvKHS3uLdsNe15mrQs0slI841Mjm7Z4dqzV3u6DyvUwIApiiQNN1HoJKk876Az129fgCyAo1f77Fn77UeNOU2CtHeM/61rQGBdV2mNJHFy7lTiUCPE9wbWaknZyihesVV881sD7FFA0d84H0kwUweHfg2gGxP1pZmFH5fMlnUaBNnqvuIlWgmXANEVjdTtiAu/PhV9rdRjuJ3AsBmq9xt83uf5xSLmQX8FYYANMqTj+ca+7YvXXpW3FhhVOhuMWbqtMhb1cstpjdD3ZH97sYieAt0ATPWgOhaPSZEa18W1Jn8xQf+MM12/51OS104F7TrhMPEXhvTp28gtIltlBSj9VlPFe0QspJS9tUA/0ckdp5ZXnOSNFg6T7SHhoSfbrPQZ0Giuv7Hg7RnXxG0Rn8eOZSSJi0wqNV1LseihZDNRG/ZWSL2v5KTbQNLHPG+iN//wymvGpO7xZb+xiFC2msImSSOZMeEc4Pq9BD/jewL4d1X99OuKvAA0lsxSGVUns42KLnuAfSHPh0VpklXx6Uyzo9XszauA205Q8pC3uAQWHsqRDy/ddSvP3LcUmwckeza+haI0thQ9zzgTlObyi7vKyOeRtBw+jirVp08EQFF6Hrsc0RvrdQVhhU25UXgWxbGhm42PFRkuLzAkSvDqtpN0hV8nO2SzOZkdDLZ3cHLDyUls0PqNNgApMI3I+2uH5OeWX9AD7W4cJtAUVJm/lInBYnXgv2jpLjFaLnOiBn/LwQYH47NXjhCj6bquy5AollUi0amwakifS9hWDEtuJsQej8/TKS0+UAWK9eMTmdAz5vH0JZ0ViKgW/h9h8a06aVUmO2EgaPAiKhBElc66crZcPXwKC1Ru/Tul4adkItyy+ZaXlXxu2/aQG0HcdzrNBOJwQ0PWtsdlm+oC8iV7C1y2rry0UfxZNMUXPZ1MOn+P7X91PUP4JNLC1Vk8ZQv/rcrJ8klC60s4UUntgOisTzA42gTTA1fQXInkIE28GEHu9iqj/+Jc52wadSglsNYFY/rrUJqWX3JVNpZWYBESgISDEhlQ93Ah5tTwxNjGMPc4PffW7GMJu/V784DGQiz4SCmuEQsBQaEYrWV1K3sm8Zq/dXo1XkeelMU2nmQyZxBHcUaFoab7GUgFSyac1z3QDIB6x/nC2H9i2eVnXScgcZ0sPMFNLygsjQ/H373Zl0TXXx5a6YdXFd85aKebV/NeTfirR7ffexGw2LAzXRCE5wBrea2zl+P7b+qEMgNbD33Ej34JSODfFiHQZ2Pd5gNJ1wm04IXm6ZOP9T00p/h27uKSSiCLYxdF7/xNjv9ToFSniGuCzsEJwCrRnGSXaAXDkVECN3tGlBGrs7049ytTeKB5xeVgCZz2iSVPfAJKVKnhD2c52vb5XVUnXrtI5zfQ6XLOzlg25MPbMBxdI7JOC1tgOXUn3JjEJ+xqtG2/giN+4kPM/zas5XBibm5j5XbbCekOMqFdTWSLOdiiSKY2rnpOeDb+Tz4E/7jWGEqG+xYpWWF8++9YKT9erqY0D5uLKddD5FRV0quqbyjfUnZ+gHQPZwD54JNqAHWYALThMMetShW8wqDbL1dXioBXGiakLFy0OOkVbTb3wJThA28T7lzi7Ta+1kIR0hCsdOfBNLWqZMR4AKr9exdfGxMmYWokBmPpieObxjslmRQLO8PTdH9EPbZKLAR0x3xyPrOKDnkn0UowjluUAvy1phh56q+z5MBWC7Lj11tJwMl/HP/tPHdk4wHOqKJ3gai1UMne6P7XRKw5F1tW3U0iU468UB83/NpAG7WQIMkNRAzLkFL1u+kT3abxRXlvlohsayXOuWBXynFI0aIgPq/a0Mqwo/LsNymmi2SzRtWzt1amQmcWFvaG/IBs+UEixnG43yAJPFSQQFelgMyDWgoUVpUdSXGLMuj4f73KlxlTbHUhZl85xF06WT4HKSVNJXa8kcz1VoPECz2bX3KTSkwSd8kRSEm5KyL6c2VQ3UH5K1YFeK16AhxuAAArW66vINQzwFy/gFk97Ws8h800bAlCx/HjQw+lXSwasuVtZZDDtSLeypcb730CC9V75OJRLgOT5YMZWkmTBKLLCVSpAb4huhgWSPk+rjU5gpcVGV/ZuQG9fzSPdRjazImtpfbahsAZTwVo/DVPC6wizsYNPLmVVM5WJ7kdyvKEr97P45wkx2p9RdiF109uAg/hUIc2jubeLdwY0cE5hjZcBGOr/60PGd+tq2OGCK9DCujPbtHjY7Fssq0EGwyOIMnN49NsH9KG+ptTRnNO9j1tD6VqZTADtXixe7Dt1/MT3jUKg/w4ezsesiA8FmgQUB9/IECwgebpDXpREkUEHohqc9Ruuz8O+NSJIMTuEllD/wKVlVM+EaBuwNN7+9z4SpVJHSLURhafoonI8aj5kN4GP117gWkYH7vMdC3doAs65x4QkK+M4p8SjAD7sbBt+YZOWF0bbapOtUtu929oZHydnbYjHEF6hyQx25x8eCprlV8qhrZfXXDUttG88MQFNsi5GyF150LMqlj8y169XXU7oa/PWPrH9MTa83FKyYD4i75Rj8O79xamhFUopHwtkpr1BJRqNNsWuDt0vsa06PPlyeOXWOXfMot13rI7rlrTcKAVfc6Uk8O/t6oyIGwQGPOi+B2F2z2IDyWkEy4+kxGIMtAMGQvAtxuekWRkfG4vJoyyBWZ2l6cgYT7qOuhYwEj8ZuxbQ3ot8/AihEFlA0Uh2RDlUiRuubW1et88gLk7rP5QetzqbgMOc/TSCm5St4ncmfsndCH5B2O8MW6TG7q++7lw92MQOdBSht4BvJKTPmy/o52NrJLjuyLnWLG+/wDcm4jBQjt0mlo3sxo+WCE6J75sHonxpDv5vvK01cNsfisUN79Jk93XB5KGpU/Q4zF4WC7o67lepcDTi0GkS400kxb/AHVRWhjLVZSUPS6U4pycFhDsAqXV3Enr18o/aJJyZy3F+BdV3Cq9at+ZpCg/DpUSYqad+pqLzgR2ee/ou5Wu2jTkuPPBt+0XIT8hlEIogEGdhl3o+M3YLDQSN1zFNYVwPL+UkYv6atbnMXwVawe1AwiYGG1K4f1BScpNGh6yA8GWuxtQsJ/JQaNksCO4sEPeoW2kz9A6qRXGwGtv1s9w1WKhF24uPWs0jTY1cAbdmjyHCVwvnNJXbXoLfbbruuEFoLZ+8+b+uWn7e8WfrjLu4TH12rcACohp/IymO0uA9xgXIXMKXycXxNUEiZ2Egc8OPJjVZ3tNA5iEfGzNLxSX58wCRrBb/B5KG6oonFXpPZ16wzePaEEA520UUSFC96kMPplaXKjXz0BXS5jNBoSHMM8IKlRb2TYuOdulLMdl8QQ6DvjH564VNMTsL/ctETeyCz39VRL+PPRrnIIKc8mZJp1QkEQZzi/tpfuIQEmaM5qrrl8UBTAqd+UL8bvE+uybJ5tvwZLf+zve7LWx+zGDSATt+opehahg0Q1wIgAFskJ/E60Bwlj7yS8vrGPPwkFMTpQmFGj+b2mUyi+9/raZ/8wmJ6zejg98cCVgKrm/q/7uYhIgHqLodcJnjVcfcNC97R5VzhxRA15MDFhbUUxdfMKdMwID1vzkiH5rkHbCph0LxX0H3b9IsUFeGZL/MiM3u/C1rHDyGTxyqRxVuLLZ3PPsAwy18D2WJl4GO0lXM5xHb9MhEPjmuWCYHYr1Xbv4+j4IiaO1UkbwJoCqPmXMXDinBNypOW3Wj+okX3JW0pfO5bO1dd3PYKMGpwDS7BcclDuas/+/3vA9OLSYBPmRT9Lf+9FAq8YAb/zbdkQ/CCiNAS12qKQAcRKUyDehjr9DUXh3lMU3O7c+RgTOGc8/JmlD5sOrMZP7RMCnkLj+eGNAlex81Wvl7BnpadxDYR3J4UgQJPsMBAx0ZPEYV3BhrpibWNzhDEB8CH+hr3Tqi12Ts/qwiDpYezrA0CzyePr1QEDnkqc7U7S0Tr9k+k2TiBK9bVCB5vREKlxeNv7w49F8+KLMYniSwj0zAmw+pQ6d8n8Qe+ai5V4Vjm40otRvoHTsFRXUmtN/DNdi+MmPGwau2Bmd3QtwKd5hsA7gVrRI6hy4y8ddb4Xtsa2FbjsKVj3V22yzSMxYMfhx21bNbrhIzz+R1sXWuAAAIrj40n1g49Nd5oDvJZ/1xXtOoenW8oES9MlK43kkH/1aRbfflfljFpijmzMZDND57plfOfQL+gDU2WCKZXVD4EZVtTwtHHu2cXuWlmaiy9sy5NAR0htiGvWBybFSqy9646DsKmqE7ciDLOm4JRa3amqsS7h3QY1+7CBlqeZkC2BTVXZFRAqCXAFHqXBBDqqBemrg/5hPn1d5JyKq5F2RWKuYZ2v7+nK35vMsIAgbAcAAXvNaM4JaDEZdFLJIGIHCq+3ZZSeTZrfoopLRmppP2ko/tpwjd7k3GsjEysaKbaZ2joBsk10NV+e5NdlKX8lB8IcXsgRzS/y7se89GJQ8K1c0YCspF6hKsFlsXa/35wH9IioaBAsJ4DLuQYlTonoycd81OU9i7MjgR4fGSixAsLzLJugY2rGASrOlmKYp1l98JEaAnLr2sQrG8C897/X1cbg9uEh7nh4k50NNX775UsPTePfjcQDXZw4srlrpZlsP52VJU87k4ffudUhZN4WNdHXgMAqPLspHlbSUXDYTtn/MXvUh5q/5o27X6G7urRraYDHmpfkAhmFwFvtU5JihGSwumtFeqO6I+uEzWNZJ6HLlXBn+XcXU/xH1DA4xylD6t8Gg4doBmDVJHbJeqd/VnOFurrbotGdp8pyXy3V27jwvRIUL1z6Wtpb6NjsyIdSEblW+y+RynIWZ117HATe59SlC7WEdz8T4KxoVi0CDUVvIzvWjm+sfI1zCwd1Va7u58P/XrPEXEhlTJCITiQQUq2zEYpso/nz0YSQvy4ekd0JTD2jy3gWAvSpw9dVf7NPziQOnwO9j+ZNvvvGFzxIsLbWGuCEpISuJO6OaClSB8pGLaVDCJyAAAAAA=' },
  arm: { x: 353, y: 195, w: 154, h: 196, pivot: [380.85, 356.65],
    src: 'data:image/webp;base64,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' },
  antL: { x: 9, y: 25, w: 28, h: 103, pivot: [26.0, 127.0],
    src: 'data:image/webp;base64,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' },
  antR: { x: 382, y: 0, w: 22, h: 104, pivot: [395.0, 103.0],
    src: 'data:image/webp;base64,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' },
  eyeL: { x: 88, y: 158, w: 74, h: 94, pivot: [124.5, 204.5],
    src: 'data:image/webp;base64,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' },
  eyeR: { x: 246, y: 144, w: 92, h: 108, pivot: [291.5, 197.5],
    src: 'data:image/webp;base64,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' }
};

function buildRobot(THREE) {
  // Finny is your artwork, cut into layers so the eyes, antennae and waving forearm can move.
  const bot = new THREE.Group();
  const IMAGE_W = 507, IMAGE_H = 637;
  const ART_HEIGHT = 3.6, ART_Y = 0.12;
  const unit = ART_HEIGHT / IMAGE_H;
  const worldX = px => (px - IMAGE_W / 2) * unit;
  const worldY = py => ART_Y - (py - IMAGE_H / 2) * unit;
  const loader = new THREE.TextureLoader();

  // A layer is a plane wrapped in a pivot group, so rotation/scale happen around the pivot point.
  const makeLayer = (definition, renderOrder, pivot) => {
    const texture = loader.load(definition.src);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(definition.w * unit, definition.h * unit),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false, depthWrite: false })
    );
    mesh.renderOrder = renderOrder;
    const [pivotX, pivotY] = pivot || [definition.x + definition.w / 2, definition.y + definition.h / 2];
    mesh.position.set(
      worldX(definition.x + definition.w / 2) - worldX(pivotX),
      worldY(definition.y + definition.h / 2) - worldY(pivotY),
      0
    );
    const group = new THREE.Group();
    group.position.set(worldX(pivotX), worldY(pivotY), 0);
    group.add(mesh);
    bot.add(group);
    return { group, mesh };
  };

  const body = makeLayer(FINNY_LAYERS.base, 1);
  const forearm = makeLayer(FINNY_LAYERS.arm, 2, FINNY_LAYERS.arm.pivot);
  const antennaLeft = makeLayer(FINNY_LAYERS.antL, 2, FINNY_LAYERS.antL.pivot);
  const antennaRight = makeLayer(FINNY_LAYERS.antR, 2, FINNY_LAYERS.antR.pivot);
  const eyeLeft = makeLayer(FINNY_LAYERS.eyeL, 3);
  const eyeRight = makeLayer(FINNY_LAYERS.eyeR, 3);

  // The existing animation drives these: eyes blink (scale.y), antennae wiggle (rotation.z).
  bot.userData.eyes = [eyeLeft.group, eyeRight.group];
  bot.userData.antennae = [antennaLeft.group, antennaRight.group];
  bot.userData.earPods = [...bot.userData.antennae];

  // Placeholders for parts that stay part of the artwork.
  const slot = () => new THREE.Group();
  bot.userData.headPivot = slot();
  bot.userData.arms = [slot(), slot()];
  bot.userData.lowerArms = [slot(), slot()];
  bot.userData.legs = [slot(), slot()];
  bot.add(bot.userData.headPivot);

  // The raised forearm follows the animation's wave: it bends at the elbow when Finny waves.
  body.mesh.onBeforeRender = () => {
    forearm.group.rotation.z = (bot.userData.lowerArms[1].rotation.z - 1.22) * 1.6;
  };

  const floorRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.92, 0.013, 8, 64),
    new THREE.MeshBasicMaterial({ color: 0x8e45ff, transparent: true, opacity: 0.48 })
  );
  floorRing.rotation.x = Math.PI / 2;
  floorRing.position.y = -1.72;
  floorRing.renderOrder = 0;
  bot.add(floorRing);
  bot.userData.wave = 0;
  return bot;
}

async function initFinny3d() {
  try {
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
    const canvas = document.getElementById('finny-canvas');
    launcher.append(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.15, 6.3);
    camera.lookAt(0, 0.15, 0);

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene.add(new THREE.HemisphereLight(0xcdeeff, 0x26366b, 2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(-3, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x628aff, 16, 10);
    rimLight.position.set(2, 1, -2);
    scene.add(rimLight);

    robot = buildRobot(THREE);
    robot.scale.setScalar(0.82);
    scene.add(robot);

    resizeFinnyView = () => {
      const { width, height } = launcher.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = 42;
      camera.position.set(0, 0.15, 4.8);
      camera.lookAt(0, 0.15, 0);
      camera.updateProjectionMatrix();
    };
    resizeObserver = new ResizeObserver(resizeFinnyView);
    resizeObserver.observe(launcher);
    resizeFinnyView();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const blink = { next: performance.now() + 1800, until: 0 };
    let lastTime = 0;
    const animate = now => {
      animationFrame = requestAnimationFrame(animate);
      if (document.hidden) return;
      const time = now * 0.001;
      const delta = Math.min((now - lastTime) * 0.001 || 0, 0.05);
      lastTime = now;

      if (!reducedMotion) {
        robot.position.y = -0.03 + Math.sin(time * 1.55) * 0.055;
        robot.rotation.y = Math.sin(time * 0.46) * 0.1;
        robot.userData.headPivot.rotation.y = Math.sin(time * 0.72) * 0.07;
        robot.userData.antennae.forEach((antenna, index) => {
          antenna.rotation.z = Math.sin(time * 2.1 + index * Math.PI) * 0.09;
        });
        robot.userData.legs.forEach((leg, index) => {
          leg.rotation.x = Math.sin(time * 1.55 + index * Math.PI) * 0.025;
        });

        robot.userData.arms.forEach((arm, index) => {
          const idle = Math.sin(time * 1.4 + index * 1.5) * 0.055;
          arm.rotation.x = idle;
          arm.rotation.z = (index === 0 ? -0.38 : 1.08) + idle;
          robot.userData.lowerArms[index].rotation.z = (index === 0 ? -0.12 : 1.22)
            + (index === 1 && robot.userData.wave > 0 ? Math.sin(time * 9) * 0.1 : idle);
        });
        robot.userData.wave = Math.max(0, robot.userData.wave - delta * 1.2);

        if (now >= blink.next) {
          blink.until = now + 135;
          blink.next = now + 2200 + Math.random() * 2800;
        }
        const blinkScale = now < blink.until ? 0.12 : 1;
        robot.userData.eyes.forEach(eye => { eye.scale.y = blinkScale; });
      }
      renderer.render(scene, camera);
    };
    animationFrame = requestAnimationFrame(animate);
  } catch (error) {
    console.error('Finny 3D initialization failed:', error);
  }
}

initFinny3d();