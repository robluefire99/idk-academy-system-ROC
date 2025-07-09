const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  student:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject:   String,
  score:     Number,
  max_score: { type: Number, default: 100 },
  feedback:  String,
  lecturer:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add lecturer field
  date:      { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);