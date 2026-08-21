const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Allow requests from your frontend origin
app.use(cors({
  origin: process.env.UI_URI,   // frontend dev server
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('successfully Connected to MongoDB'))
.catch(err => console.error(' MongoDB connection error:', err));

// Routes
const authRouter = require('./routes/AuthRoute');
const notesRouter = require('./routes/NoteRoute');
const authMiddleware = require('./middleware/auth');

app.use('/api/auth', authRouter);
app.use('/api/notes',authMiddleware, notesRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.message); // Log only the message
  res.status(500).json({ error: 'Internal Server Error' });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
