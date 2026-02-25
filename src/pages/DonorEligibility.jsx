import React, { useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    ClipboardCheck,
    Info,
    AlertTriangle,
    Heart,
    Calendar,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Stepper from '../components/ui/Stepper';
import Button from '../components/ui/Button';

const steps = ['General Health', 'Donation History', 'Recent Illness', 'Medication', 'Travel History'];

const DonorEligibility = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState(Array(steps.length).fill(null));
    const navigate = useNavigate();

    const handleResponse = (val) => {
        const newResponses = [...responses];
        newResponses[currentStep] = val;
        setResponses(newResponses);

        setTimeout(() => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(curr => curr + 1);
            }
        }, 300);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            navigate('/donor');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(curr => curr - 1);
    };

    const questions = [
        { q: "Do you feel well and healthy today?", hint: "Include minor colds or fatigue in your assessment." },
        { q: "Have you donated in the last 3 months?", hint: "Most organizations require a 12-week buffer for whole blood." },
        { q: "Have you had any recent illness or surgery?", hint: "Includes dental procedures or minor infections." },
        { q: "Are you currently on any medication?", hint: "Antibiotics, aspirin, or chronic treatments." },
        { q: "Any recent international travel history?", hint: "Specifically to regions with endemic malaria or other viruses." },
    ];

    const allAnswered = responses.every(r => r !== null);
    const currentAnswer = responses[currentStep];

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <Link to="/donor" className="inline-flex items-center text-slate-400 hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
            </Link>

            <div className="mb-12">
                <div className="flex items-center space-x-2 mb-2">
                    <ClipboardCheck className="text-primary" size={24} />
                    <span className="text-xs font-black text-primary uppercase tracking-widest leading-none">Safety Protocol</span>
                </div>
                <h1 className="text-4xl font-black text-slate-800 italic tracking-tight">Eligibility Checklist</h1>
            </div>

            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-14 relative overflow-hidden">
                {/* Progress Background */}
                <div className="absolute top-0 right-0 p-12 text-slate-50/50 -z-0">
                    <Heart size={200} fill="currentColor" />
                </div>

                <div className="relative z-10">
                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="min-h-[360px] flex flex-col justify-center mt-12">
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-slate-800 leading-tight italic">
                                    {questions[currentStep].q}
                                </h2>
                                <div className="flex items-center text-slate-500 bg-slate-50 p-3 rounded-2xl w-fit border border-slate-100">
                                    <Info size={16} className="mr-2 shrink-0" />
                                    <p className="text-xs font-medium italic">{questions[currentStep].hint}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <button
                                    onClick={() => handleResponse(true)}
                                    className={`h-28 rounded-[2rem] border-2 flex flex-col items-center justify-center transition-all ${currentAnswer === true
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-xl'
                                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'
                                        }`}
                                >
                                    <CheckCircle2 size={32} className="mb-2" />
                                    <span className="font-black text-xl italic uppercase tracking-tighter">YES</span>
                                </button>
                                <button
                                    onClick={() => handleResponse(false)}
                                    className={`h-28 rounded-[2rem] border-2 flex flex-col items-center justify-center transition-all ${currentAnswer === false
                                            ? 'border-primary bg-red-50 text-primary shadow-xl'
                                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'
                                        }`}
                                >
                                    <XCircle size={32} className="mb-2" />
                                    <span className="font-black text-xl italic uppercase tracking-tighter">NO</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Previous Question
                        </button>

                        {currentStep === steps.length - 1 && currentAnswer !== null ? (
                            <Button
                                onClick={handleNext}
                                className="h-14 px-10 text-lg shadow-xl shadow-primary/20 pulse-red"
                            >
                                Finalize Verification
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        ) : (
                            <div className="h-1 w-24 bg-slate-50 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-200" style={{ width: `${(currentStep + 1) * 20}%` }}></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10 p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-4 max-w-2xl mx-auto">
                <AlertTriangle className="text-amber-600 mt-1 shrink-0" size={24} />
                <p className="text-xs font-bold text-amber-900/60 leading-tight uppercase tracking-wide">
                    Disclaimer: This checklist is a preliminary screening tool and does not replace the formal medical evaluation performed by professional medical staff at the donation site.
                </p>
            </div>
        </div>
    );
};

export default DonorEligibility;
