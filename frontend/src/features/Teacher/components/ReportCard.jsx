import React from 'react';
import '../styles/ReportCard.css';

const ReportCard = ({ report, onView, onApprove }) => (
    <div className='report-card'>
        <div className='report-card__header'>
            <div className='report-card__info'>
                <div className='report-card__title'>{report.title}</div>
                <div className='report-card__author'>{report.author}</div>
            </div>
            <div className='report-card__date'>{report.date}</div>
        </div>

        <div className='report-card__actions'>
            <button
                className='report-card__btn report-card__btn--secondary'
                onClick={() => onView(report.id)}
            >
                Xem báo cáo
            </button>
            <button
                className='report-card__btn report-card__btn--success'
                onClick={() => onApprove(report.id)}
            >
                Phê duyệt
            </button>
        </div>
    </div>
);

export default ReportCard;
