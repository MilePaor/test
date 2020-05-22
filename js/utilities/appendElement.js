/**
 * @param {node} reference Node that element should be attached at
 * @param {string} message Text on element
 * @param {string} element Type of element eg. SPAN, DIV
 * @param {string} className Class
 */
let appendElement = (reference, message, element, className) => {
  let errorElement = document.createElement(element);
  errorElement.innerText = message;
  if (Array.isArray(className)) {
    errorElement.classList.add(...className);
  } else {
    errorElement.classList.add(className);
  }

  reference.parentNode.insertBefore(errorElement, reference.nextSibling);
};

export default appendElement;
