const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Memory = sequelize.define('Memory', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: DataTypes.STRING,
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: DataTypes.STRING,
  submittedBy: {
    type: DataTypes.ENUM('boyfriend', 'girlfriend'),
    defaultValue: 'girlfriend'
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tags: {
    type: DataTypes.JSON, 
    defaultValue: []
  }
});

module.exports = Memory;
