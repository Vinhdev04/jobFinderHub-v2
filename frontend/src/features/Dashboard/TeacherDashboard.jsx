import React, { useState } from 'react';
import StatCard from '@features/Admin/components/StatCard';
import InternCard from '@features/Admin/components/InternCard';
import ReportCard from '@features/Admin/components/ReportCard';
import JobCard from '@features/Admin/components/JobCard';
import CompanyCard from '@features/Admin/components/CompanyCard';
import './TeacherDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Data
    const stats = [
        {
            icon: '👤',
            count: 156,
            label: 'Sinh viên quản lý',
            colorType: 'teal'
        },
        { icon: '📅', count: 45, label: 'Đang thực tập', colorType: 'blue' },
        {
            icon: '📄',
            count: 12,
            label: 'Báo cáo chờ duyệt',
            colorType: 'orange'
        },
        {
            icon: '🏢',
            count: 28,
            label: 'Doanh nghiệp hợp tác',
            colorType: 'green'
        }
    ];

    const interns = [
        {
            id: 'SV001',
            name: 'Nguyễn Văn A',
            avatar: '👨',
            company: 'FPT Software',
            position: 'Frontend Developer',
            progress: 65,
            startDate: '01/01/2024',
            status: 'Đang thực tập'
        },
        {
            id: 'SV002',
            name: 'Trần Thị B',
            avatar: '👩',
            company: 'VNG Corporation',
            position: 'Marketing Digital',
            progress: 85,
            startDate: '15/12/2023',
            status: 'Đang thực tập'
        }
    ];

    const reports = [
        {
            id: 1,
            title: 'Báo cáo tuần 4 - Tháng 1/2024',
            author: 'Nguyễn Văn A (SV001)',
            date: '15/01/2024'
        },
        {
            id: 2,
            title: 'Báo cáo tuần 4 - Tháng 1/2024',
            author: 'Trần Thị B (SV002)',
            date: '14/01/2024'
        }
    ];

    const jobs = [
        {
            id: 1,
            company: 'Shopee Vietnam',
            position: 'Data Analyst Intern',
            locations: '3 vị trí',
            date: '16/01/2024'
        },
        {
            id: 2,
            company: 'Grab Vietnam',
            position: 'Mobile Developer Intern',
            locations: '2 vị trí',
            date: '15/01/2024'
        }
    ];

    const companies = [
        {
            id: 1,
            name: 'FPT Software',
            interns: 23,
            icon: '💼',
            color: '#0ea5e9'
        },
        {
            id: 2,
            name: 'VNG Corporation',
            interns: 18,
            icon: '🎮',
            color: '#f97316'
        },
        {
            id: 3,
            name: 'Tiki Corporation',
            interns: 15,
            icon: '🛒',
            color: '#a855f7'
        }
    ];

    const tabs = [
        { id: 'overview', icon: '📊', label: 'Tổng quan' },
        { id: 'students', icon: '👤', label: 'Sinh viên' },
        { id: 'reports', icon: '📄', label: 'Báo cáo thực tập', badge: 2 },
        { id: 'companies', icon: '🏢', label: 'Doanh nghiệp' },
        { id: 'approval', icon: '✅', label: 'Phê duyệt tin', badge: 2 }
    ];

    const quickActions = [
        { id: 'export', icon: '📊', label: 'Xuất báo cáo' },
        { id: 'add-student', icon: '➕', label: 'Thêm sinh viên' },
        { id: 'manage-company', icon: '🏢', label: 'Quản lý DN' }
    ];

    // Handlers
    const handleViewReport = (id) => {
        console.log('View report:', id);
    };

    const handleApproveReport = (id) => {
        console.log('Approve report:', id);
    };

    const handleExportReport = () => {
        console.log('Export report');
    };

    const handleQuickAction = (actionId) => {
        console.log('Quick action:', actionId);
    };

    return (
        <div className='admin-dashboard'>
            {/* Header */}
            <header className='admin-dashboard__header'>
                <div className='admin-dashboard__header-content'>
                    <h1 className='admin-dashboard__title'>
                        Dashboard Giáo vụ
                    </h1>
                    <p className='admin-dashboard__subtitle'>
                        Khoa Công nghệ thông tin - Đại học Bách Khoa
                    </p>
                </div>
                <button
                    className='admin-dashboard__export-btn'
                    onClick={handleExportReport}
                >
                    📊 Xuất báo cáo
                </button>
            </header>

            {/* Stats Grid */}
            <div className='admin-dashboard__stats'>
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Tabs */}
            <nav className='admin-dashboard__tabs'>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`admin-dashboard__tab ${
                            activeTab === tab.id
                                ? 'admin-dashboard__tab--active'
                                : ''
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.label}
                        {tab.badge && (
                            <span className='admin-dashboard__tab-badge'>
                                {tab.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Main Content */}
            <div className='admin-dashboard__content'>
                {/* Main Section */}
                <main className='admin-dashboard__main'>
                    {/* Interns Section */}
                    <section className='admin-dashboard__section'>
                        <div className='admin-dashboard__section-header'>
                            <h2 className='admin-dashboard__section-title'>
                                Sinh viên đang thực tập
                            </h2>
                        </div>
                        <div className='admin-dashboard__interns'>
                            {interns.map((intern) => (
                                <InternCard key={intern.id} intern={intern} />
                            ))}
                        </div>
                    </section>

                    {/* Reports Section */}
                    <section className='admin-dashboard__section'>
                        <div className='admin-dashboard__section-header'>
                            <h2 className='admin-dashboard__section-title'>
                                Báo cáo chờ duyệt
                            </h2>
                            <span className='admin-dashboard__section-badge'>
                                2 báo cáo
                            </span>
                        </div>
                        <div className='admin-dashboard__reports'>
                            {reports.map((report) => (
                                <ReportCard
                                    key={report.id}
                                    report={report}
                                    onView={handleViewReport}
                                    onApprove={handleApproveReport}
                                />
                            ))}
                        </div>
                    </section>
                </main>

                {/* Sidebar */}
                <aside className='admin-dashboard__sidebar'>
                    {/* Jobs Card */}
                    <div className='admin-dashboard__sidebar-card'>
                        <h3 className='admin-dashboard__sidebar-title'>
                            Tin tuyển dụng chờ duyệt
                        </h3>
                        <div className='admin-dashboard__jobs'>
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </div>

                    {/* Companies Card */}
                    <div className='admin-dashboard__sidebar-card'>
                        <h3 className='admin-dashboard__sidebar-title'>
                            Doanh nghiệp hàng đầu
                        </h3>
                        <div className='admin-dashboard__companies'>
                            {companies.map((company) => (
                                <CompanyCard
                                    key={company.id}
                                    company={company}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className='admin-dashboard__sidebar-card'>
                        <h3 className='admin-dashboard__sidebar-title'>
                            Thao tác nhanh
                        </h3>
                        <div className='admin-dashboard__quick-actions'>
                            {quickActions.map((action) => (
                                <button
                                    key={action.id}
                                    className='admin-dashboard__quick-action-btn'
                                    onClick={() => handleQuickAction(action.id)}
                                >
                                    {action.icon} {action.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AdminDashboard;
