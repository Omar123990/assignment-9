var totalNumber = document.querySelector("#totalNumber");
var favoriteNumber = document.querySelector("#favoriteNumber");
var emergencyNumber = document.querySelector("#emergencyNumber");
var calls = document.querySelector("#calls");
var fullName = document.querySelector("#full-name");
var pNumber = document.querySelector("#p-number");
var emailInput = document.querySelector("#emailInput");
var addressInput = document.querySelector("#addressInput");
var selectInput = document.querySelector("#selectInput");
var notesInput = document.querySelector("#notesInput");
var favoriteInput = document.querySelector("#favoriteInput");
var EmergencyInput = document.querySelector("#EmergencyInput");
var inputSearch = document.querySelector("#searchInput");
var contactList = [];
var favItems = [];
var emergencyItems = [];
var searchResults = [];

if (localStorage.getItem("contacts")) {
  contactList = JSON.parse(localStorage.getItem("contacts"));
  favoriteItems();
  emerItems();
  displayContacts();
}

function itemsDeleted() {
  if (contactList.length == 0) {
    document.querySelector(
      "#calls"
    ).innerHTML = `<p class="text-center">No contacts available. Please add a contact.</p>`;
  }
  if (favItems.length == 0) {
    document.querySelector(
      "#favoriteNumbers"
    ).innerHTML = `<p class="text-center">No contacts available. Please add a contact.</p>`;
  }
  if (emergencyItems.length == 0) {
    document.querySelector(
      "#emergencyNumbers"
    ).innerHTML = `<p class="text-center">No contacts available. Please add a contact.</p>`;
  }
}
itemsDeleted();

// ====== FLDATION FUNCTION ======
function validateContact() {
  let isValid = true;

  // الاسم بالكامل
  if (fullName.value.trim() === "") {
    showError(fullName, "fullNameError", "Please enter a full name.");
    isValid = false;
  } else if (!/^[A-Za-z ]{2,50}$/.test(fullName.value.trim())) {
    showError(fullName, "fullNameError", "Name should contain only letters and spaces (2-50 chars).");
    isValid = false;
  } else {
    clearError(fullName, "fullNameError");
  }

  // رقم التليفون
  if (pNumber.value.trim() === "") {
    showError(pNumber, "phoneError", "Please enter a phone number.");
    isValid = false;
  } else if (!/^(010|011|012|015)[0-9]{8}$/.test(pNumber.value.trim())) {
    showError(pNumber, "phoneError", "Please enter a valid Egyptian phone number.");
    isValid = false;
  } else {
    clearError(pNumber, "phoneError");
  }

  // الايميل
  if (emailInput.value.trim() === "") {
    showError(emailInput, "emailError", "Please enter an email address.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    showError(emailInput, "emailError", "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput, "emailError");
  }

  // العنوان
  if (addressInput.value.trim() === "") {
    showError(addressInput, "addressError", "Please enter an address.");
    isValid = false;
  } else {
    clearError(addressInput, "addressError");
  }

  // المجموعة
  if (selectInput.value === "Select a group") {
    showError(selectInput, "groupError", "Please select a group.");
    isValid = false;
  } else {
    clearError(selectInput, "groupError");
  }

  return isValid;
}

// دوال مساعدة لإظهار/إخفاء رسائل الخطأ
function showError(inputElement, errorId, message) {
  inputElement.classList.add("input-error");
  let errorSpan = document.getElementById(errorId);
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.id = errorId;
    errorSpan.className = "error-message text-danger";
    inputElement.parentNode.appendChild(errorSpan);
  }
  errorSpan.innerText = message;
}

function clearError(inputElement, errorId) {
  inputElement.classList.remove("input-error");
  let errorSpan = document.getElementById(errorId);
  if (errorSpan) {
    errorSpan.remove();
  }
}

// ====== SAVE CONTACT ======
function saveContact() {
  if (!validateContact()) return;

  document.activeElement.blur();

  var contact = {
    userName: fullName.value,
    pNumber: pNumber.value,
    emailInput: emailInput.value,
    addressInput: addressInput.value,
    selectInput: selectInput.value,
    favoriteInput: favoriteInput.checked,
    EmergencyInput: EmergencyInput.checked,
  };

  contactList.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contactList));
  favoriteItems();
  emerItems();
  displayContacts();
  clearForm();

  var modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
  modal.hide();

  Swal.fire({
    title: "Add",
    text: "Contact has been added successfully.",
    icon: "success",
    draggable: true,
  });
}

