const express = require('express');
const router = express.Router();
const { BucketListItem } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateBucketItem } = require('../middleware/validation');

// Get all bucket list items (public - only approved)
router.get('/', async (req, res) => {
  try {
    const items = await BucketListItem.findAll({
      where: { approved: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bucket list items' });
  }
});

// Get all bucket list items (admin only)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const items = await BucketListItem.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bucket list items' });
  }
});

// Create new bucket list item (user submission)
router.post('/', validateBucketItem, async (req, res) => {
  try {
    const { title, category } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const item = await BucketListItem.create({
      title,
      category: category || 'Other',
      userId: req.sessionID,
      submittedBy: req.body.submittedBy || 'girlfriend',
      approved: req.body.approved || false
    });
    
    res.status(201).json({
      success: true,
      message: 'Bucket list item submitted! Waiting for admin approval.',
      item,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bucket list item' });
  }
});

// Approve bucket list item (admin only)
router.patch('/:id/approve', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = await BucketListItem.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    await item.update({ approved: true });
    
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve item' });
  }
});

// Toggle completed status (admin only)
router.patch('/:id/toggle', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = await BucketListItem.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const newCompleted = !item.completed;
    await item.update({
      completed: newCompleted,
      completedDate: newCompleted ? new Date() : null
    });
    
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle item' });
  }
});

// Delete bucket list item (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await BucketListItem.destroy({
      where: { id: req.params.id }
    });
    
    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
