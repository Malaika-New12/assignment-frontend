import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('All fields are required');
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="doctor-illustration">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png"
            alt="Doctor Login"
            className="doctor-img"
          />
        </div>
        <h2>Doctor Login</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      <style>{`
        .login-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #fdf6e3 0%, #e0ecfc 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-card {
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
        .doctor-illustration {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .doctor-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          box-shadow: 0 2px 8px #0001;
          object-fit: cover;
          border: 3px solid #60a5fa;
          background: #fff;
        }
        .login-card h2 {
          margin-bottom: 0.2rem;
          text-align: center;
          color: #2563eb;
          font-weight: 700;
        }
        .login-card input {
          padding: 0.7rem;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 1rem;
          width: 100%;
          background: #f8fafc;
        }
        .login-btn {
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
        .login-btn:disabled {
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
        .register-link {
          text-align: center;
          margin: 0;
        }
        .login-card a {
          color: #2563eb;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Login;
