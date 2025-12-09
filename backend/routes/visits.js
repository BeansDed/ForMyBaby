const express = require('express');
const router = express.Router();
const { Visit } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { Op, Sequelize } = require('sequelize');

// Track visit
router.post('/', async (req, res) => {
  try {
    const { page } = req.body;
    
    await Visit.create({
      userId: req.sessionID,
      page: page || 'index',
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// Get visit statistics (admin only)
router.get('/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const total = await Visit.count();
    const uniqueUsers = await Visit.count({
      distinct: true,
      col: 'userId'
    });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayVisits = await Visit.count({
      where: {
        timestamp: { [Op.gte]: today }
      }
    });
    
    const pageStats = await Visit.findAll({
      attributes: ['page', [Sequelize.fn('COUNT', Sequelize.col('page')), 'count']],
      group: ['page'],
      order: [[Sequelize.literal('count'), 'DESC']]
    });
    
    res.json({
      total,
      uniqueUsers,
      todayVisits,
      pageStats,
    });
  } catch (error) {
    console.error('Visit stats error:', error);
    res.status(500).json({ error: 'Failed to fetch visit stats' });
  }
});

module.exports = router;
