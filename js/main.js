let validate = require("validate.js");

constraints = {
  from: {
    email: true,
  },
};

let DOM = {
  tabs: document.querySelectorAll(".js-formTab"),
  inputViews: document.querySelectorAll(".js-inputViews"),
  mobileNumberInput: document.querySelector(".js-mobileNumberValue"),
  emailInput: document.querySelector(".js-emailValue"),
  currencyCheckbox: document.querySelector('input[name="currency"]:checked'),
  termsAndConditionsCheckbox: document.querySelector(
    'input[name="terms"]:checked'
  ),
  promotionsCheckbox: document.querySelector('input[name="promotion"]:checked'),
  submitButton: document.querySelector(".js-submitForm"),
  form: document.querySelector(".js-registrationForm"),
};

function toggleElements(allElements, selectedElement, className) {
  allElements.forEach((element) => {
    element.classList.remove(className);
  });

  selectedElement.classList.add(className);
}

DOM.tabs.forEach((tabs) => {
  tabs.addEventListener("click", function (e) {
    let activeTab = this.getAttribute("data-tab-name");
    let selectedInputView = document.querySelector(`.js-${activeTab}View`);

    toggleElements(DOM.tabs, tabs, "form__tab--active");
    toggleElements(
      DOM.inputViews,
      selectedInputView,
      "form__option-fieldset--active"
    );
  });
});

DOM.submitButton.addEventListener("click", function () {
  let isEmailValid = validate({ from: DOM.emailInput.value }, constraints);
  // let isMobileNumberValid =
});
