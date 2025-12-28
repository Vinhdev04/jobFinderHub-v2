// src/components/about/FeatureCards.jsx
import styles from '../styles/FeatureCards.module.css';

const features = [
  {
    icon: '⚪',
    title: 'Nguyên tắc Least Privilege',
    description: 'Mỗi vai trò chỉ có quyền tối thiểu cần thiết để thực hiện nhiệm vụ.',
  },
  {
    icon: '⚪',
    title: 'Tách biệt quyền hạn',
    description: 'Admin không can thiệp nghiệp vụ, Manager không truy cập hệ thống.',
  },
  {
    icon: '⚪',
    title: 'Minh bạch & Khả năng truy vết',
    description: 'Quy trình phê duyệt, ghi log hoạt động đầy đủ cho mọi hành động.',
  },
];

export default function FeatureCards() {
  return (
    <div className={styles.container}>
      {features.map((feature, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.icon}>{feature.icon}</div>
          <h3 className={styles.title}>{feature.title}</h3>
          <p className={styles.description}>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}