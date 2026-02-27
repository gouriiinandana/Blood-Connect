import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Hospital, Mail, Phone, MapPin, Hash, Lock,
    Building2, ClipboardList, ShieldCheck, ArrowRight, ArrowLeft,
    CheckCircle2, Users, Droplet
} from 'lucide-react';
import { useHospitalAuth } from '../context/HospitalAuthContext';
import Button from '../components/ui/Button';
import Stepper from '../components/ui/Stepper';

const steps = ['Hospital Identity', 'Location & Facility', 'Account Setup'];

const HOSPITAL_TYPES = [
    { value: 'government', label: 'Government' },
    { value: 'private', label: 'Private' },
    { value: 'ngo', label: 'NGO / Trust' },
    { value: 'multispecialty', label: 'Multi-Specialty' },
];

const HospitalRegister = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        // Step 1
        name: '', type: '', registrationNo: '', email: '', phone: '',
        // Step 2
        state: '', city: '', address: '', pincode: '', bedCapacity: '', licenceNo: '',
        // Step 3
        password: '', confirmPassword: '', terms: false,
    });
    const { register } = useHospitalAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (form.password !== form.confirmPassword) return;
        setLoading(true);
        setError('');
        try {
            await register({
                hospitalName: form.name,
                facilityType: form.type,
                regNumber: form.registrationNo,
                email: form.email,
                phone: form.phone,
                password: form.password,
                address: form.address,
                city: form.city,
                state: form.state,
                pincode: form.pincode,
                website: form.website,
                bedCount: form.bedCapacity,
            });
            navigate('/hospital');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            setCurrentStep(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center py-12 px-6">
            <div className="max-w-3xl w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 p-10 sm:p-16 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-12 text-secondary/5 -z-0">
                    <Hospital size={220} fill="currentColor" />
                </div>

                <div className="relative z-10">
                    <div className="mb-12">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                                <Building2 className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold text-slate-800 tracking-tight">Facility Onboarding</h2>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">Register your facility on the Blood Connect network</p>
                            </div>
                        </div>
                    </div>

                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="mt-14 min-h-[360px]">
                        {/* ── Step 1: Hospital Identity ── */}
                        {currentStep === 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 relative">
                                        <Hospital className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="name" value={form.name} onChange={handleChange} placeholder="Official Hospital Name" className="hospital-input pl-12" />
                                    </div>

                                    {/* Hospital Type Selector */}
                                    <div className="md:col-span-2">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Institutional Classification</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {HOSPITAL_TYPES.map(t => (
                                                <button
                                                    key={t.value}
                                                    type="button"
                                                    onClick={() => setForm(prev => ({ ...prev, type: t.value }))}
                                                    className={`py-4 px-6 rounded-2xl text-xs font-bold uppercase tracking-widest border-2 transition-all
                                                        ${form.type === t.value ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/20' : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'}`}
                                                >
                                                    {t.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="registrationNo" value={form.registrationNo} onChange={handleChange} placeholder="Official Reg. Number" className="hospital-input pl-12" />
                                    </div>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Official Email" className="hospital-input pl-12" />
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Contact Phone" className="hospital-input pl-12" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Step 2: Location & Facility ── */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="hospital-input" />
                                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="hospital-input" />

                                    <div className="md:col-span-2 relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="address" value={form.address} onChange={handleChange} placeholder="Full Street Address" className="hospital-input pl-12" />
                                    </div>

                                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="hospital-input" />

                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                        <input name="bedCapacity" type="number" value={form.bedCapacity} onChange={handleChange} placeholder="Total Bed Capacity" className="hospital-input pl-12" />
                                    </div>

                                    <div className="md:col-span-2 relative">
                                        <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="licenceNo" value={form.licenceNo} onChange={handleChange} placeholder="Blood Bank Licence Number (e.g. TN-BB-2024-001)" className="hospital-input pl-12" />
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="bg-secondary/5 border border-secondary/10 p-4 rounded-2xl flex items-start space-x-3">
                                    <Droplet size={18} className="text-secondary mt-0.5 shrink-0" />
                                    <p className="text-[10px] text-secondary/80 font-bold uppercase tracking-wide leading-relaxed">
                                        Your Blood Bank Licence will be verified within 24 hours of registration for full network access.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── Step 3: Account Setup ── */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Institutional Identification (Registration No.)</p>
                                    <p className="text-2xl font-bold text-secondary tracking-tight">{form.registrationNo || 'N/A'}</p>
                                    <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">Use this number to log in every time</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create Strong Password" className="hospital-input pl-12" />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                                        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="hospital-input pl-12" />
                                    </div>
                                    {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
                                        <p className="text-red-500 text-xs font-bold pl-1">Passwords do not match.</p>
                                    )}
                                </div>

                                <label className="flex items-start space-x-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white transition-all select-none">
                                    <input name="terms" type="checkbox" checked={form.terms} onChange={handleChange} className="mt-1 w-5 h-5 rounded accent-secondary" />
                                    <span className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wide">
                                        I confirm the provided details are accurate and accept the <span className="text-secondary font-bold underline decoration-dashed transition-colors hover:text-secondary/80">Healthcare Data Terms</span> and Blood Connect network protocols.
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(c => c - 1)}
                            className={`flex items-center text-xs font-bold text-slate-400 hover:text-secondary transition-all uppercase tracking-[0.2em] ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ArrowLeft size={16} className="mr-2" /> Previous
                        </button>

                        <Button
                            onClick={handleNext}
                            disabled={loading || (currentStep === 2 && (!form.terms || form.password !== form.confirmPassword || !form.password))}
                            className="h-16 px-12 bg-secondary shadow-2xl shadow-secondary/20 font-bold uppercase tracking-[0.2em] text-sm"
                        >
                            <span className="inline-flex items-center gap-2">
                                {loading ? 'Registering...' : currentStep === steps.length - 1 ? 'Complete Registration' : 'Continue'}
                                <ArrowRight size={18} />
                            </span>
                        </Button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-slate-400 text-sm font-medium">Already registered?</p>
                        <Link to="/hospital/login" className="mt-1 inline-flex items-center text-sm font-bold text-secondary hover:underline group">
                            Hospital Login <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>


            <style sx>{`
                .hospital-input {
                    @apply block w-full px-5 py-4 bg-slate-50 border border-slate-200/50 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:bg-white focus:border-secondary/30 transition-all font-outfit font-semibold text-slate-800 placeholder:text-slate-400 text-sm outline-none shadow-sm;
                }
            `}</style>
        </div>
    );
};

export default HospitalRegister;