// ====== DISPLAY CONTACTS ======
function displayContacts() {
  blackBox = ``;
  for (var i = 0; i < contactList.length; i++) {
    blackBox += `...`; // هنا الكود الخاص بعرض كل كارد بدون تغيير
  }
  document.querySelector("#calls").innerHTML = blackBox;
  totalNumber.innerText = contactList.length;

  // FAVORITES
  var box = ``;
  for (var i = 0; i < favItems.length; i++) {
    box += `...`;
  }
  document.querySelector("#favoriteNumbers").innerHTML = box;
  favoriteNumber.innerText = favItems.length;

  // EMERGENCY
  var boxEmergency = ``;
  for (var i = 0; i < emergencyItems.length; i++) {
    boxEmergency += `...`;
  }
  document.querySelector("#emergencyNumbers").innerHTML = boxEmergency;
  emergencyNumber.innerText = emergencyItems.length;
}

// ====== FAVORITE & EMERGENCY ======
function favoriteItems() {
  favItems = [];
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].favoriteInput == true) {
      favItems.push(contactList[i]);
    }
  }
}
function emerItems() {
  emergencyItems = [];
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].EmergencyInput == true) {
      emergencyItems.push(contactList[i]);
    }
  }
}
function addFavIcon(index) {
  contactList[index].favoriteInput = !contactList[index].favoriteInput;
  localStorage.setItem("contacts", JSON.stringify(contactList));
  favoriteItems();
  displayContacts();
  itemsDeleted();
}
function addEmerIcon(index) {
  contactList[index].EmergencyInput = !contactList[index].EmergencyInput;
  localStorage.setItem("contacts", JSON.stringify(contactList));
  emerItems();
  displayContacts();
  itemsDeleted();
}

// ====== DELETE CONTACT ======
function deleteContact(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "This contact will be deleted permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    customClass: {
      confirmButton: "btn btn-danger mx-2",
      cancelButton: "btn btn-secondary mx-2",
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contactList));

      favoriteItems();
      emerItems();
      displayContacts();
      itemsDeleted();

      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

// ====== EDIT & UPDATE ======
var currentEditIndex;
function editContact(index) {
  clearValidationMessages();
  currentEditIndex = index;
  document.querySelector("#btnSave").classList.replace("d-block", "d-none");
  document.querySelector("#btnUpdate").classList.replace("d-none", "d-block");
  fullName.value = contactList[index].userName;
  pNumber.value = contactList[index].pNumber;
  emailInput.value = contactList[index].emailInput;
  addressInput.value = contactList[index].addressInput;
  selectInput.value = contactList[index].selectInput;
  favoriteInput.checked = contactList[index].favoriteInput;
  EmergencyInput.checked = contactList[index].EmergencyInput;
}
function updateContact() {
  if (!validateContact()) return;
  var contact = {
    userName: fullName.value,
    pNumber: pNumber.value,
    emailInput: emailInput.value,
    addressInput: addressInput.value,
    selectInput: selectInput.value,
    favoriteInput: favoriteInput.checked,
    EmergencyInput: EmergencyInput.checked,
  };
  contactList.splice(currentEditIndex, 1, contact);
  localStorage.setItem("contacts", JSON.stringify(contactList));
  favoriteItems();
  emerItems();
  displayContacts();
  Swal.fire({
    title: "Updated",
    text: "Contact has been updated successfully.",
    icon: "success",
    draggable: true,
  });
  document.querySelector("#btnSave").classList.replace("d-none", "d-block");
  document.querySelector("#btnUpdate").classList.replace("d-block", "d-none");
  clearForm();
}

// ====== CLEAR FORM ======
function clearForm() {
  fullName.value = "";
  pNumber.value = "";
  emailInput.value = "";
  addressInput.value = "";
  selectInput.value = "";
  favoriteInput.checked = false;
  EmergencyInput.checked = false;
}

function clearValidationMessages() {
  var inputs = [fullName, pNumber, emailInput];
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].style.border = "0";
    var errors = document.querySelectorAll(".error-message");
    for (var j = 0; j < errors.length; j++) {
      errors[j].remove(); 
    }
  }
}

document
  .querySelector("#staticBackdrop")
  .addEventListener("hidden.bs.modal", function () {
    document.querySelector("#btnSave").classList.replace("d-none", "d-block");
    document.querySelector("#btnUpdate").classList.replace("d-block", "d-none");
    clearForm();
  });

// ====== SEARCH ======
function search() {
  var blackBox = ``;
  for (let i = 0; i < contactList.length; i++) {
    if (
      contactList[i].userName.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
      contactList[i].emailInput.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
      contactList[i].pNumber.toLowerCase().includes(inputSearch.value.toLowerCase())
    ) {
      blackBox += `...`; // نفس طريقة عرض الكارد
    }
  }
  document.querySelector("#calls").innerHTML = blackBox;
}
