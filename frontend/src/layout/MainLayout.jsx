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
        <>
            {' '}
            {/* {showNavbar && <Navbar isDark={isDark} />} */}
            <div className=' main-layout'>
                <main className='main-content'>{children}</main>
            </div>
            {/* {showFooter && <Footer />} */}
        </>
    );
};

export default MainLayout;
