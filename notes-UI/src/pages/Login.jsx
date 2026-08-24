// Login Page — user enters email/username and password to log in

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';          // To make API requests to the server
import { AuthContext } from '../context/authContext'; // To access login function
import toast from 'react-hot-toast';               // To show success/error messages

export default function Login() {
  const { login } = useContext(AuthContext); // Get the login function from context

  // Store what the user types in the form
  const [identifier, setIdentifier] = useState(''); // Can be email or username
  const [password, setPassword] = useState('');

  // This runs when the user clicks the Login button
  const handleSubmit = async e => {
    e.preventDefault(); // Stop the page from refreshing

    // Check if fields are empty
    if (!identifier || !password) {
      return toast.error('Field cannot be empty');
    }

    try {
      // Send login request to the server
      const res = await apiClient.post('/auth/login', { identifier, password });
      toast.success('Successfully logged in');
      login(res.data.token); // Save the token and go to dashboard
    } catch (err) {
      // Show error if login fails
      toast.error(err.response?.data?.error || 'Invalid user or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {/* Email or Username input */}
      <input
        type="text"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        placeholder="Email or Username"
      />
      <br />

      {/* Password input */}
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />

      {/* Submit button */}
      <button type="submit">Login</button>
      <br />

      {/* Link to signup page if user doesn't have an account */}
      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </form>
  );
}
