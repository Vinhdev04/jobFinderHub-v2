import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    size = 'default',
    showLogo = true
}) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`modal-overlay ${isClosing ? 'closing' : ''}`}
            onClick={handleOverlayClick}
        >
            <div
                className={`modal-container ${size === 'large' ? 'large' : ''}`}
            >
                <div className='modal-header'>
                    <div className='modal-header-content'>
                        {showLogo && (
                            <div className='modal-logo'>
                                <svg
                                    width='32'
                                    height='32'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <rect
                                        x='3'
                                        y='6'
                                        width='18'
                                        height='15'
                                        rx='2'
                                        stroke='white'
                                        strokeWidth='2'
                                    />
                                    <path
                                        d='M3 10h18M8 3v4M16 3v4'
                                        stroke='white'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                    />
                                </svg>
                            </div>
                        )}
                        <h2 className='modal-title'>{title}</h2>
                        {subtitle && (
                            <p className='modal-subtitle'>{subtitle}</p>
                        )}
                    </div>
                    <button
                        className='modal-close'
                        onClick={handleClose}
                        aria-label='Close modal'
                    >
                        <svg
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                        </svg>
                    </button>
                </div>

                <div className='modal-body'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
