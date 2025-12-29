// src/features/Admin/components/SystemHealthCard.jsx
import React from 'react';
import { Activity } from 'lucide-react';
import { MOCK_SYSTEM_HEALTH } from '../constants/systemConstants.js';
import '../styles/SystemHealthCard.css';

const SystemHealthCard = () => {
    return (
        <div className='card'>
            <div className='card-header'>
                <h3 className='card-title'>Tình trạng hệ thống</h3>
                <button className='card-action'>
                    <Activity size={16} />
                    Chi tiết
                </button>
            </div>
            <div className='health-grid'>
                {MOCK_SYSTEM_HEALTH.map((item, index) => (
                    <div key={index} className='health-item'>
                        <div className='health-header'>
                            <span className='health-label'>{item.label}</span>
                            <span
                                className='health-value'
                                style={{ color: item.color }}
                            >
                                {item.value}%
                            </span>
                        </div>
                        <div className='health-bar'>
                            <div
                                className='health-fill'
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
