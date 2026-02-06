import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.username || !form.email || !form.password) return 'All fields are required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Invalid email format';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errMsg = validate();
    if (errMsg) return setError(errMsg);
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-bg">
      <form className="register-card" onSubmit={handleSubmit}>
        <div className="avatar-wrap">
          <img
            src="https://randomuser.me/api/portraits/lego/1.jpg"
            alt="Register Avatar"
            className="avatar-img"
          />
        </div>
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="toggle"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" disabled={loading} className="register-btn">
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      <style>{`
        .register-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .register-card {
          background: #fff;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 18px;
          box-shadow: 0 4px 24px #0002;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          min-width: 340px;
          align-items: center;
        }
        .avatar-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .avatar-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          box-shadow: 0 2px 8px #0001;
          object-fit: cover;
          border: 3px solid #a1c4fd;
        }
        .register-card h2 {
          margin-bottom: 0.2rem;
          text-align: center;
          color: #2563eb;
          font-weight: 700;
        }
        .register-card input {
          padding: 0.7rem;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 1rem;
          width: 100%;
          background: #f8fafc;
        }
        .register-btn {
          background: linear-gradient(90deg, #2563eb 60%, #60a5fa 100%);
          color: #fff;
          border: none;
          padding: 0.7rem;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          margin-top: 0.2rem;
          transition: background 0.2s;
        }
        .register-btn:disabled {
          background: #93c5fd;
          cursor: not-allowed;
        }
        .error {
          color: #dc2626;
          background: #fee2e2;
          padding: 0.5rem;
          border-radius: 4px;
          text-align: center;
          width: 100%;
        }
        .login-link {
          text-align: center;
          margin: 0;
        }
        .register-card a {
          color: #2563eb;
          text-decoration: none;
        }
        .password-field {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .password-field input {
          flex: 1;
        }
        .toggle {
          background: none;
          border: none;
          font-size: 1.2rem;
          margin-left: -2rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Register;
