import React from 'react';
import '../styles/RoleCard.css';

const RoleCard = ({ role, onAccess, onViewDetails }) => {
  return (
    <div className="roleCard">
      <div className="roleCardHeader">
        <div className={`roleIcon ${role.color}`}>
          {role.icon}
        </div>
        <div className="roleInfo">
          <h3 className="roleTitle">{role.title}</h3>
          <p className="roleDescription">{role.description}</p>
        </div>
      </div>
      <div className="roleActions">
        <button className="accessBtn" onClick={() => onAccess(role)}>
          Truy cập →
        </button>
        <span className="detailsLink" onClick={() => onViewDetails(role)}>
          Xem chi tiết →
        </span>
      </div>
    </div>
  );
};

export default RoleCard;