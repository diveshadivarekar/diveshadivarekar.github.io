/**
 * Scroll effects. Nothing here is needed to read the page: the effects only switch on
 * when this script runs and the visitor hasn't asked their device to reduce motion.
 *
 *   data-speed="0.2"  drifts as you scroll (negative values drift the other way)
 *   data-zoom         grows to full size while scrolling into view
 *   data-hero-copy    eases away as the top of the page scrolls out
 *   data-statement    lights up its .word children one by one
 */
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const wide = matchMedia('(min-width: 1024px)');

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const drifting = [...document.querySelectorAll<HTMLElement>('[data-speed]')];
const zooming = [...document.querySelectorAll<HTMLElement>('[data-zoom]')];
const heroCopy = document.querySelector<HTMLElement>('[data-hero-copy]');
const statements = [...document.querySelectorAll<HTMLElement>('[data-statement]')].map((element) => ({
  element,
  words: [...element.querySelectorAll<HTMLElement>('.word')],
}));

function reset() {
  root.classList.remove('motion');
  root.style.removeProperty('--scroll');
  for (const el of [...drifting, ...zooming, ...(heroCopy ? [heroCopy] : [])]) {
    el.style.translate = el.style.scale = el.style.opacity = '';
  }
}

function update() {
  if (reduced.matches) return;
  const view = window.innerHeight;
  root.style.setProperty('--scroll', String(Math.min(window.scrollY, 1200)));

  // The parent is measured because it doesn't move, so the effect can't feed back.
  for (const el of drifting) {
    const box = el.parentElement!.getBoundingClientRect();
    if (box.bottom < -200 || box.top > view + 200) continue;
    const distance = el.hasAttribute('data-from-top')
      ? window.scrollY // starts in its designed position at the top of the page
      : box.top + box.height / 2 - view / 2;
    const strength = wide.matches ? 1 : 0.5;
    el.style.translate = `0 ${(distance * Number(el.dataset.speed) * strength).toFixed(1)}px`;
  }

  for (const el of zooming) {
    const box = el.parentElement!.getBoundingClientRect();
    const progress = clamp((view - box.top) / (view * 0.75));
    el.style.scale = (0.86 + 0.14 * progress).toFixed(3);
  }

  if (heroCopy) {
    // Only on wide screens: on phones the text is still being read as it scrolls.
    const progress = wide.matches ? clamp(window.scrollY / (view * 0.9)) : 0;
    heroCopy.style.translate = `0 ${(progress * 90).toFixed(1)}px`;
    heroCopy.style.opacity = (1 - progress * 0.85).toFixed(3);
  }

  for (const { element, words } of statements) {
    const box = element.getBoundingClientRect();
    const travel = Math.max(1, box.height - view);
    const progress = clamp((view * 0.25 - box.top) / (travel + view * 0.1));
    const lit = progress * words.length;
    words.forEach((word, i) => (word.style.opacity = (0.16 + 0.84 * clamp(lit - i)).toFixed(3)));
  }
}

let queued = false;
function schedule() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    update();
  });
}

function start() {
  if (reduced.matches) {
    reset();
    statements.forEach(({ words }) => words.forEach((word) => (word.style.opacity = '')));
    return;
  }
  root.classList.add('motion');
  update();
}

addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule, { passive: true });
reduced.addEventListener('change', start);
start();
