import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobService from '@services/jobService';
import applicationService from '@services/applicationService';
import { useToast } from '@hooks/useToast.jsx';
import './JobDetailsPage.css';

const JobApplyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [cvFile, setCvFile] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await jobService.getJobById(id);
                if (res && res.success) setJob(res.data);
            } catch (err) {
                console.error('Error loading job for apply:', err);
                toast.error('Không thể tải tin tuyển dụng');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    // No longer need base64 conversion when using multipart upload

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!job) return;
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('tinTuyenDung', id);
            formData.append('thuGioiThieu', coverLetter || '');
            if (cvFile) formData.append('cv', cvFile);

            const res = await applicationService.createApplication(formData, true);
            if (res && res.success) {
                toast.success('Ứng tuyển thành công');
                navigate('/student/applications');
            } else {
                toast.error(res?.message || 'Ứng tuyển thất bại');
            }
        } catch (err) {
            console.error('Apply error:', err);
            toast.error(err?.message || 'Có lỗi khi ứng tuyển');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className='container'>Đang tải...</div>;
    if (!job) return <div className='container'>Không tìm thấy tin tuyển dụng</div>;

    return (
        <div className='job-details-page'>
            <div className='container'>
                <h2>Ứng tuyển: {job.tieuDe}</h2>
                <p className='job-company'>{job.congTy?.tenCongTy}</p>

                <div className='apply-form-card'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Thư giới thiệu (tùy chọn)</label>
                            <textarea
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                rows={6}
                                placeholder='Viết vài dòng giới thiệu bản thân...' 
                            />
                        </div>

                        <div className='form-group'>
                            <label>Upload CV (PDF/DOC)</label>
                            <input
                                type='file'
                                accept='.pdf,.doc,.docx'
                                onChange={(e) => setCvFile(e.target.files[0] || null)}
                            />
                        </div>

                        <div className='form-actions'>
                            <button type='submit' className='btn-apply-large' disabled={submitting}>
                                {submitting ? 'Đang gửi...' : 'Gửi hồ sơ'}
                            </button>
                            <button type='button' className='btn-detail' onClick={() => navigate(-1)}>
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApplyPage;
