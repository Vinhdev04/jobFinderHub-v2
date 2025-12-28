import { useState, useEffect } from 'react';

export const useAdminData = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { icon: '📝', value: '12', label: 'Hồ sơ đã nộp', color: 'blue' },
    { icon: '🔶', value: '5', label: 'Đang chờ duyệt', color: 'orange' },
    { icon: '✅', value: '3', label: 'Được chấp nhận', color: 'teal' },
    { icon: '📋', value: '2', label: 'Lịch phỏng vấn', color: 'purple' }
  ];

  const schedules = [
    {
      id: 1,
      company: 'FPT Software',
      logo: '🏢',
      position: 'Frontend Developer',
      date: '25/01/2024',
      time: '14:00',
      location: 'Online'
    },
    {
      id: 2,
      company: 'VNG Corporation',
      logo: '🎮',
      position: 'Mobile Developer',
      date: '28/01/2024',
      time: '15:00',
      location: 'TP.HCM'
    }
  ];

  const applications = [
    {
      id: 1,
      company: 'FPT Software',
      icon: '🏢',
      position: 'Thực tập sinh Frontend Developer',
      date: '10/01/2024',
      status: 'Chấp nhận',
      statusClass: 'accepted',
      action: ''
    },
    {
      id: 2,
      company: 'Viettel Digital',
      icon: '📱',
      position: 'Thực tập sinh Backend Developer',
      date: '16/01/2024',
      status: 'Chờ duyệt',
      statusClass: 'pending',
      action: ''
    },
    {
      id: 3,
      company: 'VNG Corporation',
      icon: '🎮',
      position: 'Thực tập sinh Mobile Developer',
      date: '20/01/2024',
      status: 'Đang xem xét',
      statusClass: 'reviewing',
      action: ''
    },
    {
      id: 4,
      company: 'Tiki Corporation',
      icon: '🛒',
      position: 'Thực tập sinh Data Analyst',
      date: '10/01/2024',
      status: 'Từ chối',
      statusClass: 'rejected',
      action: ''
    }
  ];

  const users = {
    students: 1247,
    recruiters: 89,
    companies: 156,
    teachers: 45,
    admins: 12
  };

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    activeTab,
    setActiveTab,
    stats,
    schedules,
    applications,
    users
  };
};