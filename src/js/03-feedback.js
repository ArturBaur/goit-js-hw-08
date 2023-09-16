import throttle from 'lodash.throttle';

const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const feedbackForm = document.querySelector('.feedback-form');

const handleInput = () => {
  const emailValue = emailInput.value;
  const messageValue = messageInput.value;

  const formData = {
    email: emailValue,
    message: messageValue,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

feedbackForm.addEventListener('input', throttle(handleInput, 500));

const populateFormFields = () => {
  const formDataJSON = localStorage.getItem('feedback-form-state');
  if (formDataJSON) {
    const formData = JSON.parse(formDataJSON);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

window.addEventListener('load', populateFormFields);

const handleSubmit = event => {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';

  console.log('Form data submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });
};

feedbackForm.addEventListener('submit', handleSubmit);
