import React from 'react';
import './ApplicationsTable.css';

const ApplicationsTable = ({ applications }) => {
  return (
    <div className="tableSection">
      <div className="sectionHeader">
        <h2 className="sectionTitle">Hồ sơ đã nộp gần đây</h2>
      </div>

      <div className="tableContainer">
        <table className="dataTable">
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
                  <div className="companyCell">
                    <div className="companyIcon">{app.icon}</div>
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
                <td>{app.action}</td>
                <td>
                  <button className="moreBtn">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;