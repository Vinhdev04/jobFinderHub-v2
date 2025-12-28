// src/components/about/RoleCards.jsx
import styles from '../styles/RoleCards.module.css';

export default function RoleCards({ roles, theme = 'dark' }) {
  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      {roles.map((role, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.icon}>{role.icon}</div>
          <h3 className={styles.title}>{role.title}</h3>
          <p className={styles.description}>{role.description}</p>
          <a className={styles.link}>Truy cập &gt;</a>
        </div>
      ))}
    </div>
  );
}