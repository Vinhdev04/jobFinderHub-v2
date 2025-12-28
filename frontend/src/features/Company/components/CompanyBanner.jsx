import React from 'react';
import '../styles/CompanyBanner.css';

const CompanyBanner = ({ onCreateClick }) => {
  return (
    <div className="banner">
      <div className="bannerContent">
        <div className="bannerText">
          <h2>Tạo tin tuyển dụng mới</h2>
          <p>Đăng tin tuyển dụng để tìm ứng viên tốt nhất</p>
        </div>
        <button className="bannerBtn" onClick={onCreateClick}>
          + Tạo tin mới
        </button>
      </div>
    </div>
  );
};

export default CompanyBanner;