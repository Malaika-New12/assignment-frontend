import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const res = await axios.get('http://localhost:5000/api/users', {
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
    <div className="dashboard-bg">
      <div className="dashboard-card">
        <div className="header">
          <div className="doctor-avatar">
            <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png" alt="Doctor" />
            <span>Doctor Dashboard</span>
          </div>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.username || 'user'+idx)}`}
                      alt="avatar"
                      className="user-avatar"
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style>{`
        .dashboard-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #e0ecfc 0%, #fdf6e3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dashboard-card {
          background: #fff;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          border-radius: 18px;
          box-shadow: 0 4px 24px #0002;
          min-width: 420px;
          max-width: 700px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }
        .doctor-avatar {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-weight: 700;
          color: #2563eb;
          font-size: 1.2rem;
        }
        .doctor-avatar img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #60a5fa;
          background: #fff;
        }
        .logout {
          background: #dc2626;
          color: #fff;
          border: none;
          padding: 0.5rem 1.1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
        }
        .loading {
          text-align: center;
          color: #2563eb;
        }
        .error {
          color: #dc2626;
          background: #fee2e2;
          padding: 0.5rem;
          border-radius: 4px;
          text-align: center;
          margin-bottom: 1rem;
        }
        .user-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        th, td {
          padding: 0.7rem;
          border-bottom: 1px solid #eee;
          text-align: left;
        }
        th {
          background: #f1f5f9;
        }
        tr:last-child td {
          border-bottom: none;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #a1c4fd;
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
