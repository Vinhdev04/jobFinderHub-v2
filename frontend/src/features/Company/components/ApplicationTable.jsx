import React from 'react';
import '../styles/ApplicationTable.css';

const ApplicationTable = ({ applications, onView, onAction }) => {
  return (
    <div className="tableContainer">
      <table className="table">
        <thead>
          <tr>
            <th>CÔNG TY</th>
            <th>VỊ TRÍ</th>
            <th>NGÀY NỘP</th>
            <th>TRẠNG THÁI</th>
            <th>THAO TÁC</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>
                <div className="companyName">
                  <div className="companyLogo">
                    {app.companyLogo || app.company.charAt(0)}
                  </div>
                  <span>{app.company}</span>
                </div>
              </td>
              <td>{app.position}</td>
              <td>{app.date}</td>
              <td>
                <span className={`statusBadge ${app.statusClass}`}>
                  {app.status}
                </span>
              </td>
              <td>
                <button 
                  className="actionBtn"
                  onClick={() => onView?.(app)}
                >
                  Chi tiết
                </button>
              </td>
              <td>
                <button 
                  className="moreBtn"
                  onClick={() => onAction?.(app)}
                >
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;