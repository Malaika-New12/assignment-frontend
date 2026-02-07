import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import { motion } from 'framer-motion';
import { FaUserMd, FaSignOutAlt, FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError('Session expired. Please login again.');
      localStorage.removeItem('token');
      setTimeout(() => navigate('/login'), 1500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      {/* Sidebar */}
      <aside className="glass" style={{ width: '250px', margin: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderRadius: '20px', height: 'calc(100vh - 2rem)', position: 'sticky', top: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <FaUserMd size={30} />
          <span>MediCare</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <div style={{ padding: '0.8rem', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
            <FaUsers /> Patients
          </div>
          <div style={{ padding: '0.8rem', borderRadius: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', transition: '0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
            <FaCalendarAlt /> Appointments
          </div>
          <div style={{ padding: '0.8rem', borderRadius: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', transition: '0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
            <FaChartLine /> Analytics
          </div>
        </nav>

        <button onClick={handleLogout} style={{ padding: '0.8rem', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontWeight: '600' }}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Dashboard</h2>
          {/* User Profile / Avatar could go here */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Welcome, Doctor</div>
            <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '12px', color: 'var(--primary)' }}><FaUsers size={24} /></div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.5rem' }}>{users.length}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Total Patients</p>
            </div>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '12px', color: '#16a34a' }}><FaCalendarAlt size={24} /></div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.5rem' }}>12</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Appointments</p>
            </div>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#fae8ff', padding: '1rem', borderRadius: '12px', color: '#a855f7' }}><FaChartLine size={24} /></div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.5rem' }}>$4.2k</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Revenue</p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ overflowX: 'auto' }}
        >
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Patients</h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--primary)' }}>Loading data...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#dc2626' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(37,99,235,0.05)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', borderRadius: '8px 0 0 8px' }}>Patient</th>
                  <th style={{ padding: '1rem' }}>Email</th>
                  <th style={{ padding: '1rem' }}>Registered Date</th>
                  <th style={{ padding: '1rem', borderRadius: '0 8px 8px 0' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid var(--glass-border)', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.username || 'user' + idx)}`}
                        alt="avatar"
                        style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9' }}
                      />
                      <span style={{ fontWeight: '500' }}>{user.username}</span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '500' }}>Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          aside { display: none !important; } /* Hide sidebar on mobile for now, or make hamburger */
          main { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
