const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const { title, description, dueDate, isCompleted } = req.body;
    const note = await Note.create({ title, description, dueDate, isCompleted });
    res.status(201).json(note);
  } catch (err) {next(err)}
});

// READ ALL (with filters)
router.get('/', async (req, res, next) => {
  try {
    const { completed } = req.query;
    let filter = {};
    if (completed !== undefined) filter.isCompleted = completed === 'true';

    const notes = await Note.find(filter);
    res.status(200).json(notes);
  } catch (err) {next(err)}
});

// READ INDIVIDUAL
router.get('/:id', async (req, res,next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {next(err)}
});

// UPDATE
router.put('/:id', async (req, res,next) => {
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(updated);
  } catch (err) { next(err)}
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send();
  } catch (err) { next(err)}
});

module.exports = router;
