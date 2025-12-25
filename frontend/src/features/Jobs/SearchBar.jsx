// src/components/common/SearchBar/SearchBar.jsx

import React from 'react';
import { Search } from 'lucide-react';
import CATEGORIES from '@data/categoriesData';
import './SearchBar.css';

const SearchBar = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    onSearch,
    placeholder = 'Tìm kiếm công việc, công ty...'
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch();
        }
    };

    return (
        <div className='search-bar-wrapper'>
            <form onSubmit={handleSubmit} className='search-bar-form'>
                <div className='search-input-group'>
                    <Search className='search-icon' size={20} />
                    <input
                        type='text'
                        placeholder={placeholder}
                        className='search-input'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='search-select'
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button type='submit' className='search-btn'>
                    <Search size={20} />
                    <span>Tìm kiếm</span>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
