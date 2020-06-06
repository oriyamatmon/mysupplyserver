const userValidator = require('./userValidation');
const userModel = require('./userModel');
const { logger } = require('../../util');

const createUser = async user => {
  try {
    // validate the data the user provided
    const isValidated = userValidator.validateCreateUser(user);
    if (isValidated.length) return isValidated;
    // check if the user already exist on our database
    const userExist = await userModel.findOne({ where: { email: user.email } });
    if (userExist) return ['user already exist'];
    // insert the user to the database
    await userModel.create(user);
    // if everything is ok we will send an empty array
    return [];
  } catch (error) {
    logger.debug(`error while creating user:${error}`);
    return ['server error, please try again'];
  }
};

module.exports = {
  createUser
};
