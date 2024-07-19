function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/** DOM Elements **/
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close-modal-btn");
const modalCloseBtnSubmitted = document.querySelector(".close-modal-btn-submitted");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("#form-signup");

/****************************************************/
/****************** Binding events ******************/
/****************************************************/
// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
// close modal event
modalCloseBtn.forEach(btn => btn.addEventListener("click", closeModal));
// form submit event
form.addEventListener("submit", formSubmitCallback);
// form controls validation events
formData.forEach(element => element.addEventListener("input", () => validateFormControl(element)));

/***********************************************/
/****************** Functions ******************/
/***********************************************/

/**
 * Launches modal form
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Closes modal form
 */
function closeModal() {
  modalbg.style.display = "none";
  form.reset();
  form.classList.remove('submit-success');
  formData.forEach(data => data.dataset.errorVisible = false);
}

/**
 * Validates form data
 * @param {HTMLFormElement} form - The form element
 * @returns {boolean} - True if form data is valid, false otherwise
 */
function validateForm(form) {
  formData.forEach(element => element.dataset.errorVisible = false);

  const isFormValid = form.checkValidity();

  if (!isFormValid) {
    formData.forEach(element => validateFormControl(element));
  }

  return isFormValid;
}

/**
 * Validates form controls individualy
 * @param {HTMLInputElement} element - The form control element
 * @returns {boolean} - True if form data is valid, false otherwise
 */
function validateFormControl(element) {
  const input = element.querySelector('input');

  if (input.validity.valid) {
    element.dataset.errorVisible = false;
  } else {
    if (input.type === 'text' && input.validity.tooShort)
      element.dataset.error = "Veuillez entrer au moins 2 caractères";

    /**
     * @TODO : Add more custom validation messages : disallowed characters, invalid email, etc.
     */
    if (input.type === 'email' && input.validity.patternMismatch)
      element.dataset.error = "Veuillez entrer une adresse email valide. Ex : john.doe@gmail.com";
    if (!['date', 'radio', 'checkbox'].includes(input.type) && input.value.length === 0)
      element.dataset.error = "Veuillez remplir ce champs";
    element.dataset.errorVisible = true;
  }
}

/**
 * Callback function for form submit event
 * @param {Event} e - The submit event
 */
function formSubmitCallback(e) {
  e.preventDefault();
  const targetForm = e.target;
  const formDataValidation = validateForm(targetForm);

  if (formDataValidation) {
    const formData = new FormData(targetForm);
    targetForm.classList.add('submit-success');
  }
}
