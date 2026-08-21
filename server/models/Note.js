const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  description: {
    type: String,
    default: ''
  },
 dueDate: {
      type: Date
    },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('notes', noteSchema);
