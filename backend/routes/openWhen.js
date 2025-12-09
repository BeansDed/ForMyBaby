const express = require('express');
const router = express.Router();
const { OpenWhenLetter } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateOpenWhenLetter } = require('../middleware/validation');

// Get all letters (public - only approved)
router.get('/', async (req, res) => {
  try {
    const letters = await OpenWhenLetter.findAll({
      where: { approved: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(letters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch letters' });
  }
});

// Get all letters (admin only)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const letters = await OpenWhenLetter.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(letters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch letters' });
  }
});

// Create new letter (user submission)
router.post('/', validateOpenWhenLetter, async (req, res) => {
  try {
    const { occasion, content, emoji } = req.body;
    
    if (!occasion || !content) {
      return res.status(400).json({ error: 'Occasion and content are required' });
    }
    
    const letter = await OpenWhenLetter.create({
      occasion,
      content,
      emoji: emoji || '💌',
      userId: req.sessionID,
      submittedBy: req.body.submittedBy || 'girlfriend',
      approved: req.body.approved || false
    });
    
    res.status(201).json({
      success: true,
      message: 'Letter submitted! Waiting for admin approval.',
      letter,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create letter' });
  }
});

// Mark letter as opened
router.patch('/:id/open', async (req, res) => {
  try {
    const letter = await OpenWhenLetter.findByPk(req.params.id);
    
    if (!letter) {
      return res.status(404).json({ error: 'Letter not found' });
    }
    
    await letter.update({
      opened: true,
      openedDate: new Date()
    });
    
    res.json({ success: true, letter });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark letter as opened' });
  }
});

// Approve letter (admin only)
router.patch('/:id/approve', verifyToken, isAdmin, async (req, res) => {
  try {
    const letter = await OpenWhenLetter.findByPk(req.params.id);
    
    if (!letter) {
      return res.status(404).json({ error: 'Letter not found' });
    }
    
    await letter.update({ approved: true });
    
    res.json({ success: true, letter });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve letter' });
  }
});

// Delete letter (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await OpenWhenLetter.destroy({
      where: { id: req.params.id }
    });
    
    if (!result) {
      return res.status(404).json({ error: 'Letter not found' });
    }
    
    res.json({ success: true, message: 'Letter deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete letter' });
  }
});

module.exports = router;
