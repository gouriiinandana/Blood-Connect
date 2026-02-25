import React, { useState, useEffect } from 'react';
import {
    Plus, Users, Activity, BrainCircuit, Clock, ArrowUpRight,
    Droplet, AlertTriangle, CheckCircle, MinusCircle, Siren,
    ExternalLink, LogOut, Building2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import BloodTypeCard from '../components/ui/BloodTypeCard';
import ChartWrapper from '../components/ui/ChartWrapper';
import MapContainer from '../components/ui/MapContainer';
import Button from '../components/ui/Button';
import { useHospitalAuth } from '../context/HospitalAuthContext';
import { supabase } from '../lib/supabase';
import { RECENT_REQUESTS, DEPLETION_STATS } from '../data/mockData';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const statusConfig = {
    available: { label: 'Available', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: CheckCircle },
    low: { label: 'Low Stock', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: MinusCircle },
    critical: { label: 'Critical', color: 'text-red-600 bg-red-50 border-red-100', icon: AlertTriangle },
};

const BloodBankPanel = () => {
    const { hospital, updateInventory } = useHospitalAuth();
    const [inventory, setInventory] = useState({});
    const [saving, setSaving] = useState(null);

    useEffect(() => {
        if (!hospital?.id) return;
        // Load inventory from Supabase
        supabase
            .from('blood_inventory')
            .select('blood_type, units')
            .eq('hospital_id', hospital.id)
            .then(({ data }) => {
                if (data) {
                    const inv = {};
                    data.forEach(row => { inv[row.blood_type] = row.units; });
                    setInventory(inv);
                }
            });
    }, [hospital?.id]);

    const handleUnitChange = async (type, delta) => {
        const current = inventory[type] ?? 0;
        const newUnits = Math.max(0, current + delta);
        setInventory(prev => ({ ...prev, [type]: newUnits }));
        setSaving(type);
        await updateInventory(type, newUnits);
        setSaving(null);
    };

    if (!hospital) return null;

    return (
        <div className="space-y-4">
            {BLOOD_TYPES.map(type => {
                const units = inventory[type] ?? 0;
                const status = units === 0 ? 'critical' : units < 20 ? 'low' : 'available';
                const cfg = statusConfig[status];
                const StatusIcon = cfg.icon;
                const isSaving = saving === type;

                return (
                    <div
                        key={type}
                        className={`p-5 rounded-2xl border-2 transition-all ${status === 'critical' ? 'border-red-200 bg-red-50/70 shadow-lg shadow-red-100' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center space-x-4">
                                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black italic text-lg shadow-md ${status === 'critical' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}>
                                    {type}
                                </div>
                                <div>
                                    <p className="font-black text-slate-800">{units} <span className="font-medium text-slate-400 text-sm">units</span></p>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${cfg.color}`}>
                                        <StatusIcon size={10} className="mr-1" />
                                        {cfg.label}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                                    <button
                                        onClick={() => handleUnitChange(type, -5)}
                                        disabled={isSaving}
                                        className="w-8 h-8 rounded-lg bg-white font-black text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all text-lg shadow-sm disabled:opacity-40"
                                    >−</button>
                                    <span className="w-10 text-center font-black text-slate-800 text-sm">
                                        {isSaving ? '…' : units}
                                    </span>
                                    <button
                                        onClick={() => handleUnitChange(type, +5)}
                                        disabled={isSaving}
                                        className="w-8 h-8 rounded-lg bg-white font-black text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all text-lg shadow-sm disabled:opacity-40"
                                    >+</button>
                                </div>
                                <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border ${cfg.color}`}>{cfg.label}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const HospitalDashboard = () => {
    const { hospital, logout } = useHospitalAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('inventory');

    const handleLogout = async () => {
        await logout();
        navigate('/hospital/login');
    };

    const activeEmergencies = hospital?.emergencies || [];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    {hospital && (
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-md shadow-secondary/25">
                                <Building2 className="text-white" size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                                <p className="font-black text-slate-800 text-sm italic">{hospital.name} · #{hospital.registrationNo}</p>
                            </div>
                        </div>
                    )}
                    <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Hospital Command Center</h1>
                    <p className="text-slate-400 font-medium text-sm">Real-time blood bank management & donor coordination.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Link to="/hospital/request">
                        <Button className="h-12 px-6 flex items-center space-x-2 shadow-lg shadow-primary/20">
                            <Plus size={20} />
                            <span>Emergency Request</span>
                        </Button>
                    </Link>
                    {hospital && (
                        <button onClick={handleLogout} className="h-12 px-5 rounded-2xl border-2 border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500 transition-all font-bold text-sm flex items-center space-x-2">
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Active Emergency Alerts from this hospital */}
            {activeEmergencies.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center animate-pulse">
                            <Siren className="text-white" size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Live Broadcasts</p>
                            <p className="font-black text-red-700 italic">{activeEmergencies.length} Active Emergency Request{activeEmergencies.length > 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeEmergencies.map(em => (
                            <div key={em.id} className="bg-primary text-white p-4 rounded-2xl text-center shadow-lg shadow-primary/25">
                                <p className="text-2xl font-black italic">{em.type}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/70 mt-1">Broadcast since {em.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Top Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Units', value: '194', change: '+12%', icon: Activity, color: 'text-secondary bg-secondary/10' },
                    { label: 'Active Donors', value: '1,248', change: '+5.4%', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'AI Match Rate', value: '98.2%', change: 'Optimal', icon: BrainCircuit, color: 'text-primary bg-primary/5' },
                    { label: 'Pending Deliveries', value: '14', change: '3 urgent', icon: Clock, color: 'text-amber-600 bg-amber-50' },
                ].map((stat, i) => (
                    <Card key={i} className="group hover:border-secondary/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-secondary transition-colors" />
                        </div>
                        <p className="mt-4 text-3xl font-black text-slate-800 tracking-tight">{stat.value}</p>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                        <p className="text-xs font-bold text-emerald-500 mt-2 italic">{stat.change}</p>
                    </Card>
                ))}
            </div>

            {/* Blood Bank Management Panel */}
            {hospital && (
                <Card title="🩸 Blood Bank Management" className="overflow-visible">
                    <p className="text-xs text-slate-400 font-medium mb-6 uppercase tracking-widest">
                        Update live inventory, set status, and broadcast emergency needs to the donor network.
                    </p>
                    {/* Tabs */}
                    <div className="flex space-x-3 mb-8">
                        {['inventory', 'chart'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-secondary text-white shadow-lg shadow-secondary/25' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                            >
                                {tab === 'inventory' ? 'Inventory Control' : 'Analytics View'}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'inventory' && <BloodBankPanel />}
                    {activeTab === 'chart' && (
                        <div className="space-y-8">
                            <ChartWrapper data={DEPLETION_STATS} />
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
                                {INVENTORY_DATA.map(item => (
                                    <BloodTypeCard key={item.type} {...item} />
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            )}

            {/* If no hospital logged in, show default inventory view */}
            {!hospital && (
                <Card title="Live Inventory">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {INVENTORY_DATA.map(item => (
                            <BloodTypeCard key={item.type} {...item} />
                        ))}
                    </div>
                    <div className="mt-8">
                        <ChartWrapper data={DEPLETION_STATS} />
                    </div>
                </Card>
            )}

            {/* Recent Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <Card title="Recent Emergency Requests">
                        <div className="space-y-4">
                            {RECENT_REQUESTS.map((req) => (
                                <div key={req.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic text-lg
                                            ${req.urgency === 'critical' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-600'}`}>
                                            {req.bloodType}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{req.hospital}</p>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{req.units} units · {req.distance} away</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Badge variant={req.status === 'fulfilled' ? 'success' : req.status === 'pending' ? 'warning' : 'error'}>
                                            {req.status}
                                        </Badge>
                                        <ExternalLink size={16} className="text-slate-300" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card title="Network Map">
                        <MapContainer hospitals={[]} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HospitalDashboard;
