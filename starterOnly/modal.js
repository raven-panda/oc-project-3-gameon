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
    const invalidElements = Array.from(form.elements)
    .filter(element => !element.checkValidity())
    .map(element => element.parentElement);

    invalidElements.forEach(element => {
      const input = element.querySelector('input');

      if (input.value.length === 0)
        element.dataset.error = "Veuillez remplir ce champs";
      if (input.type === 'text' && input.validity.tooShort)
        element.dataset.error = "Veuillez entrer au moins 2 caractères";
      if (input.type === 'email' && input.validity.patternMismatch)
        element.dataset.error = "Veuillez entrer une adresse email valide. Ex : john.doe@gmail.com";

      element.dataset.errorVisible = true;
    });
  }

  return isFormValid;
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
