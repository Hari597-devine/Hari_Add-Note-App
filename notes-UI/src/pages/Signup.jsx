// Signup Page — user creates a new account with username, email, and password

import { useState, useContext } from 'react';
import apiClient from '../api/apiClient';          // To make API requests to the server
import { AuthContext } from '../context/authContext'; // To access login function
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';               // To show success/error messages

export default function Signup() {
  const { login } = useContext(AuthContext); // Get login function to auto-login after signup
  const navigate = useNavigate();            // To navigate between pages

  // Store what the user types in the form
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Update the form data when user types in any input field
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the field name and its value
    setFormData(prev => ({ ...prev, [name]: value })); // Update only that field
  };

  // This runs when the user clicks the Signup button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing

    // Check if any field is empty
    if (!formData.username || !formData.email || !formData.password) {
      return toast.error('Field cannot be empty');
    }

    try {
      // Step 1: Send signup request to create the account
      await apiClient.post('/auth/signup', formData);
      toast.success('Successfully registration');

      // Step 2: Automatically log in after signup
      const res = await apiClient.post('/auth/login', {
        identifier: formData.email,
        password: formData.password
      });

      login(res.data.token); // Save the token and go to dashboard
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || 'Signup failed. Invalid user data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      {/* Username input */}
      <input
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />

      {/* Email input */}
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      {/* Password input */}
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      {/* Submit button */}
      <button type="submit">Signup</button>

      {/* Link to login page if user already has an account */}
      <p>
        Already have an account?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          Login here
        </span>
      </p>
    </form>
  );
}
