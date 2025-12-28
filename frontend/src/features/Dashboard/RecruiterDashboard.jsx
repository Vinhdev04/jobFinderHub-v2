import React, { useState } from 'react';

import CandidateList from '@features/Recruiter/components/CandidateList';
import InterviewSchedule from '@features/Recruiter/components/InterviewSchedule'; // Sửa typo "RecruiteR" → "Recruiter"
import JobPostingCard from '@features/Recruiter/components/JobPostingCard'; // Thêm import cho JobPostingCard (nếu chưa có)
import StatCard from '@features/Student/components/StatCard'; // Thêm import cho StatCard (bạn cần tạo component này nếu chưa có)
import { useRecruiterData } from '@features/Recruiter/hooks/useRecruiterData';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    loading,
    jobs,
    candidates,
    interviews,
    stats,
    deleteJob,
    rescheduleInterview,
    cancelInterview
  } = useRecruiterData();

  const user = {
    name: "Nguyễn Thị Lan",
    email: "lan@recruiter.com"
  };

  const sidebarItems = [
    { id: 'overview', label: 'Tổng quan', icon: '📊' },
    { id: 'jobs', label: 'Tin tuyển dụng', icon: '💼' },
    { id: 'candidates', label: 'Ứng viên', icon: '👥' },
    { id: 'interviews', label: 'Lịch phỏng vấn', icon: '📅' },
    { id: 'cv', label: 'CV của tôi', icon: '📄' },
    { id: 'messages', label: 'Tin nhắn', icon: '💬' },
    { id: 'reports', label: 'Báo cáo', icon: '📈' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' }
  ];

  const statsData = [
    { 
      icon: '📝', 
      value: stats.totalJobs || 0, 
      label: 'Tin tuyển dụng', 
      color: 'blue' 
    },
    { 
      icon: '👥', 
      value: stats.activeJobs || 0, 
      label: 'Ứng viên mới', 
      color: 'teal' 
    },
    { 
      icon: '📋', 
      value: stats.pendingApplications || 0, 
      label: 'Chờ phỏng vấn', 
      color: 'orange' 
    },
    { 
      icon: '✅', 
      value: stats.interviews || 0, 
      label: 'Đã tuyển', 
      color: 'green' 
    }
  ];

  const handleCreateJob = () => {
    console.log('Create new job posting');
  };

  const handleEditJob = (job) => {
    console.log('Edit job:', job);
  };

  const handleDeleteJob = (job) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${job.title}"?`)) {
      deleteJob(job.id);
    }
  };

  const handleViewApplications = (job) => {
    console.log('View applications for:', job);
  };

  const handleViewProfile = (candidate) => {
    console.log('View profile:', candidate);
  };

  const handleScheduleInterview = (candidate) => {
    console.log('Schedule interview for:', candidate);
  };

  const handleRescheduleInterview = (interview) => {
    console.log('Reschedule interview:', interview);
  };

  const handleCancelInterview = (interview) => {
    if (window.confirm(`Bạn có chắc muốn hủy lịch phỏng vấn với ${interview.candidateName}?`)) {
      cancelInterview(interview.id);
    }
  };

  return (
    <div className="dashboard">
      {/* Bạn có thể thêm Sidebar ở đây nếu cần */}
      
      <main className="mainContent">
        {/* Stats Grid */}
        <div className="statsGrid">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Job Posting Banner */}
        <div className="banner">
          <div className="bannerContent">
            <div className="bannerText">
              <h2>Tạo tin tuyển dụng mới</h2>
              <p>Đăng tin tuyển dụng để tìm ứng viên tốt nhất cho doanh nghiệp</p>
            </div>
            <button className="bannerBtn" onClick={handleCreateJob}>
              + Tạo tin mới
            </button>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="contentSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Tin tuyển dụng của tôi</h2>
            <button className="viewAllBtn">
              Xem tất cả →
            </button>
          </div>

          <div className="jobGrid">
            {jobs.map((job) => (
              <JobPostingCard
                key={job.id}
                job={job}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onViewApplications={handleViewApplications}
              />
            ))}
          </div>
        </div>

        {/* Candidates Section */}
        <div className="contentSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Ứng viên mới nhất</h2>
            <div className="sectionActions">
              <button className="filterBtn">
                ⚙️ Lọc
              </button>
              <button className="sortBtn">
                📊 Sắp xếp
              </button>
            </div>
          </div>

          <CandidateList
            candidates={candidates}
            onViewProfile={handleViewProfile}
            onScheduleInterview={handleScheduleInterview}
          />
        </div>

        {/* Interview Schedule Section */}
        <div className="contentSection">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Lịch phỏng vấn sắp tới</h2>
            <button className="viewAllBtn">
              Xem tất cả →
            </button>
          </div>

          <InterviewSchedule
            interviews={interviews}
            onReschedule={handleRescheduleInterview}
            onCancel={handleCancelInterview}
          />
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;