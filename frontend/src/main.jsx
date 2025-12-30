import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from '@hooks/useAuth.jsx';
import { ToastProvider } from '@hooks/useToast.jsx';
import { ConfirmProvider } from './contexts/ConfirmContext.jsx';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ToastProvider>
                <ConfirmProvider>
                    <App />
                </ConfirmProvider>
            </ToastProvider>
        </AuthProvider>
    </StrictMode>
);
