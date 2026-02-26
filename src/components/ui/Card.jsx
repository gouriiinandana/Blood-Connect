import React from 'react';

const Card = ({ children, title, subtitle, className = '', action }) => {
    return (
        <div className={`card ${className}`}>
            {(title || subtitle || action) && (
                <div className="flex justify-between items-start mb-6">
                    <div>
                        {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
                        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
