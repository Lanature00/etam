const openers = document.querySelectorAll<HTMLElement>('[data-modal-open]');

openers.forEach((opener) => {
  const dialog = document.querySelector<HTMLDialogElement>(
    `#${opener.dataset.modalOpen}`,
  );
  if (!dialog) return;

  opener.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('is-locked');
  });

  dialog.querySelectorAll('[data-modal-close]').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('is-locked');
    opener.focus();
  });
});