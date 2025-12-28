// Dashboard/AdminDashboard.jsx

import React from 'react';
import useTeacherDashboard from '@features/Teacher/hooks/useTeacherDashboard.js';
import {
    TABS_CONFIG,
    QUICK_ACTIONS,
    STAT_TYPES
} from '@features/Teacher/constants/constants.js';
import StatCard from '@features/Teacher/components/StatCard';
import InternCard from '@features/Teacher/components/InternCard';
import ReportCard from '@features/Teacher/components/ReportCard';
import JobCard from '@features/Teacher/components/JobCard';
import CompanyCard from '@features/Teacher/components/CompanyCard';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
    // Get all logic from custom hook
    const {
        // Tab management
        activeTab,
        changeTab,

        // Stats
        stats,
        statsLoading,

        // Interns
        interns,
        loading: internsLoading,

        // Reports
        reports,
        loading: reportsLoading,
        handleViewReport,
        handleApproveReport,

        // Companies
        companies,
        loading: companiesLoading,

        // Jobs
        pendingJobs,
        jobsLoading,
        handleApproveJob,

        // Actions
        handleExportReport,
        handleQuickAction,

        // Badge counts
        badgeCounts
    } = useTeacherDashboard();

    // Prepare stats data for display
    const statsData = [
        {
            icon: '👤',
            count: stats.total_students,
            label: 'Sinh viên quản lý',
            colorType: STAT_TYPES.TEAL
        },
        {
            icon: '📅',
            count: stats.active_interns,
            label: 'Đang thực tập',
            colorType: STAT_TYPES.BLUE
        },
        {
            icon: '📄',
            count: stats.pending_reports,
            label: 'Báo cáo chờ duyệt',
            colorType: STAT_TYPES.ORANGE
        },
        {
            icon: '🏢',
            count: stats.partner_companies,
            label: 'Doanh nghiệp hợp tác',
            colorType: STAT_TYPES.GREEN
        }
    ];

    // Get badge count for a tab
    const getBadgeCount = (badgeKey) => {
        return badgeKey ? badgeCounts[badgeKey] : null;
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
                {statsLoading ? (
                    <div>Đang tải...</div>
                ) : (
                    statsData.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))
                )}
            </div>

            {/* Tabs */}
            <nav className='admin-dashboard__tabs'>
                {TABS_CONFIG.map((tab) => (
                    <button
                        key={tab.id}
                        className={`admin-dashboard__tab ${
                            activeTab === tab.id
                                ? 'admin-dashboard__tab--active'
                                : ''
                        }`}
                        onClick={() => changeTab(tab.id)}
                    >
                        {tab.icon} {tab.label}
                        {tab.badge && getBadgeCount(tab.badge) > 0 && (
                            <span className='admin-dashboard__tab-badge'>
                                {getBadgeCount(tab.badge)}
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
                            {internsLoading ? (
                                <div>Đang tải...</div>
                            ) : (
                                interns.map((intern) => (
                                    <InternCard
                                        key={intern.id}
                                        intern={intern}
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    {/* Reports Section */}
                    <section className='admin-dashboard__section'>
                        <div className='admin-dashboard__section-header'>
                            <h2 className='admin-dashboard__section-title'>
                                Báo cáo chờ duyệt
                            </h2>
                            {badgeCounts.pending_reports > 0 && (
                                <span className='admin-dashboard__section-badge'>
                                    {badgeCounts.pending_reports} báo cáo
                                </span>
                            )}
                        </div>
                        <div className='admin-dashboard__reports'>
                            {reportsLoading ? (
                                <div>Đang tải...</div>
                            ) : (
                                reports
                                    .filter(
                                        (report) => report.status === 'pending'
                                    )
                                    .map((report) => (
                                        <ReportCard
                                            key={report.id}
                                            report={report}
                                            onView={handleViewReport}
                                            onApprove={handleApproveReport}
                                        />
                                    ))
                            )}
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
                            {jobsLoading ? (
                                <div>Đang tải...</div>
                            ) : (
                                pendingJobs
                                    .filter((job) => job.status === 'pending')
                                    .map((job) => (
                                        <JobCard key={job.id} job={job} />
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Companies Card */}
                    <div className='admin-dashboard__sidebar-card'>
                        <h3 className='admin-dashboard__sidebar-title'>
                            Doanh nghiệp hàng đầu
                        </h3>
                        <div className='admin-dashboard__companies'>
                            {companiesLoading ? (
                                <div>Đang tải...</div>
                            ) : (
                                companies.map((company) => (
                                    <CompanyCard
                                        key={company.id}
                                        company={company}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className='admin-dashboard__sidebar-card'>
                        <h3 className='admin-dashboard__sidebar-title'>
                            Thao tác nhanh
                        </h3>
                        <div className='admin-dashboard__quick-actions'>
                            {QUICK_ACTIONS.map((action) => (
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

export default TeacherDashboard;
