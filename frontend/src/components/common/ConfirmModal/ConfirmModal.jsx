import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ open, title, message, onCancel, onConfirm }) => {
    if (!open) return null;

    return (
        <div className="confirm-modal__backdrop">
            <div className="confirm-modal">
                {title && <h3 className="confirm-modal__title">{title}</h3>}
                <div className="confirm-modal__message">{message}</div>
                <div className="confirm-modal__actions">
                    <button className="confirm-modal__btn" onClick={onCancel}>Hủy</button>
                    <button className="confirm-modal__btn confirm-modal__btn--confirm" onClick={onConfirm}>Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
