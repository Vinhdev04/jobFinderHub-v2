import React from 'react';
import '../styles/AdminHeader.css';

const AdminHeader = ({ title, subtitle }) => {
  return (
    <div className="adminHeader">
      <div className="adminContainer">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default AdminHeader;