const { permissionsModel } = require('./permissions');
const { userModel } = require('./user');

permissionsModel.hasMany(userModel);
userModel.belongsTo(permissionsModel);
