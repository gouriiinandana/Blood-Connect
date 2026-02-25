import React, { useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    Search,
    BrainCircuit,
    Clock,
    MapPin,
    Zap,
    CheckCircle2,
    AlertTriangle,
    Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stepper from '../components/ui/Stepper';
import MapContainer from '../components/ui/MapContainer';
import { useHospitalAuth } from '../context/HospitalAuthContext';
import { BLOOD_TYPES } from '../data/mockData';

const steps = ['Blood Type', 'Quantity', 'Urgency', 'AI Match'];

const EmergencyRequest = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        bloodType: 'O-',
        units: 1,
        urgency: 'critical'
    });
    const navigate = useNavigate();
    const { addPendingHandoff } = useHospitalAuth();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            // Register this request as a pending handoff before navigating
            const handoff = addPendingHandoff(formData);
            navigate('/hospital/tracking', { state: { handoffId: handoff?.id, ...formData } });
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(curr => curr - 1);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link to="/hospital" className="inline-flex items-center text-slate-500 hover:text-secondary mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
            </Link>

            <div className="mb-12">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Emergency Request</h1>
                <p className="text-slate-500 mt-2 font-medium">Follow the protocol steps to broadcast a real-time blood unit requirement.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 relative overflow-hidden">
                {/* Progress Background */}
                <div className="absolute top-0 right-0 p-12 text-slate-50/50 -z-0">
                    <Activity size={240} />
                </div>

                <div className="relative z-10">
                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="min-h-[400px] flex flex-col justify-center mt-8">
                        {currentStep === 0 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-800">Select Required Blood Type</h2>
                                    <p className="text-slate-500">Choose the specific type needed for the patient.</p>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
                                    {BLOOD_TYPES.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFormData({ ...formData, bloodType: type })}
                                            className={`h-24 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all ${formData.bloodType === type
                                                ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                                : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-800">Quantity Required</h2>
                                    <p className="text-slate-500">Enter the number of 450ml units needed.</p>
                                </div>
                                <div className="flex items-center justify-center space-x-8">
                                    <button
                                        onClick={() => setFormData({ ...formData, units: Math.max(1, formData.units - 1) })}
                                        className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 text-3xl font-bold hover:bg-slate-200 transition-all"
                                    >-</button>
                                    <span className="text-7xl font-black text-slate-900 w-32 text-center">{formData.units}</span>
                                    <button
                                        onClick={() => setFormData({ ...formData, units: formData.units + 1 })}
                                        className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 text-3xl font-bold hover:bg-slate-200 transition-all"
                                    >+</button>
                                </div>
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center space-x-3 text-amber-700 max-w-md mx-auto">
                                    <AlertTriangle size={20} className="shrink-0" />
                                    <p className="text-xs font-bold leading-tight uppercase">Requesting {formData.units} units may require coordination with 2+ regional centers.</p>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-800">Urgency Level</h2>
                                    <p className="text-slate-500">This prioritizes logistics and AI dispatch triggers.</p>
                                </div>
                                <div className="space-y-4 max-w-md mx-auto">
                                    {[
                                        { id: 'critical', title: 'Critical (Priority 1)', desc: 'Life-threatening emergency, immediate dispatch', color: 'bg-primary', icon: Zap },
                                        { id: 'urgent', title: 'Urgent (Priority 2)', desc: 'Stable but time-sensitive, dispatch < 30min', color: 'bg-amber-500', icon: Clock },
                                        { id: 'standard', title: 'Standard (Priority 3)', desc: 'Routine requirement or planned surgery', color: 'bg-secondary', icon: CheckCircle2 },
                                    ].map(level => (
                                        <button
                                            key={level.id}
                                            onClick={() => setFormData({ ...formData, urgency: level.id })}
                                            className={`w-full p-6 rounded-2xl border-2 flex items-center text-left transition-all ${formData.urgency === level.id
                                                ? `border-${level.id === 'critical' ? 'primary' : level.id === 'urgent' ? 'amber-500' : 'secondary'} bg-white shadow-lg`
                                                : 'border-slate-100 bg-slate-50 hover:bg-white'
                                                }`}
                                        >
                                            <div className={`p-3 rounded-xl mr-5 text-white ${level.color}`}>
                                                <level.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{level.title}</p>
                                                <p className="text-xs text-slate-500 mt-1">{level.desc}</p>
                                            </div>
                                            {formData.urgency === level.id && (
                                                <div className="ml-auto text-primary">
                                                    <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-800">AI Match Preview</h2>
                                    <p className="text-slate-500">Regional inventory scanned. Real-time matching ready.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                                <span className="text-sm font-bold text-slate-400">Blood Requested</span>
                                                <span className="text-xl font-black text-slate-900 italic">{formData.bloodType} Negative</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Match</p>
                                                    <p className="text-lg font-bold text-emerald-600">2.4 mins</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confidence Score</p>
                                                    <p className="text-lg font-bold text-secondary">98 / 100</p>
                                                </div>
                                            </div>
                                            <div className="pt-4 flex items-center text-secondary font-bold text-sm">
                                                <BrainCircuit size={18} className="mr-2" />
                                                AI suggests matching from Central Lab Hub
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                                        <MapContainer height="240px" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 flex justify-between items-center">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}
                        >
                            Previous Step
                        </Button>

                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-slate-400 font-medium hidden sm:block">
                                Step {currentStep + 1} of {steps.length}
                            </p>
                            <Button
                                onClick={handleNext}
                                className={`h-14 px-10 flex items-center ${currentStep === 3 ? 'bg-primary pulse-red' : ''}`}
                            >
                                {currentStep === 3 ? 'Broadcast Emergency Request' : 'Continue'}
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyRequest;
