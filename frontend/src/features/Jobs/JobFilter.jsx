// src/features/Jobs/JobFilter.jsx

import React from 'react';
import CATEGORIES from '@data/categoriesData';
import './JobFilter.css';

const JobFilter = ({
    selectedCategory,
    setSelectedCategory,
    totalJobs,
    filteredCount
}) => {
    return (
        <aside className='job-filter'>
            <div className='filter-section'>
                <h3 className='filter-title'>Lọc theo ngành nghề</h3>
                <div className='filter-categories'>
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`category-button ${
                                    isActive ? 'active' : ''
                                }`}
                            >
                                <Icon size={20} className='category-icon' />
                                <span>{cat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className='filter-section'>
                <h3 className='filter-title'>Thống kê</h3>
                <div className='filter-stats'>
                    <div className='stat-item'>
                        <span className='stat-label'>Tổng công việc</span>
                        <span className='stat-value'>{totalJobs}</span>
                    </div>
                    <div className='stat-item'>
                        <span className='stat-label'>Kết quả tìm thấy</span>
                        <span className='stat-value'>{filteredCount}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default JobFilter;
