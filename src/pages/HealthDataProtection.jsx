import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck, FileText, Lock, Users, UserCog,
    Server, AlertTriangle, Heart, ChevronDown, ArrowRight
} from 'lucide-react';

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
const useReveal = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

const Reveal = ({ children, delay = 0, direction = 'up' }) => {
    const [ref, visible] = useReveal();
    const transform = { up: 'translateY(28px)', left: 'translateX(-24px)', right: 'translateX(24px)' }[direction];
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : transform,
            transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        }}>
            {children}
        </div>
    );
};

// ─── Protocol Card ────────────────────────────────────────────────────────────
const PolicyCard = ({ icon: Icon, title, items, color, bg, border, delay }) => (
    <Reveal delay={delay}>
        <div className={`${bg} ${border} border rounded-3xl p-7 hover:-translate-y-1 transition-transform`}>
            <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Icon size={20} className={color} />
                </div>
                <h3 className={`font-black text-slate-800 text-base tracking-tight leading-tight`}>{title}</h3>
            </div>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                        <span className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')} mt-2 shrink-0`} />
                        <span className="text-slate-600 text-sm font-medium leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </Reveal>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const HealthDataProtection = () => {
    const [heroVisible, setHeroVisible] = useState(false);
    const contentRef = useRef(null);
    useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

    const sections = [
        {
            icon: FileText,
            title: 'Responsible Use of Health Information',
            color: 'text-violet-500', bg: 'bg-violet-50', border: 'border-violet-100',
            items: [
                'Personal and medical data is collected only when required',
                'Used solely for blood donation coordination and healthcare services',
                'Data processing follows the principle of minimum necessary access',
            ],
        },
        {
            icon: Lock,
            title: 'Strong Data Security Measures',
            color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100',
            items: [
                'Secure authentication and role-based access controls',
                'Encrypted data during storage and transmission',
                'Protection against unauthorized access, misuse, or disclosure',
                'Regular monitoring of system activity',
            ],
        },
        {
            icon: Users,
            title: 'Controlled & Authorized Access',
            color: 'text-secondary', bg: 'bg-blue-50', border: 'border-blue-100',
            items: [
                'Health data accessible only to verified and authorized users',
                'Hospitals receive donor details only when medically required',
                'No personal or health data is sold or shared for non-healthcare purposes',
            ],
        },
        {
            icon: UserCog,
            title: 'User Rights & Transparency',
            color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100',
            items: [
                'Understand how your information is collected and used',
                'Request updates or corrections to personal data',
                'Expect confidentiality and respectful handling of health information',
                'Clear privacy notices explain data practices transparently',
            ],
        },
        {
            icon: Server,
            title: 'Administrative & Technical Safeguards',
            color: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-100',
            items: [
                'Team members are trained in healthcare data privacy',
                'Periodic security reviews and risk assessments are conducted',
                'Incident response procedures address security events promptly',
                'Continuous improvement aligned with evolving legal standards',
            ],
        },
        {
            icon: AlertTriangle,
            title: 'Breach Prevention & Incident Handling',
            color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100',
            items: [
                'Preventive controls to reduce data security risks',
                'Prompt investigation of suspected security incidents',
                'Timely corrective actions to protect users and systems',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white font-inter">

            {/* ── Hero ── */}
            <div className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
                    <div className="transition-all duration-1000" style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-8">
                            <ShieldCheck size={40} className="text-teal-300" />
                        </div>
                        <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/20">
                            Privacy-First Platform
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-6">
                            Health Data Protection<br />
                            <span className="text-teal-300">& Privacy Compliance</span>
                        </h1>
                        <p className="text-lg text-teal-100 max-w-2xl mx-auto font-medium leading-relaxed">
                            Blood Connect is committed to safeguarding the privacy, confidentiality, and security
                            of personal and health-related information — following HIPAA principles, Indian data
                            protection norms, and globally recognized security standards.
                        </p>
                        <button
                            onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
                            className="mt-10 flex items-center justify-center space-x-2 text-teal-200 text-sm font-medium animate-bounce cursor-pointer hover:text-white transition-colors mx-auto"
                        >
                            <span>Explore our commitments</span>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div ref={contentRef} className="max-w-5xl mx-auto px-6 py-20">

                {/* Intro */}
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-1.5 bg-teal-500/10 text-teal-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-teal-200 mb-4">
                            6 Core Commitments
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                            How We Protect Your Data
                        </h2>
                        <p className="text-slate-500 mt-3 max-w-xl mx-auto font-medium text-sm leading-relaxed">
                            This ensures trust and safety for donors, hospitals, and partners in India and across international regions.
                        </p>
                    </div>
                </Reveal>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
                    {sections.map((s, i) => (
                        <PolicyCard key={i} {...s} delay={i * 80} />
                    ))}
                </div>

                {/* Trust CTA */}
                <Reveal>
                    <div className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 rounded-[2.5rem] p-12 text-white text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                                <Heart size={32} className="text-red-300" />
                            </div>
                            <h2 className="text-4xl font-black tracking-tight mb-4">Privacy Builds Trust</h2>
                            <p className="text-teal-100 font-medium max-w-2xl mx-auto leading-relaxed mb-3">
                                Protecting health information is a shared responsibility.
                            </p>
                            <p className="text-teal-200 text-sm max-w-2xl mx-auto leading-relaxed mb-10">
                                By aligning with Indian healthcare data practices and international privacy principles,
                                Blood Connect provides a <span className="text-white font-black">secure, trustworthy, and privacy-first</span> platform
                                that supports life-saving blood donation services worldwide.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/register">
                                    <button className="flex items-center space-x-2 bg-white text-teal-800 font-black px-8 py-4 rounded-2xl hover:bg-teal-50 transition-all shadow-xl hover:scale-105 text-sm uppercase tracking-widest">
                                        <Heart size={18} />
                                        <span>Register as Donor</span>
                                    </button>
                                </Link>
                                <Link to="/safety-protocols">
                                    <button className="flex items-center space-x-2 bg-white/10 text-white border border-white/20 font-black px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-sm uppercase tracking-widest">
                                        <ArrowRight size={18} />
                                        <span>Safety Protocols</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default HealthDataProtection;
