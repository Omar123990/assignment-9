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

function validateContact() {
  var isValid = true;

  var nameRegex = /^[A-Za-z ]{2,50}$/;
  if (!nameRegex.test(fullName.value)) {
    document.getElementById("fullNameError").innerText =
      "Name should contain only letters and spaces (2-50 characters)";
    fullName.classList.add("input-error");
    isValid = false;
  } else {
    document.getElementById("fullNameError").innerText = "";
    fullName.classList.remove("input-error");
  }

  var phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
  if (!phoneRegex.test(pNumber.value)) {
    document.getElementById("phoneError").innerText =
      "Please enter a valid Egyptian phone number";
    pNumber.classList.add("input-error");
    isValid = false;
  } else {
    document.getElementById("phoneError").innerText = "";
    pNumber.classList.remove("input-error");
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    document.getElementById("emailError").innerText =
      "Please enter a valid email address";
    emailInput.classList.add("input-error");
    isValid = false;
  } else {
    document.getElementById("emailError").innerText = "";
    emailInput.classList.remove("input-error");
  }
  return isValid;
}

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

  var modal = bootstrap.Modal.getInstance(
    document.getElementById("staticBackdrop")
  );
  modal.hide();

  Swal.fire({
    title: "Add",
    text: "Contact has been added successfully.",
    icon: "success",
    draggable: true,
  });
}

