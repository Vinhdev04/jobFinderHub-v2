// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { getDashboardRoute } from '@config/index.config';

const ProtectedRoute = ({ children, requiredRole = null, redirect = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="protected-route__loading">
        <div className="spinner">Đang tải...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle role-based redirect (for /dashboard route)
  if (redirect === 'role-based' && user?.role) {
    const dashboardRoute = getDashboardRoute(user.role);
    return <Navigate to={dashboardRoute} replace />;
  }

  // Check if user has required role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard or 403 page
    const userDashboard = getDashboardRoute(user.role);
    return <Navigate to={userDashboard} replace />;
  }

  return children;
};

export default ProtectedRoute;


// ==================== src/hooks/useAuth.js ====================
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if user is logged in (check token, call API, etc.)
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        // Call API to get user info
        // const response = await fetch('/api/auth/me', {
        //   headers: { 'Authorization': `Bearer ${token}` }
        // });
        // const userData = await response.json();
        
        // Mock user data for now
        const userData = {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'student@example.com',
          role: 'student', // student, teacher, company, admin
          avatar: null
        };
        
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Call login API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      
      // Mock response
      const data = {
        token: 'mock_token_123',
        user: {
          id: 1,
          name: 'Nguyễn Văn A',
          email: credentials.email,
          role: 'student'
        }
      };
      
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      login,
      logout,
      updateUser,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


// ==================== src/routes/AppRoutes.jsx ====================
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@config/index.config';
import ProtectedRoute from '@components/ProtectedRoute';

// Layouts
import MainLayout from '@layouts/MainLayout';
import AuthLayout from '@layouts/AuthLayout';
import DashboardLayout from '@layouts/DashboardLayout';

const layoutComponents = {
  main: MainLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout
};

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Layout = layoutComponents[route.layout] || MainLayout;
        const Element = route.element;
        const { requiresAuth, requiredRole, redirect } = route.meta;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              requiresAuth ? (
                <ProtectedRoute requiredRole={requiredRole} redirect={redirect}>
                  <Layout>
                    {Element ? <Element /> : null}
                  </Layout>
                </ProtectedRoute>
              ) : (
                <Layout>
                  {Element ? <Element /> : null}
                </Layout>
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;


// ==================== src/App.jsx ====================
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@hooks/useAuth';
import AppRoutes from '@routes/AppRoutes';
import '@assets/styles/variables.css';
import '@assets/styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;



