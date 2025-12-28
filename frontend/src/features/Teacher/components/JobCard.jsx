import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({ job }) => (
    <div className='job-card'>
        <div className='job-card__header'>
            <div className='job-card__company'>{job.company}</div>
            <div className='job-card__date'>{job.date}</div>
        </div>
        <div className='job-card__position'>{job.position}</div>
        <div className='job-card__meta'>{job.locations}</div>
        <button className='job-card__btn'>Xem chi tiết</button>
    </div>
);

export default JobCard;
