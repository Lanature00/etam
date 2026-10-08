const form = document.querySelector<HTMLFormElement>('.modal .form');
const success = document.querySelector<HTMLElement>('.modal__success');

if (form && success) {
  const showError = (name: string, message: string): void => {
    const field = form.elements.namedItem(name) as HTMLInputElement;
    const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    field.setAttribute('aria-invalid', String(message !== ''));
    if (error) error.textContent = message;
  };

  const validate = (): boolean => {
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').replace(/[\s.-]/g, '');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(?:(?:\+|00)33|0)[1-9]\d{8}$/;

    const errors = {
      name: name.length < 2 ? 'Veuillez saisir votre nom et prénom.' : '',
      email: emailPattern.test(email)
        ? ''
        : 'Veuillez saisir une adresse e-mail valide.',
      phone: phonePattern.test(phone)
        ? ''
        : 'Veuillez saisir un numéro de téléphone valide.',
      consent: data.get('consent') ? '' : 'Vous devez accepter le règlement.',
    };

    Object.entries(errors).forEach(([field, message]) =>
      showError(field, message),
    );
    return Object.values(errors).every((message) => message === '');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    form.hidden = true;
    success.hidden = false;
  });
}