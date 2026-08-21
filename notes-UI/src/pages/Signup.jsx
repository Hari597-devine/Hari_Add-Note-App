import { useState, useContext } from 'react';
import apiClient from '../api/apiClient';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/auth/signup', formData);
      const res = await apiClient.post('/auth/login', {
        identifier: formData.email,
        password: formData.password
      });

      login(res.data.token); // store token and redirect
    } catch (err) {
         console.error(err.response?.data || err.message);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Signup</button>
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
