const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

const Test = sequelize.define('Test', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Test;
