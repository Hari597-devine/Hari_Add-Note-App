import { useEffect, useState, useContext } from 'react';
import apiClient from '../api/apiClient';
import NoteForm from '../components/NoteForm';
import NotesTable from '../components/NotesTable';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const { logout } = useContext(AuthContext);

  const fetchNotes = async () => {
    try {
      const res = await apiClient.get('/notes');
      setNotes(res.data);
    } catch {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const deleteNote = async (id) => {
    try {
      await apiClient.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
      toast.success('Note deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const createNote = async (note) => {
    try {
      const res = await apiClient.post('/notes', note);
      setNotes([...notes, res.data]);
      setShowForm(false);
      toast.success('Note created');
    } catch {
      toast.error('Create failed');
    }
  };

  const updateNote = async (note) => {
    try {
      const res = await apiClient.put(`/notes/${note._id}`, note);
      setNotes(notes.map(n => n._id === note._id ? res.data : n));
      setEditingNote(null);
      setShowForm(false);
      toast.success('Note updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const toggleComplete = async (note) => {
    try {
      const res = await apiClient.put(`/notes/${note._id}`, {
        ...note,
        isCompleted: !note.isCompleted,
      });
      setNotes(notes.map(n => n._id === note._id ? res.data : n));
      toast.success(res.data.isCompleted ? 'Marked as completed' : 'Marked as incomplete');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const editNote = (id) => {
    const noteToEdit = notes.find(n => n._id === id);
    setEditingNote(noteToEdit);
    setShowForm(true);
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Notes Dashboard</h2>
        <button className="btn-danger" onClick={logout}>Logout</button>
      </div>
      <button onClick={() => { setEditingNote(null); setShowForm(!showForm); }}>
        {showForm ? 'Cancel' : 'Create Note'}
      </button>

      {showForm && (
        <NoteForm
          initialData={editingNote}
          onSubmit={editingNote ? updateNote : createNote}
        />
      )}

      <NotesTable notes={notes} onEdit={editNote} onDelete={deleteNote} onToggleComplete={toggleComplete} />
    </div>
  );
}
