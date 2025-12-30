// src/features/Jobs/JobCard.jsx

import React from 'react';
import { MapPin, DollarSign, Clock, Users, Heart, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job, isFavorite, toggleFavorite }) => {
    const navigate = useNavigate();

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

    // Format deadline
    const formatDeadline = () => {
        const deadline = new Date(job.hanNopHoSo);
        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return 'Đã hết hạn';
        } else if (diffDays === 0) {
            return 'Hôm nay';
        } else if (diffDays === 1) {
            return '1 ngày';
        } else if (diffDays <= 7) {
            return `${diffDays} ngày`;
        } else {
            return deadline.toLocaleDateString('vi-VN');
        }
    };

    // Navigate to job details
    const handleViewDetails = () => {
        navigate(`/jobs/${job._id}`);
    };

    // Navigate to apply
    const handleApply = () => {
        navigate(`/jobs/${job._id}/apply`);
    };

    return (
        <div className='job-card'>
            <div className='job-card-header'>
                <div className='job-company-info'>
                    {job.congTy?.logo ? (
                        <img
                            src={job.congTy.logo}
                            alt={job.congTy.tenCongTy}
                            className='job-logo'
                        />
                    ) : (
                        <div className='job-logo-placeholder'>
                            <Building2 size={24} />
                        </div>
                    )}
                    <div className='job-info'>
                        <h3 className='job-title'>{job.tieuDe}</h3>
                        <p className='job-company'>
                            {job.congTy?.tenCongTy || 'Công ty'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => toggleFavorite(job._id)}
                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                    aria-label='Yêu thích'
                >
                    <Heart
                        size={20}
                        className='heart-icon'
                        fill={isFavorite ? 'currentColor' : 'none'}
                    />
                </button>
            </div>

            <p className='job-description'>
                {job.moTaCongViec?.substring(0, 150)}
                {job.moTaCongViec?.length > 150 ? '...' : ''}
            </p>

            {/* Skills */}
            {job.kyNangYeuCau && job.kyNangYeuCau.length > 0 && (
                <div className='job-skills'>
                    {job.kyNangYeuCau.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className='skill-tag'>
                            {skill}
                        </span>
                    ))}
                    {job.kyNangYeuCau.length > 4 && (
                        <span className='skill-tag'>
                            +{job.kyNangYeuCau.length - 4}
                        </span>
                    )}
                </div>
            )}

            <div className='job-meta'>
                <div className='job-meta-row'>
                    <div className='job-meta-item'>
                        <MapPin size={16} />
                        <span>{job.diaDiem}</span>
                    </div>
                    <div className='job-meta-item'>
                        <DollarSign size={16} />
                        <span>{formatSalary()}</span>
                    </div>
                </div>
                <div className='job-meta-row'>
                    <div className='job-meta-item'>
                        <Clock size={16} />
                        <span>{formatJobType()} • Còn {formatDeadline()}</span>
                    </div>
                    <div className='job-meta-item'>
                        <Users size={16} />
                        <span>{job.soLuongUngTuyen || 0} ứng viên</span>
                    </div>
                </div>
            </div>

            <div className='job-actions'>
                <button 
                    className='btn-apply'
                    onClick={handleApply}
                >
                    Ứng tuyển ngay
                </button>
                <button 
                    className='btn-detail'
                    onClick={handleViewDetails}
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default JobCard;