function displayContacts() {
  blackBox = ``;
  for (var i = 0; i < contactList.length; i++) {
    blackBox += `
    <div class="col-md-6 ">
          <div class="wrapper d-flex flex-column box-hover  rounded-4">
            <div class="p-3 bg-white">
              <div class="d-flex mb-3">
                <div
                  class="d-flex justify-content-center h-fit p-4 rounded-4 color-border bg-gold align-items-center position-relative"
                >
                <span class="text-white "> ${contactList[
                  i
                ].userName[0].toUpperCase()}</span>
                  <div
                    class="d-flex justify-content-center border border-1 p-1 border-white rounded-circle po-a-top align-items-center bg-gold
  ${contactList[i].favoriteInput ? "" : "d-none"}"
                  >
                    <i class="fa-star text-white fa-solid"></i>
                  </div>
                  <div
                    class="d-flex justify-content-center border border-1 p-1 border-white rounded-circle po-a-bottom align-items-center bg-icon-red
  ${contactList[i].EmergencyInput ? "" : "d-none"}"
                  >
                    <i class="fa-heart-pulse text-white fa-solid"></i>
                  </div>
                </div>
                <div class="w-100 ms-3">
                  <h3 class="mb-0 h5">${contactList[i].userName}</h3>
                  <span class="mb-0 d-flex align-items-center gap-2">
                    <div
                      class="p-2 rounded-2 bg-call d-flex justify-content-center w-fit"
                    >
                      <i class="fa-solid text-primary fa-phone"></i>
                    </div>
                    <span>${contactList[i].pNumber}</span>
                  </span>
                </div>
              </div>
              <div class="mt-2">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <div
                    class="p-2 rounded-2 bg-email d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid color-email fa-envelope"></i>
                  </div>
                  <span>${contactList[i].emailInput}</span>
                </div>
              </div>
              <div class="">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <div
                    class="p-2 rounded-2 bg-map d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid text-success fa-location-dot"></i>
                  </div>
                  <span>${contactList[i].addressInput}</span>
                </div>
              </div>
              <div class="mt-3 gap-2 d-flex">
                <span class="py-1 px-2 bg-red text-danger rounded-2
${contactList[i].EmergencyInput ? '' : 'invisible'}">
  <i class="fa-solid fa-heart-pulse"></i> Emergency
</span>
                <span class="py-1 px-2 bg-red text-danger rounded-2 ${
                  contactList[i].EmergencyInput ? "" : "d-none"
                }">
  <i class="fa-solid fa-heart-pulse"></i> Emergency
</span>
              </div>
            </div>
            <div
              class="py-10 d-flex justify-content-between align-items-center px-3 redues-b-l-r border bg-light border-1"
            >
              <div class="d-flex gap-3">
                <a class="text-decoration-none" href="tel:${
                  contactList[i].pNumber
                }">
                  <div
                    class="p-2 rounded-2 bg-map d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid text-success fa-phone"></i>
                  </div>
                </a>
                <a class="text-decoration-none" href="mailto:${
                  contactList[i].emailInput
                }">
                  <div
                    class="p-2 rounded-2 bg-email d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid color-email fa-envelope"></i>
                  </div>
                </a>
              </div>
              <div class="d-flex gap-2">
                <button onclick="addFavIcon(${i})" class="border-0 rounded-3 bg-warning bg-opacity-25 p-2"> <i class="${
      contactList[i].favoriteInput ? "fa-solid" : "fa-regular"
    } color-star fa-star"></i> </button>
                <button onclick="addEmerIcon(${i})" class="border-0 rounded-3 bg-danger-25 p-2"> <i class="${
      contactList[i].EmergencyInput ? "fa-solid" : "fa-regular"
    } color-heart fa-heart"></i> </button>
                <button onclick="editContact(${i})" id="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="border-0 rounded-3  bg-opacity-25 p-2"> <i class="fa-solid color-pen fa-pen"></i> </button>
                <button onclick="deleteContact(${i})" id="delete" class="border-0 rounded-3  bg-opacity-25 p-2"> <i class="fa-solid color-trash fa-trash"></i> </button>
              </div>
            </div>
          </div>
        </div>
    `;
  }
  document.querySelector("#calls").innerHTML = blackBox;
  totalNumber.innerText = contactList.length;

  var box = ``;
  for (var i = 0; i < favItems.length; i++) {
    box += `
    <div class="mb-2">
                    <div
                      class="d-flex bg-light rounded-4 p-10 align-items-center"
                    >
                      <div
                        class="d-flex justify-content-center me-3 h-fit p-2 rounded-4 color-border bg-icon-gradient align-items-center"
                      >
                        <i class="fa-solid fa-star text-white"></i>
                      </div>
                      <div class="d-flex flex-column">
                        <span>${favItems[i].userName}</span>
                        <span>${favItems[i].pNumber}</span>
                      </div>
                      <a
                        href="tel:${favItems[i].pNumber}"
                        class="p-3  bg-green text-decoration-none rounded-4 ms-auto"
                      >
                        <i class="fa-solid text-success fa-phone"></i>
                      </a>
                    </div>
                  </div>
    `;
  }
  document.querySelector("#favoriteNumbers").innerHTML = box;
  favoriteNumber.innerText = favItems.length;

  var boxEmergency = ``;
  for (var i = 0; i < emergencyItems.length; i++) {
    boxEmergency += `
    <div class="mb-2">
                    <div
                      class="d-flex bg-light rounded-4 p-10 align-items-center"
                    >
                      <div
                        class="d-flex justify-content-center me-3 h-fit p-2 rounded-4 color-border bg-icon-gradient align-items-center"
                      >
                        <i class="fa-solid fa-star text-white"></i>
                      </div>
                      <div class="d-flex flex-column">
                        <span>${emergencyItems[i].userName}</span>
                        <span>${emergencyItems[i].pNumber}</span>
                      </div>
                      <a
                        href="tel:${emergencyItems[i].pNumber}"
                        class="p-3  bg-red text-decoration-none rounded-4 ms-auto"
                      >
                        <i class="fa-solid text-danger fa-phone"></i>
                      </a>
                    </div>
                  </div>
    `;
  }
  document.querySelector("#emergencyNumbers").innerHTML = boxEmergency;
  emergencyNumber.innerText = emergencyItems.length;
}

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
var currentEditIndex;
function editContact(index) {
  clearValidationMessages();

  currentEditIndex = index;
  document.querySelector("#btnSave").classList.replace("d-block", "d-none");
  document.querySelector("#btnUpdate").classList.replace("d-none", "d-block");
  btnSave.classList.replace("d-block", "d-none");
  btnUpdate.classList.replace("d-none", "d-block");
  fullName.value = contactList[index].userName;
  pNumber.value = contactList[index].pNumber;
  emailInput.value = contactList[index].emailInput;
  addressInput.value = contactList[index].addressInput;
  selectInput.value = contactList[index].selectInput;
  favoriteInput.checked = contactList[index].favoriteInput;
  EmergencyInput.checked = contactList[index].EmergencyInput;
}
function updateContact() {
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
function clearForm() {
  fullName.value = "";
  pNumber.value = "";
  emailInput.value = "";
  addressInput.value = "";
  selectInput.value = "";
  favoriteInput.checked = false;
  EmergencyInput.checked = false;
}
document
  .querySelector("#staticBackdrop")
  .addEventListener("hidden.bs.modal", function () {
    document.querySelector("#btnSave").classList.replace("d-none", "d-block");
    document.querySelector("#btnUpdate").classList.replace("d-block", "d-none");
    clearForm();
  });
function search() {
  var blackBox = ``;
  for (let i = 0; i < contactList.length; i++) {
    if (
      contactList[i].userName
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()) ||
      contactList[i].emailInput
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()) ||
      contactList[i].pNumber
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    ) {
      blackBox += `
    <div class="col-md-6">
          <div class="wrapper d-flex flex-column box-hover bg-white rounded-4">
            <div class="p-3">
              <div class="d-flex mb-3">
                <div
                  class="d-flex justify-content-center h-fit p-3 rounded-4 color-border bg-icon-gradient align-items-center position-relative"
                >
                  <i class="fa-solid fa-star text-white fa-2x"></i>
                  <div
                    class="d-flex justify-content-center border border-1 p-1 border-white rounded-circle po-a-top align-items-center bg-gold
  ${contactList[i].favoriteInput ? "" : "d-none"}"
                  >
                    <i class="fa-star text-white fa-solid"></i>
                  </div>
                  <div
                    class="d-flex justify-content-center border border-1 p-1 border-white rounded-circle po-a-bottom align-items-center bg-icon-red
  ${contactList[i].EmergencyInput ? "" : "d-none"}"
                  >
                    <i class="fa-heart-pulse text-white fa-solid"></i>
                  </div>
                </div>
                <div class="w-100 ms-3">
                  <h3 class="mb-0 h5">${contactList[i].userName}</h3>
                  <span class="mb-0 d-flex align-items-center gap-2">
                    <div
                      class="p-2 rounded-2 bg-call d-flex justify-content-center w-fit"
                    >
                      <i class="fa-solid text-primary fa-phone"></i>
                    </div>
                    <span>${contactList[i].pNumber}</span>
                  </span>
                </div>
              </div>
              <div class="mt-2">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <div
                    class="p-2 rounded-2 bg-email d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid color-email fa-envelope"></i>
                  </div>
                  <span>${contactList[i].emailInput}</span>
                </div>
              </div>
              <div class="">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <div
                    class="p-2 rounded-2 bg-map d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid text-success fa-location-dot"></i>
                  </div>
                  <span>${contactList[i].addressInput}</span>
                </div>
              </div>
              <div class="mt-3 gap-2 d-flex">
                <span class="py-1 px-2 bg-call text-primary rounded-2"
                  >${contactList[i].selectInput}</span
                >
                <span class="py-1 px-2 bg-red text-danger rounded-2"
                  ><i class="fa-solid fa-heart-pulse"></i> Emergency</span
                >
              </div>
            </div>
            <div
              class="py-10 d-flex justify-content-between align-items-center px-3 redues-b-l-r border bg-light border-1"
            >
              <div class="d-flex gap-3">
                <a class="text-decoration-none" href="tel:${
                  contactList[i].pNumber
                }">
                  <div
                    class="p-2 rounded-2 bg-map d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid text-success fa-phone"></i>
                  </div>
                </a>
                <a class="text-decoration-none" href="mailto:${
                  contactList[i].emailInput
                }">
                  <div
                    class="p-2 rounded-2 bg-email d-flex justify-content-center w-fit"
                  >
                    <i class="fa-solid color-email fa-envelope"></i>
                  </div>
                </a>
              </div>
              <div class="d-flex gap-2">
                <button onclick="addFavIcon(${i})" class="border-0 rounded-3 bg-warning bg-opacity-25 p-2"> <i class="${
        contactList[i].favoriteInput ? "fa-solid" : "fa-regular"
      } color-star fa-star"></i> </button>
                <button onclick="addEmerIcon(${i})" class="border-0 rounded-3 bg-danger-25 p-2"> <i class="${
        contactList[i].EmergencyInput ? "fa-solid" : "fa-regular"
      } color-heart fa-heart"></i> </button>
                <button onclick="editContact(${i})" id="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="border-0 rounded-3  bg-opacity-25 p-2"> <i class="fa-solid color-pen fa-pen"></i> </button>
                <button onclick="deleteContact(${i})" id="delete" class="border-0 rounded-3  bg-opacity-25 p-2"> <i class="fa-solid color-trash fa-trash"></i> </button>
              </div>
            </div>
          </div>
        </div>
    `;
    }
  }
  document.querySelector("#calls").innerHTML = blackBox;
}
