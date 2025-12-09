const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true }
  },
  sessionId: DataTypes.STRING,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastVisit: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  visitCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = User;
