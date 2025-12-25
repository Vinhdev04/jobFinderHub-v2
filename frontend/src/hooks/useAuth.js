// src/hooks/useAuth.js

import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on mount
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');

            if (token && userData) {
                setIsAuthenticated(true);
                setUser(JSON.parse(userData));
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (token, userData) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUser(null);
    };

    const updateUser = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
    };

    return {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        updateUser,
        checkAuth
    };
};
