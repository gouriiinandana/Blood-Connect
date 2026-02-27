import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hospital, Lock, Hash, ArrowRight, ShieldCheck, LogIn } from 'lucide-react';
import { useHospitalAuth } from '../context/HospitalAuthContext';
import Button from '../components/ui/Button';

const HospitalLogin = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [resetEmail, setResetEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [recoveryMode, setRecoveryMode] = useState(false);
    const [resetMessage, setResetMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, resetPassword, updatePassword, isAuthenticated, session } = useHospitalAuth();
    const navigate = useNavigate();

    // 1. Check for recovery hash on mount
    useEffect(() => {
        if (window.location.hash && (window.location.hash.includes('type=recovery') || window.location.hash.includes('access_token='))) {
            setRecoveryMode(true);
        }
    }, []);

    // 2. Auto-redirect if authenticated
    useEffect(() => {
        if (isAuthenticated && !recoveryMode) {
            navigate('/hospital');
        }
    }, [isAuthenticated, recoveryMode, navigate]);

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

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResetMessage('');
        try {
            await resetPassword(resetEmail);
            setResetMessage('A password reset link has been sent to your hospital email.');
        } catch (err) {
            setError(err.message || 'Failed to send reset link.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResetMessage('');
        try {
            await updatePassword(newPassword);
            setResetMessage('Success! Your password has been secured. Redirecting you to the portal...');

            // Clear the hash so the user doesn't get stuck in recovery mode on refresh
            window.history.replaceState(null, null, ' ');

            // Short delay to let the user see the success message
            setTimeout(() => {
                setRecoveryMode(false);
                navigate('/hospital');
            }, 2000);

        } catch (err) {
            setError(err.message || 'Failed to update password.');
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
                                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Hospital Portal</h2>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Command Center Access</p>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-100 p-3 rounded-2xl mb-8">
                            <ShieldCheck size={18} className="text-emerald-600" />
                            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em]">Institutional Verification Required</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 mb-6 animate-in fade-in">
                                {error}
                            </div>
                        )}

                        {resetMessage && (
                            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-sm font-bold border border-emerald-100 mb-6 animate-in fade-in">
                                {resetMessage}
                            </div>
                        )}

                        {recoveryMode ? (
                            <form onSubmit={handleUpdatePassword} className="space-y-5">
                                <div className="p-4 bg-slate-50 rounded-2xl mb-4">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                                        Set New Passcode
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1 font-medium"> Recovering access for: <span className="text-slate-600 font-bold">{session?.user?.email || 'Authenticated User'}</span></p>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Secure Password"
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium outline-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 text-lg bg-secondary shadow-xl shadow-secondary/25"
                                >
                                    {loading ? 'Securing Access...' : 'Update & Log In'}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        window.history.replaceState(null, null, ' ');
                                        setRecoveryMode(false);
                                    }}
                                    className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-2"
                                >
                                    Cancel Recovery
                                </button>
                            </form>
                        ) : !showReset ? (
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
                                    <button
                                        type="button"
                                        onClick={() => setShowReset(true)}
                                        className="text-xs font-bold text-secondary hover:underline"
                                    >
                                        Forgot credentials?
                                    </button>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 text-lg bg-secondary shadow-xl shadow-secondary/25"
                                >
                                    {loading ? 'Authenticating...' : 'Access Command Center'}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetSubmit} className="space-y-5">
                                <div className="p-4 bg-slate-50 rounded-2xl mb-4">
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        Enter your registered hospital email address and we'll send you a link to reset your administrative password.
                                    </p>
                                </div>
                                <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        placeholder="Hospital Email Address"
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium outline-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 text-lg bg-secondary shadow-xl shadow-secondary/25"
                                >
                                    {loading ? 'Sending link...' : 'Send Reset Link'}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setShowReset(false)}
                                    className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-2"
                                >
                                    Back to Login
                                </button>
                            </form>
                        )}

                        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                            <p className="text-slate-400 text-sm font-medium">New hospital onboarding?</p>
                            <Link to="/hospital/register" className="mt-2 inline-flex items-center font-bold text-secondary hover:underline group text-sm">
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
