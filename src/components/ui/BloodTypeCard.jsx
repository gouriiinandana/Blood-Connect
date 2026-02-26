import React from 'react';
import Badge from './Badge';

const BloodTypeCard = ({ type, units, status }) => {
    return (
        <div className={`card flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 ${status === 'critical' ? 'border-red-200' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-3 ${status === 'critical' ? 'bg-red-100 text-red-700' :
                    status === 'low' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                }`}>
                {type}
            </div>
            <div className="text-2xl font-bold mb-1">{units}</div>
            <div className="text-slate-500 text-sm mb-3">Units Available</div>
            <Badge status={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
        </div>
    );
};

export default BloodTypeCard;
