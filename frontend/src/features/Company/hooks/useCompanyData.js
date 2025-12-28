import { useState, useEffect } from 'react';

export const useCompanyData = () => {
  const [loading, setLoading] = useState(false);
  const [recruiters, setRecruiters] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@company.com',
      status: 'active',
      statusText: 'Hoạt động',
      jobsPosted: 12,
      candidates: 45,
      hired: 8
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@company.com',
      status: 'active',
      statusText: 'Hoạt động',
      jobsPosted: 8,
      candidates: 32,
      hired: 5
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@company.com',
      status: 'inactive',
      statusText: 'Không hoạt động',
      jobsPosted: 5,
      candidates: 18,
      hired: 2
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'FPT Software',
      position: 'Frontend Developer',
      date: '10/01/2024',
      status: 'Chấp nhận',
      statusClass: 'accepted',
      candidates: 24
    },
    {
      id: 2,
      company: 'Viettel Digital',
      position: 'Backend Developer',
      date: '16/01/2024',
      status: 'Chờ duyệt',
      statusClass: 'pending',
      candidates: 15
    },
    {
      id: 3,
      company: 'VNG Corporation',
      position: 'Mobile Developer',
      date: '20/01/2024',
      status: 'Đang xem xét',
      statusClass: 'reviewing',
      candidates: 20
    },
    {
      id: 4,
      company: 'Tiki Corporation',
      position: 'Data Analyst',
      date: '10/01/2024',
      status: 'Từ chối',
      statusClass: 'rejected',
      candidates: 10
    }
  ]);

  const stats = {
    totalRecruiters: 8,
    activeRecruiters: 24,
    totalApplications: 12,
    hiredCandidates: 5
  };

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  };

  const addRecruiter = (data) => {
    const newRecruiter = {
      id: recruiters.length + 1,
      ...data,
      status: 'active',
      statusText: 'Hoạt động',
      jobsPosted: 0,
      candidates: 0,
      hired: 0
    };
    setRecruiters([newRecruiter, ...recruiters]);
  };

  const updateRecruiter = (id, updates) => {
    setRecruiters(recruiters.map(r => 
      r.id === id ? { ...r, ...updates } : r
    ));
  };

  const deleteRecruiter = (id) => {
    setRecruiters(recruiters.filter(r => r.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    recruiters,
    applications,
    stats,
    addRecruiter,
    updateRecruiter,
    deleteRecruiter
  };
};
