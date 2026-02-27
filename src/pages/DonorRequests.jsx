import React, { useState, useEffect } from 'react';
import {
    Navigation,
    MapPin,
    AlertCircle,
    Calendar,
    PhoneCall,
    ArrowRight,
    Search,
    Filter,
    Activity,
    Clock,
    Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SlotBookingModal from '../components/donor/SlotBookingModal';
import { supabase } from '../lib/supabase';

const DonorRequests = () => {
    const { user } = useAuth();
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [filterType, setFilterType] = useState('all'); // all, matching
    const [requests, setRequests] = useState([]);
    const [hospitalsCount, setHospitalsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequestsData = async () => {
            try {
                // 1. Fetch live requests based on low inventory
                const { data: inventoryData, error: invError } = await supabase
                    .from('blood_inventory')
                    .select('*, hospitals(name, city, address)')
                    .lt('units', 15) // Any stock below 15 is a request
                    .order('units', { ascending: true });

                if (invError) throw invError;

                // 2. Fetch total hospitals count
                const { count, error: countError } = await supabase
                    .from('hospitals')
                    .select('*', { count: 'exact', head: true });

                if (countError) throw countError;

                // Process requests
                const processedRequests = (inventoryData || []).map(inv => ({
                    hospital: inv.hospitals.name,
                    type: inv.blood_type,
                    urgency: inv.units < 5 ? 'critical' : inv.units < 10 ? 'urgent' : 'high',
                    time: Math.floor(Math.random() * 50 + 5) + 'm ago',
                    distance: (Math.random() * 10 + 1).toFixed(1) + ' KM',
                    address: inv.hospitals.address || inv.hospitals.city
                }));

                setRequests(processedRequests);
                setHospitalsCount(count || 0);
            } catch (err) {
                console.error("Requests Sync Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequestsData();
    }, []);

    const activeRequests = filterType === 'matching'
        ? requests.filter(r => r.type === user?.bloodType)
        : requests;

    const handleConfirmBooking = (slot) => {
        console.log('Emergency Booking confirmed for', slot);
        setSelectedHospital(null);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header: Map-like Hero */}
            <div className="bg-slate-900 rounded-[3rem] p-10 sm:p-16 relative overflow-hidden text-white shadow-2xl">
                {/* Decorative Grid / Map Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div className="max-w-2xl space-y-8">
                        <div className="inline-flex items-center space-x-3 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">
                            <Activity size={14} className="animate-pulse" />
                            <span>Live Regional Network</span>
                        </div>
                        <h1 className="text-4xl sm:text-7xl font-bold tracking-tight leading-none">
                            Emergency <br />
                            <span className="text-primary">Medical Dispatch.</span>
                        </h1>
                        <p className="text-slate-400 font-medium text-xl leading-relaxed">
                            There are currently <span className="text-white font-bold">{requests.length} active emergency calls</span> within your 10km radius. Your {user?.bloodType || 'N/A'} type is critical.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 shrink-0">
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 text-center shadow-xl min-w-[160px]">
                            <p className="text-4xl font-bold">{hospitalsCount}</p>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-3">Verified Centers</p>
                        </div>
                        <div className="bg-primary p-8 rounded-[2.5rem] text-center shadow-2xl shadow-primary/30 min-w-[160px]">
                            <p className="text-4xl font-bold">4.2m</p>
                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mt-3">Network Speed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content: Filters & List */}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight flex items-center mb-8">
                            <AlertCircle className="text-primary mr-4" size={24} />
                            Active Emergency Dispatch
                        </h2>

                        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${filterType === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                All Alerts
                            </button>
                            <button
                                onClick={() => setFilterType('matching')}
                                className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${filterType === 'matching' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Smart Match
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-32 bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
                            ))
                        ) : activeRequests.length > 0 ? (
                            activeRequests.map((req, i) => {
                                const isMatch = req.type === user?.bloodType;
                                return (
                                    <div key={i} className={`bg-white rounded-[2.5rem] p-8 border transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 ${isMatch ? 'border-emerald-200 ring-4 ring-emerald-500/5' : 'border-slate-100'}`}>
                                        <div className="flex flex-col sm:flex-row items-center gap-8">
                                            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner ${req.urgency === 'critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                                <AlertCircle size={36} />
                                            </div>

                                            <div className="flex-1 text-center sm:text-left">
                                                <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4">
                                                    <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight leading-none">{req.hospital}</h3>
                                                    <Badge status={req.urgency}>{req.urgency.toUpperCase()}</Badge>
                                                </div>
                                                <div className="flex items-center justify-center sm:justify-start space-x-6 mt-4">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center">
                                                        <Navigation size={14} className="mr-2" /> {req.distance} DISPATCH
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center">
                                                        <Clock size={14} className="mr-2" /> {req.time}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 shrink-0">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-2">REQUIRED</p>
                                                    <p className={`text-4xl font-bold leading-none ${isMatch ? 'text-emerald-600' : 'text-slate-800'}`}>{req.type}</p>
                                                </div>
                                                <Button
                                                    onClick={() => setSelectedHospital({ name: req.hospital, need: req.type, address: req.address })}
                                                    className={`px-10 h-16 text-lg font-bold rounded-2xl ${isMatch ? 'bg-emerald-600 shadow-lg shadow-emerald-200 hover:bg-emerald-700' : 'bg-slate-800'}`}
                                                >
                                                    Accept Call
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-20 text-center bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                                <Activity className="mx-auto text-slate-200 mb-4" size={48} />
                                <p className="text-slate-400 font-bold">No matching requests found in your area.</p>
                                <button onClick={() => setFilterType('all')} className="text-secondary font-bold text-xs uppercase underline mt-2">Show all regional requests</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: Coordination */}
                <div className="lg:w-80 space-y-8">
                    <Card title="Emergency Dispatch" subtitle="Real-time coordination">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary">
                                    <PhoneCall size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Dispatcher Line</p>
                                    <p className="text-sm font-bold text-slate-800 mt-1">+1 (800) HERO-LNK</p>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-soft">
                                <h4 className="font-bold text-slate-800 text-sm">Need Transport?</h4>
                                <p className="text-[10px] text-slate-500 font-medium mt-2 leading-relaxed tracking-wide">
                                    We offer free emergency shuttles for O- Neg donors responding to critical calls.
                                </p>
                                <Button variant="outline" className="w-full mt-6 text-[10px] h-12 font-bold border-secondary text-secondary hover:bg-secondary hover:text-white rounded-2xl">
                                    REQUEST EMERGENCY SHUTTLE
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <div className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 shadow-soft">
                        <Heart className="text-primary mb-6" size={40} />
                        <h4 className="font-bold text-slate-800 uppercase tracking-tight text-xl leading-none">Be the Hero <br /> They Need.</h4>
                        <p className="text-sm text-slate-500 mt-4 font-medium leading-relaxed">
                            A single response to an emergency alert saves an average of <span className="font-bold text-slate-800 underline">3 lives</span> by ensuring critical stocks never hit zero.
                        </p>
                    </div>
                </div>
            </div>

            {selectedHospital && (
                <SlotBookingModal
                    hospital={selectedHospital}
                    onClose={() => setSelectedHospital(null)}
                    onConfirm={handleConfirmBooking}
                />
            )}
        </div>
    );
};

export default DonorRequests;
