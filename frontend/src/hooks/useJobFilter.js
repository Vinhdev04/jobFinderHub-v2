// src/hooks/useJobFilter.js

import { useState, useMemo } from 'react';

export const useJobFilter = (jobsData) => {
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        sortBy: 'newest'
    });

    const [favorites, setFavorites] = useState([]);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const toggleFavorite = (jobId) => {
        setFavorites((prev) =>
            prev.includes(jobId)
                ? prev.filter((id) => id !== jobId)
                : [...prev, jobId]
        );
    };

    const filteredJobs = useMemo(() => {
        let result = [...jobsData];

        // Filter by category
        if (filters.category !== 'all') {
            result = result.filter((job) => job.category === filters.category);
        }

        // Filter by search
        if (filters.search.trim()) {
            const query = filters.search.toLowerCase();
            result = result.filter(
                (job) =>
                    job.title.toLowerCase().includes(query) ||
                    job.company.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query)
            );
        }

        // Sort
        if (filters.sortBy === 'salary-high') {
            result.sort((a, b) => {
                const salaryA = parseInt(a.salary.split('-')[1]);
                const salaryB = parseInt(b.salary.split('-')[1]);
                return salaryB - salaryA;
            });
        } else if (filters.sortBy === 'applicants') {
            result.sort((a, b) => b.applicants - a.applicants);
        }
        // Default: newest (no sorting needed as data is already in order)

        return result;
    }, [jobsData, filters]);

    return {
        filters,
        updateFilter,
        filteredJobs,
        totalJobs: jobsData.length,
        favorites,
        toggleFavorite
    };
};
