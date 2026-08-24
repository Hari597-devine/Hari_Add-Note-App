// NoteForm Component — a form to create a new note or edit an existing one

import { useState, useEffect } from 'react';

export default function NoteForm({ initialData, onSubmit }) {
  // Store the note data in the form
  const [note, setNote] = useState({
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false,
  });

  // If we are editing an existing note, fill the form with its data
  useEffect(() => {
    if (initialData) {
      setNote(initialData);
    }
  }, [initialData]);

  // Update the note data when the user types in any input field
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNote(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value // Use "checked" for checkboxes, "value" for everything else
    }));
  };

  // When the form is submitted, send the note data to the parent component
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from refreshing
    onSubmit(note);     // Call the parent's create or update function
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      {/* Show "Edit Note" if editing, "Create Note" if creating */}
      <h3>{initialData ? 'Edit Note' : 'Create Note'}</h3>

      {/* Title input */}
      <input
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      {/* Description input (multi-line) */}
      <textarea
        name="description"
        value={note.description}
        onChange={handleChange}
        placeholder="Description"
      />

      {/* Due date picker */}
      <input
        type="date"
        name="dueDate"
        value={note.dueDate ? note.dueDate.substring(0,10) : ''}
        onChange={handleChange}
      />

      {/* Checkbox to mark the note as completed */}
      <label>
        Completed:
        <input
          type="checkbox"
          name="isCompleted"
          checked={note.isCompleted}
          onChange={handleChange}
        />
      </label>

      {/* Submit button — text changes based on create or edit mode */}
      <button type="submit">{initialData ? 'Save Changes' : 'Add Note'}</button>
    </form>
  );
}
