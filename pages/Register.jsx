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

  // Memory cleanup for the local preview URL
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
      setPreview(URL.createObjectURL(selectedFile)); // Local preview before upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password)
      return setError("All fields are required");

    setLoading(true);

    // --- CLOUDINARY UPLOAD SETUP ---
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);

    // This "image" key MUST match your backend upload.single("image")
    if (file) {
      formData.append("image", file);
    }

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
        background: "#f1f5f9",
      }}
    >
      {/* Background Blobs (Matching Login Design) */}
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
          padding: "2.5rem 2rem",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "30px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Circular Image Upload Setup */}
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
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              position: "relative",
              border: "3px solid white",
            }}
          >
            <img
              src={
                preview ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${form.username || "User"}`
              }
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <label
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                background: "#2563eb",
                padding: "8px",
                borderRadius: "50%",
                color: "white",
                cursor: "pointer",
                display: "flex",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
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
          <h2
            style={{
              color: "#1e40af",
              marginBottom: "0.2rem",
              fontWeight: "bold",
            }}
          >
            Create Account
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Step inside MediCare
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "0.75rem",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "0.8rem",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          {/* Username Input */}
          <div style={{ position: "relative" }}>
            <FaUser
              style={{
                position: "absolute",
                left: "1.2rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
              }}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 3rem",
                borderRadius: "50px",
                border: "1px solid #e2e8f0",
                outline: "none",
                background: "rgba(255,255,255,0.8)",
              }}
            />
          </div>

          {/* Email Input */}
          <div style={{ position: "relative" }}>
            <FaEnvelope
              style={{
                position: "absolute",
                left: "1.2rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 3rem",
                borderRadius: "50px",
                border: "1px solid #e2e8f0",
                outline: "none",
                background: "rgba(255,255,255,0.8)",
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ position: "relative" }}>
            <FaLock
              style={{
                position: "absolute",
                left: "1.2rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 3rem",
                borderRadius: "50px",
                border: "1px solid #e2e8f0",
                outline: "none",
                background: "rgba(255,255,255,0.8)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              background: "#2563eb",
              color: "white",
              padding: "0.9rem",
              borderRadius: "50px",
              border: "none",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.3)",
            }}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <p
          style={{ textAlign: "center", fontSize: "0.9rem", color: "#475569" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
