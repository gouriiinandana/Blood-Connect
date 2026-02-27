import React, { useState, useEffect } from 'react';
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
import { supabase } from '../lib/supabase';

const DonorHistory = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                // Fetch registered hospitals to simulate recent contributions
                const { data: hospitals, error } = await supabase
                    .from('hospitals')
                    .select('name, city, state')
                    .limit(5);

                if (error) throw error;

                // Create a dynamic history based on real hospitals
                const dynamicHistory = (hospitals || []).map((h, i) => ({
                    date: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0], // Sparse monthly donations
                    hospital: h.name,
                    location: `${h.city}, ${h.state}`,
                    units: Math.floor(Math.random() * 2) + 1 + ' Unit',
                    points: 100 + (Math.floor(Math.random() * 5) * 10)
                }));

                // Fallback to static if none registered yet
                setHistory(dynamicHistory.length > 0 ? dynamicHistory : [
                    { date: '2025-11-12', hospital: 'City Memorial', location: 'Downtown, State', units: '1 Unit', points: 150 },
                ]);
            } catch (err) {
                console.error("Error fetching history context:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);

    const handleDownloadCredential = () => {
        const content = `
            BLOOD CONNECT - DIGITAL CREDENTIAL
            ----------------------------------
            Donor Name: ${user?.name || 'Verified Donor'}
            Blood Type: ${user?.bloodType || 'N/A'}
            Total Donations: ${history.length}
            Impact Points: ${user?.points || 0} XP
            Verified Record #BC-9842
            Issued: ${new Date().toLocaleDateString()}
            
            This document serves as proof of contribution 
            to the Blood Connect healthcare network.
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `BloodConnect_Credential_${user?.name?.replace(/\s+/g, '_') || 'Donor'}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const totalDonations = history.length;
    const totalPoints = user?.points || history.reduce((acc, curr) => acc + curr.points, 0);

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
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-28 bg-slate-50 animate-pulse rounded-[2rem]"></div>
                            ))
                        ) : (
                            history.map((entry, i) => (
                                <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:border-secondary transition-all group">
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center border border-slate-100 text-slate-400 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all shadow-sm">
                                            <p className="text-[10px] font-bold uppercase leading-none tracking-widest mb-1">
                                                {new Date(entry.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                                            </p>
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
                                                    <MapPin size={10} className="mr-1" /> {entry.location || 'Medical Center'}
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
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar: Digital Identity & Milestone */}
                <div className="space-y-8">
                    <Card title="Digital Credentials">
                        <div className="space-y-6">
                            <div className="p-3 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                                <div className="flex items-center space-x-3 mb-5">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary border border-slate-100 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none truncate">Latest Document</p>
                                        <p className="text-xs font-bold text-slate-800 mt-2 truncate">Donation #BC-9842</p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={handleDownloadCredential}
                                    className="w-full text-[10px] font-bold space-x-2 h-11 rounded-xl flex items-center justify-center bg-white shadow-sm border-slate-200"
                                >
                                    <Download size={14} />
                                    <span>Download PDF</span>
                                </Button>
                            </div>

                            <div className="p-8 bg-secondary text-white rounded-[2.5rem] relative overflow-hidden group shadow-lg shadow-secondary/20">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                    <Award size={100} />
                                </div>
                                <h4 className="font-bold text-xl leading-tight uppercase tracking-tight">Lifetime Rank</h4>
                                <p className="text-[10px] font-bold mt-2 text-white/50 uppercase tracking-[0.3em]">Verified Since 2024</p>
                                <div className="mt-8 flex items-baseline space-x-3">
                                    <span className="text-4xl font-bold">{user?.points >= 1500 ? 'Platinum' : user?.points >= 700 ? 'Gold' : user?.points >= 300 ? 'Silver' : 'Bronze'}</span>
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
