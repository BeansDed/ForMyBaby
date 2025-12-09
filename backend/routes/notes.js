const express = require('express');
const router = express.Router();
const { Note } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateNote } = require('../middleware/validation');

// Get all notes (public - only approved)
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { approved: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Get all notes (admin only)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const notes = await Note.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Create new note (user submission)
router.post('/', validateNote, async (req, res) => {
  try {
    const { content, emoji } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const note = await Note.create({
      content,
      emoji: emoji || '💕',
      userId: req.sessionID,
      submittedBy: req.body.submittedBy || 'girlfriend',
      approved: req.body.approved || false
    });
    
    res.status(201).json({
      success: true,
      message: 'Note submitted! Waiting for admin approval.',
      note,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Approve note (admin only)
router.patch('/:id/approve', verifyToken, isAdmin, async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    await note.update({ approved: true });
    
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve note' });
  }
});

// Delete note (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await Note.destroy({
      where: { id: req.params.id }
    });
    
    if (!result) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json({ success: true, message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
