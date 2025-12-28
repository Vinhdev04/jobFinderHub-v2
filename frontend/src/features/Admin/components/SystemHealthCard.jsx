// src/components/Dashboard/SystemHealthCard.jsx
import React from 'react';

const SystemHealthCard = ({ data }) => {
    return (
        <div className='admin-system__card'>
            <h3 className='admin-system__card-title'>Tình trạng hệ thống</h3>
            <div className='admin-system__health-grid'>
                {data.map((item, index) => (
                    <div key={index} className='admin-system__health-item'>
                        <div className='admin-system__health-header'>
                            <span className='admin-system__health-label'>
                                {item.label}
                            </span>
                            <span
                                className='admin-system__health-value'
                                style={{ color: item.color }}
                            >
                                {item.value}%
                            </span>
                        </div>
                        <div className='admin-system__health-bar'>
                            <div
                                className='admin-system__health-fill'
                                style={{
                                    width: `${item.value}%`,
                                    backgroundColor: item.color
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemHealthCard;
