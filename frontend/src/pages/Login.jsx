import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register({ setIsLoggedIn }) {
    const navigate= useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:1011/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
          setMessage('logged in 🎉');
           localStorage.setItem('user', JSON.stringify(data.user))
           setIsLoggedIn(true)
          setFormData({ username: '', password: '' });
          navigate('project')
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setMessage('Error connecting to server.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ padding: '10px 15px' }}>Register</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default Register;
