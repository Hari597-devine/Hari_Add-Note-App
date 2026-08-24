// Server Entry Point — starts the Express server and connects to MongoDB

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');       // Allows frontend to talk to backend (cross-origin requests)
require('dotenv').config();         // Loads settings from .env file (like database URL, secrets)

const app = express(); // Create the Express app

// Allow requests from the frontend (so React app can call our API)
app.use(cors({
  origin: process.env.UI_URI,   // Only allow requests from our frontend URL
}));

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('successfully Connected to MongoDB'))
.catch(err => console.error(' MongoDB connection error:', err));

// Import route files and middleware
const authRouter = require('./routes/AuthRoute');       // Handles signup and login
const notesRouter = require('./routes/NoteRoute');      // Handles CRUD for notes
const authMiddleware = require('./middleware/auth');     // Checks if user is logged in

// Set up API routes
app.use('/api/auth', authRouter);                       // Auth routes (no login required)
app.use('/api/notes', authMiddleware, notesRouter);     // Notes routes (login required — authMiddleware checks the token)

// Global Error Handler — catches any unhandled errors and sends a clean error response
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server on the specified port (default: 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
