/** DOM Elements **/
const mobileNavBtn = document.querySelector('#mobile-nav-btn');
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close-modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("#form-signup");

/****************************************************/
/****************** Binding events ******************/
/****************************************************/

// Mobile navigation "burger" menu event
mobileNavBtn.addEventListener('click', editNav);

// Launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

// Close modal event
modalCloseBtn.forEach(btn => btn.addEventListener("click", closeModal));

// Form submit event
form.addEventListener("submit", formSubmitCallback);

// Form controls validation events, triggered every time user types in an input
formData.forEach(element => element.addEventListener("input", () => validateFormControl(element)));

/***********************************************/
/****************** Functions ******************/
/***********************************************/

/**
 * Toggles responsive class for mobile navigation
 */
function editNav(e) {

  // Preventing the link from being followed
  e.preventDefault();

  let headerElement = document.getElementById("myTopnav");
  
  if (!headerElement.classList.contains("responsive")) {
    console.log(headerElement.classList);
    headerElement.classList.add("responsive");
  } else {
    headerElement.classList.remove("responsive");
  }
}

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

  // If form isn't valid, check every form controls to display error messages
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

    // Hidding error message if input is valid
    element.dataset.errorVisible = false;

  } else {

    // Checking which validation error occured to write the right message

    if (input.type === 'text' && input.validity.tooShort)
      element.dataset.error = "Veuillez entrer au moins 2 caractères";

    if (input.type === 'email' && input.validity.patternMismatch)
      element.dataset.error = "Veuillez entrer une adresse email valide. Ex : john.doe@gmail.com";

    if (!['date', 'radio', 'checkbox'].includes(input.type) && input.value.length === 0)
      element.dataset.error = "Veuillez remplir ce champs";

    // Showing the error message
    element.dataset.errorVisible = true;
    
  }
}

/**
 * Callback function for form submit event
 * @param {Event} e - The submit event
 */
function formSubmitCallback(e) {

  // Preventing the form from submitting
  e.preventDefault();

  const targetForm = e.target;
  const formDataValidation = validateForm(targetForm);

  if (formDataValidation) {
    const formData = new FormData(targetForm);
    targetForm.classList.add('submit-success');
  }
}
