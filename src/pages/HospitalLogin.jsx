import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hospital, Lock, Hash, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';
import { useHospitalAuth } from '../context/HospitalAuthContext';
import Button from '../components/ui/Button';

const HospitalLogin = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useHospitalAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(form.email, form.password);
            navigate('/hospital');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-6 bg-slate-50">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-10 relative overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 p-10 text-secondary/5">
                        <Hospital size={180} fill="currentColor" />
                    </div>

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center space-x-4 mb-10">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                                <LogIn className="text-white" size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 italic tracking-tight">Hospital Portal</h2>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Command Center Access</p>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-100 p-3 rounded-2xl mb-8">
                            <ShieldCheck size={18} className="text-emerald-600" />
                            <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">NHS / NABH Verified Portal — Secure Login</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 mb-6 animate-in fade-in">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Hospital Email Address"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium outline-none"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium outline-none"
                                />
                            </div>

                            <div className="flex justify-end">
                                <a href="#" className="text-xs font-bold text-secondary hover:underline">Forgot credentials?</a>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 text-lg bg-secondary shadow-xl shadow-secondary/25"
                            >
                                {loading ? 'Authenticating...' : 'Access Command Center'}
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                            <p className="text-slate-400 text-sm font-medium">New hospital onboarding?</p>
                            <Link to="/hospital/register" className="mt-2 inline-flex items-center font-black text-secondary hover:underline italic group text-sm">
                                Register Your Hospital <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8">
                    Protected under Medical Data Security Act · Blood Connect v2.1
                </p>
            </div>
        </div>
    );
};

export default HospitalLogin;
