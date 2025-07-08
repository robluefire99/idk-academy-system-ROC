const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['student','teacher','admin','lecturer'],
    default: 'student'
  },
  isVerified: { type: Boolean, default: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // Only for students
});

module.exports = mongoose.model('User', userSchema);