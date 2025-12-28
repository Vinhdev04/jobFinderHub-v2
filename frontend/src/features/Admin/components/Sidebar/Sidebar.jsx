import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange, userRole }) => {
  const navItems = [
    { id: 'overview', label: 'Tổng quan', icon: '📊' },
    { id: 'search', label: 'Tìm việc', icon: '🔍' },
    { id: 'applications', label: 'Hồ sơ đã nộp', icon: '📄' },
    { id: 'interviews', label: 'Lịch phỏng vấn', icon: '📅' },
    { id: 'cv', label: 'CV của tôi', icon: '📋' },
    { id: 'saved', label: 'Đã lưu', icon: '⭐' },
    { id: 'messages', label: 'Tin nhắn', icon: '💬' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
  ];

  return (
    <aside className="adminSidebar">
      <div className="sidebarLogo">
        <div className="logoIcon">🎓</div>
        <div className="logoText">
          <h2>Công sinh viên</h2>
          <p>Quản lý thực tập & tuyển dụng</p>
        </div>
      </div>

      <nav className="sidebarNav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`navItem ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="navIcon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
