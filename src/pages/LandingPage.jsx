import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Heart, ArrowRight, Activity, User, Droplet } from 'lucide-react';
import Button from '../components/ui/Button';
import { BloodCellNetwork } from '../components/3d/ThreeVisuals';
import BloodTypeCard from '../components/ui/BloodTypeCard';
import { INVENTORY_DATA } from '../data/mockData';

const LandingPage = () => {
    const [matchIndex, setMatchIndex] = React.useState(0);
    const matches = [
        { type: 'O- Negative', status: 'Found' },
        { type: 'A+ Positive', status: 'Matched' },
        { type: 'B- Negative', status: 'Emergency' },
        { type: 'AB+ Alert', status: 'Verified' }
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMatchIndex((prev) => (prev + 1) % matches.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-24 pb-24 relative overflow-hidden">
            <BloodCellNetwork />

            {/* Hero Section */}
            <section className="relative pt-20 px-6 sm:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 relative z-10">
                    <div className="inline-flex items-center px-4 py-2 bg-red-50 text-primary rounded-full text-sm font-bold border border-red-100 animate-bounce">
                        <Zap size={16} className="mr-2 fill-current" />
                        Healthcare-Grade Emergency Coordination
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 leading-[1.1]">
                        Connecting Hospitals. <br />
                        <span className="text-primary">Saving Lives.</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
                        The world's first AI-powered blood inventory and emergency donor coordination platform. Built for speed, safety, and reliability.
                    </p>

                    <div className="flex items-center space-x-8 pt-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                            Joined by <span className="text-slate-900 font-bold">12,000+</span> active donors
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-3xl -z-10 animate-pulse"></div>
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-soft relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                            <Activity size={120} />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 uppercase tracking-tight text-xl">Live AI Matching</h3>
                                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping"></span>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { label: 'Demand Forecasting', value: '98.4%', color: 'bg-emerald-500' },
                                    { label: 'Donor Matching Speed', value: '2.4 min', color: 'bg-secondary' },
                                    { label: 'Inventory Level', value: 'Critical', color: 'bg-primary' },
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest px-1">
                                            <span className="text-slate-400">{stat.label}</span>
                                            <span className="text-slate-900">{stat.value}</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                            <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating element */}
                    <div className="absolute -bottom-24 -right-4 lg:-right-10 bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100 flex items-center space-x-4 animate-bounce z-20 transition-all duration-500">
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner shrink-0">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <div className="min-w-[140px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Match</p>
                            <p className="text-base font-bold text-slate-800 transition-opacity duration-300">
                                {matches[matchIndex].type} {matches[matchIndex].status}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Inventory Preview */}
            <section id="inventory" className="py-32 px-6 sm:px-12 bg-slate-50 relative z-10">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center px-4 py-2 bg-secondary/5 text-secondary rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-secondary/10">
                            Regional Command Center
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-bold text-slate-800 tracking-tight">Real-Time Blood Availability</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                            Our live-tracking system monitors supply levels across all network hospitals.
                            Pulse animation indicates critical stock levels requiring immediate replenishment.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                        {INVENTORY_DATA.map((item) => (
                            <BloodTypeCard key={item.type} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {[
                        { icon: User, title: 'Register', desc: 'Create your donor profile. Manage availability and preferences securely with healthcare protocols.' },
                        { icon: Zap, title: 'Match', desc: 'Our AI instantly matches your blood type with emergency hospital requests within seconds.' },
                        { icon: Heart, title: 'Save Lives', desc: 'Respond to alerts, donate at nearby facilities, and track your life-saving impact over time.' }
                    ].map((step, i) => (
                        <div key={i} className="relative group p-12 rounded-[3rem] bg-white border border-slate-50 shadow-soft hover:shadow-lg transition-all">
                            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                                <step.icon size={36} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-6 tracking-tight">{step.title}</h3>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">{step.desc}</p>
                            <div className="absolute top-10 right-10 text-9xl font-bold text-slate-100/50 -z-10 group-hover:text-primary/5 transition-colors">0{i + 1}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust Quote / Stats */}
            <section className="bg-secondary p-12 sm:p-32 mx-6 sm:mx-12 rounded-[4rem] text-white relative z-10 shadow-2xl shadow-secondary/20 border-4 border-white/10">
                <div className="max-w-5xl mx-auto text-center space-y-20">
                    <Shield className="mx-auto text-white/20" size={80} />
                    <h2 className="text-3xl sm:text-6xl font-bold leading-[1.1] tracking-tighter">
                        "Blood Connect has reduced our emergency response time by 45%. It’s a game-changer for critical care."
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-12 sm:space-y-0 sm:space-x-16">
                        <div>
                            <p className="text-5xl font-bold">4.2min</p>
                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Avg. Response</p>
                        </div>
                        <div className="w-px h-16 bg-white/20 hidden sm:block"></div>
                        <div>
                            <p className="text-5xl font-bold">120k+</p>
                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Lives Impacted</p>
                        </div>
                        <div className="w-px h-16 bg-white/20 hidden sm:block"></div>
                        <div>
                            <p className="text-5xl font-bold">100%</p>
                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-4">Secure Handoff</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 sm:px-12 max-w-5xl mx-auto text-center space-y-16 relative z-10">
                <div className="space-y-6">
                    <h2 className="text-4xl sm:text-7xl font-bold text-slate-800 tracking-tight">Ready to make an impact?</h2>
                    <p className="text-xl text-slate-500 font-medium">Join the global network of healthcare heroes.</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                        <Link to="/register" className="w-full sm:w-auto">
                            <Button className="w-full h-20 px-16 text-2xl shadow-2xl shadow-primary/30 pulse-red font-bold">Join the Donor Network</Button>
                        </Link>
                        <Link to="/hospital/login" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full h-20 px-16 text-2xl items-center flex border-2 font-bold">
                                Hospital Integration <ArrowRight className="ml-4" size={28} />
                            </Button>
                        </Link>
                    </div>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                        Already a donor? <Link to="/login" className="text-primary hover:underline">Log in to your dashboard</Link>
                    </p>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;
