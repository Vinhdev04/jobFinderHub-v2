import React from 'react';
import '../styles/CandidateList.css';

const CandidateList = ({ candidates, onViewProfile, onScheduleInterview }) => {
  // Helper function to safely render values
  const safeRender = (value, fallback = '—') => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'object') return fallback;
    return String(value);
  };

  return (
    <div className="list">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="candidateItem">
          <div className="candidateInfo">
            <img 
              src={
                candidate.avatar || 
                `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name || 'User')}&background=14b8a6&color=fff`
              } 
              alt={candidate.name || 'Candidate'}
              className="avatar"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name || 'User')}&background=14b8a6&color=fff`;
              }}
            />
            <div className="details">
              <div className="nameRow">
                <h3 className="name">{safeRender(candidate.name, 'Không có tên')}</h3>
                {candidate.status && (
                  <span className={`badge ${candidate.status}`}>
                    {safeRender(candidate.statusText || candidate.status)}
                  </span>
                )}
              </div>
              <p className="position">
                {safeRender(candidate.position, 'Không có vị trí')}
                {candidate.location && ` • ${safeRender(candidate.location)}`}
              </p>
              <div className="meta">
                {candidate.rating !== undefined && candidate.rating !== null && (
                  <span>⭐ {typeof candidate.rating === 'number' ? candidate.rating.toFixed(1) : safeRender(candidate.rating)}</span>
                )}
                {candidate.appliedDate && (
                  <span>📅 {safeRender(candidate.appliedDate)}</span>
                )}
              </div>
              {candidate.skills && Array.isArray(candidate.skills) && candidate.skills.length > 0 && (
                <div className="skills">
                  {candidate.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="skillTag">
                      {safeRender(skill)}
                    </span>
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
                title="Lên lịch phỏng vấn"
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