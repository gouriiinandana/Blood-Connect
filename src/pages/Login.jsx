import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [resetMessage, setResetMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/donor/dashboard');
        } catch (err) {
            setError(err.message || 'Invalid email or password. Please try again.');
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
            setResetMessage('Check your inbox for the password recovery link.');
        } catch (err) {
            setError(err.message || 'Failed to initiate recovery.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-6 sm:px-12 bg-slate-50">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-8 text-primary/5 -z-0">
                    <Heart size={160} fill="currentColor" />
                </div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 shadow-lg shadow-primary/20">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                        {showReset ? 'Recover Access' : 'Welcome Back'}
                    </h2>
                    <p className="mt-2 text-slate-500 font-medium">
                        {showReset ? 'We\'ll help you get back to saving lives.' : 'Log in to your Donor Hero portal.'}
                    </p>
                </div>

                {!showReset ? (
                    <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-slate-500 font-medium cursor-pointer">Remember me</label>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowReset(true)}
                                className="font-bold text-primary hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 text-lg shadow-xl shadow-primary/20"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </Button>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6 relative z-10" onSubmit={handleResetSubmit}>
                        {(error || resetMessage) && (
                            <div className={`${resetMessage ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'} p-4 rounded-2xl text-sm font-bold border animate-in fade-in`}>
                                {error || resetMessage}
                            </div>
                        )}

                        <div className="space-y-4">
                            <p className="text-sm text-slate-500 text-center px-4 font-medium">
                                Lost your credentials? Enter your email and we'll send a recovery link immediately.
                            </p>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                    placeholder="Recovery Email"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 text-lg shadow-xl shadow-primary/20"
                        >
                            {loading ? 'Sending link...' : 'Send Recovery Link'}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setShowReset(false)}
                                className="text-xs font-bold text-slate-400 hover:text-slate-600"
                            >
                                Back to Log In
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-8 pt-8 border-t border-slate-50 text-center relative z-10">
                    <p className="text-slate-500 font-medium">Don't have an account?</p>
                    <Link to="/register" className="mt-2 inline-flex items-center font-bold text-primary hover:underline group">
                        Register as a Life Saver <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
