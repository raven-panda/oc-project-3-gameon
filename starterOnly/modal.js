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
const modalCloseBtn = document.querySelector("#close-modal-btn")
const formData = document.querySelectorAll(".formData");

/** Events listeners **/
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
modalCloseBtn.addEventListener("click", closeModal);

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
}
