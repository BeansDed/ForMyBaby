const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OpenWhenLetter = sequelize.define('OpenWhenLetter', {
  occasion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  emoji: {
    type: DataTypes.STRING(10),
    defaultValue: '💌'
  },
  opened: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  openedDate: DataTypes.DATE,
  userId: DataTypes.STRING,
  submittedBy: {
    type: DataTypes.ENUM('boyfriend', 'girlfriend'),
    defaultValue: 'girlfriend'
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = OpenWhenLetter;
