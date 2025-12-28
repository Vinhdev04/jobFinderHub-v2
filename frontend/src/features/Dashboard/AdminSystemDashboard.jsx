// src/components/Dashboard/AdminSystemDashboard.jsx
import React, { useState } from 'react';
import './AdminSystemDashboard.css';
import SystemHealthCard from '@features/Admin/components/SystemHealthCard';
import ActivityLogCard from '@features/Admin/components/ActivityLogCard';
import UserCard from '@features/Admin/components/UserCard';
import OrganizationCard from '@features/Admin/components/OrganizationCard';
import {
    TABS,
    TAB_LABELS,
    MOCK_STATS,
    MOCK_SYSTEM_HEALTH,
    MOCK_QUICK_STATS,
    MOCK_SERVICES,
    MOCK_ACTIVITIES,
    MOCK_USERS,
    MOCK_ORGANIZATIONS,
    MOCK_SYSTEM_LOGS,
    MOCK_BACKUPS
} from '../Admin/constants/systemConstants.js';

const AdminSystemDashboard = () => {
    const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
    const [settings, setSettings] = useState({
        maintenance: true,
        newRegistration: true,
        emailNotification: true,
        loginLimit: true,
        systemLogs: true,
        warningNotification: true,
        dailyReport: false
    });
    const [backupConfig, setBackupConfig] = useState({
        frequency: 'daily',
        time: '02:00'
    });

    // Handlers
    const handleUserAction = (action, user) => {
        console.log(`${action} user:`, user);
        alert(`${action}: ${user.name}`);
    };

    const handleOrgAction = (action, org) => {
        console.log(`${action} org:`, org);
        alert(`${action}: ${org.name}`);
    };

    const handleToggleSetting = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleBackupNow = () => {
        alert('Đang thực hiện sao lưu...');
    };

    const handleDownloadBackup = (backup) => {
        alert(`Tải xuống bản sao lưu: ${backup.date}`);
    };

    const handleRestoreBackup = (backup) => {
        if (
            window.confirm(
                `Bạn có chắc muốn khôi phục bản sao lưu ${backup.date}?`
            )
        ) {
            alert('Đang khôi phục...');
        }
    };

    // Render Functions
    const renderStatCards = () => (
        <div className='admin-system__stats'>
            <div className='admin-system__stat-card admin-system__stat-card--blue animate-fadeInUp'>
                <div className='admin-system__stat-icon'>👥</div>
                <div className='admin-system__stat-content'>
                    <div className='admin-system__stat-value'>
                        {MOCK_STATS.totalUsers.toLocaleString()}
                    </div>
                    <div className='admin-system__stat-label'>
                        Tổng người dùng
                    </div>
                </div>
            </div>

            <div className='admin-system__stat-card admin-system__stat-card--blue-light animate-fadeInUp'>
                <div className='admin-system__stat-icon'>👤</div>
                <div className='admin-system__stat-content'>
                    <div className='admin-system__stat-value'>
                        {MOCK_STATS.todayActive}
                    </div>
                    <div className='admin-system__stat-label'>
                        Hoạt động hôm nay
                    </div>
                </div>
            </div>

            <div className='admin-system__stat-card admin-system__stat-card--green animate-fadeInUp'>
                <div className='admin-system__stat-icon'>🏢</div>
                <div className='admin-system__stat-content'>
                    <div className='admin-system__stat-value'>
                        {MOCK_STATS.totalOrgs}
                    </div>
                    <div className='admin-system__stat-label'>Doanh nghiệp</div>
                </div>
            </div>

            <div className='admin-system__stat-card admin-system__stat-card--purple animate-fadeInUp'>
                <div className='admin-system__stat-icon'>🏫</div>
                <div className='admin-system__stat-content'>
                    <div className='admin-system__stat-value'>
                        {MOCK_STATS.totalSchools}
                    </div>
                    <div className='admin-system__stat-label'>Trường học</div>
                </div>
            </div>
        </div>
    );

    const renderTabs = () => (
        <div className='admin-system__tabs'>
            {Object.values(TABS).map((tab) => (
                <button
                    key={tab}
                    className={`admin-system__tab ${
                        activeTab === tab ? 'admin-system__tab--active' : ''
                    }`}
                    onClick={() => setActiveTab(tab)}
                >
                    {TAB_LABELS[tab]}
                </button>
            ))}
        </div>
    );

    const renderOverview = () => (
        <div className='admin-system__content-wrapper'>
            <div className='admin-system__main-content'>
                <SystemHealthCard data={MOCK_SYSTEM_HEALTH} />
                <ActivityLogCard activities={MOCK_ACTIVITIES} />
            </div>

            <div className='admin-system__sidebar'>
                <div className='admin-system__card'>
                    <h3 className='admin-system__card-title'>Thống kê nhanh</h3>
                    <div className='admin-system__quick-stats'>
                        {MOCK_QUICK_STATS.map((stat, index) => (
                            <div
                                key={index}
                                className='admin-system__quick-stat'
                            >
                                <div className='admin-system__quick-stat-label'>
                                    {stat.label}
                                </div>
                                <div className='admin-system__quick-stat-value'>
                                    {stat.value}
                                    {stat.trend && (
                                        <span
                                            className={`admin-system__trend admin-system__trend--${stat.trend}`}
                                        >
                                            {stat.trend === 'up' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='admin-system__card'>
                    <h3 className='admin-system__card-title'>
                        Trạng thái dịch vụ
                    </h3>
                    <div className='admin-system__service-list'>
                        {MOCK_SERVICES.map((service, index) => (
                            <div
                                key={index}
                                className='admin-system__service-item'
                            >
                                <span className='admin-system__service-name'>
                                    {service.name}
                                </span>
                                <span
                                    className={`admin-system__service-status admin-system__service-status--${service.status}`}
                                >
                                    {service.status === 'active'
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='admin-system__card'>
                    <h3 className='admin-system__card-title'>Thao tác nhanh</h3>
                    <div className='admin-system__quick-actions'>
                        <button className='admin-system__quick-action-btn'>
                            👤 Tạo người dùng
                        </button>
                        <button className='admin-system__quick-action-btn'>
                            💾 Sao lưu ngay
                        </button>
                        <button className='admin-system__quick-action-btn'>
                            📄 Xem log
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className='admin-system__content-full'>
            <div className='admin-system__section-header'>
                <h2 className='admin-system__section-title'>
                    Quản lý người dùng
                </h2>
                <div className='admin-system__section-actions'>
                    <select className='admin-system__filter-select'>
                        <option>Tất cả vai trò</option>
                        <option>Sinh viên</option>
                        <option>Nhân viên HR</option>
                        <option>Quản trị viên</option>
                    </select>
                    <button className='admin-system__btn admin-system__btn--primary'>
                        👤 Thêm người dùng
                    </button>
                </div>
            </div>

            <div className='admin-system__user-list'>
                {MOCK_USERS.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onViewDetails={(u) =>
                            handleUserAction('Xem chi tiết', u)
                        }
                        onEdit={(u) => handleUserAction('Chỉnh sửa', u)}
                        onLock={(u) => handleUserAction('Khóa tài khoản', u)}
                    />
                ))}
            </div>
        </div>
    );

    const renderOrganizations = () => (
        <div className='admin-system__content-full'>
            <div className='admin-system__section-header'>
                <h2 className='admin-system__section-title'>Quản lý tổ chức</h2>
                <button className='admin-system__btn admin-system__btn--primary'>
                    🏢 Thêm tổ chức
                </button>
            </div>

            <div className='admin-system__org-grid'>
                {MOCK_ORGANIZATIONS.map((org) => (
                    <OrganizationCard
                        key={org.id}
                        org={org}
                        onViewDetails={(o) =>
                            handleOrgAction('Xem chi tiết', o)
                        }
                        onEdit={(o) => handleOrgAction('Chỉnh sửa', o)}
                        onViewUsers={(o) =>
                            handleOrgAction('Xem người dùng', o)
                        }
                    />
                ))}
            </div>
        </div>
    );

    const renderSystemLog = () => (
        <div className='admin-system__content-full'>
            <div className='admin-system__section-header'>
                <h2 className='admin-system__section-title'>
                    Nhật ký hệ thống
                </h2>
                <div className='admin-system__section-actions'>
                    <select className='admin-system__filter-select'>
                        <option>Tất cả hoạt động</option>
                        <option>Đăng nhập</option>
                        <option>Tạo/Sửa</option>
                        <option>Xóa</option>
                    </select>
                    <button className='admin-system__btn admin-system__btn--primary'>
                        📥 Xuất log
                    </button>
                </div>
            </div>

            <div className='admin-system__table-container'>
                <table className='admin-system__table'>
                    <thead>
                        <tr>
                            <th>Thời gian</th>
                            <th>Hành động</th>
                            <th>Người dùng</th>
                            <th>IP</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_SYSTEM_LOGS.map((log) => (
                            <tr key={log.id}>
                                <td>{log.time}</td>
                                <td>{log.action}</td>
                                <td>{log.user}</td>
                                <td>{log.ip}</td>
                                <td>
                                    <span
                                        className={`admin-system__status-badge admin-system__status-badge--${log.status}`}
                                    >
                                        {log.status === 'success'
                                            ? 'Thành công'
                                            : 'Lỗi'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className='admin-system__content-full'>
            <h2 className='admin-system__section-title'>Cài đặt hệ thống</h2>

            <div className='admin-system__settings-layout'>
                <div className='admin-system__settings-section'>
                    <h3 className='admin-system__settings-title'>Bảo mật</h3>

                    <div className='admin-system__setting-item'>
                        <div className='admin-system__setting-info'>
                            <div className='admin-system__setting-label'>
                                Xác thực 2 yếu tố
                            </div>
                            <div className='admin-system__setting-desc'>
                                Bật buộc cho tất cả admin
                            </div>
                        </div>
                        <label className='admin-system__switch'>
                            <input
                                type='checkbox'
                                checked={settings.maintenance}
                                onChange={() =>
                                    handleToggleSetting('maintenance')
                                }
                            />
                            <span className='admin-system__switch-slider'></span>
                        </label>
                    </div>

                    <div className='admin-system__setting-item'>
                        <div className='admin-system__setting-info'>
                            <div className='admin-system__setting-label'>
                                Giới hạn đăng nhập
                            </div>
                            <div className='admin-system__setting-desc'>
                                Khóa sau 5 lần thất bại
                            </div>
                        </div>
                        <label className='admin-system__switch'>
                            <input
                                type='checkbox'
                                checked={settings.loginLimit}
                                onChange={() =>
                                    handleToggleSetting('loginLimit')
                                }
                            />
                            <span className='admin-system__switch-slider'></span>
                        </label>
                    </div>

                    <div className='admin-system__setting-item'>
                        <div className='admin-system__setting-info'>
                            <div className='admin-system__setting-label'>
                                Log hoạt động
                            </div>
                            <div className='admin-system__setting-desc'>
                                Ghi lại tất cả thao tác
                            </div>
                        </div>
                        <label className='admin-system__switch'>
                            <input
                                type='checkbox'
                                checked={settings.systemLogs}
                                onChange={() =>
                                    handleToggleSetting('systemLogs')
                                }
                            />
                            <span className='admin-system__switch-slider'></span>
                        </label>
                    </div>
                </div>

                <div className='admin-system__settings-section'>
                    <h3 className='admin-system__settings-title'>Thông báo</h3>

                    <div className='admin-system__setting-item'>
                        <div className='admin-system__setting-info'>
                            <div className='admin-system__setting-label'>
                                Email thông báo
                            </div>
                            <div className='admin-system__setting-desc'>
                                Gửi email khi có sự kiện quan trọng
                            </div>
                        </div>
                        <label className='admin-system__switch'>
                            <input
                                type='checkbox'
                                checked={settings.emailNotification}
                                onChange={() =>
                                    handleToggleSetting('emailNotification')
                                }
                            />
                            <span className='admin-system__switch-slider'></span>
                        </label>
                    </div>

                    <div className='admin-system__setting-item'>
                        <div className='admin-system__setting-info'>
                            <div className='admin-system__setting-label'>
                                Cảnh báo lỗi
                            </div>
                            <div className='admin-system__setting-desc'>
                                Thông báo khi hệ thống gặp lỗi
                            </div>
                        </div>
                        <label className='admin-system__switch'>
                            <input
                                type='checkbox'
                                checked={settings.warningNotification}
                                onChange={() =>
                                    handleToggleSetting('warningNotification')
                                }
                            />
                            <span className='admin-system__switch-slider'></span>
                        </label>
                    </div>

                    <div className='admin-system__setting-item'>
                        <div className='admin-system__setting-info'>
                            <div className='admin-system__setting-label'>
                                Báo cáo hàng ngày
                            </div>
                            <div className='admin-system__setting-desc'>
                                Gửi báo cáo tổng hợp mỗi ngày
                            </div>
                        </div>
                        <label className='admin-system__switch'>
                            <input
                                type='checkbox'
                                checked={settings.dailyReport}
                                onChange={() =>
                                    handleToggleSetting('dailyReport')
                                }
                            />
                            <span className='admin-system__switch-slider'></span>
                        </label>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3 className='admin-system__settings-title'>Cấu hình email</h3>
                <div className='admin-system__card'>
                    <div className='admin-system__form-group'>
                        <label className='admin-system__form-label'>
                            SMTP Server
                        </label>
                        <input
                            type='text'
                            className='admin-system__form-input'
                            placeholder='smtp.gmail.com'
                            defaultValue='smtp.gmail.com'
                        />
                    </div>
                    <div className='admin-system__form-group'>
                        <label className='admin-system__form-label'>Port</label>
                        <input
                            type='text'
                            className='admin-system__form-input'
                            placeholder='587'
                            defaultValue='587'
                        />
                    </div>
                    <div className='admin-system__form-group'>
                        <label className='admin-system__form-label'>
                            Email gửi
                        </label>
                        <input
                            type='email'
                            className='admin-system__form-input'
                            placeholder='noreply@system.com'
                            defaultValue='noreply@system.com'
                        />
                    </div>
                    <button className='admin-system__btn admin-system__btn--primary'>
                        Lưu cấu hình
                    </button>
                </div>
            </div>
        </div>
    );

    const renderBackup = () => (
        <div className='admin-system__backup-layout'>
            <div className='admin-system__backup-config'>
                <h3 className='admin-system__card-title'>Sao lưu dữ liệu</h3>

                <div className='admin-system__backup-info'>
                    <div className='admin-system__backup-label'>
                        Sao lưu gần nhất
                    </div>
                    <div className='admin-system__backup-value'>
                        16/01/2024 02:00:00
                    </div>
                    <div className='admin-system__backup-size'>
                        Kích thước: 2.4 GB
                    </div>
                </div>

                <div className='admin-system__form-group'>
                    <label className='admin-system__form-label'>
                        Tần suất sao lưu
                    </label>
                    <select
                        className='admin-system__form-select'
                        value={backupConfig.frequency}
                        onChange={(e) =>
                            setBackupConfig({
                                ...backupConfig,
                                frequency: e.target.value
                            })
                        }
                    >
                        <option value='daily'>Hàng ngày</option>
                        <option value='weekly'>Hàng tuần</option>
                        <option value='monthly'>Hàng tháng</option>
                    </select>
                </div>

                <div className='admin-system__form-group'>
                    <label className='admin-system__form-label'>
                        Thời gian sao lưu
                    </label>
                    <input
                        type='time'
                        className='admin-system__form-input'
                        value={backupConfig.time}
                        onChange={(e) =>
                            setBackupConfig({
                                ...backupConfig,
                                time: e.target.value
                            })
                        }
                    />
                </div>

                <button
                    className='admin-system__btn admin-system__btn--primary admin-system__btn--block'
                    onClick={handleBackupNow}
                >
                    💾 Sao lưu ngay
                </button>
            </div>

            <div className='admin-system__backup-history'>
                <h3 className='admin-system__card-title'>Lịch sử sao lưu</h3>
                <div className='admin-system__backup-list'>
                    {MOCK_BACKUPS.map((backup) => (
                        <div
                            key={backup.id}
                            className='admin-system__backup-item'
                        >
                            <div className='admin-system__backup-item-info'>
                                <div className='admin-system__backup-item-date'>
                                    {backup.date}
                                </div>
                                <div className='admin-system__backup-item-size'>
                                    Kích thước: {backup.size}
                                </div>
                            </div>
                            <div className='admin-system__backup-item-actions'>
                                <span
                                    className={`admin-system__backup-status admin-system__backup-status--${backup.status}`}
                                >
                                    {backup.status === 'success'
                                        ? 'Thành công'
                                        : 'Lỗi'}
                                </span>
                                <button
                                    className='admin-system__btn admin-system__btn--secondary admin-system__btn--sm'
                                    onClick={() => handleDownloadBackup(backup)}
                                >
                                    📥 Tải xuống
                                </button>
                                <button
                                    className='admin-system__btn admin-system__btn--secondary admin-system__btn--sm'
                                    onClick={() => handleRestoreBackup(backup)}
                                >
                                    ⚡ Khôi phục
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case TABS.OVERVIEW:
                return renderOverview();
            case TABS.USERS:
                return renderUsers();
            case TABS.ORGANIZATIONS:
                return renderOrganizations();
            case TABS.SYSTEM_LOG:
                return renderSystemLog();
            case TABS.SETTINGS:
                return renderSettings();
            case TABS.BACKUP:
                return renderBackup();
            default:
                return renderOverview();
        }
    };

    return (
        <div className='admin-system'>
            <header className='admin-system__header'>
                <div className='admin-system__header-content'>
                    <h1 className='admin-system__title'>
                        Dashboard Quản trị hệ thống
                    </h1>
                    <p className='admin-system__subtitle'>
                        Quản lý toàn bộ hệ thống và người dùng
                    </p>
                </div>
                <button className='admin-system__config-btn'>
                    ⚙️ Cấu hình
                </button>
            </header>

            {renderStatCards()}
            {renderTabs()}

            <div className='admin-system__content'>{renderContent()}</div>
        </div>
    );
};

export default AdminSystemDashboard;
