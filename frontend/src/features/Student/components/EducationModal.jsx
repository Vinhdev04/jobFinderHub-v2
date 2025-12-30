import React, { useState } from 'react';
import './EducationModal.css';

const EducationModal = ({ open, onClose, onSave }) => {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [year, setYear] = useState('');

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ school, degree, year });
        setSchool(''); setDegree(''); setYear('');
    };

    return (
        <div className="edu-modal-overlay">
            <div className="edu-modal">
                <h3>Thêm học vấn</h3>
                <form onSubmit={handleSubmit}>
                    <label>Trường</label>
                    <input value={school} onChange={e => setSchool(e.target.value)} />
                    <label>Bằng cấp</label>
                    <input value={degree} onChange={e => setDegree(e.target.value)} />
                    <label>Năm</label>
                    <input value={year} onChange={e => setYear(e.target.value)} />
                    <div className="edu-modal-actions">
                        <button type="button" onClick={onClose}>Hủy</button>
                        <button type="submit">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EducationModal;
