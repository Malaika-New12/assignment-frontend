import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaUserMd } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cleanup for image preview memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password)
      return setError("All fields are required");

    setLoading(true);
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (file) formData.append("image", file); // Must match backend upload.single("image")

    try {
      await axios.post(`${API_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Background Blobs (Same as Login) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Profile Image Preview Circle */}
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "white",
              borderRadius: "50%",
              margin: "0 auto 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
              border: "3px solid white",
            }}
          >
            <img
              src={
                preview ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${form.username || "User"}`
              }
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <label
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                background: "var(--primary)",
                padding: "5px",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
                display: "flex",
              }}
            >
              <FaCamera size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <h2 style={{ color: "var(--primary)", marginBottom: "0.2rem" }}>
            Create Account
          </h2>
          <p style={{ fontSize: "0.9rem" }}>Join the MediCare community</p>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "0.7rem",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "0.85rem",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Username */}
          <div style={{ position: "relative" }}>
            <FaUser
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={form.username}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 2.8rem",
                borderRadius: "50px",
                border: "1px solid #cbd5e1",
                outline: "none",
                background: "rgba(255,255,255,0.5)",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ position: "relative" }}>
            <FaEnvelope
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 2.8rem",
                borderRadius: "50px",
                border: "1px solid #cbd5e1",
                outline: "none",
                background: "rgba(255,255,255,0.5)",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <FaLock
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 2.8rem",
                borderRadius: "50px",
                border: "1px solid #cbd5e1",
                outline: "none",
                background: "rgba(255,255,255,0.5)",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: "0.5rem" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--primary)",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>

        <div style={{ textAlign: "center", marginTop: "-0.5rem" }}>
          <Link
            to="/"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
