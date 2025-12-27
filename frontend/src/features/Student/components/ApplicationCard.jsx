import React from 'react';
import '../styles/ApplicationCard.css';

const ApplicationCard = ({
    company,
    position,
    logo,
    submittedDate,
    interviewDate,
    status,
    onViewDetails,
    onWithdraw
}) => {
    const getStatusClass = (status) => {
        const statusMap = {
            pending: 'warning',
            reviewing: 'info',
            accepted: 'success',
            rejected: 'error'
        };
        return statusMap[status] || 'info';
    };

    const getStatusText = (status) => {
        const textMap = {
            pending: 'Đang xem xét',
            reviewing: 'Được mời phỏng vấn',
            accepted: 'Đã nhận',
            rejected: 'Từ chối'
        };
        return textMap[status] || status;
    };

    return (
        <div className='application-card'>
            <div className='application-card__header'>
                <div className='application-card__company'>
                    <div className='application-card__logo'>
                        {logo ? (
                            <img src={logo} alt={company} />
                        ) : (
                            <span className='application-card__logo-placeholder'>
                                {company.charAt(0)}
                            </span>
                        )}
                    </div>
                    <div className='application-card__info'>
                        <h3 className='application-card__position'>
                            {position}
                        </h3>
                        <p className='application-card__company-name'>
                            {company}
                        </p>
                    </div>
                </div>
                <span
                    className={`application-card__status application-card__status--${getStatusClass(
                        status
                    )}`}
                >
                    {getStatusText(status)}
                </span>
            </div>

            <div className='application-card__details'>
                <div className='application-card__detail-item'>
                    <span className='application-card__detail-icon'>📅</span>
                    <span className='application-card__detail-label'>Nộp:</span>
                    <span className='application-card__detail-value'>
                        {submittedDate}
                    </span>
                </div>
                {interviewDate && (
                    <div className='application-card__detail-item'>
                        <span className='application-card__detail-icon'>
                            🕒
                        </span>
                        <span className='application-card__detail-label'>
                            PV:
                        </span>
                        <span className='application-card__detail-value'>
                            {interviewDate}
                        </span>
                    </div>
                )}
            </div>

            <div className='application-card__actions'>
                <button
                    className='application-card__btn application-card__btn--primary'
                    onClick={onViewDetails}
                >
                    Xem chi tiết
                </button>
                {status === 'pending' && onWithdraw && (
                    <button
                        className='application-card__btn application-card__btn--secondary'
                        onClick={onWithdraw}
                    >
                        Rút đơn
                    </button>
                )}
            </div>
        </div>
    );
};

export default ApplicationCard;
