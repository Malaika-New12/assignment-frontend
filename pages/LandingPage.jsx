import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Navbar />
            <Hero />
            <Services />
            <Footer />
        </div>
    );
};

export default LandingPage;
