// src/components/layout/MainLayout.jsx

import React from 'react';
import Navbar from '@components/common/Navbar/Navbar';
import Footer from '@components/common/Footer/Footer';
import './MainLayout.css';

const MainLayout = ({
    children,
    isDark = false,
    showNavbar = true,
    showFooter = true
}) => {
    return (
        <div className=' main-layout'>
            {showNavbar && <Navbar isDark={isDark} />}

            <main className='main-content'>{children}</main>

            {showFooter && <Footer />}
        </div>
    );
};

export default MainLayout;
