// hooks/useCompanyManagement.js

import { useState, useEffect, useCallback } from 'react';
import teacherService from '../services/teacherService.js';
import { showErrorNotification } from '../utils/teacherHelpers.js';

export const useCompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCompanies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await teacherService.getCompanies();
            setCompanies(data);
        } catch (err) {
            setError(err.message);
            showErrorNotification('Không thể tải danh sách doanh nghiệp');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleViewCompany = useCallback((companyId) => {
        console.log('View company:', companyId);
        // Navigate to company detail
    }, []);

    return {
        companies,
        loading,
        error,
        handleViewCompany,
        refreshCompanies: fetchCompanies
    };
};
