const Sequelize = require('sequelize');
const sequelize = require('../../../db/sequelize');
const { encryption } = require('../../util');

const { Model, DataTypes } = Sequelize;
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
      // allowNull defaults to true
    }
  },
  {
    hooks: {
      beforeCreate: async user => {
        // encyrpt the user password so it wont be shown on the database
        const hashedPassword = await encryption.hashPassword(user.password);
        user.password = hashedPassword;
      }
    },
    sequelize,
    modelName: 'user'
    // options
  }
);

module.exports = User;
