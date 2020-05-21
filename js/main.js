import { emailValidator, phoneNumberValidator } from "./utilities/validators";
import appendErrorMessage from "./utilities/appendErrorMessage";

(function () {
  let activeView = "mobile";
  // newNode;

  let DOM = {
    tabs: document.querySelectorAll(".js-formTab"),
    inputViews: document.querySelectorAll(".js-inputViews"),
    mobileInput: document.querySelector(".js-mobileNumberValue"),
    emailInput: document.querySelector(".js-emailValue"),
    currencyCheckbox: document.querySelectorAll('input[name="currency"]'),
    termsAndConditionsCheckbox: document.querySelector('input[name="terms"]'),
    promotionsCheckbox: document.querySelector('input[name="promotion"]'),
    submitButton: document.querySelector(".js-submitForm"),
    form: document.querySelector(".js-registrationForm"),
    termsContainer: document.querySelector(".js-termsContainer"),
  };

  function toggleElements(allElements, selectedElement, className) {
    allElements.forEach((element) => {
      element.classList.remove(className);
    });

    selectedElement.classList.add(className);
  }

  DOM.tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      activeView = this.getAttribute("data-tab-name");
      let selectedInputView = document.querySelector(`.js-${activeView}View`);

      toggleElements(DOM.tabs, tab, "form__tab--active");
      toggleElements(
        DOM.inputViews,
        selectedInputView,
        "form__option-fieldset--active"
      );
    });
  });

  let sendDataToServer = (data) => {
    console.log(data);
  };

  let removeOldErrors = () => {
    let oldErrors = document.querySelectorAll(".error-message");

    if (oldErrors) {
      oldErrors.forEach((element) => {
        element.remove();
      });
    }
  };

  DOM.submitButton.addEventListener("click", function (e) {
    let isEmailValid = emailValidator(DOM.emailInput.value);
    let isMobileNumberValid = phoneNumberValidator(DOM.mobileInput.value);
    let isTermsAccepted = DOM.termsAndConditionsCheckbox.checked;
    let isPromotionChecked = DOM.promotionsCheckbox.checked;
    let selectedCurrency;

    removeOldErrors();

    let errorMessage = (errorType) => {
      switch (errorType) {
        case "email":
          appendErrorMessage(DOM.emailInput, "Email is not valid");
          break;
        case "phone":
          appendErrorMessage(DOM.mobileInput, "Mobile phone is not valid");
          break;
        case "terms":
          appendErrorMessage(
            DOM.termsContainer,
            "You must agree with terms and conditions"
          );
          break;
      }
    };

    DOM.currencyCheckbox.forEach(({ checked, value }) => {
      if (checked) {
        selectedCurrency = value;
      }
    });

    if (activeView === "mobile") {
      if (!isMobileNumberValid) {
        errorMessage("phone");
      }

      if (!isTermsAccepted) {
        errorMessage("terms");
      }

      if (isMobileNumberValid && isTermsAccepted) {
        sendDataToServer({
          currency: selectedCurrency,
          promotion: isPromotionChecked,
          [activeView]: DOM[`${activeView}Input`].value,
        });

        return true;
      } else {
        e.preventDefault();
        return false;
      }
    }

    if (activeView === "email") {
      if (!isEmailValid) {
        errorMessage("email");
      }

      if (!isTermsAccepted) {
        errorMessage("terms");
      }

      if (isEmailValid && isTermsAccepted) {
        sendDataToServer({
          currency: selectedCurrency,
          promotion: isPromotionChecked,
          [activeView]: DOM[`${activeView}Input`].value,
        });

        return true;
      } else {
        e.preventDefault();
        return false;
      }
    }
  });
})();
