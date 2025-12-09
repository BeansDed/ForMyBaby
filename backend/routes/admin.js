const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const { Memory, Note, BucketListItem, OpenWhenLetter, Visit, LoveCount } = require('../models');
const { Op, Sequelize } = require('sequelize');

// Get admin dashboard statistics
router.get('/dashboard', verifyToken, isAdmin, async (req, res) => {
  try {
    // Get counts
    const memoriesTotal = await Memory.count();
    const memoriesPending = await Memory.count({ where: { approved: false } });
    const memoriesByGirlfriend = await Memory.count({ where: { submittedBy: 'girlfriend' } });
    const memoriesByBoyfriend = await Memory.count({ where: { submittedBy: 'boyfriend' } });
    
    const notesTotal = await Note.count();
    const notesPending = await Note.count({ where: { approved: false } });
    const notesByGirlfriend = await Note.count({ where: { submittedBy: 'girlfriend' } });
    const notesByBoyfriend = await Note.count({ where: { submittedBy: 'boyfriend' } });
    
    const bucketListTotal = await BucketListItem.count();
    const bucketListPending = await BucketListItem.count({ where: { approved: false } });
    const bucketListCompleted = await BucketListItem.count({ where: { completed: true } });
    const bucketListByGirlfriend = await BucketListItem.count({ where: { submittedBy: 'girlfriend' } });
    const bucketListByBoyfriend = await BucketListItem.count({ where: { submittedBy: 'boyfriend' } });
    
    const lettersTotal = await OpenWhenLetter.count();
    const lettersPending = await OpenWhenLetter.count({ where: { approved: false } });
    const lettersOpened = await OpenWhenLetter.count({ where: { opened: true } });
    const lettersByGirlfriend = await OpenWhenLetter.count({ where: { submittedBy: 'girlfriend' } });
    const lettersByBoyfriend = await OpenWhenLetter.count({ where: { submittedBy: 'boyfriend' } });
    
    const visitsTotal = await Visit.count();
    const uniqueUsers = await Visit.count({ distinct: true, col: 'userId' });
    
    // Love count - Get global counter
    const loveCountRecord = await LoveCount.findOne({ where: { userId: 'global' } });
    const totalLove = loveCountRecord ? loveCountRecord.count : 0;
    
    // Recent activity
    const recentMemories = await Memory.findAll({
      where: { approved: false },
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    const recentNotes = await Note.findAll({
      where: { approved: false },
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    const recentBucketList = await BucketListItem.findAll({
      where: { approved: false },
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    const recentLetters = await OpenWhenLetter.findAll({
      where: { approved: false },
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    // Visit stats by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const visitsByDay = await Visit.findAll({
      attributes: [
        [Sequelize.fn('date', Sequelize.col('timestamp')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: {
        timestamp: { [Op.gte]: sevenDaysAgo }
      },
      group: [Sequelize.fn('date', Sequelize.col('timestamp'))],
      order: [[Sequelize.fn('date', Sequelize.col('timestamp')), 'ASC']]
    });
    
    res.json({
      stats: {
        memories: { 
          total: memoriesTotal, 
          pending: memoriesPending,
          byGirlfriend: memoriesByGirlfriend,
          byBoyfriend: memoriesByBoyfriend
        },
        notes: { 
          total: notesTotal, 
          pending: notesPending,
          byGirlfriend: notesByGirlfriend,
          byBoyfriend: notesByBoyfriend
        },
        bucketList: { 
          total: bucketListTotal, 
          pending: bucketListPending, 
          completed: bucketListCompleted,
          byGirlfriend: bucketListByGirlfriend,
          byBoyfriend: bucketListByBoyfriend
        },
        letters: { 
          total: lettersTotal, 
          pending: lettersPending, 
          opened: lettersOpened,
          byGirlfriend: lettersByGirlfriend,
          byBoyfriend: lettersByBoyfriend
        },
        visits: { total: visitsTotal, uniqueUsers },
        loveCount: totalLove,
      },
      recentActivity: {
        memories: recentMemories,
        notes: recentNotes,
        bucketList: recentBucketList,
        letters: recentLetters,
      },
      visitsByDay,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
