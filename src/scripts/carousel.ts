const track = document.querySelector<HTMLElement>('.carousel__track');
const prev = document.querySelector<HTMLButtonElement>('.carousel__btn--avant');
const next = document.querySelector<HTMLButtonElement>('.carousel__btn--next');

if (track && prev && next) {
  const originals = Array.from(track.children) as HTMLElement[];
  const count = originals.length;

  const makeClones = (): HTMLElement[] =>
    originals.map((slide) => {
      const clone = slide.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelector('img')?.setAttribute('alt', '');
      return clone;
    });

  track.prepend(...makeClones());
  track.append(...makeClones());

  const slides = Array.from(track.children) as HTMLElement[];
  let setWidth = 0;

  const measure = (): void => {
    setWidth = slides[count].offsetLeft - slides[0].offsetLeft;
  };

  const wrap = (): void => {
    if (track.scrollLeft <= 0) track.scrollLeft += setWidth;
    else if (track.scrollLeft >= 2 * setWidth) track.scrollLeft -= setWidth;
  };

  const init = (): void => {
    measure();
    track.scrollLeft = setWidth;
  };

  init();
  window.addEventListener('resize', init);
  track.addEventListener('scroll', wrap, { passive: true });

  const step = (): number => slides[1].offsetLeft - slides[0].offsetLeft;
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  let isDragging = false;
  let hasMoved = false;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    isDragging = true;
    hasMoved = false;
    track.setPointerCapture(e.pointerId);
    track.classList.add('is-dragging');
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    if (Math.abs(e.movementX) > 0) hasMoved = true;
    track.scrollLeft -= e.movementX;
  });

  const stopDrag = (): void => {
    isDragging = false;
    track.classList.remove('is-dragging');
  };

  track.addEventListener('pointerup', stopDrag);
  track.addEventListener('pointercancel', stopDrag);

  track.addEventListener(
    'click',
    (e) => {
      if (hasMoved) e.preventDefault();
    },
    true,
  );
}