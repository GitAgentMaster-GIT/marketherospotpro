const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  temperature: {
    type: String,
    enum: ['hot', 'warm', 'cold'],
    default: 'cold'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
    default: 'new'
  },
  source: {
    type: String,
    enum: ['facebook', 'google', 'linkedin', 'instagram', 'twitter', 'direct', 'referral'],
    required: true
  },
  metadata: {
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    ipAddress: String,
    userAgent: String
  },
  notes: [{
    text: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  convertedAt: Date,
  conversionValue: Number
}, {
  timestamps: true
});

// Auto-calculate temperature based on score
leadSchema.pre('save', function(next) {
  if (this.score >= 80) {
    this.temperature = 'hot';
  } else if (this.score >= 50) {
    this.temperature = 'warm';
  } else {
    this.temperature = 'cold';
  }
  next();
});

// Index for efficient queries
leadSchema.index({ user: 1, campaign: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1, temperature: 1 });

module.exports = mongoose.model('Lead', leadSchema);
