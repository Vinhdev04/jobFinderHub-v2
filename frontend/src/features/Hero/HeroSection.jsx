// src/features/Hero/HeroSection.jsx

import React from 'react';
import { Search } from 'lucide-react';
import CATEGORIES from '@data/categoriesData';
import './HeroSection.css';
import SearchBar from '../Jobs/SearchBar';
const HeroSection = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    onSearch
}) => {
    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch();
        }
    };

    return (
        <div className='hero-section'>
            <div className='hero-content'>
                <h1 className='hero-title'>Tìm kiếm cơ hội thực tập</h1>
                <p className='hero-subtitle'>
                    Khám phá hàng trăm vị trí thực tập tại các doanh nghiệp hàng
                    đầu
                </p>

                <div className='hero-search-card'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        onSearch={onSearch}
                        placeholder='Tìm kiếm công việc, công ty...'
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
