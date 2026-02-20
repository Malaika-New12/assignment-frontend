import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaSignOutAlt,
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("patients");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError("Session expired. Please login again.");
      localStorage.clear();
      setTimeout(() => navigate("/login"), 1500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const SidebarItem = ({ icon, label, id }) => (
    <div
      onClick={() => setActiveTab(id)}
      style={{
        padding: "0.8rem",
        borderRadius: "10px",
        background: activeTab === id ? "rgba(37, 99, 235, 0.1)" : "transparent",
        color: activeTab === id ? "var(--primary)" : "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {icon} {label}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-gradient)",
      }}
    >
      {/* Sidebar */}
      <aside
        className="glass"
        style={{
          width: "250px",
          margin: "1rem",
          padding: "2rem",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          height: "calc(100vh - 2rem)",
          position: "sticky",
          top: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            color: "var(--primary)",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          <FaUserMd size={30} />
          <span>MediCare</span>
        </div>

        <nav
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <SidebarItem icon={<FaUsers />} label="Patients" id="patients" />
          <SidebarItem
            icon={<FaCalendarAlt />}
            label="Appointments"
            id="appointments"
          />
          <SidebarItem
            icon={<FaChartLine />}
            label="Analytics"
            id="analytics"
          />
        </nav>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.8rem",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#dc2626",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ textTransform: "capitalize" }}>{activeTab}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              className="glass"
              style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
            >
              Welcome, Doctor
            </div>

            {/* Displaying Login User's Profile Image */}
            <img
              src={
                localStorage.getItem("userImg") ||
                "https://api.dicebear.com/7.x/initials/svg?seed=Doctor"
              }
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {activeTab === "patients" && (
            <div className="glass-card" style={{ padding: "1.5rem" }}>
              <h3>Recent Patients</h3>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "1rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        textAlign: "left",
                        background: "rgba(37,99,235,0.05)",
                      }}
                    >
                      <th style={{ padding: "1rem" }}>Patient</th>
                      <th style={{ padding: "1rem" }}>Email</th>
                      <th style={{ padding: "1rem" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        style={{
                          borderBottom: "1px solid var(--glass-border)",
                        }}
                      >
                        <td
                          style={{
                            padding: "1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.8rem",
                          }}
                        >
                          <img
                            src={
                              user.profileImage ||
                              `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`
                            }
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          {user.username}
                        </td>
                        <td style={{ padding: "1rem" }}>{user.email}</td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              background: "#dcfce7",
                              color: "#16a34a",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "50px",
                              fontSize: "0.8rem",
                            }}
                          >
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
