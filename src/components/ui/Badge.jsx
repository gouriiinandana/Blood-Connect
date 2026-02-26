import React from 'react';

const Badge = ({ status, children, className = '' }) => {
    const styles = {
        available: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        low: 'bg-amber-50 text-amber-700 border-amber-100',
        critical: 'bg-red-50 text-red-700 border-red-100 pulse-red',
    };

    const statusMap = {
        Available: 'available',
        Low: 'low',
        Critical: 'critical',
    };

    const currentStatus = statusMap[children] || status || 'available';

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[currentStatus]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
