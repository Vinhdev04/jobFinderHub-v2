// src/pages/Home/HomePage.jsx

import React from 'react';
import HeroSection from '@features/Hero/HeroSection';
import UserRolesSection from '@features/UserRoles/UserRolesSection';
import SecuritySection from '@features/Security/SecuritySection';
import JobsSection from '@features/Jobs/JobsSection';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className='home-page'>
            <HeroSection />
            <UserRolesSection />
            <SecuritySection />
            <JobsSection />
        </div>
    );
};

export default HomePage;
