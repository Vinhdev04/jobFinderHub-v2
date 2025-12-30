import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@services/api';
import './StudentApplicationDetail.css';

const StudentApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/applications/${id}`);
                if (res && (res.success || res.data)) {
                    // backend may return { success, data } or { success, application }
                    setApplication(res.data || res.application || res.applicationData || res);
                } else {
                    setApplication(null);
                }
            } catch (err) {
                console.error('Failed to load application', err);
            } finally {
                setLoading(false);
            }
        };
        fetchApp();
    }, [id]);

    if (loading) return <div className="app-detail">Đang tải...</div>;
    if (!application) return <div className="app-detail">Không tìm thấy đơn ứng tuyển</div>;

    const job = application.jobPosting || application.job || application.tinTuyenDung || {};
    const company = job.company || job.tenCongTy || application.company || null;

    return (
        <div className="app-detail">
            <button className="back-btn" onClick={() => navigate(-1)}>← Quay lại</button>
            <h2>Chi tiết đơn ứng tuyển</h2>
            <div className="app-detail-card">
                <h3>{job.chucDanh || job.title || job.position || 'Tin tuyển dụng'}</h3>
                <p>
                    <strong>Công ty:</strong>{' '}
                    {company ? (company.tenCongTy || company.name || (typeof company === 'string' ? company : '—')) : '—'}
                </p>
                <p><strong>Trạng thái:</strong> {application.trangThai || application.status || application.statusLabel}</p>
                <p><strong>Ngày nộp:</strong> {application.createdAt || application.submittedAt || application.ngayNop || '—'}</p>
                <div>
                    <h4>Thư giới thiệu</h4>
                    <p>{application.thuGioiThieu || application.coverLetter || '—'}</p>
                </div>
                <div>
                    <h4>CV đính kèm</h4>
                    {application.cvDinhKem ? (
                        (() => {
                            const rel = application.cvDinhKem.duongDan || application.cvDinhKem.path || application.cvDinhKem;
                            // api.defaults.baseURL is like http://localhost:5000/api
                            const serverBase = api.defaults.baseURL.replace(/\/api$/i, '');
                            const downloadUrl = rel && rel.startsWith('http') ? rel : `${serverBase}${rel}`;
                            return (
                                <a href={downloadUrl} target="_blank" rel="noreferrer">Tải CV</a>
                            );
                        })()
                    ) : (
                        <p>Không có CV đính kèm</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentApplicationDetail;
