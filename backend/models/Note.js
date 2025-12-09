const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Note = sequelize.define('Note', {
  content: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  emoji: {
    type: DataTypes.STRING(10),
    defaultValue: '💕'
  },
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

module.exports = Note;
