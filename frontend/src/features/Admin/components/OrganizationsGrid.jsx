// src/features/Admin/components/OrganizationsGrid.jsx
import React, { useEffect, useState } from 'react';
import { Building2, Edit2, Users } from 'lucide-react';
import api from '@services/api';
import OrganizationModal from './OrganizationModal';
import '../styles/OrganizationsGrid.css';

const OrganizationsGrid = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedOrg, setSelectedOrg] = useState(null);

    const loadCompanies = async () => {
        setLoading(true);
        try {
            const res = await api.get('/companies?limit=20&page=1');
            if (res && res.data) {
                setCompanies(res.data.data || res.data);
            }
        } catch (err) {
            console.error('Load companies error', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCompanies();
    }, []);

    const handleAdd = () => {
        setSelectedOrg(null);
        setModalMode('create');
        setModalOpen(true);
    };

    const handleEdit = (org) => {
        setSelectedOrg(org);
        setModalMode('edit');
        setModalOpen(true);
    };

    const handleView = (org) => {
        setSelectedOrg(org);
        setModalMode('view');
        setModalOpen(true);
    };

    return (
        <div>
            <div className='section-header'>
                <h3 className='card-title'>Quản lý tổ chức</h3>
                <button className='btn btn-primary' onClick={handleAdd}>
                    <Building2 size={16} />
                    Thêm tổ chức
                </button>
            </div>

            <div className='org-grid'>
                {loading ? (
                    <div>Đang tải tổ chức...</div>
                ) : (
                    (companies && companies.length ? companies : []).map(
                        (org) => (
                            <div key={org._id || org.id} className='org-card'>
                                <div className='org-header'>
                                    <div>
                                        <h3 className='org-title'>
                                            {org.tenCongTy || org.name}
                                        </h3>
                                        <span className='org-type'>
                                            {org.loai ||
                                                (org.linhVuc
                                                    ? 'Doanh nghiệp'
                                                    : 'Tổ chức')}
                                        </span>
                                    </div>
                                    <span
                                        className={`badge ${
                                            org.trangThai === 'hoat_dong'
                                                ? 'active'
                                                : 'inactive'
                                        }`}
                                    >
                                        {org.trangThai === 'hoat_dong'
                                            ? 'Hoạt động'
                                            : 'Không hoạt động'}
                                    </span>
                                </div>

                                <div className='org-info'>
                                    <p>
                                        Tham gia:{' '}
                                        {org.createdAt
                                            ? new Date(
                                                  org.createdAt
                                              ).toLocaleDateString()
                                            : '-'}
                                    </p>
                                </div>

                                <div className='org-stats'>
                                    <div className='org-stat'>
                                        <div className='org-stat-value'>
                                            {org.thongKe
                                                ? org.thongKe.soLuongUngVien
                                                : '-'}
                                        </div>
                                        <div className='org-stat-label'>
                                            Người dùng
                                        </div>
                                    </div>
                                    <div className='org-stat'>
                                        <div className='org-stat-value'>-</div>
                                        <div className='org-stat-label'>
                                            Hoạt động
                                        </div>
                                    </div>
                                    <div className='org-stat'>
                                        <div className='org-stat-value'>
                                            - ⭐
                                        </div>
                                        <div className='org-stat-label'>
                                            Đánh giá
                                        </div>
                                    </div>
                                </div>

                                <div className='org-actions'>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => handleEdit(org)}
                                    >
                                        <Edit2 size={16} />
                                        Sửa
                                    </button>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => handleView(org)}
                                    >
                                        <Users size={16} />
                                        Xem
                                    </button>
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
            {modalOpen && (
                <OrganizationModal
                    open={modalOpen}
                    mode={modalMode}
                    org={selectedOrg}
                    onClose={() => setModalOpen(false)}
                    onSaved={() => loadCompanies()}
                />
            )}
        </div>
    );
};

export default OrganizationsGrid;
