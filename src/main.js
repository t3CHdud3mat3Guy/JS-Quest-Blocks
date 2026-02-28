import './style.css';

const app = document.getElementById('app');
app.innerHTML = `
<div class="container">
  <aside class="panel">
    <h1>🚀 JS Quest Blocks Pro</h1>
    <p class="muted">Scratch-style for kids + deeper JavaScript practice for adults.</p>

    <button class="block-btn cmd-move" data-cmd="move">➡️ moveRight()</button>
    <button class="block-btn cmd-loop" data-cmd="repeat">🔁 repeat 2x { moveRight }</button>
    <button class="block-btn cmd-if" data-cmd="ifcoin">🪙 if (nearCoin) { celebrate }</button>
    <button class="block-btn cmd-fn" data-cmd="function">🧩 function sprint() { moveRight() }</button>
    <button class="block-btn cmd-async" data-cmd="await">⏳ await wait(300)</button>

    <p class="chip">Concepts: variables, functions, loops, conditionals, async/await</p>
  </aside>

  <main class="panel">
    <h2>Block Program</h2>
    <div id="workspace" class="workspace"></div>
    <div class="row">
      <button id="runBtn">▶ Run</button>
      <button id="clearBtn">🧹 Clear</button>
      <button id="hintBtn">💡 Hint</button>
    </div>
    <div id="stage">
      <div id="player">🤖</div>
      <div id="coin"></div>
    </div>
    <div id="log" class="log">Build your program and press Run.</div>
  </main>

  <section class="panel lab">
    <h2>Code Playground</h2>
    <p class="muted">Free-form JavaScript sandbox: try anything, inspect output, and keep your draft saved locally.</p>

    <div class="row" style="margin-bottom:8px">
      <select id="templateSelect" class="select-box">
        <option value="starter">Starter</option>
        <option value="arrays">Arrays + map/filter/reduce</option>
        <option value="objects">Objects + destructuring</option>
        <option value="classes">Classes + methods</option>
        <option value="async">Promises + async/await</option>
      </select>
      <button id="loadTemplate">Load Template</button>
      <button id="runCode">Run JS</button>
      <button id="clearOutput">Clear Output</button>
      <button id="resetCode">Reset Code</button>
    </div>

    <textarea id="code"></textarea>
    <h3 style="margin-top:8px">Output</h3>
    <pre id="output">(output will appear here)</pre>
  </section>
</div>`;

const workspace = document.getElementById('workspace');
const log = document.getElementById('log');
const player = document.getElementById('player');
const coin = document.getElementById('coin');
const code = document.getElementById('code');
const output = document.getElementById('output');
const templateSelect = document.getElementById('templateSelect');

const program = [];
let x = 0;
const goal = 5;

const labels = {
  move: 'moveRight()',
  repeat: 'repeat 2x { moveRight() }',
  ifcoin: 'if (nearCoin) { celebrate() }',
  function: 'function sprint() { moveRight(); moveRight(); }',
  await: 'await wait(300)'
};

const templates = {
  starter: `// Welcome to the playground!\n// Tip: use console.log(...) to print output.\nconst message = 'Play around with JavaScript 🚀';\nconsole.log(message);`,
  arrays: `const numbers = [2, 4, 6, 8, 10];\nconst doubled = numbers.map(n => n * 2);\nconst evensOver10 = doubled.filter(n => n > 10);\nconst sum = evensOver10.reduce((acc, n) => acc + n, 0);\nconsole.log('numbers:', numbers);\nconsole.log('doubled:', doubled);\nconsole.log('evensOver10:', evensOver10);\nconsole.log('sum:', sum);`,
  objects: `const user = {\n  id: 1,\n  name: 'Jamie',\n  role: 'Creator',\n  points: 99\n};\nconst { name, role, ...rest } = user;\nconsole.log('name:', name);\nconsole.log('role:', role);\nconsole.log('rest:', rest);`,
  classes: `class Character {\n  constructor(name, hp) {\n    this.name = name;\n    this.hp = hp;\n  }\n  heal(points) {\n    this.hp += points;\n    return this.hp;\n  }\n}\nconst hero = new Character('Nova', 40);\nconsole.log('before:', hero.hp);\nconsole.log('after:', hero.heal(15));`,
  async: `const wait = ms => new Promise(resolve => setTimeout(resolve, ms));\n\nasync function run() {\n  console.log('Fetching data...');\n  await wait(300);\n  const data = await Promise.resolve({ status: 'ok', items: [1, 2, 3] });\n  console.log('done:', data);\n}\n\nrun();`
};

