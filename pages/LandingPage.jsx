import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Services from '../components/Services';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Navbar />
            <Hero />
            <Features />
            <About />
            <Services />
            <Footer />
        </div>
    );
};

export default LandingPage;
