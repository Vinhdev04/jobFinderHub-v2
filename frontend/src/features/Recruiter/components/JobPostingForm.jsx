import React, { useState, useEffect } from 'react';
import '../styles/JobPostingForm.css';

const JobPostingForm = ({ job, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        tieuDe: '',
        moTa: '',
        yeuCau: '',
        mucLuong: '',
        diaDiem: '',
        loaiCongViec: 'full-time',
        trangThai: 'active',
        hanNop: '',
        soLuongTuyen: 1,
        kiNhiem: '',
        linhVuc: '',
        capBac: ''
    });

    useEffect(() => {
        if (job) {
            setFormData({
                tieuDe: job.tieuDe || job.title || '',
                moTa: job.moTa || job.description || '',
                yeuCau: job.yeuCau || job.requirements || '',
                mucLuong: job.mucLuong || job.salary || '',
                diaDiem: job.diaDiem || job.location || '',
                loaiCongViec: job.loaiCongViec || job.jobType || 'full-time',
                trangThai: job.trangThai || job.status || 'active',
                hanNop: job.hanNop || job.deadline || '',
                soLuongTuyen: job.soLuongTuyen || job.positions || 1,
                kiNhiem: job.kiNhiem || job.experience || '',
                linhVuc: job.linhVuc || job.industry || '',
                capBac: job.capBac || job.level || ''
            });
        }
    }, [job]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="jobForm" onSubmit={handleSubmit}>
            <div className="formRow">
                <div className="formGroup">
                    <label>Tiêu đề công việc *</label>
                    <input
                        type="text"
                        name="tieuDe"
                        value={formData.tieuDe}
                        onChange={handleChange}
                        placeholder="VD: Senior Frontend Developer"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label>Số lượng tuyển *</label>
                    <input
                        type="number"
                        name="soLuongTuyen"
                        value={formData.soLuongTuyen}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
            </div>

            <div className="formRow">
                <div className="formGroup">
                    <label>Lĩnh vực</label>
                    <select
                        name="linhVuc"
                        value={formData.linhVuc}
                        onChange={handleChange}
                    >
                        <option value="">Chọn lĩnh vực</option>
                        <option value="it">Công nghệ thông tin</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Kinh doanh</option>
                        <option value="finance">Tài chính</option>
                        <option value="hr">Nhân sự</option>
                        <option value="other">Khác</option>
                    </select>
                </div>

                <div className="formGroup">
                    <label>Cấp bậc</label>
                    <select
                        name="capBac"
                        value={formData.capBac}
                        onChange={handleChange}
                    >
                        <option value="">Chọn cấp bậc</option>
                        <option value="intern">Thực tập sinh</option>
                        <option value="fresher">Fresher</option>
                        <option value="junior">Junior</option>
                        <option value="middle">Middle</option>
                        <option value="senior">Senior</option>
                        <option value="lead">Team Lead</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
            </div>

            <div className="formRow">
                <div className="formGroup">
                    <label>Loại công việc *</label>
                    <select
                        name="loaiCongViec"
                        value={formData.loaiCongViec}
                        onChange={handleChange}
                        required
                    >
                        <option value="full-time">Toàn thời gian</option>
                        <option value="part-time">Bán thời gian</option>
                        <option value="contract">Hợp đồng</option>
                        <option value="internship">Thực tập</option>
                    </select>
                </div>

                <div className="formGroup">
                    <label>Kinh nghiệm</label>
                    <input
                        type="text"
                        name="kiNhiem"
                        value={formData.kiNhiem}
                        onChange={handleChange}
                        placeholder="VD: 2-3 năm"
                    />
                </div>
            </div>

            <div className="formRow">
                <div className="formGroup">
                    <label>Mức lương</label>
                    <input
                        type="text"
                        name="mucLuong"
                        value={formData.mucLuong}
                        onChange={handleChange}
                        placeholder="VD: 15-20 triệu"
                    />
                </div>

                <div className="formGroup">
                    <label>Địa điểm *</label>
                    <input
                        type="text"
                        name="diaDiem"
                        value={formData.diaDiem}
                        onChange={handleChange}
                        placeholder="VD: Ho Chi Minh City"
                        required
                    />
                </div>
            </div>

            <div className="formRow">
                <div className="formGroup">
                    <label>Hạn nộp</label>
                    <input
                        type="date"
                        name="hanNop"
                        value={formData.hanNop}
                        onChange={handleChange}
                    />
                </div>

                <div className="formGroup">
                    <label>Trạng thái</label>
                    <select
                        name="trangThai"
                        value={formData.trangThai}
                        onChange={handleChange}
                    >
                        <option value="active">Đang tuyển</option>
                        <option value="draft">Bản nháp</option>
                        <option value="closed">Đã đóng</option>
                    </select>
                </div>
            </div>

            <div className="formGroup">
                <label>Mô tả công việc *</label>
                <textarea
                    name="moTa"
                    value={formData.moTa}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Mô tả chi tiết về công việc..."
                    required
                />
            </div>

            <div className="formGroup">
                <label>Yêu cầu công việc *</label>
                <textarea
                    name="yeuCau"
                    value={formData.yeuCau}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Các yêu cầu về kỹ năng, kinh nghiệm..."
                    required
                />
            </div>

            <div className="formActions">
                <button type="button" className="btnCancel" onClick={onCancel}>
                    Hủy
                </button>
                <button type="submit" className="btnSubmit">
                    {job ? 'Cập nhật' : 'Tạo tin tuyển dụng'}
                </button>
            </div>
        </form>
    );
};

export default JobPostingForm;