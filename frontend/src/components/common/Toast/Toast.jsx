import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ 
    type = 'success', // success, error, warning, info
    message, 
    duration = 3000,
    onClose 
}) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} />,
        error: <XCircle size={20} />,
        warning: <AlertCircle size={20} />,
        info: <Info size={20} />
    };

    return (
        <div className={`toast toast--${type}`}>
            <div className="toast__icon">
                {icons[type]}
            </div>
            <div className="toast__message">
                {message}
            </div>
            <button className="toast__close" onClick={onClose}>
                <X size={18} />
            </button>
        </div>
    );
};

export default Toast;