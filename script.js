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
 * `logAction('App started')` is called below before its own
 * `function logAction(...)` declaration further down the file — that's
 * fine because function declarations are hoisted — the whole function
 * (name + body) is registered in memory before any code runs.
 * `totalClicks`, on the other hand, has to be declared with `let` BEFORE
 * this point. `let`/`const` variables are hoisted too, but only the
 * declaration, not the value — reading them before their line executes
 * throws a ReferenceError (the "temporal dead zone"), unlike `var`, which
 * would just give you `undefined`.
 */
let totalClicks = 0;

logAction('App started');

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
