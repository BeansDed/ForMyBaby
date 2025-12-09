const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoveCount = sequelize.define('LoveCount', {
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  userId: DataTypes.STRING,
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = LoveCount;
