import React from 'react';
import '../styles/CandidateList.css';

const CandidateList = ({ candidates, onViewProfile, onScheduleInterview }) => {
  return (
    <div className="list">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="candidateItem">
          <div className="candidateInfo">
            <img 
              src={candidate.avatar || `https://ui-avatars.com/api/?name=${candidate.name}&background=14b8a6&color=fff`} 
              alt={candidate.name}
              className="avatar"
            />
            <div className="details">
              <div className="nameRow">
                <h3 className="name">{candidate.name}</h3>
                {candidate.status && (
                  <span className={`badge ${candidate.status}`}>
                    {candidate.statusText}
                  </span>
                )}
              </div>
              <p className="position">{candidate.position} • {candidate.location}</p>
              <div className="meta">
                <span>⭐ {candidate.rating}</span>
                <span>📅 {candidate.appliedDate}</span>
              </div>
              {candidate.skills && (
                <div className="skills">
                  {candidate.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="skillTag">{skill}</span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="skillTag">+{candidate.skills.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="actions">
            <button 
              className="viewBtn"
              onClick={() => onViewProfile?.(candidate)}
            >
              Xem hồ sơ
            </button>
            {onScheduleInterview && (
              <button 
                className="scheduleBtn"
                onClick={() => onScheduleInterview(candidate)}
              >
                📅
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;