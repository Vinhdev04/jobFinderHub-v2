// src/pages/Home/HomePage.jsx

import React from 'react';
import HeroSection from '@features/Hero/HeroSection';
import UserRolesSection from '@features/UserRoles/UserRolesSection';
import SecuritySection from '@features/Security/SecuritySection';
import JobsSection from '@features/Jobs/JobsSection';


const HomePage = () => {
    return (
        <div className='home-page'>
            <HeroSection />
            <JobsSection />
            <SecuritySection />
            <UserRolesSection />
        </div>
    );
};

export default HomePage;
