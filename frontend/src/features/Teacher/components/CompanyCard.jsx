import React from 'react';
import '../styles/CompanyCard.css';

const CompanyCard = ({ company }) => (
    <div className='company-card'>
        <div
            className='company-card__icon'
            style={{ backgroundColor: company.color }}
        >
            {company.icon}
        </div>
        <div className='company-card__info'>
            <div className='company-card__name'>{company.name}</div>
            <div className='company-card__count'>
                {company.interns} sinh viên
            </div>
        </div>
    </div>
);

export default CompanyCard;
