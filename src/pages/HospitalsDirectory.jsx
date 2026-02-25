import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Droplets, Search, Filter, Heart, Building2, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

const BLOOD_TYPES = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// Fallback mock data shown while no hospitals are registered in Supabase
const MOCK_HOSPITALS = [
    {
        id: 'm1', name: 'Apollo Hospitals', location: 'Bannerghatta Road, Bangalore',
        phone: '+91 80 2630 4050', hours: '24 / 7', status: 'active',
        bloodBank: { 'A+': 85, 'A-': 30, 'B+': 60, 'B-': 15, 'O+': 90, 'O-': 10, 'AB+': 45, 'AB-': 8 },
    },
    {
        id: 'm2', name: 'Manipal Hospital', location: 'HAL Airport Road, Bangalore',
        phone: '+91 80 2502 4444', hours: '24 / 7', status: 'active',
        bloodBank: { 'A+': 20, 'A-': 5, 'B+': 75, 'B-': 40, 'O+': 15, 'O-': 35, 'AB+': 60, 'AB-': 12 },
    },
    {
        id: 'm3', name: 'Fortis Hospital', location: 'Cunningham Road, Bangalore',
        phone: '+91 80 6621 4444', hours: '24 / 7', status: 'active',
        bloodBank: { 'A+': 55, 'A-': 20, 'B+': 30, 'B-': 8, 'O+': 70, 'O-': 5, 'AB+': 25, 'AB-': 3 },
    },
    {
        id: 'm4', name: 'Narayana Health City', location: 'Hosur Road, Bangalore',
        phone: '+91 80 7122 2222', hours: '24 / 7', status: 'active',
        bloodBank: { 'A+': 95, 'A-': 45, 'B+': 80, 'B-': 22, 'O+': 100, 'O-': 18, 'AB+': 55, 'AB-': 10 },
    },
    {
        id: 'm5', name: 'St. John\'s Medical College Hospital', location: 'Sarjapur Road, Bangalore',
        phone: '+91 80 2206 5000', hours: '24 / 7', status: 'active',
        bloodBank: { 'A+': 70, 'A-': 25, 'B+': 65, 'B-': 18, 'O+': 80, 'O-': 14, 'AB+': 38, 'AB-': 6 },
    },
    {
        id: 'm6', name: 'BGS Gleneagles Global Hospital', location: 'Kengeri, Bangalore',
        phone: '+91 80 6717 0000', hours: '24 / 7', status: 'active',
        bloodBank: { 'A+': 40, 'A-': 12, 'B+': 50, 'B-': 7, 'O+': 35, 'O-': 2, 'AB+': 20, 'AB-': 1 },
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const stockLevel = (units) => {
    if (units >= 50) return { color: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' };
    if (units >= 20) return { color: 'bg-amber-400', text: 'text-amber-700', bg: 'bg-amber-50' };
    if (units > 0) return { color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' };
    return { color: 'bg-slate-300', text: 'text-slate-400', bg: 'bg-slate-50' };
};

const BloodPill = ({ type, units }) => {
    const s = stockLevel(units);
    return (
        <div className={`${s.bg} rounded-xl px-3 py-2 flex flex-col items-center min-w-[52px]`}>
            <span className={`font-black text-sm ${s.text}`}>{type}</span>
            <span className={`text-[10px] font-bold ${s.text} opacity-80`}>{units}u</span>
            <div className={`mt-1.5 w-full h-1 rounded-full ${s.color} opacity-70`} />
        </div>
    );
};

// ─── Hospital Card ────────────────────────────────────────────────────────────
const HospitalCard = ({ hospital, delay }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const bloodBank = hospital.bloodBank || {};
    const isLimited = hospital.status === 'limited';

    return (
        <div
            ref={ref}
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.2s`,
            }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Building2 size={22} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 text-base leading-tight">{hospital.name}</h3>
                        <div className="flex items-center space-x-1 mt-0.5">
                            <MapPin size={11} className="text-slate-400" />
                            <p className="text-slate-400 text-xs font-medium">{hospital.location || `${hospital.city || ''}, ${hospital.state || ''}`}</p>
                        </div>
                    </div>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${isLimited ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {isLimited ? 'Limited' : 'Active'}
                </span>
            </div>

            <div className="flex items-center space-x-4 mb-5 text-xs text-slate-500 font-medium">
                <div className="flex items-center space-x-1"><Phone size={11} /><span>{hospital.phone}</span></div>
                <div className="flex items-center space-x-1"><Clock size={11} /><span>{hospital.hours || '24 / 7'}</span></div>
            </div>

            <div>
                <div className="flex items-center space-x-2 mb-3">
                    <Droplets size={13} className="text-primary" />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Blood Bank Inventory</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {BLOOD_TYPES.filter(t => t !== 'All').map(type => (
                        <BloodPill key={type} type={type} units={bloodBank[type] ?? 0} />
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-50">
                {[['bg-emerald-500', 'High (50+)'], ['bg-amber-400', 'Moderate (20–49)'], ['bg-red-500', 'Low (<20)']].map(([c, l]) => (
                    <div key={l} className="flex items-center space-x-1.5">
                        <div className={`w-2 h-2 rounded-full ${c}`} />
                        <span className="text-[10px] text-slate-400 font-medium">{l}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const HospitalsDirectory = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMock, setIsMock] = useState(false);
    const [search, setSearch] = useState('');
    const [bloodFilter, setBloodFilter] = useState('All');
    const [heroVisible, setHeroVisible] = useState(false);
    useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

    const fetchHospitals = async () => {
        setLoading(true);
        const { data: hospData, error } = await supabase
            .from('hospitals')
            .select('*, blood_inventory(blood_type, units)')
            .eq('status', 'active');

        if (error || !hospData || hospData.length === 0) {
            // Fall back to mock data if table is empty or not yet created
            setHospitals(MOCK_HOSPITALS);
            setIsMock(true);
        } else {
            const mapped = hospData.map(h => ({
                id: h.id,
                name: h.name,
                location: h.address ? `${h.address}, ${h.city}` : `${h.city || ''}, ${h.state || ''}`,
                phone: h.phone || 'N/A',
                hours: '24 / 7',
                status: h.status,
                bloodBank: Object.fromEntries(
                    (h.blood_inventory || []).map(inv => [inv.blood_type, inv.units])
                ),
            }));
            setHospitals(mapped);
            setIsMock(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchHospitals();

        // Realtime subscription for blood inventory updates
        const channel = supabase
            .channel('blood-inventory-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'blood_inventory' }, () => {
                fetchHospitals();
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const filtered = hospitals.filter(h => {
        const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
            (h.location || '').toLowerCase().includes(search.toLowerCase());
        const matchesBlood = bloodFilter === 'All' || (h.bloodBank?.[bloodFilter] ?? 0) > 0;
        return matchesSearch && matchesBlood;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-inter">

            {/* ── Hero ── */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #E82C2C 0%, transparent 60%)' }} />
                <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="transition-all duration-1000" style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
                    }}>
                        <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/10">
                            🏥 {loading ? '...' : `${hospitals.length} Registered Hospitals`}
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">
                            Hospital <span className="text-primary">Directory</span>
                        </h1>
                        <p className="text-slate-300 text-lg font-medium max-w-xl mx-auto">
                            Browse all registered hospitals with live blood bank stock levels.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Search & Filter Bar ── */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search hospital or location…"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                        />
                    </div>
                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                        <Filter size={14} className="text-slate-400 shrink-0" />
                        {BLOOD_TYPES.map(bt => (
                            <button
                                key={bt}
                                onClick={() => setBloodFilter(bt)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${bloodFilter === bt ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            >
                                {bt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Cards Grid ── */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex items-center justify-center py-24 space-x-3 text-slate-400">
                        <RefreshCw size={24} className="animate-spin" />
                        <span className="font-bold text-lg">Loading hospitals…</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24 text-slate-400">
                        <Droplets size={48} className="mx-auto mb-4 opacity-30" />
                        <p className="font-bold text-lg">No hospitals found</p>
                        <p className="text-sm mt-1">Try a different search or blood type filter</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                {filtered.length} hospital{filtered.length !== 1 ? 's' : ''} found
                                {isMock && <span className="ml-2 text-amber-500">(sample data — register your hospital to appear here)</span>}
                            </p>
                            <button onClick={fetchHospitals} className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-primary transition-colors font-bold">
                                <RefreshCw size={12} />
                                <span>Refresh</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filtered.map((h, i) => (
                                <HospitalCard key={h.id} hospital={h} delay={i * 60} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ── CTA ── */}
            <div className="max-w-6xl mx-auto px-6 pb-20">
                <div className="bg-gradient-to-br from-primary to-red-800 rounded-3xl p-10 text-white text-center">
                    <Heart size={32} className="mx-auto mb-4 text-white/80" />
                    <h2 className="text-3xl font-black tracking-tight mb-2">Is Your Hospital Listed?</h2>
                    <p className="text-red-100 font-medium mb-7">Register on Blood Connect and join the life-saving network today.</p>
                    <Link to="/hospital/register">
                        <button className="bg-white text-primary font-black px-8 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-xl hover:scale-105 text-sm uppercase tracking-widest">
                            Register Your Hospital
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HospitalsDirectory;
