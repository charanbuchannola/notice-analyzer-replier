const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  originalFilename: {
    type: String,
    required: true,
  },
 
  cloudinaryUrl: {
    // URL of the file on Cloudinary
    type: String,
    required: true,
  },
  cloudinaryPublicId: {
    // Public ID for managing the file on Cloudinary (e.g., for deletion)
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    default: "",
  },
  cleanedText: {
    type: String,
    default: "",
  },
  analysis: {
    type: Object,
    default: {},
  },
  summary: {
    type: String,
    default: "",
  },
  suggestedActions: {
    type: String,
    default: "",
  },
  draftReply: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["uploaded", "processing", "analyzed", "reply_drafted", "completed"],
    default: "uploaded",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notice", NoticeSchema);
