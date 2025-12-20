const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { generateCampaign, generateOptimizationSuggestions } = require('../services/openai');

// @route   POST /api/ai/generate-campaign
// @desc    Generate campaign content using AI
// @access  Private
router.post('/generate-campaign', protect, async (req, res) => {
  try {
    const { product, niche, targetAudience, budget, platforms } = req.body;

    // Validate required fields
    if (!product || !niche || !targetAudience || !budget) {
      return res.status(400).json({ 
        error: 'Please provide product, niche, targetAudience, and budget' 
      });
    }

    console.log('Generating AI campaign for:', { product, niche, targetAudience, budget });

    // Generate campaign using OpenAI
    const campaignContent = await generateCampaign(
      product,
      niche,
      targetAudience,
      budget,
      platforms || ['facebook', 'google']
    );

    res.json({
      success: true,
      campaign: campaignContent,
      message: 'Campaign generated successfully'
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate campaign',
      details: error.message 
    });
  }
});

// @route   POST /api/ai/optimize
// @desc    Get optimization suggestions for a campaign
// @access  Private
router.post('/optimize', protect, async (req, res) => {
  try {
    const { campaign, performance } = req.body;

    if (!campaign || !performance) {
      return res.status(400).json({ 
        error: 'Please provide campaign and performance data' 
      });
    }

    const suggestions = await generateOptimizationSuggestions(campaign, performance);

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Optimization error:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

// @route   POST /api/ai/chat
// @desc    Chat with AI assistant
// @access  Private
router.post('/chat', protect, async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // For now, return a helpful response
    // In production, this would use OpenAI's API
    const response = {
      role: 'assistant',
      content: `I am here to help you with your marketing campaigns! You asked: "${message}". While I am being integrated with OpenAI, I can help you navigate the platform, understand your campaign performance, and provide general marketing guidance. What would you like to know?`
    };

    res.json({
      success: true,
      response
    });
  } catch (error) {
    res.status(500).json({ error: 'Chat error' });
  }
});

module.exports = router;
