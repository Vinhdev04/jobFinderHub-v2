// ==================== SkillTag.jsx ====================
import React from 'react';
import '../styles/SkillTag.css';

const SkillTag = ({ skill, onRemove }) => {
    return (
        <div className='skill-tag'>
            <span className='skill-tag__text'>{skill}</span>
            {onRemove && (
                <button
                    className='skill-tag__remove'
                    onClick={() => onRemove(skill)}
                    aria-label='Xóa kỹ năng'
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default SkillTag;
