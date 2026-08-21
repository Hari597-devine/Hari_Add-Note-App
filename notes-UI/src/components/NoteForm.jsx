import { useState, useEffect } from 'react';

export default function NoteForm({ initialData, onSubmit }) {
  const [note, setNote] = useState({
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false,
  });

  useEffect(() => {
    if (initialData) {
      setNote(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNote(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(note);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h3>{initialData ? 'Edit Note' : 'Create Note'}</h3>
      <input
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={note.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="dueDate"
        value={note.dueDate ? note.dueDate.substring(0,10) : ''}
        onChange={handleChange}
      />
      <label>
        Completed:
        <input
          type="checkbox"
          name="isCompleted"
          checked={note.isCompleted}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{initialData ? 'Save Changes' : 'Add Note'}</button>
    </form>
  );
}
