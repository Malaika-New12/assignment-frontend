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

                    <motion.h1 variants={itemVariants} style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Your Health Is Our <br /> <span className="text-gradient">Top Priority</span>
                    </motion.h1>

                    <motion.div variants={itemVariants} style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div>
                            <h3 style={{ margin: 0 }} className="text-gradient">24/7</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Online Support</p>
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }} className="text-gradient">100+</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Specialist Doctors</p>
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }} className="text-gradient">1M+</h3>
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
                    style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
                >
                    <div className="glass-card animate-float" style={{ padding: '0.8rem', transform: 'rotate(-3deg)', border: '1px solid rgba(255,255,255,0.8)' }}>
                        <img
                            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Doctor"
                            style={{ borderRadius: '16px', maxWidth: '100%', height: 'auto', display: 'block', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        />
                    </div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 968px) {
          .container { 
            grid-template-columns: 1fr !important; 
            text-align: center; 
            padding-bottom: 2rem;
          }
          .hero-image-container { 
            order: -1; 
            margin-bottom: 2rem;
          }
          .glass-card {
            max-width: 80%;
            margin: 0 auto;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
