let validate = require("validate.js");

const emailConstraints = {
  from: {
    email: true,
  },
};

/**
 * Validate email address
 * @param {string} value - Entered email address
 */
export function emailValidator(value) {
  let validated = validate({ from: value }, emailConstraints);

  if (validated === undefined) {
    return true;
  }

  return false;
}

/**
 * Check for valid length of phone number
 * @param {string} number Entered phone number
 */
export function phoneNumberValidator(number) {
  if (number.length > 6 && number.length < 12) {
    return true;
  }

  return false;
}
