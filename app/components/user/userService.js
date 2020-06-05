// cosnt validator = require('./userValidation')
const userModel = require('./userModel');

const createUser = async user => {
  try {
    const userCreated = await userModel.create(user);
  } catch (error) {
    console.log(err);
    console.log('oops we have an error');
  }
};

module.exports = {
  createUser
};
