const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true
  },
  product: {
    type: String,
    required: true
  },
  niche: {
    type: String,
    required: true
  },
  targetAudience: {
    type: String,
    required: true
  },
  budget: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  platforms: [{
    type: String,
    enum: ['facebook', 'google', 'linkedin', 'instagram', 'twitter']
  }],
  adContent: {
    headline: String,
    description: String,
    callToAction: String,
    adCopy: String,
    keywords: [String],
    targetingStrategy: String
  },
  aiGenerated: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'archived'],
    default: 'draft'
  },
  performance: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    leads: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    spent: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },
  startDate: Date,
  endDate: Date
}, {
  timestamps: true
});

// Calculate ROI
campaignSchema.virtual('roi').get(function() {
  if (this.performance.spent === 0) return 0;
  return ((this.performance.revenue - this.performance.spent) / this.performance.spent * 100).toFixed(2);
});

// Calculate conversion rate
campaignSchema.virtual('conversionRate').get(function() {
  if (this.performance.leads === 0) return 0;
  return (this.performance.conversions / this.performance.leads * 100).toFixed(2);
});

campaignSchema.set('toJSON', { virtuals: true });
campaignSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Campaign', campaignSchema);
