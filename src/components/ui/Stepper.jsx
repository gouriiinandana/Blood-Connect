import React from 'react';

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="flex items-center justify-between w-full mb-10">
            {steps.map((step, index) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${isCurrent ? 'bg-primary text-white scale-110 shadow-lg' :
                                    isActive ? 'bg-primary/80 text-white' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
                                }`}>
                                {index + 1}
                            </div>
                            <span className={`absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${isCurrent ? 'text-primary' : 'text-slate-400'
                                }`}>
                                {step}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="flex-1 h-1 mx-4 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500 ease-out"
                                    style={{ width: isActive ? '100%' : '0%' }}
                                ></div>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Stepper;
