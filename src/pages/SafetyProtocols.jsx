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
        <div className={`${bg} ${border} border rounded-[2.5rem] p-8 hover:-translate-y-2 transition-all hover:shadow-xl`}>
            <div className="flex items-center space-x-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm`}>
                    <Icon size={24} className={color} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl tracking-tight leading-tight">{title}</h3>
            </div>
            <ul className="space-y-4">
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
            title: 'Sterile Environment',
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
            title: 'Licensed Professionals',
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
            title: 'Privacy & Security',
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
            title: 'Testing & Storage',
            color: 'text-primary',
            bg: 'bg-red-50',
            border: 'border-red-100',
            items: [
                'Donated blood is tested for infectious diseases',
                'Stored under regulated temperature conditions',
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
    ];

    return (
        <div className="min-h-screen bg-white font-inter">

            {/* ── Hero ── */}
            <div className="relative bg-gradient-to-br from-slate-900 via-[#1e3a8a] to-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />

                <div className="relative max-w-5xl mx-auto px-6 py-32 text-center">
                    <div
                        className="transition-all duration-1000"
                        style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(40px)' }}
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-3xl mb-10 shadow-2xl backdrop-blur-sm border border-white/20">
                            <ShieldCheck size={48} className="text-white" />
                        </div>
                        <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-10 border border-white/20">
                            Verified Medical Protocol
                        </div>
                        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight leading-[0.9] mb-10">
                            Safety <br />Infrastructure
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                            Our network operates under strict clinical guidelines to ensure 100% safety for both donors and recipients.
                        </p>
                        <button
                            onClick={scrollToContent}
                            className="flex items-center justify-center space-x-3 text-blue-300 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mx-auto group"
                        >
                            <span>Explore standards</span>
                            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-24">
                <Reveal>
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-5 py-2 bg-secondary/5 text-secondary rounded-full text-[10px] font-bold uppercase tracking-[0.3em] border border-secondary/10 mb-8">
                            Quality Assurance
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-bold text-slate-800 tracking-tight leading-tight">
                            Integrity at Every Level
                        </h2>
                        <p className="text-slate-500 mt-6 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                            Every single donation on our platform is tracked and governed by a multi-layered verification engine.
                        </p>
                    </div>
                </Reveal>

                {/* Protocol cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {protocols.map((p, i) => (
                        <ProtocolCard key={i} {...p} delay={i * 100} />
                    ))}
                </div>

                {/* Commitment CTA */}
                <Reveal>
                    <div className="relative bg-gradient-to-br from-secondary via-blue-700 to-slate-950 rounded-[3rem] p-16 text-white text-center overflow-hidden shadow-2xl shadow-secondary/20 border border-white/10">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-10 backdrop-blur-sm border border-white/20">
                                <Heart size={40} className="text-red-300" />
                            </div>
                            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">Clinical Trust</h2>
                            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-12 text-xl font-medium">
                                Join a network that refuses to compromise on safety.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/register">
                                    <button className="flex items-center space-x-3 bg-white text-secondary font-bold px-12 py-6 rounded-2xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 text-sm uppercase tracking-[0.2em]">
                                        <Heart size={20} />
                                        <span>Join Network</span>
                                    </button>
                                </Link>
                                <Link to="/donation-guide">
                                    <button className="flex items-center space-x-3 bg-white/10 text-white border border-white/20 font-bold px-12 py-6 rounded-2xl hover:bg-white/20 transition-all text-sm uppercase tracking-[0.2em]">
                                        <ArrowRight size={20} />
                                        <span>View Guide</span>
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
