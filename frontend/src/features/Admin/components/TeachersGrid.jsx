import React, { useEffect, useState } from 'react';
import { Edit2, UserPlus } from 'lucide-react';
import api from '@services/api';
import TeacherModal from './TeacherModal';

const TeachersGrid = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selected, setSelected] = useState(null);

    const load = async () => {
        setLoading(true);
        try {
            const res = await api.get('/teachers?limit=50&page=1');
            // api interceptor returns response.data
            if (res && res.teachers) setTeachers(res.teachers);
            else if (Array.isArray(res)) setTeachers(res);
        } catch (err) {
            console.error('Load teachers error', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleAdd = () => {
        setSelected(null);
        setModalMode('create');
        setModalOpen(true);
    };

    const handleEdit = (t) => {
        setSelected(t);
        setModalMode('edit');
        setModalOpen(true);
    };

    return (
        <div>
            <div className='section-header'>
                <h3 className='card-title'>Quản lý giáo viên</h3>
                <button className='btn btn-primary' onClick={handleAdd}>
                    <UserPlus size={16} /> Thêm giáo viên
                </button>
            </div>

            {loading ? (
                <div>Đang tải giáo viên...</div>
            ) : (
                <div className='org-grid'>
                    {(teachers || []).map((t) => (
                        <div key={t._id || t.id} className='org-card'>
                            <div className='org-header'>
                                <div>
                                    <h3 className='org-title'>
                                        {t.hoVaTen || t.email}
                                    </h3>
                                    <span className='org-type'>
                                        {t.boMon || 'Chưa có bộ môn'}
                                    </span>
                                </div>
                                <span
                                    className={`badge ${
                                        t.trangThai === 'hoat_dong'
                                            ? 'active'
                                            : 'inactive'
                                    }`}
                                >
                                    {t.trangThai === 'hoat_dong'
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </span>
                            </div>

                            <div className='org-info'>
                                <p>Giáo viên mã: {t.maGiaoVien || '-'}</p>
                            </div>

                            <div className='org-actions'>
                                <button
                                    className='btn btn-secondary'
                                    onClick={() => handleEdit(t)}
                                >
                                    <Edit2 size={16} /> Sửa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modalOpen && (
                <TeacherModal
                    open={modalOpen}
                    mode={modalMode}
                    teacher={selected}
                    onClose={() => setModalOpen(false)}
                    onSaved={() => {
                        setModalOpen(false);
                        load();
                    }}
                />
            )}
        </div>
    );
};

export default TeachersGrid;
