import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext
} from 'react';
import authService from '@services/authService';
import { normalizeUser } from '@utils/normalizeUser';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Khôi phục auth state từ localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedUser = authService.getCurrentUser();
                const token = authService.getToken();
                if (storedUser && token) {
                    // ensure stored user is normalized
                    const norm = normalizeUser(storedUser) || storedUser;
                    setUser(norm);
                    setIsAuthenticated(true);

                    // Optional: Verify token với backend
                    try {
                        const response = await authService.getMe();
                        if (response.success) {
                            setUser(response.user);
                        }
                    } catch (error) {
                        // Token không hợp lệ, clear auth
                        logout();
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Đăng nhập
    const login = useCallback(async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            // Map role từ frontend sang backend
            const backendCredentials = {
                ...credentials,
                vaiTro: authService.mapRoleToBackend(credentials.role)
            };

            const response = await authService.login(backendCredentials);

            if (response.success) {
                const norm = normalizeUser(response.user) || response.user;
                setUser(norm);
                setIsAuthenticated(true);
                return { success: true, user: response.user };
            }

            return { success: false, message: response.message };
        } catch (error) {
            const errorMessage = error.message || 'Đăng nhập thất bại';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    // Đăng ký
    const register = useCallback(async (userData) => {
        try {
            setLoading(true);
            setError(null);

            // Map role từ frontend sang backend
            const backendUserData = {
                ...userData,
                vaiTro: authService.mapRoleToBackend(userData.role)
            };

            const response = await authService.register(backendUserData);

            if (response.success) {
                const norm = normalizeUser(response.user) || response.user;
                setUser(norm);
                setIsAuthenticated(true);
                return { success: true, user: response.user };
            }

            return { success: false, message: response.message };
        } catch (error) {
            const errorMessage = error.message || 'Đăng ký thất bại';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    // Đăng xuất
    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
    }, []);

    // Cập nhật thông tin user
    const updateUser = useCallback((updatedUser) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedUser
        }));

        // Cập nhật localStorage
        const currentUser = authService.getCurrentUser();
        localStorage.setItem(
            'user',
            JSON.stringify({
                ...currentUser,
                ...updatedUser
            })
        );
    }, []);

    // Làm mới thông tin user
    const refreshUser = useCallback(async () => {
        try {
            const response = await authService.getMe();
            if (response.success) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
        } catch (error) {
            console.error('Refresh user error:', error);
        }
    }, []);

    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

// Convenience hook for consuming the AuthContext
export const useAuth = () => useContext(AuthContext);
