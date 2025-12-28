import React from 'react';
import '../styles/SearchSection.css';

const SearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  onSearch 
}) => {
  return (
    <div className="searchSection">
      <div className="searchForm">
        <input
          type="text"
          className="searchInput"
          placeholder="Tìm kiếm công việc, công ty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="searchSelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Kinh doanh</option>
          <option value="tech">Công nghệ</option>
          <option value="marketing">Marketing</option>
          <option value="design">Thiết kế</option>
        </select>
        <button className="searchBtn" onClick={onSearch}>
          🔍 Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchSection;