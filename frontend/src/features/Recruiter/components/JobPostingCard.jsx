import React from 'react';
import '../styles/JobPostingCard.css';

const JobPostingCard = ({ job, onEdit, onDelete, onViewApplications }) => {
  return (
    <div className="card">
      <div className="cardHeader">
        <h3 className="title">{job.title}</h3>
        <span className={`statusBadge ${job.status}`}>
          {job.statusText}
        </span>
      </div>

      <div className="cardBody">
        <div className="meta">
          <div className="metaItem">
            <span className="metaIcon">👥</span>
            <span className="metaText">{job.applicants} ứng viên</span>
          </div>
          <div className="metaItem">
            <span className="metaIcon">👁️</span>
            <span className="metaText">{job.views} lượt xem</span>
          </div>
        </div>
      </div>

      <div className="cardFooter">
        <button 
          className="viewBtn"
          onClick={() => onViewApplications?.(job)}
        >
          Xem ứng viên
        </button>
        <button 
          className="editBtn"
          onClick={() => onEdit?.(job)}
        >
          ✏️
        </button>
        <button 
          className="deleteBtn"
          onClick={() => onDelete?.(job)}
        >
          ⋮
        </button>
      </div>
    </div>
  );
};

export default JobPostingCard;