import React, { useState } from 'react';
import {
    StatCard,
    ApplicationCard,
    InterviewCard,
    ProfileSection,
    EducationCard,
    SkillTag,
    CVPreview,
    NotificationItem,
    QuickAction
} from '@features/Student/components';
import {
    useApplications,
    useInterviews,
    useProfile
} from '@features/Student/hooks';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Use custom hooks
    const {
        applications,
        loading: appsLoading,
        withdrawApplication
    } = useApplications();
    const {
        interviews,
        loading: interviewsLoading,
        joinInterview
    } = useInterviews();
    const {
        profile,
        education,
        skills,
        loading: profileLoading,
        updateAvatar,
        addSkill,
        removeSkill
    } = useProfile();

    // Mock stats - replace with real data from hooks
    const stats = {
        applied: applications?.length || 12,
        pending:
            applications?.filter((app) => app.status === 'pending').length || 5,
        invited: interviews?.length || 3,
        accepted:
            applications?.filter((app) => app.status === 'accepted').length || 1
    };

    // Mock notifications
    const notifications = [
        {
            id: 1,
            icon: '👁️',
            title: 'VNG Corporation đã xem hồ sơ của bạn',
            message: '',
            time: '2 giờ trước',
            isRead: false
        },
        {
            id: 2,
            icon: '📅',
            title: 'Bạn có lịch phỏng vấn mới vào 20/01/2024',
            message: '',
            time: '5 giờ trước',
            isRead: false
        },
        {
            id: 3,
            icon: '📄',
            title: 'Hồ sơ ứng tuyển tại FPT Software đang được xem xét',
            message: '',
            time: '1 ngày trước',
            isRead: false
        }
    ];

    // Mock quick actions
    const quickActions = [
        { id: 1, icon: '📝', label: 'Cập nhật CV' },
        { id: 2, icon: '🔍', label: 'Tìm việc mới' },
        { id: 3, icon: '💬', label: 'Tin nhắn' }
    ];

    const handleViewDetails = (id) => {
        console.log('View details:', id);
        // Navigate to details page
    };

    const handleWithdraw = async (id) => {
        if (window.confirm('Bạn có chắc muốn rút đơn ứng tuyển này?')) {
            await withdrawApplication(id);
        }
    };

    const handleJoinInterview = (id) => {
        joinInterview(id);
    };

    const handleUpdateAvatar = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                updateAvatar(file);
            }
        };
        input.click();
    };

    const handleAddSkill = () => {
        const skill = prompt('Nhập tên kỹ năng:');
        if (skill && skill.trim()) {
            addSkill(skill.trim());
        }
    };

    const handleAddEducation = () => {
        console.log('Add education');
        // Open modal or navigate to add education page
    };

    const renderTabContent = () => {
        if (appsLoading || interviewsLoading || profileLoading) {
            return <div className='dashboard__loading'>Đang tải...</div>;
        }

        switch (activeTab) {
            case 'overview':
                return (
                    <div className='dashboard__overview'>
                        <div className='dashboard__overview-grid'>
                            {/* Main Content */}
                            <div className='dashboard__overview-main'>
                                <h2 className='dashboard__section-title'>
                                    Đơn ứng tuyển gần đây
                                </h2>
                                <div className='dashboard__applications-preview'>
                                    {applications &&
                                        applications
                                            .slice(0, 3)
                                            .map((app) => (
                                                <ApplicationCard
                                                    key={app.id}
                                                    {...app}
                                                    onViewDetails={() =>
                                                        handleViewDetails(
                                                            app.id
                                                        )
                                                    }
                                                    onWithdraw={() =>
                                                        handleWithdraw(app.id)
                                                    }
                                                />
                                            ))}
                                </div>

                                <h2 className='dashboard__section-title'>
                                    Lịch phỏng vấn sắp tới
                                </h2>
                                <div className='dashboard__interviews-preview'>
                                    {interviews &&
                                        interviews
                                            .slice(0, 2)
                                            .map((interview) => (
                                                <InterviewCard
                                                    key={interview.id}
                                                    {...interview}
                                                    onJoin={() =>
                                                        handleJoinInterview(
                                                            interview.id
                                                        )
                                                    }
                                                    onViewDetails={() =>
                                                        handleViewDetails(
                                                            interview.id
                                                        )
                                                    }
                                                />
                                            ))}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className='dashboard__overview-sidebar'>
                                <div className='dashboard__notifications'>
                                    <h3 className='dashboard__sidebar-title'>
                                        Thông báo
                                    </h3>
                                    {notifications.map((notif) => (
                                        <NotificationItem
                                            key={notif.id}
                                            {...notif}
                                            onClick={() =>
                                                console.log(
                                                    'Notification clicked:',
                                                    notif.id
                                                )
                                            }
                                        />
                                    ))}
                                </div>

                                <div className='dashboard__quick-actions'>
                                    <h3 className='dashboard__sidebar-title'>
                                        Thao tác nhanh
                                    </h3>
                                    <div className='dashboard__actions-grid'>
                                        {quickActions.map((action) => (
                                            <QuickAction
                                                key={action.id}
                                                {...action}
                                                onClick={() =>
                                                    console.log(
                                                        'Action:',
                                                        action.label
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'applications':
                return (
                    <div className='dashboard__applications'>
                        <div className='dashboard__applications-header'>
                            <h2 className='dashboard__section-title'>
                                Tất cả đơn ứng tuyển
                            </h2>
                            <select className='dashboard__filter'>
                                <option value='all'>Tất cả trạng thái</option>
                                <option value='pending'>Đang xem xét</option>
                                <option value='reviewing'>
                                    Được mời phỏng vấn
                                </option>
                                <option value='accepted'>Đã nhận</option>
                                <option value='rejected'>Từ chối</option>
                            </select>
                        </div>
                        <div className='dashboard__applications-list'>
                            {applications &&
                                applications.map((app) => (
                                    <ApplicationCard
                                        key={app.id}
                                        {...app}
                                        onViewDetails={() =>
                                            handleViewDetails(app.id)
                                        }
                                        onWithdraw={() =>
                                            handleWithdraw(app.id)
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                );

            case 'interviews':
                return (
                    <div className='dashboard__interviews'>
                        <h2 className='dashboard__section-title'>
                            Lịch phỏng vấn sắp tới
                        </h2>
                        <div className='dashboard__interviews-list'>
                            {interviews &&
                                interviews.map((interview) => (
                                    <InterviewCard
                                        key={interview.id}
                                        {...interview}
                                        onJoin={() =>
                                            handleJoinInterview(interview.id)
                                        }
                                        onViewDetails={() =>
                                            handleViewDetails(interview.id)
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div className='dashboard__profile'>
                        {profile && (
                            <ProfileSection
                                {...profile}
                                onUpdateAvatar={handleUpdateAvatar}
                            />
                        )}

                        <div className='dashboard__section'>
                            <div className='dashboard__section-header'>
                                <h2 className='dashboard__section-title'>
                                    Học vấn
                                </h2>
                                <button
                                    className='dashboard__btn-add'
                                    onClick={handleAddEducation}
                                >
                                    + Thêm học vấn
                                </button>
                            </div>
                            <div className='dashboard__education-list'>
                                {education &&
                                    education.map((edu) => (
                                        <EducationCard
                                            key={edu.id}
                                            {...edu}
                                            onEdit={() =>
                                                console.log(
                                                    'Edit education:',
                                                    edu.id
                                                )
                                            }
                                        />
                                    ))}
                            </div>
                        </div>

                        <div className='dashboard__section'>
                            <div className='dashboard__section-header'>
                                <h2 className='dashboard__section-title'>
                                    Kỹ năng
                                </h2>
                                <button
                                    className='dashboard__btn-add'
                                    onClick={handleAddSkill}
                                >
                                    + Thêm kỹ năng
                                </button>
                            </div>
                            <div className='dashboard__skills'>
                                {skills &&
                                    skills.map((skill) => (
                                        <SkillTag
                                            key={skill}
                                            skill={skill}
                                            onRemove={removeSkill}
                                        />
                                    ))}
                            </div>
                        </div>

                        <div className='dashboard__section'>
                            <h2 className='dashboard__section-title'>
                                CV của bạn
                            </h2>
                            <CVPreview
                                fileName='CV_NguyenVanA.pdf'
                                uploadDate='10/01/2024'
                                fileSize='2.5 MB'
                                onDownload={() => console.log('Download CV')}
                                onReplace={() => console.log('Replace CV')}
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className='dashboard'>
            {/* Header */}
            <div className='dashboard__header'>
                <div className='dashboard__header-content'>
                    <h1 className='dashboard__title'>Dashboard Sinh viên</h1>
                    <p className='dashboard__subtitle'>
                        Chào mừng trở lại, {profile?.name || 'Nguyễn Văn A'}
                    </p>
                </div>
                <button className='dashboard__search-btn'>
                    🔍 Tìm việc mới
                </button>
            </div>

            {/* Stats */}
            <div className='dashboard__stats'>
                <StatCard
                    icon='📄'
                    count={stats.applied}
                    label='Đã ứng tuyển'
                    color='primary'
                />
                <StatCard
                    icon='⏰'
                    count={stats.pending}
                    label='Đang chờ'
                    color='warning'
                />
                <StatCard
                    icon='📅'
                    count={stats.invited}
                    label='Được mời PV'
                    color='info'
                />
                <StatCard
                    icon='✅'
                    count={stats.accepted}
                    label='Đã nhận'
                    color='success'
                />
            </div>

            {/* Tabs */}
            <div className='dashboard__tabs'>
                <button
                    className={`dashboard__tab ${
                        activeTab === 'overview' ? 'dashboard__tab--active' : ''
                    }`}
                    onClick={() => setActiveTab('overview')}
                >
                    📊 Tổng quan
                </button>
                <button
                    className={`dashboard__tab ${
                        activeTab === 'applications'
                            ? 'dashboard__tab--active'
                            : ''
                    }`}
                    onClick={() => setActiveTab('applications')}
                >
                    📝 Đơn ứng tuyển
                </button>
                <button
                    className={`dashboard__tab ${
                        activeTab === 'interviews'
                            ? 'dashboard__tab--active'
                            : ''
                    }`}
                    onClick={() => setActiveTab('interviews')}
                >
                    📅 Lịch phỏng vấn
                </button>
                <button
                    className={`dashboard__tab ${
                        activeTab === 'profile' ? 'dashboard__tab--active' : ''
                    }`}
                    onClick={() => setActiveTab('profile')}
                >
                    👤 Hồ sơ cá nhân
                </button>
            </div>

            {/* Content */}
            <div className='dashboard__content'>{renderTabContent()}</div>
        </div>
    );
};

export default StudentDashboard;
