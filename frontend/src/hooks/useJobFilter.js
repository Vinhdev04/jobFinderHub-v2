// src/hooks/useJobFilter.js

import { useState, useMemo } from 'react';

/**
 * Custom hook để lọc danh sách công việc
 * @param {Array} jobs - Danh sách công việc
 * @returns {Object} - { filters, setFilters, filteredJobs }
 */
export const useJobFilter = (jobs) => {
    const [filters, setFilters] = useState({
        category: 'all',
        search: '',
        location: 'all',
        sortBy: 'newest'
    });

    const filteredJobs = useMemo(() => {
        let result = [...jobs];

        // Lọc theo category
        if (filters.category !== 'all') {
            result = result.filter((job) => job.category === filters.category);
        }

        // Lọc theo search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (job) =>
                    job.title.toLowerCase().includes(searchLower) ||
                    job.company.toLowerCase().includes(searchLower) ||
                    job.description.toLowerCase().includes(searchLower)
            );
        }

        // Lọc theo location
        if (filters.location !== 'all') {
            result = result.filter((job) => job.location === filters.location);
        }

        // Sắp xếp
        switch (filters.sortBy) {
            case 'newest':
                // Giả sử có field createdAt, nếu không có thì giữ nguyên thứ tự
                break;
            case 'salary-high':
                result.sort((a, b) => {
                    const salaryA = parseInt(a.salary.split('-')[1]);
                    const salaryB = parseInt(b.salary.split('-')[1]);
                    return salaryB - salaryA;
                });
                break;
            case 'applicants':
                result.sort((a, b) => b.applicants - a.applicants);
                break;
            default:
                break;
        }

        return result;
    }, [jobs, filters]);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            category: 'all',
            search: '',
            location: 'all',
            sortBy: 'newest'
        });
    };

    return {
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        filteredJobs,
        totalJobs: filteredJobs.length
    };
};

export default useJobFilter;
