// Main App component — sets up pages and navigation

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // For page navigation
import { Toaster } from 'react-hot-toast';           // Shows pop-up messages (success/error)
import { AuthProvider, AuthContext } from './context/authContext'; // Provides login/logout to all pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';

// ProtectedRoute — only lets logged-in users see the page
// If user has no token (not logged in), redirect them to login page
function ProtectedRoute({ children }) {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          {/* Define all the pages/routes of the app */}
          <Routes>
            {/* When user visits "/", send them to login page */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Login page — anyone can access */}
            <Route path="/login" element={<Login />} />

            {/* Signup page — anyone can access */}
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard — only logged-in users can access (wrapped in ProtectedRoute) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>

      </AuthProvider>
      {/* Toast notifications appear at bottom-right corner */}
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}
