// hooks/useReportManagement.js

import { useState, useEffect, useCallback } from 'react';
import teacherService from '../services/teacherService.js';
import {
    showSuccessNotification,
    showErrorNotification,
    calculatePendingCount
} from '../utils/teacherHelpers.js';

export const useReportManagement = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchReports = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await teacherService.getReports();
            setReports(data);
        } catch (err) {
            setError(err.message);
            showErrorNotification('Không thể tải danh sách báo cáo');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleViewReport = useCallback((reportId) => {
        console.log('View report:', reportId);
        // Navigate to report detail page
        // Example: navigate(`/admin/reports/${reportId}`);
    }, []);

    const handleApproveReport = useCallback(async (reportId) => {
        setActionLoading(reportId);
        try {
            const result = await teacherService.approveReport(reportId);
            if (result.success) {
                showSuccessNotification(result.message);
                // Update local state
                setReports((prev) =>
                    prev.map((report) =>
                        report.id === reportId
                            ? { ...report, status: 'approved' }
                            : report
                    )
                );
            }
        } catch (err) {
            showErrorNotification('Không thể phê duyệt báo cáo');
        } finally {
            setActionLoading(null);
        }
    }, []);

    const handleRejectReport = useCallback(async (reportId, reason) => {
        setActionLoading(reportId);
        try {
            const result = await teacherService.rejectReport(reportId, reason);
            if (result.success) {
                showSuccessNotification(result.message);
                setReports((prev) =>
                    prev.map((report) =>
                        report.id === reportId
                            ? { ...report, status: 'rejected' }
                            : report
                    )
                );
            }
        } catch (err) {
            showErrorNotification('Không thể từ chối báo cáo');
        } finally {
            setActionLoading(null);
        }
    }, []);

    const pendingCount = calculatePendingCount(reports);

    return {
        reports,
        loading,
        error,
        actionLoading,
        pendingCount,
        handleViewReport,
        handleApproveReport,
        handleRejectReport,
        refreshReports: fetchReports
    };
};
