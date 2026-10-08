const burger = document.querySelector<HTMLButtonElement>('.nav__burger');
const menu = document.querySelector<HTMLElement>('#nav-menu');

if (burger && menu) {
  const setOpen = (open: boolean): void => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.classList.toggle('is-open', open);
  };

  burger.addEventListener('click', () => {
    setOpen(burger.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
}

const header = document.querySelector<HTMLElement>('.nav');

if (header) {
  const update = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 100);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}