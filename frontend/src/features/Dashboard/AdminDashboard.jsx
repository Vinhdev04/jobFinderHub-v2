import React from 'react';
import Sidebar from '@features/Admin/components/Sidebar/Sidebar';
import Header from '@features/Admin/components/Header/Header';
import StatsCard from '@features/Admin/components/StatsCard/StatsCard';
import InterviewSchedule from '@features/Admin/components/InterviewSchedule/InterviewSchedule';
import ApplicationsTable from '@features/Admin/components/ApplicationsTable/ApplicationsTable';
import { useAdminData } from '@features/Admin/hooks/useAdminData';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const {
    loading,
    activeTab,
    setActiveTab,
    stats,
    schedules,
    applications,
    users
  } = useAdminData();

  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@student.edu.vn',
    role: 'Sinh viên'
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="adminDashboard">
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userRole={user.role}
      />

      <main className="mainContent">
        <div className="contentContainer">
          <Header user={user} />
          
          <StatsCard stats={stats} />
          
          <InterviewSchedule schedules={schedules} />
          
          <ApplicationsTable applications={applications} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;