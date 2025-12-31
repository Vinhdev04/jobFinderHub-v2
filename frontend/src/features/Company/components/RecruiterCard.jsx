import React from 'react';
import '../styles/RecruiterCard.css';

const RecruiterCard = ({ recruiter, onEdit, onDelete, onView }) => {
    return (
        <div className='card'>
            <div className='cardHeader'>
                <div className='recruiterInfo'>
                    <div className='avatar'>{recruiter.name.charAt(0)}</div>
                    <div>
                        <h3 className='name'>{recruiter.name}</h3>
                        <p className='email'>{recruiter.email}</p>
                    </div>
                </div>
                <span className={`statusBadge ${recruiter.status}`}>
                    {recruiter.statusText}
                </span>
            </div>

            <div className='cardBody'>
                <div className='stat'>
                    <span className='statLabel'>Tin đã đăng</span>
                    <span className='statValue'>{recruiter.jobsPosted}</span>
                </div>
                <div className='stat'>
                    <span className='statLabel'>Ứng viên</span>
                    <span className='statValue'>{recruiter.candidates}</span>
                </div>
                <div className='stat'>
                    <span className='statLabel'>Đã tuyển</span>
                    <span className='statValue'>{recruiter.hired}</span>
                </div>
            </div>

            <div className='cardFooter'>
                <button
                    className='viewBtn'
                    onClick={() => onView && onView(recruiter)}
                >
                    👁️ Xem
                </button>
                <button className='editBtn' onClick={() => onEdit(recruiter)}>
                    ✏️ Chỉnh sửa
                </button>
                <button
                    className='deleteBtn'
                    onClick={() => onDelete(recruiter)}
                >
                    🗑️ Xóa
                </button>
            </div>
        </div>
    );
};

export default RecruiterCard;
