const Sequelize = require('sequelize');
const sequelize = require('../../../db/sequelize');

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
    },
    permissionsId: {
      type: Sequelize.INTEGER
      // allowNull defaults to true
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        console.log(`i am before create hook! this is the user ${user}`);
      }
    },
    sequelize,
    modelName: 'user'
    // options
  }
);

module.exports = User;
