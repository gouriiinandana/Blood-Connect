import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Heart, Shield, Apple, Clock, CheckCircle2, ArrowRight,
    Droplets, Users, MapPin, Lock, Zap, Star, ChevronDown
} from 'lucide-react';

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
const useReveal = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

// ─── Animated Section wrapper ─────────────────────────────────────────────────
const Section = ({ children, className = '', delay = 0 }) => {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${className}`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

// ─── Step card for the donation process ──────────────────────────────────────
const ProcessStep = ({ number, title, desc, delay }) => {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className="flex items-start space-x-5 group"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-24px)',
                transition: 'all 0.6s ease',
                transitionDelay: `${delay}ms`,
            }}
        >
            <div className="shrink-0 w-14 h-14 rounded-[1.5rem] bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                {number}
            </div>
            <div className="pt-2">
                <p className="font-bold text-slate-800 text-lg leading-tight tracking-tight">{title}</p>
                {desc && <p className="text-slate-500 text-sm mt-1.5 font-medium leading-relaxed">{desc}</p>}
            </div>
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const DonationGuide = () => {
    const [heroVisible, setHeroVisible] = useState(false);
    const contentRef = useRef(null);
    useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

    const scrollToContent = () => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white font-inter">

            {/* ── Hero ── */}
            <div className="relative bg-gradient-to-br from-primary via-red-700 to-slate-900 text-white overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
                    <div
                        className="transition-all duration-1000"
                        style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(40px)' }}
                    >
                        {/* Pulsing heart icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-8 animate-pulse">
                            <Droplets size={40} className="text-white" />
                        </div>
                        <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border border-white/20">
                            Verified Donor Resource
                        </div>
                        <h1 className="text-5xl sm:text-8xl font-bold tracking-tight leading-none mb-8">
                            Donation Guide
                        </h1>
                        <p className="text-xl text-red-100 max-w-2xl mx-auto font-medium leading-relaxed">
                            Everything you need to know before, during and after donating blood — safe, simple, and life-saving.
                        </p>
                        <button
                            onClick={scrollToContent}
                            className="mt-10 flex items-center justify-center space-x-2 text-red-200 text-sm font-medium animate-bounce cursor-pointer hover:text-white transition-colors mx-auto"
                        >
                            <span>Scroll to explore</span>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div ref={contentRef} className="max-w-4xl mx-auto px-6 py-20 space-y-24">

                {/* 1. How the Process Works */}
                <Section>
                    <div className="flex items-center space-x-3 mb-10">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                            <Clock className="text-primary" size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Step by Step</p>
                            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">How the Donation Process Works</h2>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-6">
                        {[
                            { title: 'Register on Blood Connect', desc: 'Create your donor profile in minutes.' },
                            { title: 'Schedule a Donation', desc: 'Find a nearby hospital or blood camp and book a slot.' },
                            { title: 'Health Screening', desc: 'Quick BP, hemoglobin check & medical history review by staff.' },
                            { title: 'Blood Collection', desc: 'A simple 10–15 minute process using sterile equipment.' },
                            { title: 'Rest & Refreshments', desc: 'Relax for 10–20 minutes with snacks and fluids provided.' },
                        ].map((step, i) => (
                            <ProcessStep key={i} number={i + 1} title={step.title} desc={step.desc} delay={i * 100} />
                        ))}

                        {/* Total time badge */}
                        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center space-x-3 text-slate-700">
                            <Clock size={20} className="text-secondary" />
                            <p className="font-bold text-sm">
                                Total Commitment: <span className="text-secondary">30–45 MINUTES</span>
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 2. Is it Safe */}
                <Section delay={100}>
                    <div className="flex items-center space-x-3 mb-10">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-inner">
                            <Shield className="text-emerald-600" size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em]">100% Verified</p>
                            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Is Blood Donation Safe?</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            'Sterile, single-use needles only',
                            'Trained medical staff at every step',
                            'Strict hygiene & safety protocols',
                            'Zero risk of infection to donors',
                        ].map((item, i) => (
                            <Section key={i} delay={i * 80}>
                                <div className="flex items-start space-x-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-5 group hover:bg-emerald-100/70 transition-all">
                                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={20} />
                                    <p className="text-slate-700 font-semibold text-sm leading-relaxed">{item}</p>
                                </div>
                            </Section>
                        ))}
                    </div>
                    <p className="mt-6 text-slate-500 font-medium text-sm text-center">
                        Your body naturally <span className="text-emerald-600 font-bold">replaces donated blood within a few weeks.</span>
                    </p>
                </Section>

                {/* 3. Before & After */}
                <Section delay={100}>
                    <div className="flex items-center space-x-3 mb-10">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center shadow-inner">
                            <Apple className="text-amber-500" size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em]">Donor Care</p>
                            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Before & After Donation</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Before */}
                        <div className="bg-blue-50 border border-blue-100 rounded-[2.5rem] p-8 shadow-soft">
                            <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mb-6">Before Donation</p>
                            <ul className="space-y-4">
                                {['Eat a healthy meal', 'Drink plenty of water', 'Avoid alcohol & smoking', 'Get good sleep'].map((item, i) => (
                                    <Section key={i} delay={i * 80}>
                                        <li className="flex items-center space-x-3">
                                            <span className="w-6 h-6 bg-secondary text-white rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                                            <span className="text-slate-700 font-semibold text-sm">{item}</span>
                                        </li>
                                    </Section>
                                ))}
                            </ul>
                        </div>

                        {/* After */}
                        <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-8 shadow-soft">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-6">After Donation</p>
                            <ul className="space-y-4">
                                {['Rest for 10–15 minutes', 'Drink plenty of fluids', 'Avoid heavy exercise for 24 hours', 'Keep the bandage for a few hours'].map((item, i) => (
                                    <Section key={i} delay={i * 80}>
                                        <li className="flex items-center space-x-3">
                                            <span className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
                                            <span className="text-slate-700 font-semibold text-sm">{item}</span>
                                        </li>
                                    </Section>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* 4. How Blood Connect Helps */}
                <Section delay={100}>
                    <div className="flex items-center space-x-3 mb-10">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                            <Heart className="text-primary" size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Our Mission</p>
                            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">How Blood Connect Helps</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { icon: Users, label: 'Connects donors, hospitals & patients', color: 'bg-violet-50 border-violet-100', iconColor: 'text-violet-500' },
                            { icon: Zap, label: 'Sends urgent blood requests in real-time', color: 'bg-amber-50 border-amber-100', iconColor: 'text-amber-500' },
                            { icon: MapPin, label: 'Location-based donor matching', color: 'bg-emerald-50 border-emerald-100', iconColor: 'text-emerald-500' },
                            { icon: Lock, label: 'Maintains donor privacy & safety', color: 'bg-blue-50 border-blue-100', iconColor: 'text-secondary' },
                            { icon: Heart, label: 'Helps save lives faster', color: 'bg-red-50 border-red-100', iconColor: 'text-primary' },
                        ].map((item, i) => (
                            <Section key={i} delay={i * 80}>
                                <div className={`${item.color} border rounded-2xl p-5 flex items-start space-x-4 hover:-translate-y-1 transition-transform`}>
                                    <div className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm`}>
                                        <item.icon size={18} className={item.iconColor} />
                                    </div>
                                    <p className="text-slate-700 font-semibold text-sm leading-relaxed pt-1">{item.label}</p>
                                </div>
                            </Section>
                        ))}
                    </div>
                </Section>

                {/* 5. CTA */}
                <Section delay={100}>
                    <div className="relative bg-gradient-to-br from-primary to-red-800 rounded-[2.5rem] p-12 text-white text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                                <Star size={32} className="text-yellow-300" />
                            </div>
                            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">Be a Lifesaver Today</h2>
                            <p className="text-red-100 text-xl font-medium max-w-lg mx-auto mb-3">
                                One small act can make a big difference.
                            </p>
                            <p className="text-red-200 text-sm font-medium mb-12">
                                Join Blood Connect and help ensure no life is lost due to lack of blood.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/register">
                                    <button className="flex items-center space-x-3 bg-white text-primary font-bold px-10 py-5 rounded-2xl hover:bg-red-50 transition-all shadow-2xl hover:scale-105 text-sm uppercase tracking-[0.2em]">
                                        <Heart size={20} />
                                        <span>Register as Donor</span>
                                    </button>
                                </Link>
                                <Link to="/hospital/login">
                                    <button className="flex items-center space-x-3 bg-white/10 backdrop-blur text-white border border-white/20 font-bold px-10 py-5 rounded-2xl hover:bg-white/20 transition-all text-sm uppercase tracking-[0.2em]">
                                        <ArrowRight size={20} />
                                        <span>Hospital Portal</span>
                                    </button>
                                </Link>
                            </div>
                            <p className="mt-8 text-red-200 text-xs font-bold uppercase tracking-widest">
                                👉 Register · Donate · Save Lives
                            </p>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default DonationGuide;
