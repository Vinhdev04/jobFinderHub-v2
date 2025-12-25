// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@layout/MainLayout';
import AuthLayout from '@layout/AuthLayout';
import ProtectedRoute from '@components/common/ProtectedRoute/ProtectedRoute.jsx';
import { routes } from '@routes/index.config.js';

// 2. Base variables and utilities
import '@assets/styles/variables.css';
import '@assets/styles/animations.css';
import '@assets/styles/bootstrap-grid.css';

import './App.css';
import Navbar from '@components/common/Navbar/Navbar';
import Footer from '@components/common/Footer/Footer';

function App() {
    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar />
                <Routes>
                    {routes.map((route, index) => {
                        const Component = route.element;
                        const { requiresAuth, showNavbar, showFooter } =
                            route.meta;

                        // Auth layout (Login/Register pages)
                        if (route.layout === 'auth') {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <AuthLayout>
                                            <Component />
                                        </AuthLayout>
                                    }
                                />
                            );
                        }

                        // Protected routes
                        if (requiresAuth) {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <ProtectedRoute>
                                            <MainLayout
                                                showNavbar={showNavbar}
                                                showFooter={showFooter}
                                            >
                                                <Component />
                                            </MainLayout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        }

                        // Public routes with MainLayout
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <MainLayout
                                        showNavbar={showNavbar}
                                        showFooter={showFooter}
                                    >
                                        <Component />
                                    </MainLayout>
                                }
                            />
                        );
                    })}
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
