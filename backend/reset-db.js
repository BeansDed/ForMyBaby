// Reset Database Script
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/forbaby', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('💕 Connected to MongoDB');
  
  try {
    console.log('\n🗑️  Resetting database...');
    
    // Clear all collections
    const collections = [
      'lovecounts',
      'memories',
      'notes',
      'bucketlistitems',
      'openwhenletters',
      'visits'
    ];
    
    for (const collection of collections) {
      const result = await mongoose.connection.db.collection(collection).deleteMany({});
      console.log(`✅ Cleared ${collection}: ${result.deletedCount} documents`);
    }
    
    // Create fresh global love counter
    const LoveCount = require('./models/LoveCount');
    const globalCounter = new LoveCount({
      userId: 'global',
      count: 0,
      date: new Date(),
      updatedAt: new Date(),
    });
    await globalCounter.save();
    console.log('✅ Created fresh global love counter (count: 0)');
    
    console.log('\n🎉 Database reset complete!');
    console.log('\n💡 To seed with sample data, run: npm run seed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Reset error:', error);
    process.exit(1);
  }
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

