import React from 'react';
import '../styles/InterviewSchedule.css';

const InterviewSchedule = ({ interviews, onReschedule, onCancel }) => {
  return (
    <div className="schedule">
      {interviews.map((interview) => (
        <div key={interview.id} className="interviewCard">
          <div className="dateSection">
            <div className="dateBox">
              <span className="day">{interview.day}</span>
              <span className="month">{interview.month}</span>
            </div>
          </div>

          <div className="infoSection">
            <h3 className="candidateName">{interview.candidateName}</h3>
            <p className="position">{interview.position}</p>
            <div className="time">
              <span>🕐 {interview.time}</span>
              <span>📍 {interview.location}</span>
            </div>
            {interview.interviewer && (
              <p className="interviewer">
                👤 Người phỏng vấn: {interview.interviewer}
              </p>
            )}
          </div>

          <div className="actions">
            <button 
              className="rescheduleBtn"
              onClick={() => onReschedule?.(interview)}
            >
              Đổi lịch
            </button>
            <button 
              className="cancelBtn"
              onClick={() => onCancel?.(interview)}
            >
              Hủy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewSchedule;