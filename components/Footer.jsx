import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="contact" className="glass" style={{ marginTop: '4rem', borderRadius: '16px 16px 0 0', borderBottom: 'none' }}>
            <div className="container section" style={{ padding: '3rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>MediCare</h3>
                        <p>Providing world-class healthcare services with modern technology and expert doctors.</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="#" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>Home</a></li>
                            <li><a href="#services" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>Services</a></li>
                            <li><a href="#about" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>About Us</a></li>
                            <li><a href="#contact" style={{ textDecoration: 'none', color: 'var(--text-muted)' }}>Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4>Contact Us</h4>
                        <p>123 Health Street, Medical City</p>
                        <p>support@medicare.com</p>
                        <p>+1 234 567 890</p>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <FaFacebook size={20} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
                            <FaTwitter size={20} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
                            <FaInstagram size={20} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
                            <FaLinkedin size={20} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
                        </div>
                    </div>

                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} MediCare. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
