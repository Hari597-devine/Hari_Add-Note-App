// Auth Context — manages login state (token) across the whole app
// This lets any page check if the user is logged in, and call login/logout

import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context that other components can use to access auth data
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get the saved token from browser storage (if user was already logged in)
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate(); // To navigate between pages

  // Login function — saves the token and goes to dashboard
  const login = (newToken) => {
    localStorage.setItem('token', newToken); // Save token in browser storage
    setToken(newToken);                      // Update state
    navigate('/dashboard');                  // Go to dashboard page
  };

  // Logout function — removes the token and goes to login page
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from browser storage
    setToken(null);                   // Clear state
    navigate('/login');               // Go to login page
  };

  // Share token, login, and logout with all child components
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
