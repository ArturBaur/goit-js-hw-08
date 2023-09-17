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

  const emailValue = emailInput.value;
  const messageValue = messageInput.value;

  if (!emailValue || !messageValue) {
    alert('Wypełnij wszystkie pola formularza przed wysłaniem.');
    return;
  }

  console.log('Form data submitted:', {
    email: emailValue,
    message: messageValue,
  });

  emailInput.value = '';
  messageInput.value = '';

  localStorage.removeItem('feedback-form-state');
};

feedbackForm.addEventListener('submit', handleSubmit);