function render() {
  workspace.innerHTML = '';
  if (!program.length) {
    workspace.innerHTML = '<p class="muted">No blocks yet. Add blocks from the left.</p>';
    return;
  }

  program.forEach((cmd, idx) => {
    const el = document.createElement('div');
    el.className = 'step';
    el.innerHTML = `<span>${idx + 1}. ${labels[cmd]}</span><button data-remove="${idx}">✖</button>`;
    workspace.appendChild(el);
  });
}

function sync() {
  player.style.left = `${12 + x * 68}px`;
  if (x >= goal) coin.style.display = 'none';
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const moveRight = async () => {
  x = Math.min(goal, x + 1);
  sync();
  await wait(260);
};

const celebrate = async () => {
  for (let i = 0; i < 4; i++) {
    player.style.transform = `scaleX(${i % 2 ? -1 : 1})`;
    await wait(90);
  }
};

function resetStage() {
  x = 0;
  coin.style.display = 'block';
  player.style.transform = 'scaleX(1)';
  sync();
}

async function runProgram() {
  if (!program.length) {
    log.innerHTML = '<span class="error">Add at least one block.</span>';
    return;
  }

  resetStage();
  log.textContent = 'Running...';

  for (const cmd of program) {
    if (cmd === 'move') await moveRight();
    if (cmd === 'repeat') {
      for (let i = 0; i < 2; i++) await moveRight();
    }
    if (cmd === 'function') {
      const sprint = async () => {
        await moveRight();
        await moveRight();
      };
      await sprint();
    }
    if (cmd === 'await') await wait(300);
    if (cmd === 'ifcoin') {
      if (x >= goal) await celebrate();
      else log.innerHTML = '<span class="error">if condition false: not near coin yet.</span>';
    }
  }

  if (x >= goal) log.innerHTML = '<span class="success">Success! You used JS logic to win.</span>';
}

function persistCode() {
  localStorage.setItem('jsQuestPlaygroundCode', code.value);
}

function loadTemplate(name) {
  code.value = templates[name] ?? templates.starter;
  persistCode();
}

async function runPlaygroundCode() {
  const logs = [];
  const start = performance.now();

  const customConsole = {
    log: (...args) => logs.push(args.map((value) => String(value)).join(' ')),
    error: (...args) => logs.push(`[error] ${args.map((value) => String(value)).join(' ')}`)
  };

  try {
    const fn = new Function(
      'console',
      'setTimeout',
      'setInterval',
      'clearTimeout',
      'clearInterval',
      `return (async () => {\n${code.value}\n})();`
    );

    await fn(customConsole, setTimeout, setInterval, clearTimeout, clearInterval);
    const duration = (performance.now() - start).toFixed(1);
    output.textContent = `${logs.join('\n') || '(no output)'}\n\n✓ finished in ${duration}ms`;
  } catch (err) {
    output.textContent = `Error: ${err.message}`;
  }
}

// Block controls
document.querySelectorAll('[data-cmd]').forEach((button) => {
  button.addEventListener('click', () => {
    program.push(button.dataset.cmd);
    render();
  });
});

workspace.addEventListener('click', (event) => {
  const idx = event.target?.dataset?.remove;
  if (idx !== undefined) {
    program.splice(Number(idx), 1);
    render();
  }
});

document.getElementById('runBtn').addEventListener('click', runProgram);
document.getElementById('clearBtn').addEventListener('click', () => {
  program.length = 0;
  resetStage();
  log.textContent = 'Cleared.';
  render();
});
document.getElementById('hintBtn').addEventListener('click', () => {
  program.length = 0;
  program.push('repeat', 'function', 'ifcoin');
  render();
});

// Playground controls
const storedCode = localStorage.getItem('jsQuestPlaygroundCode');
code.value = storedCode || templates.starter;

document.getElementById('loadTemplate').addEventListener('click', () => {
  loadTemplate(templateSelect.value);
  output.textContent = `Loaded template: ${templateSelect.value}`;
});
document.getElementById('runCode').addEventListener('click', runPlaygroundCode);
document.getElementById('clearOutput').addEventListener('click', () => {
  output.textContent = '(output cleared)';
});
document.getElementById('resetCode').addEventListener('click', () => {
  loadTemplate('starter');
  output.textContent = 'Code reset to starter template.';
});

code.addEventListener('input', persistCode);

render();
resetStage();
