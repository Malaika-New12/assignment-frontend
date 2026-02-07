import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import { motion } from 'framer-motion';
import { FaUserMd, FaSignOutAlt, FaUsers, FaChartLine, FaCalendarAlt, FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('patients'); // 'patients', 'appointments', 'analytics'
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

  const SidebarItem = ({ icon, label, id }) => (
    <div
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      style={{
        padding: '0.8rem',
        borderRadius: '10px',
        background: activeTab === id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
        color: activeTab === id ? 'var(--primary)' : 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        cursor: 'pointer',
        transition: '0.2s'
      }}
      onMouseEnter={(e) => { if (activeTab !== id) e.currentTarget.style.color = 'var(--primary)'; }}
      onMouseLeave={(e) => { if (activeTab !== id) e.currentTarget.style.color = 'var(--text-muted)'; }}
    >
      {icon} {label}
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)', position: 'relative' }}>

      {/* Mobile Sidebar Toggle */}
      <div className="mobile-toggle-btn" style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1000 }}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="glass"
          style={{ padding: '0.6rem', border: 'none', cursor: 'pointer', display: 'none' }}
        >
          <FaBars size={20} color="var(--primary)" />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 999 }}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`glass sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: '250px', margin: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderRadius: '20px', height: 'calc(100vh - 2rem)', position: 'sticky', top: '1rem', transition: 'transform 0.3s ease', zIndex: 1000, background: 'rgba(255,255,255,0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <FaUserMd size={30} />
            <span>MediCare</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="mobile-close-btn" style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}>&times;</button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <SidebarItem icon={<FaUsers />} label="Patients" id="patients" />
          <SidebarItem icon={<FaCalendarAlt />} label="Appointments" id="appointments" />
          <SidebarItem icon={<FaChartLine />} label="Analytics" id="analytics" />
        </nav>

        <button onClick={handleLogout} style={{ padding: '0.8rem', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontWeight: '600' }}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', width: '100%' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingLeft: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', textTransform: 'capitalize' }}>{activeTab}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="desktop-welcome glass" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Welcome, Doctor</div>
            <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        </header>

        {/* Content Area Based on Active Tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'patients' && (
            <>
              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '12px', color: 'var(--primary)' }}><FaUsers size={24} /></div>
                  <div><h4 style={{ margin: 0, fontSize: '1.5rem' }}>{users.length}</h4><p style={{ margin: 0, fontSize: '0.9rem' }}>Total Patients</p></div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '12px', color: '#16a34a' }}><FaCalendarAlt size={24} /></div>
                  <div><h4 style={{ margin: 0, fontSize: '1.5rem' }}>12</h4><p style={{ margin: 0, fontSize: '0.9rem' }}>Appointments</p></div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#fae8ff', padding: '1rem', borderRadius: '12px', color: '#a855f7' }}><FaChartLine size={24} /></div>
                  <div><h4 style={{ margin: 0, fontSize: '1.5rem' }}>$4.2k</h4><p style={{ margin: 0, fontSize: '0.9rem' }}>Revenue</p></div>
                </div>
              </div>

              {/* Users Table */}
              <div className="glass-card" style={{ overflowX: 'auto' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Recent Patients</h3>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--primary)' }}>Loading data...</div>
                ) : error ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#dc2626' }}>{error}</div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
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
                            <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.username || 'user' + idx)}`} alt="avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9' }} />
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
              </div>
            </>
          )}

          {activeTab === 'appointments' && (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FaCalendarAlt size={60} style={{ margin: '0 0 1rem', opacity: 0.5 }} />
              <h3>No Appointments Yet</h3>
              <p>Your scheduled appointments will appear here.</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Schedule New</button>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FaChartLine size={60} style={{ margin: '0 0 1rem', opacity: 0.5 }} />
              <h3>Analytics Overview</h3>
              <p>Data visualization/graphs would be implemented here.</p>
            </div>
          )}
        </motion.div>
      </main>

      <style>{`
        .mobile-toggle-btn button { display: none; }
        
        @media (max-width: 768px) {
          .sidebar { 
            position: fixed !important; 
            top: 0; left: 0; 
            height: 100vh !important; 
            margin: 0 !important; 
            border-radius: 0 !important; 
            transform: translateX(-100%);
          }
          .sidebar.open { transform: translateX(0); }
          .desktop-welcome { display: none !important; }
          .mobile-toggle-btn button { display: block !important; }
          .mobile-close-btn { display: block !important; }
          main { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
