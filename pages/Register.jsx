import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaUserPlus,
} from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle File Selection and Preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create local URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password)
      return setError("All fields are required");

    setLoading(true);

    // --- CLOUDINARY UPLOAD LOGIC ---
    // Create FormData to send binary file + text data
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);

    // Important: Key "image" must match backend upload.single("image")
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      {/* Background Blobs for Glassmorphism effect */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-md w-full p-8 shadow-2xl backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
            <FaUserPlus size={30} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">Join MediCare today</p>
        </div>

        {error && (
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center text-sm font-medium border border-red-200"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Profile Image Upload with Preview */}
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="relative w-24 h-24 group">
              <img
                src={
                  preview ||
                  "https://api.dicebear.com/7.x/initials/svg?seed=User"
                }
                alt="Preview"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-md transition group-hover:opacity-80"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer shadow-lg hover:bg-blue-700 transition">
                <FaCamera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-xs text-gray-400 font-medium">
              Upload Profile Photo
            </span>
          </div>

          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
              className="w-full p-3 pl-12 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white/50"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="w-full p-3 pl-12 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white/50"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full p-3 pl-12 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
