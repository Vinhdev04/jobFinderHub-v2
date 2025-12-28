import { useState, useEffect } from 'react';

export const useRecruiterData = () => {
  const [loading, setLoading] = useState(false);
  
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Thực tập sinh Frontend Developer',
      applicants: 24,
      views: 234,
      status: 'active',
      statusText: 'Đang mở đơn'
    },
    {
      id: 2,
      title: 'Thực tập sinh Backend Developer',
      applicants: 15,
      views: 136,
      status: 'pending',
      statusText: 'Chờ duyệt'
    },
    {
      id: 3,
      title: 'Thực tập sinh Mobile Developer',
      applicants: 12,
      views: 461,
      status: 'active',
      statusText: 'Đang mở đơn'
    }
  ]);

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      position: 'Frontend Developer',
      location: 'Đại học Bách khoa HN',
      rating: '5.0',
      appliedDate: '12/12/2024',
      avatar: null,
      status: 'new',
      statusText: 'Mới',
      skills: ['React', 'TypeScript', 'Tailwind']
    },
    {
      id: 2,
      name: 'Trần Thị B',
      position: 'Backend Developer',
      location: 'Đại học Công nghệ',
      rating: '4.8',
      appliedDate: '11/12/2024',
      avatar: null,
      status: 'interviewing',
      statusText: 'Đang phỏng vấn',
      skills: ['Node.js', 'MongoDB', 'Docker']
    },
    {
      id: 3,
      name: 'Lê Văn C',
      position: 'Mobile Developer',
      location: 'ĐH Kinh tế Quốc dân',
      rating: '4.7',
      appliedDate: '10/12/2024',
      avatar: null,
      status: 'new',
      statusText: 'Mới',
      skills: ['React Native', 'Flutter', 'Firebase']
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      position: 'UI/UX Designer',
      location: 'ĐH Kinh tế Quốc dân',
      rating: '5.0',
      appliedDate: '08/01/2024',
      avatar: null,
      status: 'hired',
      statusText: 'Đã tuyển',
      skills: ['Figma', 'Adobe XD', 'Sketch']
    }
  ]);

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: 'Nguyễn Văn A',
      position: 'Frontend Developer',
      day: '15',
      month: 'Thg 1',
      time: '14:00 - 15:30',
      location: 'Phòng họp A - Tầng 5',
      interviewer: 'Trần Văn B'
    },
    {
      id: 2,
      candidateName: 'Lê Thị C',
      position: 'Backend Developer',
      day: '16',
      month: 'Thg 1',
      time: '09:00 - 10:30',
      location: 'Zoom Meeting',
      interviewer: 'Phạm Thị D'
    }
  ]);

  const stats = {
    totalJobs: 8,
    activeJobs: 24,
    pendingApplications: 12,
    interviews: 5
  };

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const cancelInterview = (id) => {
    setInterviews(interviews.filter(interview => interview.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    jobs,
    candidates,
    interviews,
    stats,
    deleteJob,
    cancelInterview
  };
};