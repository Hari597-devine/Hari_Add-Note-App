// Note Model — defines the structure of a note in the database

const mongoose = require('mongoose');

// Schema = the shape/rules of a note document in MongoDB
const noteSchema = new mongoose.Schema({
  // Which user owns this note (links to the User collection)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Note title — required, max 150 characters
  title: {
    type: String,
    required: true,
    trim: true,       // Removes extra spaces from start/end
    maxlength: 150
  },
  // Note description — optional, defaults to empty string
  description: {
    type: String,
    default: ''
  },
  // Due date — optional
  dueDate: {
    type: Date
  },
  // Is the note completed? — defaults to false (not completed)
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // Automatically adds "createdAt" and "updatedAt" fields

// Export the model so we can use it in routes to create/read/update/delete notes
module.exports = mongoose.model('notes', noteSchema);
