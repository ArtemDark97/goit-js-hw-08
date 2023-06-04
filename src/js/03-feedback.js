import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

form.addEventListener('input', throttle(saveFormState, 500));

window.addEventListener('load', loadFormState);

form.addEventListener('submit', submitForm);

function saveFormState() {
  const state = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadFormState() {
  const state = localStorage.getItem(storageKey);
  if (state) {
    const { email, message } = JSON.parse(state);
    emailInput.value = email;
    messageInput.value = message;
  }
}

function submitForm(event) {
  event.preventDefault();

  const state = {
    email: emailInput.value,
    message: messageInput.value
  };

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';

  console.log(state);
}