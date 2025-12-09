const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Visit = sequelize.define('Visit', {
  userId: DataTypes.STRING,
  page: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userAgent: DataTypes.STRING,
  ip: DataTypes.STRING
});

module.exports = Visit;
