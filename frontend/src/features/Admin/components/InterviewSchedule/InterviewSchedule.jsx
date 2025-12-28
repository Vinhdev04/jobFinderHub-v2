import React from 'react';
import './InterviewSchedule.css';

const InterviewSchedule = ({ schedules }) => {
  return (
    <div className="scheduleSection">
      <div className="sectionHeader">
        <h2 className="sectionTitle">Lịch phỏng vấn sắp tới</h2>
        <span className="viewAllLink">Xem tất cả</span>
      </div>
      
      <div className="scheduleList">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="scheduleItem">
            <div className="companyLogo">
              {schedule.logo}
            </div>
            <div className="scheduleInfo">
              <h3 className="companyName">{schedule.company}</h3>
              <p className="position">{schedule.position}</p>
              <div className="scheduleDetails">
                <span>📅 {schedule.date}</span>
                <span>🕐 {schedule.time}</span>
                <span>📍 {schedule.location}</span>
              </div>
            </div>
            <button className="applyBtn">Chi tiết</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewSchedule;