const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    source: {
      type: String,
      enum: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Other'],
      default: 'Other',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Converted'],
      default: 'New',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
