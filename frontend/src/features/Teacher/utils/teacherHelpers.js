// utils/adminHelpers.js

import { REPORT_STATUS, JOB_STATUS } from '../constants/constants.js';

/**
 * Format date to Vietnamese format
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
};

/**
 * Get status badge class
 */
export const getStatusClass = (status) => {
    const statusMap = {
        [REPORT_STATUS.PENDING]: 'pending',
        [REPORT_STATUS.APPROVED]: 'approved',
        [REPORT_STATUS.REJECTED]: 'rejected',
        [JOB_STATUS.PENDING]: 'pending',
        [JOB_STATUS.APPROVED]: 'approved',
        [JOB_STATUS.REJECTED]: 'rejected'
    };
    return statusMap[status] || 'pending';
};

/**
 * Get status label in Vietnamese
 */
export const getStatusLabel = (status) => {
    const labelMap = {
        pending: 'Chờ duyệt',
        approved: 'Đã duyệt',
        rejected: 'Từ chối'
    };
    return labelMap[status] || 'Không xác định';
};

/**
 * Calculate pending items count
 */
export const calculatePendingCount = (items, statusKey = 'status') => {
    return items.filter((item) => item[statusKey] === 'pending').length;
};

/**
 * Filter items by status
 */
export const filterByStatus = (items, status, statusKey = 'status') => {
    if (!status) return items;
    return items.filter((item) => item[statusKey] === status);
};

/**
 * Sort items by date
 */
export const sortByDate = (items, dateKey = 'date', order = 'desc') => {
    return [...items].sort((a, b) => {
        const dateA = new Date(a[dateKey]);
        const dateB = new Date(b[dateKey]);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
};

/**
 * Group items by key
 */
export const groupBy = (items, key) => {
    return items.reduce((groups, item) => {
        const groupKey = item[key];
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {});
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current, total) => {
    if (total === 0) return 0;
    return Math.round((current / total) * 100);
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Generate export filename
 */
export const generateExportFilename = (type, format = 'xlsx') => {
    const timestamp = new Date().toISOString().split('T')[0];
    return `${type}_${timestamp}.${format}`;
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

/**
 * Show success notification
 */
export const showSuccessNotification = (message) => {
    // Replace with your notification library
    console.log('✅ Success:', message);
    // Example: toast.success(message);
};

/**
 * Show error notification
 */
export const showErrorNotification = (message) => {
    // Replace with your notification library
    console.error('❌ Error:', message);
    // Example: toast.error(message);
};
