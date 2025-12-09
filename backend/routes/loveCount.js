const express = require('express');
const router = express.Router();
const { LoveCount } = require('../models');

// Get total love count - Global counter
router.get('/', async (req, res) => {
  try {
    // Find the global counter
    let loveCount = await LoveCount.findOne({ where: { userId: 'global' } });
    
    if (!loveCount) {
      // Create default global counter with 0
      loveCount = await LoveCount.create({
        userId: 'global',
        count: 0,
        date: new Date(),
      });
    }
    
    res.json({ count: loveCount.count });
  } catch (error) {
    console.error('Get love count error:', error);
    res.status(500).json({ error: 'Failed to fetch love count' });
  }
});

// Increment love count - Global counter
router.post('/increment', async (req, res) => {
  try {
    console.log('💕 Incrementing love count...');
    
    // Find or create a single global counter
    let loveCount = await LoveCount.findOne({ where: { userId: 'global' } });
    
    if (!loveCount) {
      console.log('Creating new global counter');
      loveCount = await LoveCount.create({
        userId: 'global',
        count: 1,
        date: new Date()
      });
      console.log('Created new counter, count:', 1);
    } else {
      console.log('Found existing counter, incrementing from:', loveCount.count);
      // Increment existing counter
      await loveCount.increment('count');
      await loveCount.reload(); // Reload to get the updated count
      console.log('Incremented to:', loveCount.count);
    }
    
    const response = {
      success: true,
      count: loveCount.count,
    };
    
    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Love count increment error:', error);
    res.status(500).json({ error: 'Failed to increment love count', details: error.message });
  }
});

module.exports = router;
