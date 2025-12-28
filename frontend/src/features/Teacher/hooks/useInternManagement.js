// hooks/useInternManagement.js

import { useState, useEffect, useCallback } from 'react';
import teacherService from '../services/teacherService.js';
import { showErrorNotification } from '../utils/teacherHelpers.js';

export const useInternManagement = () => {
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: null,
        company: null,
        search: ''
    });

    const fetchInterns = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await teacherService.getInterns(filters);
            setInterns(data);
        } catch (err) {
            setError(err.message);
            showErrorNotification('Không thể tải danh sách sinh viên');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchInterns();
    }, [fetchInterns]);

    const updateFilters = useCallback((newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    const refreshInterns = useCallback(() => {
        fetchInterns();
    }, [fetchInterns]);

    return {
        interns,
        loading,
        error,
        filters,
        updateFilters,
        refreshInterns
    };
};
