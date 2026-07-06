/**
 * COUNTER DEMO — closures & scope
 * ---------------------------------
 * createCounter() is a "factory" function. Each time we call it, it creates
 * a brand-new `value` variable that lives inside that function's scope.
 * The inner functions (increment, decrement, reset) form a CLOSURE over
 * `value` — they keep a private reference to it even after createCounter()
 * has finished running. That's why counterA and counterB below don't share
 * state, even though they're built from identical code.
 */
function createCounter(step = 1, start = 0) {
  let value = start; // private variable, not accessible from outside

  return {
    increment() {
      value += step;
      return value;
    },
    decrement() {
      value -= step;
      return value;
    },
    reset() {
      value = start;
      return value;
    },
    getValue() {
      return value;
    },
  };
}

// Two separate closures, two separate private `value` variables.
const counterA = createCounter(1, 0);
const counterB = createCounter(5, 0);

const counters = { a: counterA, b: counterB };

/**
 * HOISTING NOTE:
 * `logAction` below is called before its declaration further down the file.
 * That works because `function` declarations are hoisted — the whole
 * function (name + body) is registered in memory before any code runs.
 * Contrast that with `const totalClicks = 0` — the *variable* `totalClicks`
 * is hoisted too, but only the declaration, not the value. Trying to read
 * it before the `const` line would throw a ReferenceError (the "temporal
 * dead zone"), whereas `var` would just give you `undefined`.
 */
logAction('App started');

let totalClicks = 0; // only usable after this line, unlike hoisted functions

function logAction(message) {
  const el = document.getElementById('log');
  totalClicks += 1;
  el.textContent = `[${totalClicks}] ${message}`;
}

function render(target) {
  document.getElementById(`count-${target}`).textContent = counters[target].getValue();
}

// Event delegation: one listener on the body handles every button click.
document.body.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;

  const { action, target } = btn.dataset;
  const counter = counters[target];

  if (action === 'inc') counter.increment();
  if (action === 'dec') counter.decrement();
  if (action === 'reset') counter.reset();

  render(target);
  logAction(`Counter ${target.toUpperCase()} -> ${action}`);
});

// Initial paint
render('a');
render('b');
