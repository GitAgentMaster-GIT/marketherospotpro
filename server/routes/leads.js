const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect } = require('../middleware/auth');

// @route   GET /api/leads
// @desc    Get all leads for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { campaign, status, temperature } = req.query;
    
    // Build query
    const query = { user: req.user._id };
    if (campaign) query.campaign = campaign;
    if (status) query.status = status;
    if (temperature) query.temperature = temperature;

    const leads = await Lead.find(query)
      .populate('campaign', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/leads
// @desc    Create a new lead
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      user: req.user._id
    };

    const lead = await Lead.create(leadData);

    // Update user stats
    req.user.stats.totalLeads += 1;
    await req.user.save();

    res.status(201).json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/leads/:id
// @desc    Update lead
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (lead.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      lead
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/leads/:id/convert
// @desc    Mark lead as converted
// @access  Private
router.post('/:id/convert', protect, async (req, res) => {
  try {
    const { conversionValue } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (lead.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    lead.status = 'converted';
    lead.convertedAt = new Date();
    lead.conversionValue = conversionValue || 0;
    await lead.save();

    // Update user stats
    if (conversionValue) {
      req.user.stats.totalRevenue += conversionValue;
      await req.user.save();
    }

    res.json({
      success: true,
      lead
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
