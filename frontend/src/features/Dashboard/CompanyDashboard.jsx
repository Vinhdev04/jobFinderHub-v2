import React, { useState } from 'react';
import CompanyBanner from '@features/Company/components/CompanyBanner';
import RecruiterCard from '@features/Company/components/RecruiterCard';
import ApplicationTable from '@features/Company/components/ApplicationTable';
import { useCompanyData } from '@features/Company/hooks/useCompanyData';
import './CompanyDashboard.css';
import StatCard from '@features/Student/components/StatCard';
const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { loading, recruiters, applications, stats, deleteRecruiter } = useCompanyData();

  const user = {
    name: "Admin Company",
    email: "admin@company.com"
  };

  const statsData = [
    { 
      icon: '👥', 
      value: stats.totalRecruiters, 
      label: 'Nhà tuyển dụng', 
      color: 'blue' 
    },
    { 
      icon: '💼', 
      value: stats.activeRecruiters, 
      label: 'Tin tuyển dụng', 
      color: 'teal' 
    },
    { 
      icon: '📋', 
      value: stats.totalApplications, 
      label: 'Ứng viên mới', 
      color: 'orange' 
    },
    { 
      icon: '✅', 
      value: stats.hiredCandidates, 
      label: 'Đã tuyển', 
      color: 'green' 
    }
  ];

  const handleCreateJob = () => {
    console.log('Create new job posting');
  };

  const handleEditRecruiter = (recruiter) => {
    console.log('Edit recruiter:', recruiter);
  };

  const handleDeleteRecruiter = (recruiter) => {
    if (window.confirm(`Bạn có chắc muốn xóa ${recruiter.name}?`)) {
      deleteRecruiter(recruiter.id);
    }
  };

  const handleViewApplication = (app) => {
    console.log('View application:', app);
  };

  return (
    <div className="dashboard">
      
      <main className="mainContent">
        <CompanyBanner onCreateClick={handleCreateJob} />

         <div className='dashboard__stats'>
                        <StatCard
                            icon='📄'
                            count={stats.applied}
                            label='Đã ứng tuyển'
                            color='primary'
                        />
                        <StatCard
                            icon='⏰'
                            count={stats.pending}
                            label='Đang chờ'
                            color='warning'
                        />
                        <StatCard
                            icon='📅'
                            count={stats.invited}
                            label='Được mời PV'
                            color='info'
                        />
                        <StatCard
                            icon='✅'
                            count={stats.accepted}
                            label='Đã nhận'
                            color='success'
                        />
                    </div>
        
                    {/* Tabs */}
                    <div className='dashboard__tabs'>
                        <button
                            className={`dashboard__tab ${
                                activeTab === 'overview' ? 'dashboard__tab--active' : ''
                            }`}
                            onClick={() => setActiveTab('overview')}
                        >
                            📊 Tổng quan
                        </button>
                        <button
                            className={`dashboard__tab ${
                                activeTab === 'applications'
                                    ? 'dashboard__tab--active'
                                    : ''
                            }`}
                            onClick={() => setActiveTab('applications')}
                        >
                            📝 Đơn ứng tuyển
                        </button>
                        <button
                            className={`dashboard__tab ${
                                activeTab === 'interviews'
                                    ? 'dashboard__tab--active'
                                    : ''
                            }`}
                            onClick={() => setActiveTab('interviews')}
                        >
                            📅 Lịch phỏng vấn
                        </button>
                        <button
                            className={`dashboard__tab ${
                                activeTab === 'profile' ? 'dashboard__tab--active' : ''
                            }`}
                            onClick={() => setActiveTab('profile')}
                        >
                            👤 Hồ sơ cá nhân
                        </button>
                    </div>
        

        <div className="contentSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Nhà tuyển dụng</h2>
            <button className="viewAllBtn">
              Xem tất cả →
            </button>
          </div>

          <div className="recruiterGrid">
            {recruiters.map((recruiter) => (
              <RecruiterCard
                key={recruiter.id}
                recruiter={recruiter}
                onEdit={handleEditRecruiter}
                onDelete={handleDeleteRecruiter}
              />
            ))}
          </div>
        </div>

        <div className="contentSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Hồ sơ đã nộp gần đây</h2>
            <button className="viewAllBtn">
              Xem tất cả →
            </button>
          </div>

          <ApplicationTable
            applications={applications}
            onView={handleViewApplication}
            onAction={(app) => console.log('Action:', app)}
          />
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;