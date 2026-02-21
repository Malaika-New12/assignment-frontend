import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [file, setFile] = useState(null); // Cloudinary ke liye image file
  const [preview, setPreview] = useState(null); // Screen par dikhane ke liye
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Preview memory saaf karne ke liye
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // --- IMAGE SELECTION LOGIC ---
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // 1. File state mein save ki
      setPreview(URL.createObjectURL(selectedFile)); // 2. Preview dikhaya
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password)
      return setError("All fields are required");

    setLoading(true);

    // --- CLOUDINARY DATA PREPARATION ---
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);

    // "image" key aapke backend upload.single("image") se match karni chahiye
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
    <div className="min-h-screen flex items-center justify-center relative bg-[#f1f5f9]">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2.5rem 2rem",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "30px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* --- UPLOAD IMAGE OPTION (AVATAR + CAMERA) --- */}
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
              position: "relative",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              border: "3px solid white",
            }}
          >
            <img
              src={
                preview ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${form.username || "US"}`
              }
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            {/* Yeh blue camera icon hi aapka "Upload" button hai */}
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
                style={{ display: "none" }} // Real input ko hide kiya design ke liye
              />
            </label>
          </div>
          <h2 style={{ color: "#1e40af", fontWeight: "bold" }}>
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
              marginTop: "10px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            marginTop: "15px",
          }}
        >
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
              }}
            />
          </div>

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
              }}
            />
          </div>

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
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "0.9rem",
              borderRadius: "50px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <p
          style={{ textAlign: "center", fontSize: "0.9rem", marginTop: "15px" }}
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
