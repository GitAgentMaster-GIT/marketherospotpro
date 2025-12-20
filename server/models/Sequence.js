const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['email', 'sms', 'mixed'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'
  },
  steps: [{
    day: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['email', 'sms'],
      required: true
    },
    subject: String, // For emails
    content: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'sent', 'failed'],
      default: 'draft'
    }
  }],
  performance: {
    totalSent: { type: Number, default: 0 },
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Calculate open rate
sequenceSchema.virtual('openRate').get(function() {
  if (this.performance.totalSent === 0) return 0;
  return (this.performance.opens / this.performance.totalSent * 100).toFixed(2);
});

sequenceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Sequence', sequenceSchema);
