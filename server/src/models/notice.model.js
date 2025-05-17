const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  originalFilename: {
    type: String,
    required: true,
  },
  filePath: { // Path to the stored PDF, if we decide to store it
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    default: '',
  },
  cleanedText: {
    type: String,
    default: '',
  },
  analysis: { // Store structured analysis from Gemini
    type: Object,
    default: {},
  },
  summary: {
    type: String,
    default: '',
  },
  suggestedActions: {
    type: String,
    default: '',
  },
  draftReply: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'analyzed', 'reply_drafted', 'completed'],
    default: 'uploaded',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  // we might add a userId if we implement user authentication
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Notice', NoticeSchema);