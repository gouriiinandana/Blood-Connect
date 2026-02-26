import React, { useState } from 'react';
import { PenTool, RotateCcw } from 'lucide-react';

const SignaturePad = ({ label }) => {
    const [signed, setSigned] = useState(false);

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <label className="text-sm font-semibold text-slate-600">{label}</label>
                {signed && (
                    <button
                        onClick={() => setSigned(false)}
                        className="text-xs text-primary flex items-center hover:underline"
                    >
                        <RotateCcw size={12} className="mr-1" /> Clear
                    </button>
                )}
            </div>
            <div
                className={`w-full h-32 bg-slate-50 rounded-xl border-2 border-dashed flex items-center justify-center cursor-crosshair transition-all ${signed ? 'bg-emerald-50 border-emerald-200' : 'border-slate-300 hover:border-secondary/50'
                    }`}
                onClick={() => setSigned(true)}
            >
                {signed ? (
                    <div className="font-cursive text-3xl text-emerald-800 rotate-[-2deg] select-none">
                        Gouri Nandana
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-400">
                        <PenTool size={24} className="mb-1" />
                        <span className="text-xs">Click to sign electronically</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignaturePad;
