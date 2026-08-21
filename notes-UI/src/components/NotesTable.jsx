export default function NotesTable({ notes, onEdit, onDelete, onToggleComplete }) {
  return (
    <table
      border="1">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note => (
          <tr key={note._id}>
            <td>{note.title}</td>
            <td>{note.description}</td>
            <td>{note.dueDate ? new Date(note.dueDate).toLocaleDateString() : '-'}</td>
            <td>
              <input
                type="checkbox"
                checked={note.isCompleted}
                onChange={() => onToggleComplete(note)}
                style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
              />
            </td>
            <td>
              <button onClick={() => onEdit(note._id)}>Edit</button>
              <button className="btn-danger" onClick={() => onDelete(note._id)} style={{ marginLeft: '8px' }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
