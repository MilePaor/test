/**
 *
 * @param {node} reference Node that error should be attached at
 * @param {string} message Test on error message
 */
let appendElementAfter = (reference, message) => {
  let errorElement = document.createElement("SPAN");
  errorElement.innerText = message;
  errorElement.classList.add("error-message");

  reference.parentNode.insertBefore(errorElement, reference.nextSibling);
};

export default appendElementAfter;
