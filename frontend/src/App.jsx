// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@layout/MainLayout';
import AuthLayout from '@layout/AuthLayout';
import ProtectedRoute from '@components/common/ProtectedRoute/ProtectedRoute.jsx';
import { routes } from '@routes/index.config.js';
import './App.css';

import '@assets/styles/variables.css';
import '@assets/styles/animations.css';

function App() {
    return (
        <BrowserRouter>
            <div className='app'>
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
            </div>
        </BrowserRouter>
    );
}

export default App;
