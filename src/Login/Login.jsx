import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const styles = {
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f6f8',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '0 16px',
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      padding: '40px',
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 6px 30px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    logo: {
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: '700',
      color: '#2d3436',
      marginBottom: '10px',
    },
    title: {
      fontSize: '26px',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center',
      color: '#2d3436',
    },
    input: {
      padding: '14px 16px',
      marginBottom: '18px',
      border: '1px solid #dfe6e9',
      borderRadius: '10px',
      fontSize: '15px',
      color: '#2d3436',
      outline: 'none',
    },
    checkboxGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      fontSize: '13px',
      color: '#636e72',
    },
    button: {
      padding: '12px 16px',
      backgroundColor: hoveredBtn === 'login' ? '#1e272e' : '#2d3436',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '500',
      marginBottom: '12px',
      transition: 'background-color 0.2s ease-in-out',
    },
    buttonSecondary: {
      padding: '12px 16px',
      backgroundColor: hoveredBtn === 'register' ? '#f1f2f6' : '#ffffff',
      color: '#2d3436',
      border: '1px solid #2d3436',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '500',
      transition: 'background-color 0.2s ease-in-out',
    },
    error: {
      color: '#d63031',
      marginTop: '10px',
      fontSize: '13px',
      textAlign: 'center',
    },
    link: {
      color: '#0984e3',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.logo}>🚀 My Delta 10000 App</div>
        <h2 style={styles.title}>Welcome Back</h2>

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          autoComplete="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <div style={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: '5px' }}
            />
            Remember Me
          </label>
          <span style={styles.link} onClick={handleForgotPassword}>
            Forgot Password?
          </span>
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={() => setHoveredBtn('login')}
          onMouseLeave={() => setHoveredBtn('')}
        >
          Login
        </button>

        <button
          type="button"
          style={styles.buttonSecondary}
          onClick={handleRegisterRedirect}
          onMouseEnter={() => setHoveredBtn('register')}
          onMouseLeave={() => setHoveredBtn('')}
        >
          Register
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
