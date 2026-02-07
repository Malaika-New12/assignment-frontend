import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaHospital, FaAward } from 'react-icons/fa';

const About = () => {
    return (
        <section id="about" className="section relative" style={{ background: 'linear-gradient(to right, #f8fafc, #edf2f7)' }}>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ position: 'relative' }}
                    >
                        <div className="glass-card" style={{ padding: '0.5rem', transform: 'rotate(-2deg)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="About Us"
                                style={{ borderRadius: '16px', width: '100%', height: 'auto' }}
                            />
                        </div>
                        <div className="glass" style={{ position: 'absolute', bottom: '-20px', right: '-20px', padding: '1.5rem', borderRadius: '16px' }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '2rem' }}>15+</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Years Experience</p>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Leading the Way in <br /><span className="text-gradient">Medical Excellence</span></h2>
                        <p className="mb-6">
                            MediCare is dedicated to providing top-tier healthcare services with a focus on patient comfort and advanced medical technology. Our team of experienced professionals works around the clock to ensure your well-being.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#dbeafe', padding: '0.8rem', borderRadius: '50%', color: 'var(--primary)' }}><FaUserMd size={20} /></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Certified Doctors</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Highly qualified medical experts</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#dcfce7', padding: '0.8rem', borderRadius: '50%', color: '#16a34a' }}><FaHospital size={20} /></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Modern Facilities</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>State-of-the-art medical equipment</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#fae8ff', padding: '0.8rem', borderRadius: '50%', color: '#a855f7' }}><FaAward size={20} /></div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Award Winning</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Recognized for medical excellence</p>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ marginTop: '2rem' }}>Learn More</button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
