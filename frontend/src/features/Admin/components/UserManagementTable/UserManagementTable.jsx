import React, { useState } from 'react';
import './UserManagementTable.css';

const UserManagementTable = ({ users }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const roles = [
    {
      id: 'student',
      title: 'Sinh viên',
      icon: '🎓',
      description: 'Tìm kiếm cơ hội thực tập và nộp hồ sơ ứng tuyển',
      count: users.students,
      active: 1200,
      pending: 47,
      color: 'student'
    },
    {
      id: 'recruiter',
      title: 'Nhà tuyển dụng',
      icon: '👥',
      description: 'Đăng tin và quản lý quy trình tuyển dụng',
      count: users.recruiters,
      active: 85,
      pending: 4,
      color: 'recruiter'
    },
    {
      id: 'company',
      title: 'Công ty',
      icon: '🏢',
      description: 'Quản lý nhà tuyển dụng và xem báo cáo',
      count: users.companies,
      active: 150,
      pending: 6,
      color: 'company'
    },
    {
      id: 'teacher',
      title: 'Giáo vụ',
      icon: '👨‍🏫',
      description: 'Phê duyệt và giám sát hoạt động thực tập',
      count: users.teachers,
      active: 43,
      pending: 2,
      color: 'teacher'
    },
    {
      id: 'admin',
      title: 'Quản trị viên',
      icon: '🛡️',
      description: 'Quản lý toàn bộ hệ thống và người dùng',
      count: users.admins,
      active: 12,
      pending: 0,
      color: 'admin'
    }
  ];

  return (
    <div className="userManagement">
      <div className="managementHeader">
        <h2 className="managementTitle">Quản lý người dùng</h2>
        <div className="filterButtons">
          <button 
            className={`filterBtn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Tất cả
          </button>
          <button 
            className={`filterBtn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => setActiveFilter('active')}
          >
            Hoạt động
          </button>
          <button 
            className={`filterBtn ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Chờ duyệt
          </button>
        </div>
      </div>

      <div className="roleGrid">
        {roles.map((role) => (
          <div key={role.id} className="roleCard">
            <div className="roleCardHeader">
              <div className={`roleIconLarge ${role.color}`}>
                {role.icon}
              </div>
            </div>
            <div className="roleCardBody">
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </div>
            <div className="roleStats">
              <div className="roleStat">
                <span className="value">{role.count}</span>
                <span className="label">Tổng số</span>
              </div>
              <div className="roleStat">
                <span className="value">{role.active}</span>
                <span className="label">Hoạt động</span>
              </div>
              <div className="roleStat">
                <span className="value">{role.pending}</span>
                <span className="label">Chờ duyệt</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagementTable;