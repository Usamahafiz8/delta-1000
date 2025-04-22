import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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
      fontFamily: 'Segoe UI, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    animatedBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      background: 'linear-gradient(-45deg, #74b9ff, #a29bfe, #55efc4, #ffeaa7)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
    },
    floatingShapes: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
    },
    shapeCommon: {
      position: 'absolute',
      borderRadius: '50%',
      opacity: 0.2,
      animation: 'float 20s linear infinite',
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      padding: '40px',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1,
    },
    logo: {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: '600',
      color: '#2d3436',
      marginBottom: '10px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center',
      color: '#2d3436',
    },
    input: {
      padding: '12px 16px',
      marginBottom: '16px',
      border: '1px solid #dfe6e9',
      borderRadius: '8px',
      fontSize: '14px',
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
      backgroundColor: '#2d3436',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '500',
      marginBottom: '10px',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#1e272e',
    },
    buttonSecondary: {
      backgroundColor: '#ffffff',
      color: '#2d3436',
      border: '1px solid #2d3436',
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
      textDecoration: 'none',
    },
  };

  const floatingCircles = [
    { top: '10%', left: '20%', width: '80px', height: '80px', backgroundColor: '#6c5ce7' },
    { top: '70%', left: '80%', width: '60px', height: '60px', backgroundColor: '#00cec9' },
    { top: '50%', left: '30%', width: '100px', height: '100px', backgroundColor: '#fdcb6e' },
  ];

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }

        button:hover {
          filter: brightness(0.9);
        }

        input:focus {
          border-color: #0984e3;
        }
      `}</style>

      <div style={styles.animatedBackground}></div>

      <div style={styles.floatingShapes}>
        {floatingCircles.map((circle, i) => (
          <div key={i} style={{ ...styles.shapeCommon, ...circle }} />
        ))}
      </div>

      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.logo}>🚀 My Delta 10000 App</div>
        <h2 style={styles.title}>Sign In</h2>

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
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
          <span style={styles.link} onClick={handleForgotPassword}>Forgot Password?</span>
        </div>

        <button type="submit" style={styles.button}>Login</button>
        <button
          type="button"
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={handleRegisterRedirect}
        >
          Register
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
