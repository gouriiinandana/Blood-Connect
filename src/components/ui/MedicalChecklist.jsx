import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const MedicalChecklist = ({ items, checkedItems, onToggle }) => {
    return (
        <div className="space-y-3">
            {items.map((item, index) => {
                const isChecked = checkedItems.includes(index);
                return (
                    <div
                        key={index}
                        onClick={() => onToggle(index)}
                        className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer ${isChecked ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-200 hover:border-secondary'
                            }`}
                    >
                        {isChecked ? (
                            <CheckCircle2 className="text-emerald-600 mr-3 shrink-0" size={24} />
                        ) : (
                            <Circle className="text-slate-300 mr-3 shrink-0" size={24} />
                        )}
                        <div className="flex-1">
                            <p className={`font-medium ${isChecked ? 'text-emerald-900' : 'text-slate-700'}`}>
                                {item.label}
                            </p>
                            {item.description && (
                                <p className="text-sm text-slate-500">{item.description}</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MedicalChecklist;
