# Hari-Note-App

A full-stack, responsive web application for managing personal notes. It allows users to register, log in, and securely manage their notes through an intuitive dashboard.

## Features

- **User Authentication**: Secure Sign-Up, Log-In, and Log-Out functionality using JWT.
- **Note Management**: Create, Read, Update, and Delete (CRUD) notes.
- **Modern UI**: A premium, responsive interface featuring glassmorphism aesthetics and smooth micro-animations.
- **Secure Backend**: Node.js and Express backend handling authentication and API requests.

## Tech Stack

- **Frontend**: React.js, Vite, React Router, Context API
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with Glassmorphism and responsive design

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd Hari-Note-App
   ```

2. **Setup the Backend Server:**
   ```bash
   cd server
   npm install
   # Create a .env file based on environment requirements (e.g. PORT, MONGO_URI, JWT_SECRET)
   npm start
   ```

3. **Setup the Frontend App:**
   ```bash
   cd ../notes-UI
   npm install
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` (or the URL provided by Vite) to view the application.
