// utils/dashboardHelpers.js

/**
 * Format date to Vietnamese format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
};

/**
 * Format date to DD/MM/YYYY
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDateDMY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Get status badge color
 * @param {string} status - Status value
 * @returns {string} Color class name
 */
export const getStatusColor = (status) => {
    const colorMap = {
        pending: 'warning',
        reviewing: 'info',
        accepted: 'success',
        rejected: 'error',
        scheduled: 'info'
    };
    return colorMap[status] || 'default';
};

/**
 * Get status text in Vietnamese
 * @param {string} status - Status value
 * @returns {string} Vietnamese text
 */
export const getStatusText = (status) => {
    const textMap = {
        pending: 'Đang xem xét',
        reviewing: 'Được mời phỏng vấn',
        accepted: 'Đã nhận',
        rejected: 'Từ chối',
        scheduled: 'Đã lên lịch'
    };
    return textMap[status] || status;
};

/**
 * Calculate days until a specific date
 * @param {string} dateString - ISO date string
 * @returns {number} Number of days
 */
export const getDaysUntil = (dateString) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

/**
 * Format time to 12h format
 * @param {string} timeString - Time in HH:mm format
 * @returns {string} Formatted time
 */
export const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
};

/**
 * Format time to Vietnamese 24h format
 * @param {string} timeString - Time in HH:mm format
 * @returns {string} Formatted time
 */
export const formatTime24h = (timeString) => {
    return `${timeString}`;
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
    if (!name) return 'U';
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Validate file type for avatar upload
 * @param {File} file - File object
 * @returns {boolean} Is valid
 */
export const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
};

/**
 * Validate file size (max 5MB)
 * @param {File} file - File object
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} Is valid
 */
export const isValidFileSize = (file, maxSizeMB = 5) => {
    const maxSize = maxSizeMB * 1024 * 1024;
    return file.size <= maxSize;
};

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Sort array by date
 * @param {Array} items - Array to sort
 * @param {string} key - Date field key
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortByDate = (items, key = 'date', order = 'desc') => {
    return [...items].sort((a, b) => {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
};

/**
 * Filter items by status
 * @param {Array} items - Array to filter
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered array
 */
export const filterByStatus = (items, status) => {
    if (!status || status === 'all') return items;
    return items.filter((item) => item.status === status);
};

/**
 * Search items by keyword in specified fields
 * @param {Array} items - Array to search
 * @param {string} keyword - Search keyword
 * @param {Array} searchFields - Fields to search in
 * @returns {Array} Filtered array
 */
export const searchItems = (
    items,
    keyword,
    searchFields = ['company', 'position']
) => {
    if (!keyword) return items;
    const lowerKeyword = keyword.toLowerCase();
    return items.filter((item) =>
        searchFields.some((field) =>
            item[field]?.toLowerCase().includes(lowerKeyword)
        )
    );
};

/**
 * Get relative time text (e.g., "2 giờ trước")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time text
 */
export const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay < 7) return `${diffDay} ngày trước`;
    return formatDateDMY(dateString);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} Is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number (Vietnamese format)
 * @param {string} phone - Phone number
 * @returns {boolean} Is valid
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Group items by field
 * @param {Array} items - Array to group
 * @param {string} key - Field to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (items, key) => {
    return items.reduce((acc, item) => {
        const group = item[key];
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(item);
        return acc;
    }, {});
};

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
