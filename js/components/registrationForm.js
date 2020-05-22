import { emailValidator, phoneNumberValidator } from "../utilities/validators";
import appendElement from "../utilities/appendElement";
import toggleElements from "../utilities/toggleElements";

function registrationForm() {
  let activeView = "mobile";
  let isRequestSuccessfull = true;

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
    formBox: document.querySelector(".js-formBox"),
    formDescription: document.querySelector(".js-formDescription"),
    loader: document.querySelector(".js-loader"),
    requestConfigCheckbox: document.querySelector(".js-requestConfigCheckbox"),
  };

  let removeOldErrors = () => {
    let oldErrors = document.querySelectorAll(".error-message");

    if (oldErrors) {
      oldErrors.forEach((element) => {
        element.remove();
      });
    }
  };

  let handleLoader = (isLoaderVisible) => {
    if (isLoaderVisible) {
      DOM.loader.classList.add("js-loader--active");
      DOM.formBox.style.display = "none";
    } else {
      DOM.loader.classList.remove("js-loader--active");
    }
  };

  let sendDataToServer = (data) => {
    handleLoader(true);

    let req = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!isRequestSuccessfull) {
            throw new Error();
          }
          return resolve(data);
        } catch (e) {
          reject(e);
        }
      }, 2000);
    });

    let successfullySubmitedForm = (data) => {
      handleLoader(false);

      appendElement(
        DOM.formDescription,
        "Successfully registered! Account is created. Please login.",
        "DIV",
        ["form-msg", "form-msg--success"]
      );
    };

    let errorOnSubmitingForm = () => {
      handleLoader(false);
      appendElement(DOM.formDescription, "Something went wrong!", "DIV", [
        "form-msg",
        "form-msg--error",
      ]);
    };

    req
      .then((data) => {
        console.log("submited data", data);
        successfullySubmitedForm(data);
      })
      .catch(() => {
        errorOnSubmitingForm();
      });
  };

  // Request configurator
  DOM.requestConfigCheckbox.addEventListener("change", function (e) {
    isRequestSuccessfull = e.target.checked;
  });

  // Tabs
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

  // Submit form
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
          appendElement(
            DOM.emailInput,
            "Email is not valid",
            "SPAN",
            "error-message"
          );
          break;
        case "phone":
          appendElement(
            DOM.mobileInput,
            "Mobile number is not valid",
            "SPAN",
            "error-message"
          );
          break;
        case "terms":
          appendElement(
            DOM.termsAndConditionsCheckbox,
            "You must agree with terms and conditions",
            "SPAN",
            "error-message"
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
        let data = {
          currency: selectedCurrency,
          promotion: isPromotionChecked,
          [activeView]: DOM[`${activeView}Input`].value,
        };

        sendDataToServer(data);
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
        let data = {
          currency: selectedCurrency,
          promotion: isPromotionChecked,
          [activeView]: DOM[`${activeView}Input`].value,
        };

        sendDataToServer(data);
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    }

    e.preventDefault();
    // return true;
  });
}

export default registrationForm;
