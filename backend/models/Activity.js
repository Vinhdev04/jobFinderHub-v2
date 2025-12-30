const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    userEmail: { type: String, default: null },
    ip: { type: String, default: null },
    status: { type: String, enum: ['success', 'error', 'warning', 'info'], default: 'info' },
    meta: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
