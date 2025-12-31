import React, { useState } from 'react';

import CandidateList from '@features/Recruiter/components/CandidateList';
import InterviewSchedule from '@features/Recruiter/components/InterviewSchedule'; // Sửa typo "RecruiteR" → "Recruiter"
import JobPostingCard from '@features/Recruiter/components/JobPostingCard'; // Thêm import cho JobPostingCard (nếu chưa có)
import StatCard from '@features/Student/components/StatCard'; // Thêm import cho StatCard (bạn cần tạo component này nếu chưa có)
import { useRecruiterData } from '@features/Recruiter/hooks/useRecruiterData';
import confirmAction from '@utils/confirmAction';
import Modal from '@components/common/Modal/Modal';
import { useToast } from '@hooks/useToast';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const {
        loading,
        jobs,
        candidates,
        interviews,
        stats,
        addJob,
        updateJob,
        deleteJob,
        rescheduleInterview,
        cancelInterview,
        getApplicationsByJob
    } = useRecruiterData();
    const { toast } = useToast();

    const [appsModalOpen, setAppsModalOpen] = React.useState(false);
    const [appsLoading, setAppsLoading] = React.useState(false);
    const [applications, setApplications] = React.useState([]);
    const [applicationsJobTitle, setApplicationsJobTitle] = React.useState('');
    const [selectedApplication, setSelectedApplication] = React.useState(null);

    const user = {
        name: 'Nguyễn Thị Lan',
        email: 'lan@recruiter.com'
    };

    const sidebarItems = [
        { id: 'overview', label: 'Tổng quan', icon: '📊' },
        { id: 'jobs', label: 'Tin tuyển dụng', icon: '💼' },
        { id: 'candidates', label: 'Ứng viên', icon: '👥' },
        { id: 'interviews', label: 'Lịch phỏng vấn', icon: '📅' },
        { id: 'cv', label: 'CV của tôi', icon: '📄' },
        { id: 'messages', label: 'Tin nhắn', icon: '💬' },
        { id: 'reports', label: 'Báo cáo', icon: '📈' },
        { id: 'settings', label: 'Cài đặt', icon: '⚙️' }
    ];

    const statsData = [
        {
            icon: '📝',
            value: stats.totalJobs || 0,
            label: 'Tin tuyển dụng',
            color: 'blue'
        },
        {
            icon: '👥',
            value: stats.activeJobs || 0,
            label: 'Ứng viên mới',
            color: 'teal'
        },
        {
            icon: '📋',
            value: stats.pendingApplications || 0,
            label: 'Chờ phỏng vấn',
            color: 'orange'
        },
        {
            icon: '✅',
            value: stats.interviews || 0,
            label: 'Đã tuyển',
            color: 'green'
        }
    ];

    const handleCreateJob = () => {
        console.log('Create new job posting');
    };

    const handleEditJob = (job) => {
        console.log('Edit job:', job);
    };

    const handleDeleteJob = async (job) => {
        const ok = await confirmAction(`Bạn có chắc muốn xóa "${job.title}"?`);
        if (!ok) return;
        try {
            const id = job._id || job.id;
            await deleteJob(id);
        } catch (err) {
            console.error('deleteJob failed', err);
        }
    };

    const handleViewApplications = async (job) => {
        setApplications([]);
        setApplicationsJobTitle(job.tieuDe || job.title || 'Ứng viên');
        setAppsModalOpen(true);
        setAppsLoading(true);
        try {
            const id = job._id || job.id;
            const apps = await getApplicationsByJob(id);
            setApplications(apps || []);
        } catch (err) {
            toast?.error('Lỗi khi tải danh sách ứng viên');
        } finally {
            setAppsLoading(false);
        }
    };

    const handleViewProfile = (candidate) => {
        console.log('View profile:', candidate);
    };

    const handleScheduleInterview = (candidate) => {
        console.log('Schedule interview for:', candidate);
    };

    const handleRescheduleInterview = (interview) => {
        console.log('Reschedule interview:', interview);
    };

    const handleCancelInterview = async (interview) => {
        const ok = await confirmAction(
            `Bạn có chắc muốn hủy lịch phỏng vấn với ${interview.candidateName}?`
        );
        if (ok) cancelInterview(interview.id);
    };

    return (
        <div className='dashboard'>
            {/* Bạn có thể thêm Sidebar ở đây nếu cần */}

            <main className='mainContent'>
                {/* Stats Grid */}
                <div className='statsGrid'>
                    {statsData.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Job Posting Banner */}
                <div className='banner'>
                    <div className='bannerContent'>
                        <div className='bannerText'>
                            <h2>Tạo tin tuyển dụng mới</h2>
                            <p>
                                Đăng tin tuyển dụng để tìm ứng viên tốt nhất cho
                                doanh nghiệp
                            </p>
                        </div>
                        <button className='bannerBtn' onClick={handleCreateJob}>
                            + Tạo tin mới
                        </button>
                    </div>
                </div>

                {/* Jobs Section */}
                <div className='contentSection'>
                    <div className='sectionHeader'>
                        <h2 className='sectionTitle'>Tin tuyển dụng của tôi</h2>
                        <button className='viewAllBtn'>Xem tất cả →</button>
                    </div>

                    <div className='jobGrid'>
                        {jobs.map((job) => (
                            <JobPostingCard
                                key={job._id || job.id}
                                job={job}
                                onEdit={handleEditJob}
                                onDelete={handleDeleteJob}
                                onViewApplications={handleViewApplications}
                            />
                        ))}
                    </div>

                    <Modal
                        isOpen={appsModalOpen}
                        onClose={() => setAppsModalOpen(false)}
                        title={`Ứng viên cho: ${applicationsJobTitle}`}
                        size='large'
                    >
                        {appsLoading ? (
                            <div style={{ padding: 20 }}>Đang tải...</div>
                        ) : (
                            <div>
                                <CandidateList
                                    candidates={applications.map((app) => ({
                                        id: app._id || app.id,
                                        name:
                                            app.ungVien?.hoTen ||
                                            app.ungVien?.name ||
                                            '—',
                                        email: app.ungVien?.email,
                                        avatar:
                                            app.ungVien?.avatar ||
                                            app.ungVien?.anhDaiDien,
                                        position:
                                            app.tinTuyenDung?.tieuDe || '',
                                        appliedDate: app.ngayNop
                                            ? new Date(
                                                  app.ngayNop
                                              ).toLocaleDateString()
                                            : undefined,
                                        status: app.trangThai,
                                        statusText: app.trangThai,
                                        raw: app
                                    }))}
                                    onViewProfile={(candidate) =>
                                        setSelectedApplication(
                                            candidate.raw || candidate
                                        )
                                    }
                                />
                            </div>
                        )}
                    </Modal>

                    {/* Application detail modal */}
                    <Modal
                        isOpen={!!selectedApplication}
                        onClose={() => setSelectedApplication(null)}
                        title={selectedApplication?.name || 'Chi tiết ứng viên'}
                        size='default'
                    >
                        {selectedApplication ? (
                            <div style={{ padding: 12 }}>
                                <p>
                                    <strong>Họ tên:</strong>{' '}
                                    {selectedApplication.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    {selectedApplication.email || '—'}
                                </p>
                                <p>
                                    <strong>Vị trí ứng tuyển:</strong>{' '}
                                    {selectedApplication.position}
                                </p>
                                <p>
                                    <strong>Ngày nộp:</strong>{' '}
                                    {selectedApplication.appliedDate}
                                </p>
                                <p>
                                    <strong>Trạng thái:</strong>{' '}
                                    {selectedApplication.statusText ||
                                        selectedApplication.status}
                                </p>
                                <div style={{ marginTop: 8 }}>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() =>
                                            console.log(
                                                'Invite to interview',
                                                selectedApplication
                                            )
                                        }
                                    >
                                        Mời phỏng vấn
                                    </button>
                                    <button
                                        style={{ marginLeft: 8 }}
                                        className='btn'
                                        onClick={() =>
                                            console.log(
                                                'View CV',
                                                selectedApplication
                                            )
                                        }
                                    >
                                        Xem CV
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </Modal>
                </div>

                {/* Candidates Section */}
                <div className='contentSection'>
                    <div className='sectionHeader'>
                        <h2 className='sectionTitle'>Ứng viên mới nhất</h2>
                        <div className='sectionActions'>
                            <button className='filterBtn'>⚙️ Lọc</button>
                            <button className='sortBtn'>📊 Sắp xếp</button>
                        </div>
                    </div>

                    <CandidateList
                        candidates={candidates}
                        onViewProfile={handleViewProfile}
                        onScheduleInterview={handleScheduleInterview}
                    />
                </div>

                {/* Interview Schedule Section */}
                <div className='contentSection'>
                    <div className='sectionHeader'>
                        <h2 className='sectionTitle'>Lịch phỏng vấn sắp tới</h2>
                        <button className='viewAllBtn'>Xem tất cả →</button>
                    </div>

                    <InterviewSchedule
                        interviews={interviews}
                        onReschedule={handleRescheduleInterview}
                        onCancel={handleCancelInterview}
                    />
                </div>
            </main>
        </div>
    );
};

export default RecruiterDashboard;
