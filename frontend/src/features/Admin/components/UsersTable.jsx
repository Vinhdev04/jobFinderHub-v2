// src/features/Admin/components/UsersTable.jsx
import React from 'react';
import { Search, Filter, Users, Edit2, Lock, MoreVertical } from 'lucide-react';
import { MOCK_USERS } from '../constants/systemConstants.js';
import '../styles/UserTable.css';

const UsersTable = () => {
    const getRoleName = (role) => {
        const roles = {
            admin: 'Quản trị viên',
            hr: 'Giáo vụ',
            student: 'Sinh viên'
        };
        return roles[role] || role;
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

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
                        />
                    </div>
                    <button className='btn btn-secondary'>
                        <Filter size={16} />
                        Lọc
                    </button>
                    <button className='btn btn-primary'>
                        <Users size={16} />
                        Thêm người dùng
                    </button>
                </div>
            </div>

            <table className='data-table'>
                <thead>
                    <tr>
                        <th>Người dùng</th>
                        <th>Vai trò</th>
                        <th>Tổ chức</th>
                        <th>Trạng thái</th>
                        <th>Đăng nhập cuối</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_USERS.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <div className='user-cell'>
                                    <div className='user-avatar-sm'>
                                        {getInitials(user.name)}
                                    </div>
                                    <div className='user-details'>
                                        <h4>{user.name}</h4>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className={`badge ${user.role}`}>
                                    {getRoleName(user.role)}
                                </span>
                            </td>
                            <td>{user.organization}</td>
                            <td>
                                <span className={`badge ${user.status}`}>
                                    {user.status === 'active'
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </span>
                            </td>
                            <td>{user.joinDate}</td>
                            <td>
                                <div className='table-actions'>
                                    <button
                                        className='icon-btn'
                                        title='Chỉnh sửa'
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className='icon-btn danger'
                                        title='Khóa'
                                    >
                                        <Lock size={16} />
                                    </button>
                                    <button className='icon-btn'>
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
