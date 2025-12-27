// ==================== EducationCard.jsx ====================
import React from 'react';
import '../styles/EducationCard.css';

const EducationCard = ({ school, major, period, gpa, onEdit }) => {
    return (
        <div className='education-card'>
            <div className='education-card__header'>
                <div className='education-card__info'>
                    <h3 className='education-card__school'>{school}</h3>
                    <p className='education-card__major'>{major}</p>
                    <p className='education-card__details'>
                        {period} • GPA: {gpa}
                    </p>
                </div>
                {onEdit && (
                    <button
                        className='education-card__edit'
                        onClick={onEdit}
                        aria-label='Chỉnh sửa'
                    >
                        ✏️
                    </button>
                )}
            </div>
        </div>
    );
};

export default EducationCard;
