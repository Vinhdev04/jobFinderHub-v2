import React, { useState } from 'react';
import CompanyBanner from '@features/Company/components/CompanyBanner';
import JobCreateModal from '@features/Company/components/JobCreateModal';
import RecruiterCard from '@features/Company/components/RecruiterCard';
import ApplicationTable from '@features/Company/components/ApplicationTable';
import { useCompanyData } from '@features/Company/hooks/useCompanyData';
import confirmAction from '@utils/confirmAction';
import './CompanyDashboard.css';
import StatCard from '@features/Student/components/StatCard';
import Modal from '../../components/common/Modal/Modal';
import { useToast } from '@hooks/useToast';
import { handleApiError } from '@utils/apiErrorHandler';
import RecruiterForm from '@features/Company/components/RecruiterForm';
const CompanyDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [createOpen, setCreateOpen] = useState(false);
    const {
        loading,
        recruiters,
        applications,
        stats,
        createRecruiter,
        deleteRecruiter,
        updateRecruiter,
        getApplication,
        updateApplicationStatus,
        inviteToInterview,
        jobs,
        createJob,
        updateJob,
        deleteJob
    } = useCompanyData();

    const user = {
        name: 'Admin Company',
        email: 'admin@company.com'
    };

    const statsData = [
        {
            icon: '👥',
            value: stats.totalRecruiters,
            label: 'Nhà tuyển dụng',
            color: 'blue'
        },
        {
            icon: '💼',
            value: stats.activeRecruiters,
            label: 'Tin tuyển dụng',
            color: 'teal'
        },
        {
            icon: '📋',
            value: stats.totalApplications,
            label: 'Ứng viên mới',
            color: 'orange'
        },
        {
            icon: '✅',
            value: stats.hiredCandidates,
            label: 'Đã tuyển',
            color: 'green'
        }
    ];

    const handleCreateJob = () => {
        setCreateOpen(true);
    };

    const [jobModalOpen, setJobModalOpen] = useState(false);
    const [jobInitial, setJobInitial] = useState(null);
    const [jobViewOpen, setJobViewOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleEditJob = (job) => {
        setJobInitial(job);
        setJobModalOpen(true);
    };

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setJobViewOpen(true);
    };

    const handleDeleteJob = async (job) => {
        const ok = await confirmAction(
            `Bạn có chắc muốn xóa tin: ${job.tieuDe || job.title || ''}?`
        );
        if (!ok) return;
        try {
            await deleteJob(job._id || job.id);
            toastCtx.toast.success('Xóa tin tuyển dụng thành công');
        } catch (err) {
            console.error('Delete job error', err);
            handleApiError(toastCtx.toast, err, 'Lỗi khi xóa tin');
        }
    };

    const toastCtx = useToast();
    const [editOpen, setEditOpen] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);
    const [appOpen, setAppOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');

    const handleEditRecruiter = (recruiter) => {
        setSelectedRecruiter(recruiter);
        setEditOpen(true);
    };

    const handleAddRecruiter = () => {
        setSelectedRecruiter({});
        setEditOpen(true);
    };

    const handleSaveRecruiter = async (updates) => {
        try {
            if (!selectedRecruiter || !selectedRecruiter.id) {
                // create
                const created = await createRecruiter(updates);
                toastCtx.toast.success('Tạo người tuyển dụng thành công');
            } else {
                const updated = await updateRecruiter(
                    selectedRecruiter.id,
                    updates
                );
                toastCtx.toast.success('Cập nhật người tuyển dụng thành công');
            }
            setEditOpen(false);
            setSelectedRecruiter(null);
        } catch (err) {
            console.error('Edit recruiter error', err);
            handleApiError(toastCtx.toast, err, 'Lỗi khi cập nhật');
        }
    };

    const handleDeleteRecruiter = async (recruiter) => {
        const ok = await confirmAction(
            `Bạn có chắc muốn xóa ${recruiter.name}?`
        );
        if (!ok) return;
        try {
            await deleteRecruiter(recruiter.id);
            toastCtx.toast.success('Xóa nhà tuyển dụng thành công');
        } catch (err) {
            console.error('Delete recruiter error', err);
            handleApiError(toastCtx.toast, err, 'Lỗi khi xóa');
        }
    };

    const handleViewApplication = async (app) => {
        try {
            const details = await getApplication(app._id || app.id);
            setSelectedApp(details);
            setAppOpen(true);
        } catch (err) {
            console.error('View application error', err);
            toastCtx.toast.error('Không thể tải chi tiết đơn');
        }
    };

    const handleViewRecruiter = (recruiter) => {
        setSelectedRecruiter(recruiter);
        setViewOpen(true);
    };

    const handleApplicationAction = async (app, action, opts = {}) => {
        try {
            if (action === 'invite') {
                const payload = opts.payload || {
                    thoiGianPhongVan: new Date().toISOString(),
                    hinhThuc: 'online',
                    diaDiem: 'Zoom'
                };
                await inviteToInterview(app._id || app.id, payload);
                toastCtx.toast.success('Đã gửi lời mời phỏng vấn');
            } else if (action === 'accept') {
                await updateApplicationStatus(app._id || app.id, 'da_nhan');
                toastCtx.toast.success('Đã chấp nhận ứng viên');
            } else if (action === 'reject') {
                await updateApplicationStatus(app._id || app.id, 'tu_choi');
                toastCtx.toast.success('Đã từ chối ứng viên');
            } else {
                toastCtx.toast.warning('Hành động không hợp lệ');
            }
        } catch (err) {
            console.error('Application action error', err);
            toastCtx.toast.error(err.message || 'Lỗi khi xử lý');
        }
    };

    return (
        <div className='dashboard'>
            <main className='mainContent'>
                <CompanyBanner onCreateClick={handleCreateJob} />

                <JobCreateModal
                    open={createOpen}
                    onClose={() => setCreateOpen(false)}
                    onCreated={(job) => {
                        console.log('Job created', job);
                    }}
                />

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
                            activeTab === 'overview'
                                ? 'dashboard__tab--active'
                                : ''
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
                            activeTab === 'profile'
                                ? 'dashboard__tab--active'
                                : ''
                        }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Hồ sơ cá nhân
                    </button>
                </div>

                <div className='contentSection'>
                    <div className='sectionHeader'>
                        <h2 className='sectionTitle'>Nhà tuyển dụng</h2>
                        <div>
                            <button
                                className='primaryBtn'
                                onClick={handleAddRecruiter}
                            >
                                Thêm nhà tuyển dụng
                            </button>
                            <button
                                className='viewAllBtn'
                                style={{ marginLeft: 8 }}
                            >
                                Xem tất cả →
                            </button>
                        </div>
                    </div>

                    <div
                        className='recruiterControls'
                        style={{
                            display: 'flex',
                            gap: 8,
                            alignItems: 'center',
                            marginBottom: 12
                        }}
                    >
                        <input
                            placeholder='Tìm kiếm nhà tuyển dụng'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value='all'>Tất cả</option>
                            <option value='hoat_dong'>Hoạt động</option>
                            <option value='khong_hoat_dong'>
                                Không hoạt động
                            </option>
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value='name'>Sắp xếp: Tên</option>
                            <option value='jobsPosted'>
                                Sắp xếp: Tin đã đăng
                            </option>
                            <option value='candidates'>
                                Sắp xếp: Ứng viên
                            </option>
                        </select>
                    </div>

                    <div className='recruiterGrid'>
                        {(recruiters || [])
                            .filter((r) => {
                                if (filterStatus === 'all') return true;
                                if (filterStatus === 'hoat_dong')
                                    return (
                                        r.status === 'hoat_dong' ||
                                        r.status === 'active'
                                    );
                                if (filterStatus === 'khong_hoat_dong')
                                    return (
                                        r.status === 'khong_hoat_dong' ||
                                        r.status === 'inactive'
                                    );
                                return true;
                            })
                            .filter((r) => {
                                if (!searchQuery) return true;
                                const q = searchQuery.toLowerCase();
                                return (
                                    (r.name || '').toLowerCase().includes(q) ||
                                    (r.email || '').toLowerCase().includes(q)
                                );
                            })
                            .sort((a, b) => {
                                if (sortBy === 'name')
                                    return (a.name || '').localeCompare(
                                        b.name || ''
                                    );
                                if (sortBy === 'jobsPosted')
                                    return (
                                        (b.jobsPosted || 0) -
                                        (a.jobsPosted || 0)
                                    );
                                if (sortBy === 'candidates')
                                    return (
                                        (b.candidates || 0) -
                                        (a.candidates || 0)
                                    );
                                return 0;
                            })
                            .map((recruiter) => (
                                <RecruiterCard
                                    key={recruiter.id}
                                    recruiter={recruiter}
                                    onView={handleViewRecruiter}
                                    onEdit={handleEditRecruiter}
                                    onDelete={handleDeleteRecruiter}
                                />
                            ))}
                    </div>
                </div>

                <div className='contentSection'>
                    <div className='sectionHeader'>
                        <h2 className='sectionTitle'>Hồ sơ đã nộp gần đây</h2>
                        <button className='viewAllBtn'>Xem tất cả →</button>
                    </div>

                    <ApplicationTable
                        applications={applications}
                        onView={handleViewApplication}
                        onAction={
                            (app) =>
                                setSelectedApp(
                                    app
                                ) /* will use action buttons in modal */
                        }
                    />
                </div>
                <div className='contentSection'>
                    <div className='sectionHeader'>
                        <h2 className='sectionTitle'>Tin tuyển dụng</h2>
                        <div>
                            <button
                                className='primaryBtn'
                                onClick={() => {
                                    setJobInitial(null);
                                    setJobModalOpen(true);
                                }}
                            >
                                Tạo tin mới
                            </button>
                            <button
                                className='viewAllBtn'
                                style={{ marginLeft: 8 }}
                            >
                                Xem tất cả →
                            </button>
                        </div>
                    </div>

                    <div
                        className='jobList'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 12
                        }}
                    >
                        {(jobs || []).map((job) => (
                            <div key={job._id || job.id} className='jobCard'>
                                <h4>{job.tieuDe || job.title}</h4>
                                <div>{job.viTri || job.position}</div>
                                <div style={{ marginTop: 8 }}>
                                    <button onClick={() => handleViewJob(job)}>
                                        Xem
                                    </button>
                                    <button
                                        onClick={() => handleEditJob(job)}
                                        style={{ marginLeft: 8 }}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDeleteJob(job)}
                                        style={{ marginLeft: 8 }}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Modal
                    isOpen={editOpen}
                    onClose={() => setEditOpen(false)}
                    title='Chỉnh sửa nhà tuyển dụng'
                >
                    {selectedRecruiter && (
                        <RecruiterForm
                            initialData={selectedRecruiter}
                            onSave={(updates) => handleSaveRecruiter(updates)}
                            onCancel={() => setEditOpen(false)}
                            saving={false}
                        />
                    )}
                </Modal>

                <JobCreateModal
                    open={jobModalOpen}
                    onClose={() => {
                        setJobModalOpen(false);
                        setJobInitial(null);
                    }}
                    initialData={jobInitial}
                    onCreated={(j) => {
                        /* jobs hook updates list */
                    }}
                    onUpdated={(j) => {
                        /* jobs hook updates list */
                    }}
                />

                <Modal
                    isOpen={jobViewOpen}
                    onClose={() => setJobViewOpen(false)}
                    title='Chi tiết tin tuyển dụng'
                >
                    {selectedJob ? (
                        <div>
                            <h3>{selectedJob.tieuDe || selectedJob.title}</h3>
                            <div>
                                Vị trí:{' '}
                                {selectedJob.viTri || selectedJob.position}
                            </div>
                            <div>
                                Địa điểm:{' '}
                                {selectedJob.diaDiem || selectedJob.location}
                            </div>
                            <pre
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    maxHeight: '50vh',
                                    overflow: 'auto'
                                }}
                            >
                                {selectedJob.moTaCongViec ||
                                    selectedJob.description}
                            </pre>
                            <div style={{ marginTop: 8 }}>
                                <button
                                    onClick={() => {
                                        setJobViewOpen(false);
                                        handleEditJob(selectedJob);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => {
                                        setJobViewOpen(false);
                                        handleDeleteJob(selectedJob);
                                    }}
                                    style={{ marginLeft: 8 }}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>Đang tải...</div>
                    )}
                </Modal>

                <Modal
                    isOpen={appOpen}
                    onClose={() => setAppOpen(false)}
                    title='Chi tiết đơn ứng tuyển'
                    size='large'
                >
                    {selectedApp ? (
                        <div>
                            <pre
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    maxHeight: '50vh',
                                    overflow: 'auto'
                                }}
                            >
                                {JSON.stringify(selectedApp, null, 2)}
                            </pre>
                            <div style={{ marginTop: 12 }}>
                                <button
                                    onClick={() =>
                                        handleApplicationAction(
                                            selectedApp,
                                            'invite'
                                        )
                                    }
                                >
                                    Mời PV
                                </button>
                                <button
                                    onClick={() =>
                                        handleApplicationAction(
                                            selectedApp,
                                            'accept'
                                        )
                                    }
                                    style={{ marginLeft: 8 }}
                                >
                                    Chấp nhận
                                </button>
                                <button
                                    onClick={() =>
                                        handleApplicationAction(
                                            selectedApp,
                                            'reject'
                                        )
                                    }
                                    style={{ marginLeft: 8 }}
                                >
                                    Từ chối
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>Đang tải...</div>
                    )}
                </Modal>
                <Modal
                    isOpen={viewOpen}
                    onClose={() => setViewOpen(false)}
                    title='Chi tiết nhà tuyển dụng'
                    size='small'
                >
                    {selectedRecruiter ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            }}
                        >
                            <strong>{selectedRecruiter.name}</strong>
                            <div>Email: {selectedRecruiter.email}</div>
                            <div>
                                Trạng thái:{' '}
                                {selectedRecruiter.statusText ||
                                    selectedRecruiter.status}
                            </div>
                            <div>
                                Tin đã đăng: {selectedRecruiter.jobsPosted}
                            </div>
                            <div>Ứng viên: {selectedRecruiter.candidates}</div>
                            <div>Đã tuyển: {selectedRecruiter.hired}</div>
                            <div style={{ marginTop: 8 }}>
                                <button
                                    onClick={() => {
                                        setViewOpen(false);
                                        handleEditRecruiter(selectedRecruiter);
                                    }}
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => {
                                        setViewOpen(false);
                                        handleDeleteRecruiter(
                                            selectedRecruiter
                                        );
                                    }}
                                    style={{ marginLeft: 8 }}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>Đang tải...</div>
                    )}
                </Modal>
            </main>
        </div>
    );
};

export default CompanyDashboard;
