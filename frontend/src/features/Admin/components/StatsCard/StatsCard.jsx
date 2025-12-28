import React from 'react';
import './StatsCard.css';

const StatsCard = ({ stats }) => {
  return (
    <div className="statsGrid">
      {stats.map((stat, index) => (
        <div key={index} className="statsCard">
          <div className={`statsIcon ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="statsValue">{stat.value}</div>
          <div className="statsLabel">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;