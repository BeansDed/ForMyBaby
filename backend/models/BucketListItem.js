const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BucketListItem = sequelize.define('BucketListItem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('Travel', 'Romance', 'Adventure', 'Life Goals', 'Activities', 'Other'),
    defaultValue: 'Other'
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  completedDate: DataTypes.DATE
});

module.exports = BucketListItem;
