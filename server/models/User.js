// User Model — defines the structure of a user in the database
// Also handles password hashing (so passwords are never stored as plain text)

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Library to hash and compare passwords

// Schema = the shape/rules of a user document in MongoDB
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Must be unique
  email:    { type: String, required: true, unique: true }, // Must be unique
  password: { type: String, required: true }
});

// Before saving a user, automatically hash the password
// This runs every time a user is saved (created or updated)
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return; // Only hash if password was changed
  this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
});

// Method to compare a plain text password with the hashed one in the database
// Used during login to check if the password is correct
UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password); // Returns true if they match
};

module.exports = mongoose.model('User', UserSchema);
