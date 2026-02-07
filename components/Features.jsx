import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaMobileAlt, FaShieldAlt, FaComments } from 'react-icons/fa';

const features = [
    {
        icon: <FaClock size={30} />,
        title: '24/7 Availability',
        desc: 'Access medical support anytime, anywhere.'
    },
    {
        icon: <FaMobileAlt size={30} />,
        title: 'Easy Booking',
        desc: 'Book appointments seamlessly via our app or website.'
    },
    {
        icon: <FaShieldAlt size={30} />,
        title: 'Secure Data',
        desc: 'Your medical records are encrypted and safe with us.'
    },
    {
        icon: <FaComments size={30} />,
        title: 'Free Consultation',
        desc: 'Get initial consultation for free with our experts.'
    }
];

const Features = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose <span className="text-gradient">MediCare?</span></h2>
                    <p className="max-w-2xl mx-auto">We combine technology and care to provide the best healthcare experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card hover:bg-white/50 transition-all font-sans"
                            style={{ textAlign: 'center', padding: '2rem' }}
                        >
                            <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'inline-block' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
