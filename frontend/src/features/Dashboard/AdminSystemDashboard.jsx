// src/features/Admin/AdminDashboard.jsx
import React, { useState } from 'react';
import {
    Users,
    Building2,
    GraduationCap,
    Activity,
    Calendar
} from 'lucide-react';

// Import Components
import StatCard from '@features/Admin/components/StatCard';
import SystemHealthCard from '@features/Admin/components/SystemHealthCard';
import ActivityLogCard from '@features/Admin/components/ActivityLogCard';
import QuickActionsCard from '@features/Admin/components/QuickActionsCard';
import UsersTable from '@features/Admin/components/UsersTable';
import OrganizationsGrid from '@features/Admin/components/OrganizationsGrid';

// Import Constants
import {
    MOCK_STATS,
    NAVIGATION_ITEMS
} from '@features/Admin/constants/systemConstants.js';

// Import Styles
import './AdminSystemDashboard.css';

const AdminSystemDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className='admin-layout'>
            {/* Sidebar */}
            <aside className='admin-sidebar'>
                <div className='admin-logo'>
                    <div className='logo-icon'>
                        <Activity size={24} />
                    </div>
                    <div className='logo-text'>
                        <h2>Quản trị hệ thống</h2>
                        <p>System Administration Panel</p>
                    </div>
                </div>

                <nav className='admin-nav'>
                    {NAVIGATION_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${
                                activeTab === item.id ? 'active' : ''
                            }`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className='admin-main'>
                {/* Header */}
                <header className='admin-header'>
                    <div className='header-title'>
                        <h1>
                            {NAVIGATION_ITEMS.find(
                                (item) => item.id === activeTab
                            )?.label || 'Tổng quan'}
                        </h1>
                        <p>
                            <Calendar
                                size={14}
                                style={{
                                    display: 'inline',
                                    verticalAlign: 'middle'
                                }}
                            />{' '}
                            Thứ 3, 30 tháng 12, 2025
                        </p>
                    </div>
                    <div className='header-actions'>
                        <div className='header-user'>
                            <div className='user-avatar'>SA</div>
                            <div className='user-info'>
                                <h4>System Admin</h4>
                                <p>Quản trị viên</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content based on active tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Stats */}
                        <div className='stats-grid'>
                            <StatCard
                                icon={Users}
                                label='Tổng người dùng'
                                value={MOCK_STATS.totalUsers}
                                color='teal'
                                trend={{ direction: 'up', value: '+12%' }}
                            />
                            <StatCard
                                icon={Building2}
                                label='Doanh nghiệp'
                                value={MOCK_STATS.organizations}
                                color='blue'
                            />
                            <StatCard
                                icon={GraduationCap}
                                label='Sinh viên'
                                value={MOCK_STATS.activeStudents}
                                color='green'
                            />
                            <StatCard
                                icon={Activity}
                                label='Hoạt động hôm nay'
                                value={MOCK_STATS.activeToday}
                                color='orange'
                                trend={{ direction: 'up', value: '+8%' }}
                            />
                        </div>

                        {/* Content Grid */}
                        <div className='content-grid'>
                            <div>
                                <ActivityLogCard />
                            </div>
                            <div>
                                <SystemHealthCard />
                                <div style={{ marginTop: '1.5rem' }}>
                                    <QuickActionsCard />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'users' && <UsersTable />}
                {activeTab === 'organizations' && <OrganizationsGrid />}
                {activeTab === 'schools' && <OrganizationsGrid />}

                {/* Add more tab content as needed */}
                {activeTab === 'settings' && (
                    <div className='card'>
                        <h3 className='card-title'>Cài đặt hệ thống</h3>
                        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
                            Trang cài đặt đang được phát triển...
                        </p>
                    </div>
                )}

                {activeTab === 'backup' && (
                    <div className='card'>
                        <h3 className='card-title'>Sao lưu dữ liệu</h3>
                        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
                            Trang sao lưu đang được phát triển...
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminSystemDashboard;
