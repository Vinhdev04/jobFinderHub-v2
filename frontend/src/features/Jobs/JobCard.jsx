// src/features/Jobs/JobCard.jsx

import React from 'react';
import { MapPin, DollarSign, Clock, Users, Heart } from 'lucide-react';
import './JobCard.css';

const JobCard = ({ job, isFavorite, toggleFavorite }) => {
    return (
        <div className='job-card'>
            <div className='job-card-header'>
                <div className='job-company-info'>
                    <img
                        src={job.logo}
                        alt={job.company}
                        className='job-logo'
                    />
                    <div className='job-info'>
                        <h3 className='job-title'>{job.title}</h3>
                        <p className='job-company'>{job.company}</p>
                    </div>
                </div>

                <button
                    onClick={() => toggleFavorite(job.id)}
                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                >
                    <Heart
                        size={20}
                        className='heart-icon'
                        fill={isFavorite ? 'currentColor' : 'none'}
                    />
                </button>
            </div>

            <p className='job-description'>{job.description}</p>

            <div className='job-skills'>
                {job.skills.map((skill, idx) => (
                    <span key={idx} className='skill-tag'>
                        {skill}
                    </span>
                ))}
            </div>

            <div className='job-meta'>
                <div className='job-meta-row'>
                    <div className='job-meta-item'>
                        <MapPin size={16} />
                        <span>{job.location}</span>
                    </div>
                    <div className='job-meta-item'>
                        <DollarSign size={16} />
                        <span>{job.salary}</span>
                    </div>
                </div>
                <div className='job-meta-row'>
                    <div className='job-meta-item'>
                        <Clock size={16} />
                        <span>{job.duration}</span>
                    </div>
                    <div className='job-meta-item'>
                        <Users size={16} />
                        <span>{job.applicants} ứng viên</span>
                    </div>
                </div>
            </div>

            <div className='job-actions'>
                <button className='btn-apply'>Ứng tuyển ngay</button>
                <button className='btn-detail'>Xem chi tiết</button>
            </div>
        </div>
    );
};

export default JobCard;
