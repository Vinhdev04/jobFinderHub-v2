import React, { useState } from 'react';
import '../styles/SkillModal.css';

const SkillModal = ({ open, onClose, onSave }) => {
    const [skill, setSkill] = useState('');

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(skill);
        setSkill('');
    };

    return (
        <div className="skill-modal-overlay">
            <div className="skill-modal">
                <h3>Thêm kỹ năng</h3>
                <form onSubmit={handleSubmit}>
                    <input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Nhập kỹ năng" />
                    <div className="skill-modal-actions">
                        <button type="button" onClick={onClose}>Hủy</button>
                        <button type="submit">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SkillModal;
