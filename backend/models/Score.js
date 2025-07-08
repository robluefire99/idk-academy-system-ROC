const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  student:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject:   String,
  score:     Number,
  feedback:  String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);