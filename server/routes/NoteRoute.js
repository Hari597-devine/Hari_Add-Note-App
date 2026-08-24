// Note Routes — handles all note operations (Create, Read, Update, Delete)
// All routes here require the user to be logged in (authMiddleware runs before these)

const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// CREATE — add a new note
router.post('/', async (req, res, next) => {
  try {
    const { title, description, dueDate, isCompleted } = req.body; // Get note data from request

    // Create the note in the database, linking it to the logged-in user
    const note = await Note.create({ title, description, dueDate, isCompleted, userId: req.user.id });
    res.status(201).json(note); // Send the created note back
  } catch (err) {next(err)}
});

// READ ALL — get all notes for the logged-in user (with optional filter)
router.get('/', async (req, res, next) => {
  try {
    const { completed } = req.query; // Optional filter: ?completed=true or ?completed=false

    // Only show notes belonging to the logged-in user
    let filter = { userId: req.user.id };

    // If "completed" filter is provided, add it to the filter
    if (completed !== undefined) filter.isCompleted = completed === 'true';

    const notes = await Note.find(filter); // Fetch notes from database
    res.status(200).json(notes);           // Send notes back
  } catch (err) {next(err)}
});

// READ ONE — get a single note by its ID
router.get('/:id', async (req, res, next) => {
  try {
    // Find the note that matches both the ID and the user
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });

    if (!note) return res.status(404).json({ error: 'Note not found' }); // Note doesn't exist
    res.status(200).json(note); // Send the note back
  } catch (err) {next(err)}
});

// UPDATE — edit an existing note
router.put('/:id', async (req, res, next) => {
  try {
    // Find the note and update it with the new data
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Find by ID and user
      req.body,                                      // New data to save
      { new: true, runValidators: true }             // Return updated note, check validation rules
    );

    if (!updated) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(updated); // Send updated note back
  } catch (err) { next(err)}
});

// DELETE — remove a note
router.delete('/:id', async (req, res, next) => {
  try {
    // Find and delete the note (only if it belongs to the logged-in user)
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!deleted) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send(); // 204 = successfully deleted, no content to return
  } catch (err) { next(err)}
});

module.exports = router;
