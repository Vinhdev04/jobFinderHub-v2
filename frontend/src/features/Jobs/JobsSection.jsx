// src/features/Jobs/JobsSection.jsx

import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import JobFilter from './JobFilter';
import jobService from '@services/jobService';
import CATEGORIES from '@data/categoriesData';
import './JobsSection.css';

const JobsSection = ({ searchQuery = '', selectedCategory = 'all' }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        search: searchQuery,
        nganhNghe: selectedCategory !== 'all' ? selectedCategory : '',
        sortBy: 'newest'
    });
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        pages: 1
    });

    // Fetch jobs from API
   useEffect(() => {
    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: filters.page,
                limit: filters.limit,
                // Bỏ filter trạng thái để lấy tất cả jobs
                // trangThai: 'da_duyet'  // Comment hoặc xóa dòng này để dev và show tất cả
            };

            if (filters.search) {
                params.search = filters.search;
            }

            if (filters.nganhNghe) {
                params.nganhNghe = filters.nganhNghe;
            }

            console.log('🔍 Fetching jobs with params:', params); // Debug log

            const response = await jobService.getAllJobs(params);
            
            console.log('📦 Response:', response); // Debug log

            if (response.success) {
                setJobs(response.data);
                setPagination(response.pagination);
            } else {
                setError('Không thể tải danh sách công việc');
            }
        } catch (err) {
            console.error('❌ Error fetching jobs:', err);
            setError('Không thể tải danh sách công việc. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    fetchJobs();
}, [filters.page, filters.limit, filters.search, filters.nganhNghe]);

    // Sync with parent search query
    useEffect(() => {
        if (searchQuery !== filters.search) {
            setFilters(prev => ({ ...prev, search: searchQuery, page: 1 }));
        }
    }, [searchQuery]);

    // Sync with parent category
    useEffect(() => {
        const nganhNghe = selectedCategory !== 'all' ? selectedCategory : '';
        if (nganhNghe !== filters.nganhNghe) {
            setFilters(prev => ({ ...prev, nganhNghe, page: 1 }));
        }
    }, [selectedCategory]);

    // Toggle favorite
    const toggleFavorite = (jobId) => {
        setFavorites(prev => {
            if (prev.includes(jobId)) {
                return prev.filter(id => id !== jobId);
            } else {
                return [...prev, jobId];
            }
        });
    };

    // Update filter
    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    };

    // Sort jobs
    const getSortedJobs = () => {
        const sorted = [...jobs];
        switch (filters.sortBy) {
            case 'salary-high':
                return sorted.sort((a, b) => 
                    (b.mucLuong?.max || 0) - (a.mucLuong?.max || 0)
                );
            case 'applicants':
                return sorted.sort((a, b) => 
                    (b.soLuongUngTuyen || 0) - (a.soLuongUngTuyen || 0)
                );
            case 'newest':
            default:
                return sorted.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
        }
    };

    const sortedJobs = getSortedJobs();

    if (loading) {
        return (
            <section className='jobs-section'>
                <div className='jobs-container'>
                    <div className='jobs-loading'>
                        <p>Đang tải công việc...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className='jobs-section'>
                <div className='jobs-container'>
                    <div className='jobs-error'>
                        <p>{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='jobs-section'>
            <div className='jobs-container'>
                <div className='jobs-layout'>
                    <JobFilter
                        selectedCategory={filters.nganhNghe || 'all'}
                        setSelectedCategory={(cat) =>
                            updateFilter('nganhNghe', cat === 'all' ? '' : cat)
                        }
                        totalJobs={pagination.total}
                        filteredCount={sortedJobs.length}
                    />

                    <div className='jobs-main'>
                        <div className='jobs-header'>
                            <h2 className='jobs-title'>
                                {sortedJobs.length} công việc phù hợp
                            </h2>
                            <select
                                value={filters.sortBy}
                                onChange={(e) =>
                                    updateFilter('sortBy', e.target.value)
                                }
                                className='jobs-sort'
                            >
                                <option value='newest'>Mới nhất</option>
                                <option value='salary-high'>
                                    Lương cao nhất
                                </option>
                                <option value='applicants'>
                                    Nhiều ứng viên
                                </option>
                            </select>
                        </div>

                        <div className='jobs-grid'>
                            {sortedJobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    isFavorite={favorites.includes(job._id)}
                                    toggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>

                        {sortedJobs.length === 0 && (
                            <div className='jobs-empty'>
                                <p>Không tìm thấy công việc phù hợp</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className='jobs-pagination'>
                                <button
                                    onClick={() => setFilters(prev => ({ 
                                        ...prev, 
                                        page: Math.max(1, prev.page - 1) 
                                    }))}
                                    disabled={pagination.page === 1}
                                    className='pagination-btn'
                                >
                                    Trước
                                </button>
                                <span className='pagination-info'>
                                    Trang {pagination.page} / {pagination.pages}
                                </span>
                                <button
                                    onClick={() => setFilters(prev => ({ 
                                        ...prev, 
                                        page: Math.min(pagination.pages, prev.page + 1) 
                                    }))}
                                    disabled={pagination.page === pagination.pages}
                                    className='pagination-btn'
                                >
                                    Sau
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobsSection;