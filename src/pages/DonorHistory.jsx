import React from 'react';
import {
    History,
    Calendar,
    MapPin,
    Award,
    Download,
    ExternalLink,
    FileText,
    TrendingUp,
    Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { DONATION_HISTORY } from '../data/mockData';

const DonorHistory = () => {
    const { user } = useAuth();

    // Stats calculation
    const totalDonations = DONATION_HISTORY.length;
    const totalPoints = DONATION_HISTORY.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <div className="space-y-10 pb-20">
            {/* Header / Summary */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 text-primary/5 -z-0">
                    <History size={200} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-primary">
                            <History size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Verified History</span>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-800 tracking-tight leading-none">Your Donation Legacy</h1>
                        <p className="text-slate-500 font-medium text-lg">Tracking every life you've touched since joining.</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="bg-slate-50 px-10 py-6 rounded-[2.5rem] border border-slate-100/50 text-center shadow-sm">
                            <p className="text-4xl font-bold text-slate-800">{totalDonations}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Verified Acts</p>
                        </div>
                        <div className="bg-secondary px-10 py-6 rounded-[2.5rem] text-white text-center shadow-lg shadow-secondary/10">
                            <p className="text-4xl font-bold">{totalPoints}</p>
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-2">Hero Points</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Timeline / List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight flex items-center mb-6">
                        <Calendar className="text-secondary mr-4" size={24} />
                        Recent Contributions
                    </h2>

                    <div className="space-y-4">
                        {DONATION_HISTORY.map((entry, i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:border-secondary transition-all group">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center border border-slate-100 text-slate-400 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all shadow-sm">
                                        <p className="text-[10px] font-bold uppercase leading-none tracking-widest mb-1">{entry.date.split('-')[1]}</p>
                                        <p className="text-2xl font-bold leading-none">{entry.date.split('-')[2]}</p>
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4">
                                            <h4 className="font-bold text-slate-800 tracking-tight uppercase text-xl leading-none">{entry.hospital}</h4>
                                            <Badge status="available" className="scale-75 origin-left">Verified Dispatch</Badge>
                                        </div>
                                        <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                                <Heart size={10} className="mr-1 text-primary" /> {entry.units}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                                <MapPin size={10} className="mr-1" /> Regional Center
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-3">
                                        <p className="text-2xl font-bold text-emerald-600 leading-none">+{entry.points} XP</p>
                                        <button className="text-[10px] font-bold text-secondary hover:underline flex items-center uppercase tracking-widest">
                                            Full Report <ExternalLink size={12} className="ml-1.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Digital Identity & Milestone */}
                <div className="space-y-8">
                    <Card title="Digital Credentials">
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary border border-slate-100">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">Latest Document</p>
                                        <p className="text-xs font-bold text-slate-800 mt-2">Donation #BC-9842</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full text-xs font-bold space-x-3 h-12 rounded-xl">
                                    <Download size={16} />
                                    <span>Download PDF Credentials</span>
                                </Button>
                            </div>

                            <div className="p-8 bg-secondary text-white rounded-[2.5rem] relative overflow-hidden group shadow-lg shadow-secondary/20">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                    <Award size={100} />
                                </div>
                                <h4 className="font-bold text-xl leading-tight uppercase tracking-tight">Lifetime Rank</h4>
                                <p className="text-[10px] font-bold mt-2 text-white/50 uppercase tracking-[0.3em]">Verified Since 2024</p>
                                <div className="mt-8 flex items-baseline space-x-3">
                                    <span className="text-4xl font-bold">Gold</span>
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.4em]">Tier</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100/50 shadow-soft">
                        <TrendingUp className="text-emerald-600 mb-6" size={40} />
                        <h4 className="font-bold text-emerald-900 uppercase tracking-tight text-xl leading-none">Contribution Power</h4>
                        <p className="text-sm text-emerald-800/60 mt-4 font-medium leading-relaxed">
                            Your last 3 donations had zero deferrals. This high reliability score boosts your priority in critical matching.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorHistory;
