// frontend/src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// ✅ Base URL cho API
const API_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Check auth status on mount
    useEffect(() => {
        if (token) {
            // Verify token và get user info
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Fetch profile error:', error);
            // Token invalid, clear it
            logout();
        } finally {
            setLoading(false);
        }
    };

    // ✅ Register function
    const register = async (userData) => {
        try {
            console.log('Registering with data:', userData);
            
            const response = await axios.post(`${API_URL}/register`, userData);

            console.log('Register response:', response.data);

            if (response.data.success) {
                const { token: newToken, user: newUser } = response.data;
                
                // Save token
                localStorage.setItem('token', newToken);
                setToken(newToken);
                setUser(newUser);

                return {
                    success: true,
                    message: response.data.message
                };
            }

            return {
                success: false,
                message: response.data.message || 'Đăng ký thất bại'
            };
        } catch (error) {
            console.error('Register error:', error);
            
            return {
                success: false,
                message: error.response?.data?.message || 'Đăng ký thất bại'
            };
        }
    };

    // ✅ Login function
    const login = async (credentials) => {
        try {
            console.log('Logging in with credentials:', credentials);
            
            const response = await axios.post(`${API_URL}/login`, credentials);

            console.log('Login response:', response.data);

            if (response.data.success) {
                const { token: newToken, user: newUser } = response.data;
                
                // Save token
                localStorage.setItem('token', newToken);
                setToken(newToken);
                setUser(newUser);

                return {
                    success: true,
                    message: response.data.message
                };
            }

            return {
                success: false,
                message: response.data.message || 'Đăng nhập thất bại'
            };
        } catch (error) {
            console.error('Login error:', error);
            
            return {
                success: false,
                message: error.response?.data?.message || 'Đăng nhập thất bại'
            };
        }
    };

    // ✅ Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    
    
    return context;
};