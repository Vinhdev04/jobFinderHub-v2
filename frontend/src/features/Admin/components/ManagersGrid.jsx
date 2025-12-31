import React, { useEffect, useState } from 'react';
import { Edit2, User } from 'lucide-react';
import api from '@services/api';
import ManagerModal from './ManagerModal';

const ManagersGrid = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState('create');
    const [selected, setSelected] = useState(null);

    const load = async () => {
        setLoading(true);
        try {
            const res = await api.get('/managers?limit=50&page=1');
            if (res && res.managers) setManagers(res.managers);
        } catch (err) {
            console.error('Load managers error', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleAdd = () => {
        setSelected(null);
        setMode('create');
        setModalOpen(true);
    };

    const handleEdit = (m) => {
        setSelected(m);
        setMode('edit');
        setModalOpen(true);
    };

    return (
        <div>
            <div className='section-header'>
                <h3 className='card-title'>Quản lý nhân sự</h3>
                <button className='btn btn-primary' onClick={handleAdd}>
                    <User size={16} /> Thêm nhân sự
                </button>
            </div>

            {loading ? (
                <div>Đang tải...</div>
            ) : (
                <div className='org-grid'>
                    {(managers || []).map((m) => (
                        <div key={m._id || m.id} className='org-card'>
                            <div className='org-header'>
                                <div>
                                    <h3 className='org-title'>{m.hoVaTen}</h3>
                                    <span className='org-type'>
                                        {m.donVi || '—'}
                                    </span>
                                </div>
                                <span
                                    className={`badge ${
                                        m.trangThai === 'hoat_dong'
                                            ? 'active'
                                            : 'inactive'
                                    }`}
                                >
                                    {m.trangThai === 'hoat_dong'
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </span>
                            </div>

                            <div className='org-info'>
                                <p>Mã nhân viên: {m.maNhanVien || '-'}</p>
                                <p>{m.email}</p>
                            </div>

                            <div className='org-actions'>
                                <button
                                    className='btn btn-secondary'
                                    onClick={() => handleEdit(m)}
                                >
                                    {' '}
                                    <Edit2 size={16} /> Sửa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modalOpen && (
                <ManagerModal
                    open={modalOpen}
                    mode={mode}
                    manager={selected}
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

export default ManagersGrid;
