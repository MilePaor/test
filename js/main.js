let DOM = {
  tabs: document.querySelectorAll(".js-formTab"),
  inputViews: document.querySelectorAll(".js-inputViews"),
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
