import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaHeartbeat, FaAmbulance, FaMicroscope } from 'react-icons/fa';

const services = [
    {
        icon: <FaUserMd size={40} />,
        title: 'Expert Consultation',
        desc: 'Connect with specialized doctors across various fields for personalized medical advice.'
    },
    {
        icon: <FaHeartbeat size={40} />,
        title: 'Cardiology',
        desc: 'Comprehensive heart care including diagnostics, treatment, and preventive strategies.'
    },
    {
        icon: <FaAmbulance size={40} />,
        title: 'Emergency Care',
        desc: '24/7 emergency support ensuring you get immediate medical attention when needed.'
    },
    {
        icon: <FaMicroscope size={40} />,
        title: 'Lab Testing',
        desc: 'Accurate and timely diagnostic lab services with home sample collection options.'
    }
];

const Services = () => {
    return (
        <section id="services" className="section relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Our Medical <span className="text-primary">Services</span></h2>
                    <p className="max-w-2xl mx-auto">We provide a wide range of medical services to ensure your health fits your lifestyle.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card text-center hover:bg-white/90"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                        >
                            <div className="icon-box text-primary mb-4" style={{ color: 'var(--primary)', background: '#ecf4ff', padding: '1.5rem', borderRadius: '50%' }}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
