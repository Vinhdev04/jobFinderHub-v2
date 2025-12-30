// src/pages/JobDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    MapPin, 
    DollarSign, 
    Clock, 
    Users, 
    Building2, 
    Calendar,
    Briefcase,
    Award,
    CheckCircle,
    ArrowLeft
} from 'lucide-react';
import jobService from '@services/jobService';
import './JobDetailsPage.css';
import { useAuth } from '@hooks/useAuth';

const JobDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await jobService.getJobById(id);
                if (response.success) {
                    setJob(response.data);
                    // check if user already applied (for UI)
                    const user = JSON.parse(localStorage.getItem('user') || 'null');
                    if (user) {
                        // naive check on job.soLuongUngTuyen not sufficient; we'll fetch applications later
                    }
                }
            } catch (err) {
                console.error('Error fetching job details:', err);
                setError('Không thể tải chi tiết công việc. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    // Format salary
    const formatSalary = () => {
        if (!job.mucLuong || !job.mucLuong.hienThi) {
            return 'Thỏa thuận';
        }

        const { min, max, donVi } = job.mucLuong;
        const currency = donVi === 'USD' ? '$' : 'VNĐ';

        if (min && max) {
            return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`;
        } else if (min) {
            return `Từ ${min.toLocaleString()} ${currency}`;
        } else if (max) {
            return `Lên đến ${max.toLocaleString()} ${currency}`;
        }
        return 'Thỏa thuận';
    };

    // Format job type
    const formatJobType = () => {
        const types = {
            'thuc_tap': 'Thực tập',
            'toan_thoi_gian': 'Toàn thời gian',
            'ban_thoi_gian': 'Bán thời gian'
        };
        return types[job.loaiCongViec] || job.loaiCongViec;
    };

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Handle apply
    const handleApply = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/jobs/${id}/apply` } });
            return;
        }
        navigate(`/jobs/${id}/apply`);
    };

    if (loading) {
        return (
            <div className='job-details-page'>
                <div className='container'>
                    <div className='loading'>Đang tải chi tiết công việc...</div>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className='job-details-page'>
                <div className='container'>
                    <div className='error'>{error || 'Không tìm thấy công việc'}</div>
                    <button onClick={() => navigate('/jobs')} className='btn-back'>
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='job-details-page'>
            <div className='container'>
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className='btn-back-nav'
                >
                    <ArrowLeft size={20} />
                    Quay lại
                </button>

                <div className='job-details-layout'>
                    {/* Main Content */}
                    <div className='job-details-main'>
                        {/* Header */}
                        <div className='job-details-header'>
                            <div className='company-logo-wrapper'>
                                {job.congTy?.logo ? (
                                    <img
                                        src={job.congTy.logo}
                                        alt={job.congTy.tenCongTy}
                                        className='company-logo-large'
                                    />
                                ) : (
                                    <div className='company-logo-placeholder-large'>
                                        <Building2 size={40} />
                                    </div>
                                )}
                            </div>
                            <div className='job-header-info'>
                                <h1 className='job-details-title'>{job.tieuDe}</h1>
                                <p className='job-details-company'>
                                    {job.congTy?.tenCongTy || 'Công ty'}
                                </p>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className='job-quick-info'>
                            <div className='info-item'>
                                <MapPin size={20} />
                                <span>{job.diaDiem}</span>
                            </div>
                            <div className='info-item'>
                                <DollarSign size={20} />
                                <span>{formatSalary()}</span>
                            </div>
                            <div className='info-item'>
                                <Briefcase size={20} />
                                <span>{formatJobType()}</span>
                            </div>
                            <div className='info-item'>
                                <Calendar size={20} />
                                <span>Hạn nộp: {formatDate(job.hanNopHoSo)}</span>
                            </div>
                        </div>

                        {/* Job Description */}
                        <section className='job-section'>
                            <h2 className='section-title'>Mô tả công việc</h2>
                            <div className='section-content'>
                                {/* Prefer extended detail if available */}
                                {job.chiTiet?.moTaChiTiet ? (
                                    <div dangerouslySetInnerHTML={{ __html: job.chiTiet.moTaChiTiet }} />
                                ) : (
                                    <p>{job.moTaCongViec}</p>
                                )}
                            </div>
                        </section>

                        {/* Requirements */}
                        <section className='job-section'>
                            <h2 className='section-title'>Yêu cầu ứng viên</h2>
                            <div className='section-content'>
                                {job.chiTiet?.yeuCauChiTiet ? (
                                    <p>{job.chiTiet.yeuCauChiTiet}</p>
                                ) : (
                                    <p>{job.yeuCau}</p>
                                )}
                            </div>
                        </section>

                        {/* Benefits */}
                        <section className='job-section'>
                            <h2 className='section-title'>Quyền lợi</h2>
                            <div className='section-content'>
                                {job.chiTiet?.loiIch ? (
                                    <p>{job.chiTiet.loiIch}</p>
                                ) : (
                                    <p>{job.quyenLoi}</p>
                                )}
                            </div>
                        </section>

                        {/* Required Skills */}
                        {(job.chiTiet?.kyNang || job.kyNangYeuCau) && ( (job.chiTiet?.kyNang && job.chiTiet.kyNang.length > 0) || (job.kyNangYeuCau && job.kyNangYeuCau.length > 0) ) && (
                            <section className='job-section'>
                                <h2 className='section-title'>Kỹ năng yêu cầu</h2>
                                <div className='skills-list'>
                                    {(job.chiTiet?.kyNang || job.kyNangYeuCau).map((skill, idx) => (
                                        <span key={idx} className='skill-badge'>
                                            <CheckCircle size={16} />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Extended responsibilities */}
                        {job.chiTiet?.nhiemVu && job.chiTiet.nhiemVu.length > 0 && (
                            <section className='job-section'>
                                <h2 className='section-title'>Nhiệm vụ</h2>
                                <ul className='section-content'>
                                    {job.chiTiet.nhiemVu.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className='job-details-sidebar'>
                        {/* Apply Button */}
                        <div className='apply-section'>
                            <button 
                                onClick={handleApply}
                                className='btn-apply-large'
                                disabled={job._alreadyApplied}
                            >
                                {job._alreadyApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'}
                            </button>
                        </div>

                        {/* Job Stats */}
                        <div className='job-stats-card'>
                            <h3 className='stats-title'>Thông tin chung</h3>
                            <div className='stats-list'>
                                <div className='stat-item-detail'>
                                    <Users size={20} />
                                    <div>
                                        <p className='stat-label'>Số lượng tuyển</p>
                                        <p className='stat-value'>{job.soLuongTuyen} người</p>
                                    </div>
                                </div>
                                <div className='stat-item-detail'>
                                    <Award size={20} />
                                    <div>
                                        <p className='stat-label'>Số lượt ứng tuyển</p>
                                        <p className='stat-value'>{job.soLuongUngTuyen || 0} người</p>
                                    </div>
                                </div>
                                <div className='stat-item-detail'>
                                    <Clock size={20} />
                                    <div>
                                        <p className='stat-label'>Ngành nghề</p>
                                        <p className='stat-value'>{job.nganhNghe}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Info */}
                        {job.congTy && (
                            <div className='company-info-card'>
                                <h3 className='stats-title'>Thông tin công ty</h3>
                                <div className='company-info-content'>
                                    {job.congTy.logo && (
                                        <img
                                            src={job.congTy.logo}
                                            alt={job.congTy.tenCongTy}
                                            className='company-info-logo'
                                        />
                                    )}
                                    <h4 className='company-info-name'>
                                        {job.congTy.tenCongTy}
                                    </h4>
                                    {job.congTy.diaChi && (
                                        <p className='company-info-address'>
                                            <MapPin size={16} />
                                            {job.congTy.diaChi}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;