// frontend/src/features/Admin/components/UsersTable.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, Edit2, Lock, Unlock, Trash2, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import userService from '@services/userService';
import { useToast } from '@hooks/useToast';
import '../styles/UserTable.css';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: ''
    });
    const { toast } = useToast();

    // Load users
    useEffect(() => {
        loadUsers();
    }, [pagination.page, filters]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                ...filters
            };

            const response = await userService.getAllUsers(params);
            
            if (response.success) {
                setUsers(response.data.users);
                setPagination(prev => ({
                    ...prev,
                    ...response.data.pagination
                }));
            }
        } catch (error) {
            console.error('Load users error:', error);
            toast.error(error.message || 'Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    };

    // Handle search
    const handleSearch = (e) => {
        setFilters(prev => ({
            ...prev,
            search: e.target.value
        }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    // Handle filter
    const handleFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    // Handle lock/unlock
    const handleToggleLock = async (userId, currentStatus) => {
        try {
            const response = await userService.toggleUserLock(userId);
            if (response.success) {
                toast.success(response.message);
                loadUsers();
            }
        } catch (error) {
            toast.error(error.message || 'Không thể thực hiện thao tác');
        }
    };

    // Handle delete
    const handleDelete = async (userId, userName) => {
        if (!window.confirm(`Bạn có chắc muốn xóa người dùng "${userName}"?`)) {
            return;
        }

        try {
            const response = await userService.deleteUser(userId);
            if (response.success) {
                toast.success('Đã xóa người dùng thành công');
                loadUsers();
            }
        } catch (error) {
            toast.error(error.message || 'Không thể xóa người dùng');
        }
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    // Helper functions
    const getRoleName = (role) => {
        const roles = {
            sinh_vien: 'Sinh viên',
            giao_vu: 'Giáo vụ',
            nhan_vien_tuyen_dung: 'NV Tuyển dụng',
            quan_ly_doanh_nghiep: 'Quản lý DN',
            quan_tri_he_thong: 'Quản trị viên'
        };
        return roles[role] || role;
    };

    const getStatusName = (status) => {
        const statuses = {
            hoat_dong: 'Hoạt động',
            tam_khoa: 'Tạm khóa',
            khoa: 'Khóa'
        };
        return statuses[status] || status;
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading && users.length === 0) {
        return (
            <div className='users-section'>
                <div className='loading-spinner'>Đang tải...</div>
            </div>
        );
    }

    return (
        <div className='users-section'>
            <div className='section-header'>
                <h3 className='card-title'>Quản lý người dùng</h3>
                <div className='search-bar'>
                    <div className='search-input'>
                        <Search />
                        <input
                            type='text'
                            placeholder='Tìm kiếm người dùng...'
                            value={filters.search}
                            onChange={handleSearch}
                        />
                    </div>
                    
                    {/* Role Filter */}
                    <select
                        className='filter-select'
                        value={filters.role}
                        onChange={(e) => handleFilter('role', e.target.value)}
                    >
                        <option value=''>Tất cả vai trò</option>
                        <option value='sinh_vien'>Sinh viên</option>
                        <option value='giao_vu'>Giáo vụ</option>
                        <option value='nhan_vien_tuyen_dung'>NV Tuyển dụng</option>
                        <option value='quan_ly_doanh_nghiep'>Quản lý DN</option>
                        <option value='quan_tri_he_thong'>Quản trị viên</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        className='filter-select'
                        value={filters.status}
                        onChange={(e) => handleFilter('status', e.target.value)}
                    >
                        <option value=''>Tất cả trạng thái</option>
                        <option value='hoat_dong'>Hoạt động</option>
                        <option value='tam_khoa'>Tạm khóa</option>
                        <option value='khoa'>Khóa</option>
                    </select>
                </div>
            </div>

            <table className='data-table'>
                <thead>
                    <tr>
                        <th>Người dùng</th>
                        <th>Vai trò</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Đăng ký</th>
                        <th>Hoạt động cuối</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan='7' style={{ textAlign: 'center', padding: '2rem' }}>
                                Không tìm thấy người dùng nào
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <div className='user-cell'>
                                        <div className='user-avatar-sm'>
                                            {getInitials(user.hoVaTen)}
                                        </div>
                                        <div className='user-details'>
                                            <h4>{user.hoVaTen}</h4>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${user.vaiTro}`}>
                                        {getRoleName(user.vaiTro)}
                                    </span>
                                </td>
                                <td>{user.soDienThoai}</td>
                                <td>
                                    <span className={`badge ${user.trangThai}`}>
                                        {getStatusName(user.trangThai)}
                                    </span>
                                </td>
                                <td>{formatDate(user.createdAt)}</td>
                                <td>{formatDate(user.lastLogin)}</td>
                                <td>
                                    <div className='table-actions'>
                                        <button
                                            className='icon-btn'
                                            title='Chỉnh sửa'
                                            onClick={() => {/* TODO: Implement edit */}}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            className={`icon-btn ${user.trangThai === 'hoat_dong' ? 'danger' : 'success'}`}
                                            title={user.trangThai === 'hoat_dong' ? 'Khóa' : 'Mở khóa'}
                                            onClick={() => handleToggleLock(user._id, user.trangThai)}
                                        >
                                            {user.trangThai === 'hoat_dong' ? (
                                                <Lock size={16} />
                                            ) : (
                                                <Unlock size={16} />
                                            )}
                                        </button>
                                        <button
                                            className='icon-btn danger'
                                            title='Xóa'
                                            onClick={() => handleDelete(user._id, user.hoVaTen)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className='pagination'>
                    <button
                        className='pagination-btn'
                        disabled={pagination.page === 1}
                        onClick={() => handlePageChange(pagination.page - 1)}
                    >
                        <ChevronLeft size={16} />
                        Trước
                    </button>
                    
                    <div className='pagination-info'>
                        Trang {pagination.page} / {pagination.pages} 
                        <span style={{ marginLeft: '1rem', color: '#6b7280' }}>
                            (Tổng: {pagination.total} người dùng)
                        </span>
                    </div>

                    <button
                        className='pagination-btn'
                        disabled={pagination.page === pagination.pages}
                        onClick={() => handlePageChange(pagination.page + 1)}
                    >
                        Sau
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UsersTable;