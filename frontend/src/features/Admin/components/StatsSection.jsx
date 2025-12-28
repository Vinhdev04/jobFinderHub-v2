import React from 'react';
import '../styles/StatsSection.css';

const StatsSection = ({ stats }) => {
  return (
    <div className="statsSection">
      <h3 className="statsTitle">Thống kê hệ thống</h3>
      <div className="statsGrid">
        {stats.map((stat, index) => (
          <div key={index} className="statCard">
            <div className="statValue">{stat.value}</div>
            <div className="statLabel">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;