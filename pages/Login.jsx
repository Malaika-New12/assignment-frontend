import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import { motion } from 'framer-motion';
import { FaUserMd, FaEnvelope, FaLock } from 'react-icons/fa';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <FaUserMd size={40} color="var(--primary)" />
          </div>
          <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p>Please login to your dashboard</p>
        </div>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ position: 'relative' }}>
            <FaEnvelope style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '50px', border: '1px solid #cbd5e1', outline: 'none', background: 'rgba(255,255,255,0.5)' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <FaLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '50px', border: '1px solid #cbd5e1', outline: 'none', background: 'rgba(255,255,255,0.5)' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Register</Link>
        </p>

        <div style={{ textAlign: 'center', marginTop: '-0.5rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>Back to Home</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
