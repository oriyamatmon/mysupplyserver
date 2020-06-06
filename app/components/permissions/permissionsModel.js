const Sequelize = require('sequelize');
const sequelize = require('../../../db/sequelize');

const { Model, DataTypes } = Sequelize;
class Permissions extends Model {}
Permissions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'permissions'
    // options
  }
);

module.exports = Permissions;
