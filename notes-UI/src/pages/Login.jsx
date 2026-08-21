import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/auth/login', { identifier, password });
      login(res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        placeholder="Email or Username"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button type="submit">Login</button>
      <br />
      <p>
        Don’t have an account? <Link to="/signup">Signup here</Link>
      </p>
    </form>
  );
}
