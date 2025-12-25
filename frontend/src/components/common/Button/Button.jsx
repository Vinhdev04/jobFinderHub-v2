// src/components/common/Button/Button.jsx

import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = ''
}) => {
    const buttonClasses = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full',
        disabled && 'btn-disabled',
        loading && 'btn-loading',
        className
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <span className='btn-spinner'></span>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && (
                        <Icon className='btn-icon btn-icon-left' />
                    )}
                    <span>{children}</span>
                    {Icon && iconPosition === 'right' && (
                        <Icon className='btn-icon btn-icon-right' />
                    )}
                </>
            )}
        </button>
    );
};

export default Button;
