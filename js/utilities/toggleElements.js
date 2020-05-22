/**
 * @param {node} allElements Group of elements
 * @param {node} selectedElement Selected element
 * @param {string} className Class that should be toggled
 */
let toggleElements = (allElements, selectedElement, className) => {
  allElements.forEach((element) => {
    element.classList.remove(className);
  });

  selectedElement.classList.add(className);
};

export default toggleElements;
