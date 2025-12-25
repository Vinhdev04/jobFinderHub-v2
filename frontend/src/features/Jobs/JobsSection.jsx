// src/features/Jobs/JobsSection.jsx

import React, { useEffect } from 'react';
import JobCard from './JobCard';
import JobFilter from './JobFilter';
import { useJobFilter } from '@hooks/useJobFilter';
import JOBS_DATA from '@data/jobsData';
import './JobsSection.css';

const JobsSection = ({ searchQuery = '', selectedCategory = 'all' }) => {
    const {
        filters,
        updateFilter,
        filteredJobs,
        totalJobs,
        favorites,
        toggleFavorite
    } = useJobFilter(JOBS_DATA);

    // Sync with parent search query and category
    useEffect(() => {
        if (searchQuery !== filters.search) {
            updateFilter('search', searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (selectedCategory !== filters.category) {
            updateFilter('category', selectedCategory);
        }
    }, [selectedCategory]);

    return (
        <section className='jobs-section'>
            <div className='jobs-container'>
                <div className='jobs-layout'>
                    <JobFilter
                        selectedCategory={filters.category}
                        setSelectedCategory={(cat) =>
                            updateFilter('category', cat)
                        }
                        totalJobs={totalJobs}
                        filteredCount={filteredJobs.length}
                    />

                    <div className='jobs-main'>
                        <div className='jobs-header'>
                            <h2 className='jobs-title'>
                                {filteredJobs.length} công việc phù hợp
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
                            {filteredJobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    isFavorite={favorites.includes(job.id)}
                                    toggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>

                        {filteredJobs.length === 0 && (
                            <div className='jobs-empty'>
                                <p>Không tìm thấy công việc phù hợp</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobsSection;
