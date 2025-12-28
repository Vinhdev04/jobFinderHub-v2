// hooks/useAdminDashboard.js

import { useState, useEffect, useCallback } from 'react';
import { useTabManagement } from './useTabManagement.js';
import { useInternManagement } from './useInternManagement.js';
import { useReportManagement } from './useReportManagement.js';
import { useCompanyManagement } from './useCompanyManagement.js';
import teacherService from '../services/teacherService.js';
import {
    showSuccessNotification,
    showErrorNotification,
    calculatePendingCount
} from '../utils/teacherHelpers.js';

const useTeacherDashboard = () => {
    // Tab management
    const tabManagement = useTabManagement();

    // Stats
    const [stats, setStats] = useState({
        total_students: 0,
        active_interns: 0,
        pending_reports: 0,
        partner_companies: 0
    });
    const [statsLoading, setStatsLoading] = useState(false);

    // Pending jobs
    const [pendingJobs, setPendingJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(false);
    const [jobActionLoading, setJobActionLoading] = useState(null);

    // Other management hooks
    const internManagement = useInternManagement();
    const reportManagement = useReportManagement();
    const companyManagement = useCompanyManagement();

    // Fetch stats
    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const data = await teacherService.getStats();
            setStats(data);
        } catch (err) {
            showErrorNotification('Không thể tải thống kê');
        } finally {
            setStatsLoading(false);
        }
    }, []);

    // Fetch pending jobs
    const fetchPendingJobs = useCallback(async () => {
        setJobsLoading(true);
        try {
            const data = await teacherService.getPendingJobs();
            setPendingJobs(data);
        } catch (err) {
            showErrorNotification('Không thể tải danh sách tin tuyển dụng');
        } finally {
            setJobsLoading(false);
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        fetchStats();
        fetchPendingJobs();
    }, [fetchStats, fetchPendingJobs]);

    // Handle approve job
    const handleApproveJob = useCallback(async (jobId) => {
        setJobActionLoading(jobId);
        try {
            const result = await teacherService.approveJob(jobId);
            if (result.success) {
                showSuccessNotification(result.message);
                setPendingJobs((prev) =>
                    prev.map((job) =>
                        job.id === jobId ? { ...job, status: 'approved' } : job
                    )
                );
            }
        } catch (err) {
            showErrorNotification('Không thể phê duyệt tin tuyển dụng');
        } finally {
            setJobActionLoading(null);
        }
    }, []);

    // Handle reject job
    const handleRejectJob = useCallback(async (jobId, reason) => {
        setJobActionLoading(jobId);
        try {
            const result = await teacherService.rejectJob(jobId, reason);
            if (result.success) {
                showSuccessNotification(result.message);
                setPendingJobs((prev) =>
                    prev.map((job) =>
                        job.id === jobId ? { ...job, status: 'rejected' } : job
                    )
                );
            }
        } catch (err) {
            showErrorNotification('Không thể từ chối tin tuyển dụng');
        } finally {
            setJobActionLoading(null);
        }
    }, []);

    // Handle export report
    const handleExportReport = useCallback(async () => {
        try {
            const result = await teacherService.exportReport('dashboard', {});
            if (result.success) {
                showSuccessNotification('Báo cáo đang được xuất...');
                // Download file logic here
                window.open(result.fileUrl, '_blank');
            }
        } catch (err) {
            showErrorNotification('Không thể xuất báo cáo');
        }
    }, []);

    // Handle quick actions
    const handleQuickAction = useCallback(
        (actionId) => {
            const actions = {
                export: handleExportReport,
                'add-student': () => console.log('Add student'),
                'manage-company': () => console.log('Manage company')
            };

            const action = actions[actionId];
            if (action) {
                action();
            }
        },
        [handleExportReport]
    );

    // Calculate badge counts
    const badgeCounts = {
        pending_reports: reportManagement.pendingCount,
        pending_jobs: calculatePendingCount(pendingJobs)
    };

    return {
        // Tab management
        ...tabManagement,

        // Stats
        stats,
        statsLoading,

        // Interns
        ...internManagement,

        // Reports
        ...reportManagement,

        // Companies
        ...companyManagement,

        // Jobs
        pendingJobs,
        jobsLoading,
        jobActionLoading,
        handleApproveJob,
        handleRejectJob,

        // Actions
        handleExportReport,
        handleQuickAction,

        // Badge counts
        badgeCounts,

        // Refresh all
        refreshAll: () => {
            fetchStats();
            fetchPendingJobs();
            internManagement.refreshInterns();
            reportManagement.refreshReports();
            companyManagement.refreshCompanies();
        }
    };
};
export default useTeacherDashboard;
