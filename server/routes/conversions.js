const express = require('express');
const router = express.Router();
const Sequence = require('../models/Sequence');
const { protect } = require('../middleware/auth');

// @route   GET /api/conversions/sequences
// @desc    Get all sequences for logged in user
// @access  Private
router.get('/sequences', protect, async (req, res) => {
  try {
    const sequences = await Sequence.find({ user: req.user._id })
      .populate('campaign', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: sequences.length,
      sequences
    });
  } catch (error) {
    console.error('Get sequences error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/conversions/sequences
// @desc    Create a new conversion sequence
// @access  Private
router.post('/sequences', protect, async (req, res) => {
  try {
    const sequenceData = {
      ...req.body,
      user: req.user._id
    };

    const sequence = await Sequence.create(sequenceData);

    res.status(201).json({
      success: true,
      sequence
    });
  } catch (error) {
    console.error('Create sequence error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/conversions/sequences/:id
// @desc    Update sequence
// @access  Private
router.put('/sequences/:id', protect, async (req, res) => {
  try {
    let sequence = await Sequence.findById(req.params.id);

    if (!sequence) {
      return res.status(404).json({ error: 'Sequence not found' });
    }

    if (sequence.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    sequence = await Sequence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      sequence
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
