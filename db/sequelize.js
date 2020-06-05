const Sequelize = require('sequelize');

// Option 2: Passing a connection URI
console.log(process.env.DB_CONNECTION_STRING);
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
