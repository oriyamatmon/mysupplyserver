const validator = require('validator');

const validateCreateUser = user => {
  // array of errors to insert errors we discovered
  const errors = [];
  // validate firstName
  if (
    !user.firstName ||
    validator.isEmpty(user.firstName) ||
    !validator.isLength(user.firstName, { min: 3, max: 100 })
  ) {
    errors.push('Invalid first name');
  }
  // validate lastName
  if (
    !user.lastName ||
    validator.isEmpty(user.lastName) ||
    !validator.isLength(user.lastName, { min: 3, max: 100 })
  ) {
    errors.push('Invalid last name');
  }
  // validate email
  if (!user.email || validator.isEmpty(user.email) || !validator.isEmail(user.email)) {
    errors.push('Invalid email');
  }

  // validate phone
  if (
    !user.phone ||
    validator.isEmpty(user.phone) ||
    validator.isLength(user.lastName, { min: 10, max: 10 })
  ) {
    errors.push('Invalid phone number');
  }

  const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  // validate password
  if (
    !user.password ||
    validator.isEmpty(user.password) ||
    validator.isLength(user.lastName, { min: 8, max: 250 }) ||
    !passwordRegex.test(user.password)
  ) {
    errors.push('Invalid password');
  }

  return errors;
};

module.exports = {
  validateCreateUser
};
