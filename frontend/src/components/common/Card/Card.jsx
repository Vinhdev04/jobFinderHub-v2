// src/components/common/Card/Card.jsx

import React from 'react';
import './Card.css';

const Card = ({
    children,
    variant = 'default',
    hoverable = false,
    className = '',
    onClick
}) => {
    const cardClasses = [
        'card',
        `card-${variant}`,
        hoverable && 'card-hoverable',
        onClick && 'card-clickable',
        className
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={cardClasses} onClick={onClick}>
            {children}
        </div>
    );
};

const CardHeader = ({ children, className = '' }) => (
    <div className={`card-header ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
    <div className={`card-body ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
    <div className={`card-footer ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
