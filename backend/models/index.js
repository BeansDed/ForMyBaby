const sequelize = require('../config/database');
const Admin = require('./Admin');
const BucketListItem = require('./BucketListItem');
const LoveCount = require('./LoveCount');
const Memory = require('./Memory');
const Note = require('./Note');
const OpenWhenLetter = require('./OpenWhenLetter');
const User = require('./User');
const Visit = require('./Visit');

// Sync all models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use alter to update schema without dropping
    console.log('📦 Database synced successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error);
  }
};

module.exports = {
  sequelize,
  syncDatabase,
  Admin,
  BucketListItem,
  LoveCount,
  Memory,
  Note,
  OpenWhenLetter,
  User,
  Visit
};
