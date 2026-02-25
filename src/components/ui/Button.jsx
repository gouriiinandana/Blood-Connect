import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95',
        danger: 'bg-status-critical text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-700 transition-all active:scale-95 shadow-soft',
        ghost: 'text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all',
    };

    return (
        <button
            className={`${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
