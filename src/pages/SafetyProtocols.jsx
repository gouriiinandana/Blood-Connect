import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck, FlaskConical, Sparkles, UserCheck, Lock,
    Droplets, Clock, BadgeCheck, Heart, ChevronDown, ArrowRight
} from 'lucide-react';

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
const useReveal = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

// ─── Animated wrapper ─────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
    const [ref, visible] = useReveal();
    const transform = {
        up: 'translateY(28px)',
        left: 'translateX(-24px)',
        right: 'translateX(24px)',
    }[direction];

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : transform,
                transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

// ─── Protocol Section card ────────────────────────────────────────────────────
const ProtocolCard = ({ icon: Icon, title, items, color, bg, border, delay }) => (
    <Reveal delay={delay}>
        <div className={`${bg} ${border} border rounded-3xl p-7 hover:-translate-y-1 transition-transform`}>
            <div className="flex items-center space-x-3 mb-5">
                <div className={`w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm`}>
                    <Icon size={20} className={color} />
                </div>
                <h3 className="font-black text-slate-800 text-lg tracking-tight">{title}</h3>
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
const SafetyProtocols = () => {
    const [heroVisible, setHeroVisible] = useState(false);
    const contentRef = useRef(null);
    useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

    const scrollToContent = () => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const protocols = [
        {
            icon: FlaskConical,
            title: 'Medical Screening',
            color: 'text-violet-500',
            bg: 'bg-violet-50',
            border: 'border-violet-100',
            items: [
                'Every donor undergoes a pre-donation health check',
                'Blood pressure, hemoglobin, and medical history are verified',
                'Donations are accepted only if medically safe',
            ],
        },
        {
            icon: Sparkles,
            title: 'Sterile & Hygienic Environment',
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            items: [
                'Single-use, disposable needles for every donor',
                'All equipment is sterile and never reused',
                'Donation areas are regularly sanitized',
            ],
        },
        {
            icon: UserCheck,
            title: 'Trained Healthcare Professionals',
            color: 'text-secondary',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            items: [
                'Donations are handled by qualified doctors and nurses',
                'Medical staff are trained in emergency response',
                'Donors are monitored throughout the process',
            ],
        },
        {
            icon: Lock,
            title: 'Donor Privacy & Data Security',
            color: 'text-amber-500',
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            items: [
                'Personal and medical information is kept confidential',
                'Data is shared only with authorized hospitals',
                'Secure systems protect donor records',
            ],
        },
        {
            icon: Droplets,
            title: 'Blood Testing & Storage',
            color: 'text-primary',
            bg: 'bg-red-50',
            border: 'border-red-100',
            items: [
                'Donated blood is tested for infectious diseases',
                'Stored under regulated temperature and conditions',
                'Only safe blood units are released to hospitals',
            ],
        },
        {
            icon: Clock,
            title: 'Post-Donation Care',
            color: 'text-rose-500',
            bg: 'bg-rose-50',
            border: 'border-rose-100',
            items: [
                'Donors are observed after donation',
                'Refreshments and rest are provided',
                'Guidance is given for after-donation care',
            ],
        },
        {
            icon: BadgeCheck,
            title: 'Compliance with Medical Standards',
            color: 'text-teal-500',
            bg: 'bg-teal-50',
            border: 'border-teal-100',
            items: [
                'All donations follow national health guidelines',
                'Hospital-approved protocols are strictly followed',
                'Continuous monitoring ensures donor safety',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white font-inter">

            {/* ── Hero ── */}
            <div className="relative bg-gradient-to-br from-slate-900 via-secondary to-slate-800 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-grid-white/[0.03]" />

                <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
                    <div
                        className="transition-all duration-1000"
                        style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(40px)' }}
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-8">
                            <ShieldCheck size={40} className="text-white" />
                        </div>
                        <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/20">
                            Medical Grade Standards
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none mb-6">
                            Safety Protocols
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
                            At Blood Connect, donor and patient safety is our highest priority. All blood donations follow strict medical and hygiene standards.
                        </p>
                        <button
                            onClick={scrollToContent}
                            className="mt-10 flex items-center justify-center space-x-2 text-blue-200 text-sm font-medium animate-bounce cursor-pointer hover:text-white transition-colors mx-auto"
                        >
                            <span>Explore protocols</span>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div ref={contentRef} className="max-w-5xl mx-auto px-6 py-20">

                {/* Intro badge */}
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-1.5 bg-secondary/5 text-secondary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-secondary/10 mb-4">
                            7 Core Protocols
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                            How We Keep You Safe
                        </h2>
                        <p className="text-slate-500 mt-3 max-w-xl mx-auto font-medium">
                            Every step of the donation process is governed by evidence-based medical standards and monitored by trained professionals.
                        </p>
                    </div>
                </Reveal>

                {/* Protocol cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
                    {protocols.map((p, i) => (
                        <ProtocolCard key={i} {...p} delay={i * 80} />
                    ))}
                </div>

                {/* Commitment CTA */}
                <Reveal>
                    <div className="relative bg-gradient-to-br from-secondary via-blue-700 to-slate-900 rounded-[2.5rem] p-12 text-white text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                                <Heart size={32} className="text-red-300" />
                            </div>
                            <h2 className="text-4xl font-black tracking-tight mb-4">Our Commitment</h2>
                            <p className="text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                                Blood Connect is committed to creating a <span className="font-black text-white">safe, transparent, and reliable</span> blood donation ecosystem that protects donors while saving lives.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/register">
                                    <button className="flex items-center space-x-2 bg-white text-secondary font-black px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:scale-105 text-sm uppercase tracking-widest">
                                        <Heart size={18} />
                                        <span>Register as Donor</span>
                                    </button>
                                </Link>
                                <Link to="/donation-guide">
                                    <button className="flex items-center space-x-2 bg-white/10 text-white border border-white/20 font-black px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-sm uppercase tracking-widest">
                                        <ArrowRight size={18} />
                                        <span>Donation Guide</span>
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

export default SafetyProtocols;
