import React, { createContext, useContext, useState, useCallback } from 'react';
import ConfirmModal from '@components/common/ConfirmModal/ConfirmModal';

const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }) => {
    const [state, setState] = useState({ open: false, message: '', title: '', resolver: null });

    const confirm = useCallback((message, title) => {
        return new Promise((resolve) => {
            setState({ open: true, message, title, resolver: resolve });
        });
    }, []);

    // Listen for global confirm events from confirmAction
    React.useEffect(() => {
        const handler = (e) => {
            const { message, title, resolve } = e.detail || {};
            if (!message) return;
            // set state and when user responds, call resolve
            setState({ open: true, message, title, resolver: resolve });
        };

        window.addEventListener('app:confirm', handler);
        return () => window.removeEventListener('app:confirm', handler);
    }, []);

    const handleCancel = () => {
        if (state.resolver) state.resolver(false);
        setState({ open: false, message: '', title: '', resolver: null });
    };

    const handleConfirm = () => {
        if (state.resolver) state.resolver(true);
        setState({ open: false, message: '', title: '', resolver: null });
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <ConfirmModal
                open={state.open}
                title={state.title}
                message={state.message}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => {
    const ctx = useContext(ConfirmContext);
    if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider');
    return ctx.confirm;
};

export default ConfirmContext;
