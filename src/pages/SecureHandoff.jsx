import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    ShieldCheck, ArrowLeft, Thermometer, AlertTriangle,
    CheckCircle2, QrCode, ClipboardCheck, Clock, CheckCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const MedicalChecklist = ({ items, checkedItems, onToggle }) => (
    <div className="space-y-3">
        {items.map((item, idx) => (
            <button
                key={idx}
                onClick={() => onToggle(idx)}
                className={`w-full flex items-center p-4 rounded-2xl border transition-all ${checkedItems.includes(idx)
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
                    }`}
            >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-4 transition-colors ${checkedItems.includes(idx) ? 'bg-emerald-500 text-white' : 'border-2 border-slate-100'
                    }`}>
                    {checkedItems.includes(idx) && <CheckCircle size={14} />}
                </div>
                <span className="text-sm font-semibold">{item}</span>
            </button>
        ))}
    </div>
);

const SignaturePad = ({ label }) => (
    <div className="space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{label}</p>
        <div className="h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center group hover:bg-white hover:border-secondary transition-all cursor-crosshair relative overflow-hidden">
            <p className="text-xs text-slate-300 font-medium group-hover:opacity-0 transition-opacity">Sign Here Electronic Verification</p>
            <div className="absolute bottom-2 right-4 flex items-center space-x-1 opacity-20 group-hover:opacity-100 transition-opacity">
                <Clock size={10} className="text-slate-400" />
                <span className="text-[8px] font-bold text-slate-400 uppercase">Timestamp: {new Date().toLocaleTimeString()}</span>
            </div>
        </div>
    </div>
);

const SecureHandoff = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handoffId, bloodType, units } = location.state || {};
    const [checkedItems, setCheckedItems] = useState([]);

    const checklistItems = [
        'Biological temperature verified (2°C - 6°C)',
        'Packaging seal integrity confirmed',
        'Unit ID matches hospital requisition',
        'Biological waste protocol alignment',
        'Receiver authorization verified'
    ];

    const handleToggle = (index) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(i => i !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const isComplete = checkedItems.length === checklistItems.length;

    return (
        <div className="max-w-5xl mx-auto pb-20 font-inter">
            <Link to="/hospital" className="inline-flex items-center text-slate-400 hover:text-secondary mb-8 transition-colors group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Return to Dashboard</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
                            <ShieldCheck className="text-emerald-600" size={28} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] mb-1 block leading-none">Protocol Secure-Alpha</span>
                            <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-none">Medical Custody Handoff</h1>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft">
                    <div className="text-center px-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Batch ID</p>
                        <p className="text-base font-bold text-slate-800 tracking-tight">BL-992-O-NEG</p>
                    </div>
                    <div className="h-10 w-px bg-slate-100"></div>
                    <div className="text-center px-4 text-emerald-600">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                            <Thermometer size={14} />
                            <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Temp</p>
                        </div>
                        <p className="text-base font-bold tracking-tight">3.2 °C</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    <Card title="Medical Verification Checklist">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-8">Confirm all physical and biological safety measures</p>
                        <MedicalChecklist items={checklistItems} checkedItems={checkedItems} onToggle={handleToggle} />

                        <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start space-x-4">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                                <QrCode size={32} className="text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 leading-tight">Secondary Unit Validation</p>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">Please scan the physical unit QR code to link custody transfer with biological tracking records.</p>
                            </div>
                        </div>
                    </Card>

                    <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 flex items-start space-x-5 shadow-sm">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <AlertTriangle className="text-primary" size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-primary uppercase tracking-[0.1em] mb-2">Institutional Safety Disclaimer</p>
                            <p className="text-xs text-red-800/60 leading-relaxed font-medium">
                                Any discrepancy during handoff must be reported to the BloodBank Command Center immediately. By proceeding, you confirm all safety specs are met.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <Card title="Custody Chain Verification">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-8">Dual-witness digital signature</p>
                        <div className="space-y-8">
                            <SignaturePad label="Courier / Logistics Specialist" />
                            <div className="h-px bg-slate-100 w-full"></div>
                            <SignaturePad label="Accepting Medical Officer" />
                        </div>
                    </Card>

                    <div className="space-y-6 pt-4">
                        <Button
                            className={`w-full h-20 text-xl font-bold rounded-3xl shadow-2xl flex items-center justify-center space-x-3 transition-all ${!isComplete ? 'grayscale opacity-50 cursor-not-allowed' : 'shadow-primary/30 scale-[1.02]'}`}
                            disabled={!isComplete}
                            onClick={() => navigate('/hospital')}
                        >
                            <CheckCircle2 size={24} />
                            <span>Confirm Secure Transfer</span>
                        </Button>
                        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xs mx-auto">
                            Compliance ID: BC-SH-2026-ALPHA-0199
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecureHandoff;
