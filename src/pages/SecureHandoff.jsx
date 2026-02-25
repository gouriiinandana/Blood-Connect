import React, { useState } from 'react';
import {
    ArrowLeft,
    ShieldCheck,
    Thermometer,
    QrCode,
    CheckCircle2,
    AlertTriangle,
    History,
    FileBadge
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import MedicalChecklist from '../components/ui/MedicalChecklist';
import SignaturePad from '../components/ui/SignaturePad';
import Badge from '../components/ui/Badge';
import { useHospitalAuth } from '../context/HospitalAuthContext';

const SecureHandoff = () => {
    const [checkedItems, setCheckedItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { completeHandoff } = useHospitalAuth();

    // Pick up handoffId from sidebar link or tracking page state
    const handoffId = location.state?.handoffId;

    const checklistItems = [
        { label: 'Security Seal Intact', description: 'Tamper-proof seal matches unit ID validation code.' },
        { label: 'Storage Temperature Verified', description: 'Digital logger shows consistent 2-6°C during transit.' },
        { label: 'Label Correspondence', description: 'Patient ID and blood unit labels verified by two staff members.' },
        { label: 'Integrity Check', description: 'No signs of leakage, aeration, or contamination in unit.' },
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
        <div className="max-w-4xl mx-auto pb-20">
            <Link to="/hospital/tracking" className="inline-flex items-center text-slate-400 hover:text-secondary mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Tracking
            </Link>

            <div className="flex flex-col md:row md:items-center justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <ShieldCheck className="text-emerald-600" size={24} />
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Security Protocol Alpha</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 italic">Secure Blood Handoff</h1>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center space-x-6">
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Unit ID</p>
                        <p className="text-sm font-black text-slate-800">BL-992-O-NEG</p>
                    </div>
                    <div className="h-8 w-px bg-slate-100"></div>
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Transit Temp</p>
                        <div className="flex items-center text-emerald-600">
                            <Thermometer size={14} className="mr-1" />
                            <p className="text-sm font-black italic">3.2°C</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card title="Handoff Checklist" subtitle="Perform medical verification before custody transfer.">
                        <MedicalChecklist items={checklistItems} checkedItems={checkedItems} onToggle={handleToggle} />
                        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
                            <QrCode size={40} className="text-slate-400 shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-slate-800 leading-tight">Secondary Verification Required</p>
                                <p className="text-xs text-slate-500 mt-1 italic">Please scan the unit QR code for digital validation.</p>
                            </div>
                        </div>
                    </Card>

                    <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 flex items-start space-x-4">
                        <AlertTriangle className="text-primary mt-1 shrink-0" size={24} />
                        <div>
                            <p className="text-sm font-bold text-primary italic">Emergency Protocol Reminder</p>
                            <p className="text-xs text-red-700/70 mt-1 leading-relaxed">
                                Any discrepancy during handoff must be reported to the BloodBank Command Center immediately via the emergency hotline.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <Card title="Custody Signatures" subtitle="Dual-witness electronic verification.">
                        <div className="space-y-8">
                            <SignaturePad label="Courier Signature (Relinquishing Custody)" />
                            <div className="h-px bg-slate-50 w-full"></div>
                            <SignaturePad label="Medical Staff Signature (Accepting Custody)" />
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <Button
                            className={`w-full h-16 text-xl shadow-2xl flex items-center justify-center space-x-3 ${!isComplete ? 'grayscale opacity-50 cursor-not-allowed' : 'pulse-red shadow-primary/30'}`}
                            disabled={!isComplete}
                            onClick={() => {
                                if (handoffId) completeHandoff(handoffId);
                                navigate('/hospital');
                            }}
                        >
                            <CheckCircle2 size={24} />
                            <span>Confirm Secure Handoff</span>
                        </Button>
                        <p className="text-center text-xs text-slate-400 font-medium italic">
                            By clicking confirm, you acknowledge the completion of the Secure Handoff Protocol.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecureHandoff;
