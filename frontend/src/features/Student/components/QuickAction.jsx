// ==================== QuickAction.jsx ====================
import React from 'react';
import '../styles/QuickAction.css';

const QuickAction = ({ icon, label, onClick }) => {
    return (
        <button className='quick-action' onClick={onClick}>
            <span className='quick-action__icon'>{icon}</span>
            <span className='quick-action__label'>{label}</span>
        </button>
    );
};

export default QuickAction;
