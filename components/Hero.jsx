import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaUserMd, FaHeartbeat } from 'react-icons/fa';

const Hero = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '80px',
            background: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80) no-repeat center center/cover',
            position: 'relative'
        }}>
            {/* Overlay to ensure text readability */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(235, 245, 255, 0.95) 0%, rgba(255,255,255,0.7) 100%)' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ maxWidth: '600px' }}
                >
                    <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem' }}>
                            <FaHeartbeat style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> #1 Healthcare Partner
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
                        Your Health Is Our <span style={{ color: 'var(--primary)' }}>Top Priority</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                        Connect with top-tier medical professionals anytime, anywhere. Experience modern healthcare with our advanced digital platform designed for your well-being.
                    </motion.p>

                    <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/register')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaCalendarCheck /> Book Appointment
                        </button>
                        <button className="btn btn-outline" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaUserMd /> Find Doctors
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants} style={{ marginTop: '3rem', display: 'flex', gap: '3rem' }}>
                        <div>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>24/7</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Online Support</p>
                        </div>
                        <div>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>100+</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Specialist Doctors</p>
                        </div>
                        <div>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>1M+</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Active Patients</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Image / Illustration */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hero-image-container"
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <div className="glass-card" style={{ padding: '1rem', transform: 'rotate(-3deg)' }}>
                        <img
                            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Doctor"
                            style={{ borderRadius: '16px', maxWidth: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="glass"
                        style={{
                            position: 'absolute',
                            bottom: '10%',
                            right: '10%',
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            zIndex: 2
                        }}
                    >
                        <div style={{ background: '#dcfce7', padding: '0.5rem', borderRadius: '50%', color: '#16a34a' }}>
                            <FaCalendarCheck />
                        </div>
                        <div>
                            <h6 style={{ margin: 0, fontSize: '0.9rem' }}>Appointment</h6>
                            <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>Confirmed</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 968px) {
          .container { grid-template-columns: 1fr !important; text-align: center; }
          .hero-image-container { display: none !important; } /* Hide on mobile to focus on CTA */
        }
      `}</style>
        </section>
    );
};

export default Hero;
