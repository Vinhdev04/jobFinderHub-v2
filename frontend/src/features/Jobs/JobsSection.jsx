// src/components/features/Jobs/JobsSection.jsx

import React from 'react';
import { Search } from 'lucide-react';
import JobCard from './JobCard';
import { JOBS_DATA } from '@data/jobsData';
import  CATEGORIES  from '@data/categoriesData';
import { useJobFilter } from '@hooks/useJobFilter';
import Button from '@components/common/Button/Button';
import './Jobs.css';

const JobsSection = () => {
    const { filters, updateFilter, filteredJobs, totalJobs } =
        useJobFilter(JOBS_DATA);

    return (
        <section className='jobs-section'>
            <div className='container'>
                <div className='jobs-content'>
                    {/* Search Bar */}
                    <div className='jobs-search-container'>
                        <div className='jobs-search-card'>
                            <div className='search-input-wrapper'>
                                <Search className='search-icon' />
                                <input
                                    type='text'
                                    placeholder='Tìm kiếm công việc, công ty...'
                                    className='search-input'
                                    value={filters.search}
                                    onChange={(e) =>
                                        updateFilter('search', e.target.value)
                                    }
                                />
                            </div>
                            <select
                                className='search-select'
                                value={filters.category}
                                onChange={(e) =>
                                    updateFilter('category', e.target.value)
                                }
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <Button variant='primary' icon={Search}>
                                Tìm kiếm
                            </Button>
                        </div>
                    </div>

                    <div className='jobs-layout'>
                        {/* Sidebar */}
                        <aside className='jobs-sidebar'>
                            <div className='sidebar-section'>
                                <h3 className='sidebar-title'>
                                    Lọc theo ngành nghề
                                </h3>
                                <div className='sidebar-categories'>
                                    {CATEGORIES.map((cat) => {
                                        const Icon = cat.icon;
                                        return (
                                            <button
                                                key={cat.id}
                                                className={`category-button ${
                                                    filters.category === cat.id
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    updateFilter(
                                                        'category',
                                                        cat.id
                                                    )
                                                }
                                            >
                                                <Icon className='category-icon' />
                                                <span>{cat.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className='sidebar-section'>
                                <h3 className='sidebar-title'>Thống kê</h3>
                                <div className='sidebar-stats'>
                                    <div className='stat-item'>
                                        <span className='stat-label'>
                                            Tổng công việc
                                        </span>
                                        <span className='stat-value'>
                                            {JOBS_DATA.length}
                                        </span>
                                    </div>
                                    <div className='stat-item'>
                                        <span className='stat-label'>
                                            Kết quả tìm thấy
                                        </span>
                                        <span className='stat-value'>
                                            {totalJobs}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className='jobs-main'>
                            <div className='jobs-header'>
                                <h2 className='jobs-title'>
                                    {totalJobs} công việc phù hợp
                                </h2>
                                <select
                                    className='jobs-sort'
                                    value={filters.sortBy}
                                    onChange={(e) =>
                                        updateFilter('sortBy', e.target.value)
                                    }
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
                                {filteredJobs.map((job, idx) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        index={idx}
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
            </div>
        </section>
    );
};

export default JobsSection;
