// Seed script to populate database with initial data
require('dotenv').config();
const { sequelize, syncDatabase, Admin, Memory, Note, BucketListItem, OpenWhenLetter } = require('./models');

async function seedDatabase() {
  try {
    console.log('🌱 Syncing and seeding database...');
    
    // Sync database first
    await syncDatabase();
    
    // Create admin user
    const adminExists = await Admin.findOne({ where: { username: process.env.ADMIN_USERNAME || 'admin' } });
    if (!adminExists) {
      await Admin.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'changeme123',
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    // Create sample memories (all approved)
    const memoriesCount = await Memory.count();
    if (memoriesCount === 0) {
      const memories = [
        {
          title: 'Our First Date',
          description: 'The day we met and everything changed. I knew you were special from the first moment.',
          date: new Date('2025-08-03'),
          tags: ['first date', 'romantic'],
          approved: true,
          submittedBy: 'boyfriend'
        },
        {
          title: 'First Kiss',
          description: 'Under the stars, our first kiss. My heart has never been the same since.',
          date: new Date('2025-08-10'),
          tags: ['romantic', 'milestone'],
          approved: true,
          submittedBy: 'boyfriend'
        },
      ];
      
      await Memory.bulkCreate(memories);
      console.log('✅ Sample memories created');
    } else {
      console.log('ℹ️  Memories already exist');
    }
    
    // Create sample notes (all approved)
    const notesCount = await Note.count();
    if (notesCount === 0) {
      const notes = [
        { content: 'You make every day brighter!', emoji: '☀️', approved: true, submittedBy: 'boyfriend' },
        { content: 'I love your smile', emoji: '😊', approved: true, submittedBy: 'boyfriend' },
        { content: 'Thinking of you always', emoji: '💭', approved: true, submittedBy: 'boyfriend' },
        { content: 'You are my everything', emoji: '💕', approved: true, submittedBy: 'boyfriend' },
      ];
      
      await Note.bulkCreate(notes);
      console.log('✅ Sample notes created');
    } else {
      console.log('ℹ️  Notes already exist');
    }
    
    // Create sample bucket list items (all approved)
    const bucketListCount = await BucketListItem.count();
    if (bucketListCount === 0) {
      const bucketList = [
        { title: 'Visit Paris together', category: 'Travel', approved: true, submittedBy: 'boyfriend' },
        { title: 'Watch sunrise on a beach', category: 'Romance', approved: true, submittedBy: 'boyfriend' },
        { title: 'Learn to dance together', category: 'Activities', approved: true, submittedBy: 'boyfriend' },
        { title: 'Build our dream home', category: 'Life Goals', approved: true, submittedBy: 'boyfriend' },
        { title: 'Go skydiving', category: 'Adventure', approved: true, submittedBy: 'boyfriend' },
      ];
      
      await BucketListItem.bulkCreate(bucketList);
      console.log('✅ Sample bucket list items created');
    } else {
      console.log('ℹ️  Bucket list items already exist');
    }
    
    // Create sample open when letters (all approved)
    const lettersCount = await OpenWhenLetter.count();
    if (lettersCount === 0) {
      const letters = [
        {
          occasion: "you're feeling sad",
          content: "My love, I know you're going through a tough time right now. Remember that I'm always here for you, no matter what. You are strong, beautiful, and capable of overcoming anything. This too shall pass, and I'll be right by your side through it all. I love you more than words can express. 💕",
          emoji: '🤗',
          approved: true,
          submittedBy: 'boyfriend'
        },
        {
          occasion: 'you miss me',
          content: "I miss you too, my darling! Even when we're apart, you're always in my heart. Close your eyes and feel my love surrounding you. We'll be together again soon, and until then, know that every moment without you makes our reunion that much sweeter. I can't wait to hold you again. 💖",
          emoji: '💝',
          approved: true,
          submittedBy: 'boyfriend'
        },
        {
          occasion: "it's your birthday",
          content: "Happy Birthday, my love! 🎉 Today is the day the world became a better place because you were born. Thank you for being you, for loving me, and for making every day an adventure. I hope this year brings you everything your heart desires. You deserve all the happiness in the world! I love you infinitely! 🎂💕",
          emoji: '🎂',
          approved: true,
          submittedBy: 'boyfriend'
        },
      ];
      
      await OpenWhenLetter.bulkCreate(letters);
      console.log('✅ Sample open when letters created');
    } else {
      console.log('ℹ️  Open when letters already exist');
    }
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Memories: ${await Memory.count()}`);
    console.log(`   Notes: ${await Note.count()}`);
    console.log(`   Bucket List: ${await BucketListItem.count()}`);
    console.log(`   Letters: ${await OpenWhenLetter.count()}`);
    
    // Close connection
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();
