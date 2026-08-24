// NotesTable Component — displays all notes in a table with edit, delete, and complete actions

export default function NotesTable({ notes, onEdit, onDelete, onToggleComplete }) {
  return (
    <table border="1">
      {/* Table header — column names */}
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>

      {/* Table body — one row for each note */}
      <tbody>
        {notes.map(note => (
          <tr key={note._id}>
            {/* Note title */}
            <td>{note.title}</td>

            {/* Note description */}
            <td>{note.description}</td>

            {/* Due date — show formatted date or "-" if no date set */}
            <td>{note.dueDate ? new Date(note.dueDate).toLocaleDateString() : '-'}</td>

            {/* Checkbox to toggle completed status */}
            <td>
              <input
                type="checkbox"
                checked={note.isCompleted}
                onChange={() => onToggleComplete(note)}
                style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
              />
            </td>

            {/* Action buttons — Edit and Delete */}
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
