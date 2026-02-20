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
  FaBars,
} from "react-icons/fa";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      localStorage.removeItem("token");
      localStorage.removeItem("userImg"); // Cleanup image on logout
      setTimeout(() => navigate("/login"), 1500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userImg");
    navigate("/login");
  };

  const SidebarItem = ({ icon, label, id }) => (
    <div
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false);
      }}
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
        position: "relative",
      }}
    >
      {/* Mobile Toggle & Sidebar Overlay logic remains same... */}

      {/* Sidebar */}
      <aside
        className={`glass sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          width: "250px",
          margin: "1rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          borderRadius: "20px",
          height: "calc(100vh - 2rem)",
          position: "sticky",
          top: "1rem",
          transition: "transform 0.3s ease",
          zIndex: 1000,
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flex: 1,
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
      <main style={{ flex: 1, padding: "2rem", width: "100%" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            paddingLeft: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2vw, 2rem)",
              textTransform: "capitalize",
            }}
          >
            {activeTab}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              className="desktop-welcome glass"
              style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
            >
              Welcome, Doctor
            </div>
            {/* UPDATED: User's own profile image from localStorage */}
            <img
              src={
                localStorage.getItem("userImg") ||
                "https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png"
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "patients" && (
            <div className="glass-card" style={{ overflowX: "auto" }}>
              <h3 style={{ marginBottom: "1.5rem" }}>Recent Patients</h3>
              {loading ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--primary)",
                  }}
                >
                  Loading data...
                </div>
              ) : error ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#dc2626",
                  }}
                >
                  {error}
                </div>
              ) : (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "600px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "rgba(37,99,235,0.05)",
                        textAlign: "left",
                      }}
                    >
                      <th
                        style={{ padding: "1rem", borderRadius: "8px 0 0 8px" }}
                      >
                        Patient
                      </th>
                      <th style={{ padding: "1rem" }}>Email</th>
                      <th style={{ padding: "1rem" }}>Registered Date</th>
                      <th
                        style={{ padding: "1rem", borderRadius: "0 8px 8px 0" }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
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
                          {/* UPDATED: Actual Cloudinary Image or Backup Dicebear Avatar */}
                          <img
                            src={
                              user.profileImage ||
                              `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`
                            }
                            alt="avatar"
                            style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              background: "#f1f5f9",
                              border: "1px solid #eee",
                            }}
                          />
                          <span style={{ fontWeight: "500" }}>
                            {user.username}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {user.email}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span
                            style={{
                              background: "#dcfce7",
                              color: "#16a34a",
                              padding: "0.3rem 0.8rem",
                              borderRadius: "50px",
                              fontSize: "0.85rem",
                              fontWeight: "500",
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
          {/* Appointments & Analytics tabs remain same... */}
        </motion.div>
      </main>
      {/* Sidebar Styles remain same... */}
    </div>
  );
};

export default Dashboard;
