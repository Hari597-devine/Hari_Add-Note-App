// Dashboard Page — shows all notes, lets user create, edit, delete, and complete notes

import { useEffect, useState, useContext } from 'react';
import apiClient from '../api/apiClient';          // To make API requests to the server
import NoteForm from '../components/NoteForm';     // Form to create or edit a note
import NotesTable from '../components/NotesTable'; // Table that displays all notes
import { AuthContext } from '../context/authContext'; // To access logout function
import toast from 'react-hot-toast';               // To show success/error messages

export default function Dashboard() {
  const [notes, setNotes] = useState([]);        // Stores all the user's notes
  const [loading, setLoading] = useState(true);  // Shows skeleton while loading
  const [showForm, setShowForm] = useState(false); // Controls if the note form is visible
  const [editingNote, setEditingNote] = useState(null); // Stores the note being edited (null = creating new)
  const { logout } = useContext(AuthContext);     // Get the logout function

  // Fetch all notes from the server when the page loads
  const fetchNotes = async () => {
    try {
      const res = await apiClient.get('/notes');
      setNotes(res.data); // Save notes to state
    } catch {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false); // Stop showing the loading skeleton
    }
  };

  // Run fetchNotes once when the component first appears on screen
  useEffect(() => { fetchNotes(); }, []);

  // Delete a note by its ID
  const deleteNote = async (id) => {
    try {
      await apiClient.delete(`/notes/${id}`); // Tell server to delete it
      setNotes(notes.filter(n => n._id !== id)); // Remove it from the list on screen
      toast.success('Note deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  // Create a new note
  const createNote = async (note) => {
    try {
      const res = await apiClient.post('/notes', note); // Send new note to server
      setNotes([...notes, res.data]); // Add the new note to the list
      setShowForm(false);             // Hide the form
      toast.success('Note created');
    } catch {
      toast.error('Create failed');
    }
  };

  // Update an existing note
  const updateNote = async (note) => {
    try {
      const res = await apiClient.put(`/notes/${note._id}`, note); // Send updated note to server
      setNotes(notes.map(n => n._id === note._id ? res.data : n)); // Replace old note with updated one
      setEditingNote(null); // Clear the editing state
      setShowForm(false);   // Hide the form
      toast.success('Note updated');
    } catch {
      toast.error('Update failed');
    }
  };

  // Toggle a note between completed and not completed
  const toggleComplete = async (note) => {
    try {
      const res = await apiClient.put(`/notes/${note._id}`, {
        ...note,
        isCompleted: !note.isCompleted, // Flip the completed status
      });
      setNotes(notes.map(n => n._id === note._id ? res.data : n)); // Update the note in the list
      toast.success(res.data.isCompleted ? 'Marked as completed' : 'Marked as incomplete');
    } catch {
      toast.error('Failed to update status');
    }
  };

  // When user clicks "Edit" on a note, find it and open the form with its data
  const editNote = (id) => {
    const noteToEdit = notes.find(n => n._id === id);
    setEditingNote(noteToEdit); // Set the note to be edited
    setShowForm(true);          // Show the form
  };

  // Show loading skeleton while notes are being fetched
  if (loading) {
    return (
      <div className="skeleton-container">
        <div className="skeleton-header">
          <div className="skeleton-box" style={{ width: '250px', height: '36px' }}></div>
          <div className="skeleton-box" style={{ width: '90px', height: '36px' }}></div>
        </div>
        <div className="skeleton-box" style={{ width: '140px', height: '40px', marginBottom: '1.5rem' }}></div>
        <div className="skeleton-table">
          <div className="skeleton-row">
            <div className="skeleton-box" style={{ flex: 2 }}></div>
            <div className="skeleton-box" style={{ flex: 3 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
          </div>
          <div className="skeleton-row">
            <div className="skeleton-box" style={{ flex: 2 }}></div>
            <div className="skeleton-box" style={{ flex: 3 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
          </div>
          <div className="skeleton-row">
            <div className="skeleton-box" style={{ flex: 2 }}></div>
            <div className="skeleton-box" style={{ flex: 3 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
            <div className="skeleton-box" style={{ flex: 1 }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with title and logout button */}
      <div className="dashboard-header">
        <h2 style={{ margin: 0 }}>Notes Dashboard</h2>
        <button className="btn-danger" onClick={logout}>Logout</button>
      </div>

      {/* Button to show/hide the create note form */}
      <button className="btn-create" onClick={() => { setEditingNote(null); setShowForm(!showForm); }}>
        {showForm ? 'Cancel' : '+ Create Note'}
      </button>

      {/* Show the note form if showForm is true */}
      {showForm && (
        <NoteForm
          initialData={editingNote}
          onSubmit={editingNote ? updateNote : createNote}
        />
      )}

      {/* Table showing all the notes */}
      <NotesTable notes={notes} onEdit={editNote} onDelete={deleteNote} onToggleComplete={toggleComplete} />
    </div>
  );
}
