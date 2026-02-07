import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStethoscope, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '#services' },
        { name: 'About', path: '#about' },
        { name: 'Contact', path: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'}`} style={{
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            background: scrolled ? 'var(--glass-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
            padding: scrolled ? '1rem 0' : '1.5rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <FaStethoscope size={28} />
                    <span>MediCare</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.path} style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-main)'}>
                            {link.name}
                        </a>
                    ))}
                    <button className="btn btn-outline" onClick={() => navigate('/login')} style={{ padding: '0.6rem 1.5rem' }}>Login</button>
                    <button className="btn btn-primary" onClick={() => navigate('/register')} style={{ padding: '0.6rem 1.5rem' }}>Get Started</button>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer', color: 'var(--text-main)' }} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '1rem',
                            right: '1rem',
                            marginTop: '0.5rem',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            alignItems: 'center'
                        }}
                    >
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.path} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '500' }}>
                                {link.name}
                            </a>
                        ))}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button className="btn btn-outline" onClick={() => { setIsOpen(false); navigate('/login'); }}>Login</button>
                            <button className="btn btn-primary" onClick={() => { setIsOpen(false); navigate('/register'); }}>Register</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
