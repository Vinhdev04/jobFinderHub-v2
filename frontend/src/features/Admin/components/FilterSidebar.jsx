import React from 'react';
import '../styles/FilterSidebar.css';

const FilterSidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="filterSidebar">
      <h3 className="filterTitle">Lọc theo ngành nghề</h3>
      
      {categories.map((cat) => (
        <div 
          key={cat.value} 
          className="filterOption" 
          onClick={() => setSelectedCategory(cat.value)}
        >
          <input 
            type="radio" 
            name="category" 
            value={cat.value}
            checked={selectedCategory === cat.value}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <span className="filterIcon">{cat.icon}</span>
          <span>{cat.label}</span>
        </div>
      ))}

      <div className="filterStats">
        <p>📊 9 công việc phù hợp</p>
        <p>⭐ 245 ứng viên đã ứng tuyển</p>
      </div>
    </aside>
  );
};

export default FilterSidebar;