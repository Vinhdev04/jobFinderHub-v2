// src/pages/AboutPage.jsx
import HeroSection from '@features/About/components/HeroSection';
import FeatureCards from '@features/About/components/FeatureCards';
import RoleCards from '@features/About/components/RoleCards';

const darkRoles = [
  {
    icon: '🛡️',
    title: 'System Admin',
    description: 'Quản lý hệ thống, tạo tài khoản, xem logs.',
  },
  {
    icon: '🎓',
    title: 'Academic Staff',
    description: 'Quản lý nghành học viên thực tập, phê duyệt tin tuyển dụng.',
  },
  {
    icon: '🏢',
    title: 'Company Manager',
    description: 'Quản lý nghành viên doanh nghiệp, duyệt đơn, quản lý nhân viên.',
  },
];

const lightRoles = [
  {
    icon: '🎓',
    title: 'Sinh viên',
    description: 'Tìm kiếm cơ hội thực tập, nộp hồ sơ và theo dõi tiến trình ứng tuyển.',
  },
  {
    icon: '👥',
    title: 'Nhân viên tuyển dụng',
    description: 'Đăng tin tuyển dụng, sàng lọc hồ sơ và quản lý quy trình phỏng vấn.',
  },
  {
    icon: '🏢',
    title: 'Quản lý doanh nghiệp',
    description: 'Quản lý đội ngũ, duyệt đơn và xem báo cáo hiệu quả.',
  },
  {
    icon: '🧑‍🏫',
    title: 'Giáo viên',
    description: 'Phê duyệt tin tuyển dụng, quản lý sinh viên thực tập và doanh nghiệp.',
  },
  {
    icon: '🔒',
    title: 'Quản trị hệ thống',
    description: 'Quản lý người dùng, cấu hình hệ thống và giám sát hoạt động.',
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <RoleCards roles={darkRoles} theme="dark" />
      <section className="light-section"> {/* Thêm class nếu cần style riêng */}
        <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl) 0' }}>
          <h1 style={{ fontSize: 'var(--font-size-4xl)' }}>5 vai trò người dùng</h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-gray-600)', maxWidth: '800px', margin: '0 auto var(--spacing-2xl)' }}>
            Hệ thống phân quyền chặt chẽ theo nguyên tắc RBAC, tách biệt quyền quản trị hệ thống và quyền quản lý nghiệp vụ.
          </p>
        </div>
        <RoleCards roles={lightRoles} theme="light" />
      </section>
    </>
  );
}