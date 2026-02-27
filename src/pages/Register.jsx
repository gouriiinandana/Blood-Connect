import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Mail, Phone, Calendar, MapPin, Droplet,
    ShieldCheck, Lock, ArrowRight, ArrowLeft,
    Info, CheckCircle2, XCircle, Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Stepper from '../components/ui/Stepper';
import { BLOOD_TYPES } from '../data/mockData';

const steps = ['Personal', 'Location', 'Medical Data', 'Eligibility', 'Account'];

const Register = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // Step 1
        name: '', email: '', phone: '', dob: '', gender: '',
        // Step 2
        state: '', city: '', pincode: '', radius: 10,
        // Step 3
        bloodType: 'O-', lastDonation: '', weight: '',
        // Step 4 (Eligibility)
        healthy: null, donatedRecently: null, surgery: null, medication: null,
        fever: null, chronic: null, travel: null, infectious: null, ageOk: null,
        // Step 5
        password: '', confirmPassword: '', terms: false
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            handleFinalSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(curr => curr - 1);
    };

    const calculateEligibility = () => {
        // Eligibility Logic
        const isEligible =
            formData.healthy === true &&
            formData.donatedRecently === false &&
            formData.surgery === false &&
            formData.medication === false &&
            formData.fever === false &&
            formData.chronic === false &&
            formData.travel === false &&
            formData.infectious === false &&
            formData.ageOk === true &&
            Number(formData.weight) > 50;

        return isEligible;
    };

    const handleFinalSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        const isEligible = calculateEligibility();
        try {
            await register({
                fullName: formData.name,
                email: formData.email,
                password: formData.password,
                bloodType: formData.bloodType,
                phone: formData.phone,
                city: formData.city,
                state: formData.state,
                dateOfBirth: formData.dob || null,
                lastDonationDate: formData.lastDonation || null,
                isEligible,
            });
            navigate('/donor/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            setCurrentStep(0);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-6 sm:px-12 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 sm:p-14 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-12 text-primary/5 -z-0">
                    <Heart size={200} fill="currentColor" />
                </div>

                <div className="relative z-10">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Become a Hero</h2>
                        <p className="text-slate-500 font-medium mt-1 text-lg">Complete the 5-step registration to join the network.</p>
                    </div>

                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="mt-12 min-h-[400px]">
                        {/* Step 1: Personal */}
                        {currentStep === 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="register-input pl-12" />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="register-input pl-12" />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="register-input pl-12" />
                                    </div>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input name="dob" type="date" value={formData.dob} onChange={handleInputChange} className="register-input pl-12" />
                                    </div>
                                </div>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className="register-input">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        )}

                        {/* Step 2: Location */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="register-input" />
                                    <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="register-input" />
                                    <input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className="register-input" />
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Preferred Radius: {formData.radius}km</label>
                                        <input name="radius" type="range" min="5" max="100" step="5" value={formData.radius} onChange={handleInputChange} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Blood Info */}
                        {currentStep === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                    {BLOOD_TYPES.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFormData({ ...formData, bloodType: type })}
                                            className={`h-12 rounded-xl font-bold border-2 transition-all ${formData.bloodType === type ? 'bg-primary text-white border-primary shadow-lg' : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Donation Date</label>
                                        <input name="lastDonation" type="date" value={formData.lastDonation} onChange={handleInputChange} className="register-input" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weight (kg)</label>
                                        <input name="weight" type="number" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 70" className="register-input" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Medical Eligibility */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 max-h-[450px] overflow-y-auto pr-4 scrollbar-hide">
                                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center justify-between mb-8 sticky top-0 bg-white z-10 shadow-sm">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-emerald-800 block text-sm">Automated Eligibility</span>
                                            <span className="text-[10px] text-emerald-600/60 uppercase font-bold tracking-widest">Medical Screening</span>
                                        </div>
                                    </div>
                                    <span className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm ${calculateEligibility() ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                        {calculateEligibility() ? 'Ready to Donate' : 'Clarification Needed'}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { key: 'healthy', q: 'Do you feel healthy and well today?', hint: 'General wellness check.' },
                                        { key: 'donatedRecently', q: 'Donated blood in the last 3 months?', hint: 'Required 90-day wait period.' },
                                        { key: 'surgery', q: 'Any surgery in the past 6 months?', hint: 'Medical recovery check.' },
                                        { key: 'medication', q: 'Currently on any medication?', hint: 'Antibiotics or specific drugs.' },
                                        { key: 'fever', q: 'Experienced fever in the last 14 days?', hint: 'Viral infection screening.' },
                                        { key: 'chronic', q: 'Any chronic illnesses?', hint: 'Diabetes, Heart Disease, etc.' },
                                        { key: 'travel', q: 'International travel in past 3 months?', hint: 'Endemic disease risk.' },
                                        { key: 'ageOk', q: 'Are you above 18 years old?', hint: 'Legal age requirement.' },
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white transition-colors group">
                                            <div className="flex-1 mr-6">
                                                <p className="font-bold text-slate-800 text-sm">{item.q}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold mt-2 tracking-widest leading-none">{item.hint}</p>
                                            </div>
                                            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                                                <button
                                                    onClick={() => setFormData({ ...formData, [item.key]: true })}
                                                    className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${formData[item.key] === true ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:text-slate-600'}`}
                                                >Yes</button>
                                                <button
                                                    onClick={() => setFormData({ ...formData, [item.key]: false })}
                                                    className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${formData[item.key] === false ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600'}`}
                                                >No</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 5: Credentials */}
                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Create Password" className="register-input pl-12" />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" className="register-input pl-12" />
                                    </div>
                                </div>
                                <label className="flex items-start space-x-3 cursor-pointer group p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white select-none">
                                    <input name="terms" type="checkbox" checked={formData.terms} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                                    <span className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-wide">
                                        I accept the <span className="text-primary font-bold decoration-dashed underline">Terms & Conditions</span> and medical protocols for blood donation.
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`text-sm font-bold text-slate-400 hover:text-primary transition-all flex items-center uppercase tracking-widest ${currentStep === 0 ? 'opacity-0' : ''}`}
                        >
                            <ArrowLeft size={16} className="mr-3" />
                            Previous Step
                        </button>
                        <Button
                            onClick={handleNext}
                            className="h-14 px-10 shadow-xl shadow-primary/20 pulse-red"
                        >
                            <span className="inline-flex items-center gap-2">
                                {currentStep === steps.length - 1 ? 'Create Donor Account' : 'Continue'}
                                <ArrowRight size={18} />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

            <style sx>{`
                .register-input {
                    @apply block w-full px-5 py-4 bg-slate-50 border border-slate-200/50 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all font-outfit font-semibold text-slate-800 placeholder:text-slate-400 text-sm outline-none shadow-sm;
                }
            `}</style>
        </div>
    );
};

export default Register;
