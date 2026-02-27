import React, { useState, useEffect } from 'react';
import {
    Activity, MapPin, Clock, TrendingUp, Heart,
    AlertCircle, ChevronRight, ExternalLink, ShieldCheck,
    Award, Trophy, Zap, Star, Gift, Search, Calendar,
    Edit3, Bell, CheckCircle2, Navigation, PhoneCall,
    Droplet, XCircle, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import MapContainer from '../components/ui/MapContainer';
import EditProfileModal from '../components/donor/EditProfileModal';
import SlotBookingModal from '../components/donor/SlotBookingModal';
import { HeartHeroVisual } from '../components/3d/ThreeVisuals';
import { supabase } from '../lib/supabase';
import {
    DONOR_ACHIEVEMENTS,
    REWARDS,
    DONATION_HISTORY
} from '../data/mockData';

const DonorDashboard = () => {
    const { user, updateUser, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('impact'); // impact, rewards, records
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Fetch real hospitals
                const { data: hospData, error: hospError } = await supabase
                    .from('hospitals')
                    .select('*')
                    .limit(5);

                if (hospError) throw hospError;

                // 2. Fetch inventory for alerts
                const { data: inventoryData, error: invError } = await supabase
                    .from('blood_inventory')
                    .select('*, hospitals(name)')
                    .lt('units', 10) // Only fetch low/critical stock
                    .limit(10);

                if (invError) throw invError;

                // Process hospitals for Nearby list
                const processedHospitals = (hospData || []).map(h => ({
                    id: h.id,
                    name: h.name,
                    distance: (Math.random() * 8 + 1).toFixed(1) + ' km',
                    stock: 'Stable', // Default, would need more complex query to be real
                    need: user?.bloodType || 'O-',
                    address: h.address || h.city
                }));

                // Process inventory into alerts
                const processedAlerts = (inventoryData || []).map(inv => ({
                    hospital: inv.hospitals.name,
                    type: inv.blood_type,
                    urgency: inv.units < 5 ? 'critical' : 'high',
                    units: inv.units,
                    time: 'Live Alert'
                }));

                setHospitals(processedHospitals);
                setAlerts(processedAlerts.length > 0 ? processedAlerts : [
                    { hospital: 'City Memorial', type: user?.bloodType || 'O-', urgency: 'critical', units: 2, time: '10m ago' }
                ]);
            } catch (err) {
                console.error("Dashboard Sync Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchDashboardData();
    }, [user]);

    if (authLoading || loading) return <div className="p-20 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-500">Syncing donor profile...</p>
    </div>;

    if (!user) return <div className="p-20 text-center">
        <p className="text-slate-500 font-bold mb-4">No donor profile found. Please complete registration.</p>
        <Link to="/register"><Button>Go to Registration</Button></Link>
    </div>;

    const isAvailable = user.availability;

    const handleToggleAvailability = () => {
        updateUser({ availability: !isAvailable });
    };

    const handleSaveProfile = (updates) => {
        updateUser(updates);
        setShowEditModal(false);
    };

    const handleConfirmBooking = (slot) => {
        console.log('Booking confirmed for', slot);
        setSelectedHospital(null);
    };

    // Calculate donor level
    const getLevelInfo = (points) => {
        if (points >= 1500) return { level: 'Platinum', color: 'text-purple-600', bg: 'bg-purple-50', next: 'MAX' };
        if (points >= 700) return { level: 'Gold', color: 'text-amber-500', bg: 'bg-amber-50', next: 1500 };
        if (points >= 300) return { level: 'Silver', color: 'text-slate-500', bg: 'bg-slate-50', next: 700 };
        return { level: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-50', next: 300 };
    };

    const levelInfo = getLevelInfo(user.points);

    return (
        <div className="space-y-10 pb-20">
            {/* 1. Profile Summary Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-soft flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-primary/5 -z-0">
                    <Droplet size={150} fill="currentColor" />
                </div>

                <div className="flex items-center space-x-8 relative z-10 w-full lg:w-auto">
                    <div className="relative group shrink-0">
                        <div className="w-24 h-24 bg-slate-100 rounded-[2rem] border-4 border-white shadow-md overflow-hidden shrink-0 group-hover:scale-102 transition-transform">
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Donor')}&background=C62828&color=fff&size=128`} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-sm border-4 border-white shadow-md">
                            {user.bloodType}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-3">
                            <h1 className="text-3xl font-bold text-slate-800 tracking-tight leading-none">Hi, {user.name ? user.name.split(' ')[0] : 'Hero'}!</h1>
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="p-2 text-slate-300 hover:text-secondary rounded-xl transition-all hover:bg-slate-50 shadow-sm border border-transparent hover:border-slate-100"
                            >
                                <Edit3 size={18} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-4 mt-3">
                            <Badge status={user.isEligible ? 'available' : 'low'}>{user.isEligible ? 'Eligible to Donate' : 'Hero Resting'}</Badge>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center">
                                <MapPin size={10} className="mr-1" /> {user.location}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center bg-slate-50 p-8 rounded-[2.25rem] border border-slate-100/50 relative z-10 w-full lg:w-auto">
                    <div className="mr-8">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Emergency Channel</p>
                        <p className="text-sm font-semibold text-slate-400 mt-2">{isAvailable ? 'Location Broadcasting' : 'Radio Silence'}</p>
                    </div>
                    <button
                        onClick={handleToggleAvailability}
                        className={`w-14 h-8 rounded-full p-1 transition-all duration-300 shadow-inner ${isAvailable ? 'bg-primary' : 'bg-slate-300'}`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Heart Hero Side Panel */}
                <div className="lg:col-span-1 space-y-10">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-10 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Vital Statistics</p>
                        <HeartHeroVisual />
                        <p className="text-xs font-semibold text-emerald-600 mt-8 uppercase tracking-widest">Active Connection</p>
                    </div>

                    {/* 2. Impact & Point System */}
                    <Card title="Impact Ledger" className="bg-secondary text-white border-none overflow-hidden relative group">
                        <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-105 transition-transform">
                            <Trophy size={200} fill="currentColor" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-4xl font-bold leading-none">{user.livesSaved}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-2">Lives Saved</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold leading-none uppercase">{levelInfo.level}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-2">Donor Tier</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span>{user.points} XP Accumulated</span>
                                    <span>Goal: {levelInfo.next === 'MAX' ? user.points : levelInfo.next} XP</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400 transition-all duration-1000" style={{ width: `${levelInfo.next === 'MAX' ? 100 : (user.points / levelInfo.next) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                <div>
                                    <p className="text-lg font-bold">{Math.floor(user.points / 150)}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Verified Acts</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' })}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Access Date</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 3. Achievements Quick View */}
                    <Card title="Hero Badges" action={<Link to="/donor/rewards" className="text-secondary text-xs font-bold hover:underline py-1">View Archive</Link>}>
                        <div className="grid grid-cols-3 gap-6">
                            {DONOR_ACHIEVEMENTS.slice(0, 3).map(badge => (
                                <div key={badge.id} className="flex flex-col items-center text-center group cursor-help">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${badge.unlocked ? 'bg-secondary/5 text-secondary border border-secondary/10 shadow-sm' : 'bg-slate-50 text-slate-200 border border-slate-100 grayscale'}`}>
                                        <Award size={28} className={badge.unlocked ? 'animate-in zoom-in' : ''} />
                                    </div>
                                    <p className={`text-[9px] font-bold uppercase tracking-wider leading-tight ${badge.unlocked ? 'text-slate-800' : 'text-slate-300'}`}>{badge.title}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Hospital Availability View */}
                    <Card title="Nearby Coordination" subtitle="Hospitals needing blood types">
                        <div className="space-y-4">
                            {hospitals.map((h, i) => (
                                <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100/50 hover:border-secondary/20 hover:bg-white transition-all group">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">{h.name}</h4>
                                            <div className="flex items-center space-x-3 mt-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                                    <MapPin size={10} className="mr-1" /> {h.distance}
                                                </span>
                                                <Badge status={h.stock.toLowerCase()} className="scale-75 origin-left">{h.stock} Stock</Badge>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedHospital(h)}
                                            className="p-3 bg-white text-slate-400 rounded-xl shadow-sm group-hover:bg-secondary group-hover:text-white transition-all border border-slate-100 group-hover:border-secondary"
                                        >
                                            <Calendar size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* 4. Emergency Alerts & Content */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Emergency Alerts Panel */}
                    <Card
                        title="Critical Alerts"
                        subtitle="Urgent regional requirements"
                        action={<Badge status="critical">Action Required</Badge>}
                        className="bg-red-50/20 border-red-100"
                    >
                        <div className="space-y-6 mt-4">
                            {alerts.map((alert, i) => {
                                const isMatch = alert.type === user.bloodType;
                                return (
                                    <div key={i} className={`flex flex-col sm:flex-row items-center border rounded-[2.5rem] p-8 transition-all bg-white ${isMatch ? 'border-emerald-200 shadow-lg shadow-emerald-500/5 pulse-green' : 'border-slate-100 shadow-soft'}`}>
                                        <div className="w-full sm:w-auto flex items-center mb-6 sm:mb-0">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-inner ${alert.urgency === 'critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                                <AlertCircle size={32} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-800 uppercase tracking-tight text-xl leading-none">{alert.hospital}</h4>
                                                <div className="flex items-center space-x-4 mt-3">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center">
                                                        <Navigation size={12} className="mr-2" /> {alert.distance || '4.2 KM'}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{alert.urgency}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-auto sm:ml-auto flex items-center space-x-8">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">NEED</p>
                                                <p className={`text-2xl font-bold mt-2 ${isMatch ? 'text-emerald-600' : 'text-slate-800'}`}>{alert.type}</p>
                                            </div>
                                            <div className="flex space-x-4">
                                                <Button variant="ghost" className="p-4 text-slate-300 hover:text-red-500 rounded-2xl">
                                                    <XCircle size={28} />
                                                </Button>
                                                <Button
                                                    onClick={() => setSelectedHospital({ name: alert.hospital, address: 'Emergency Dispatch', need: alert.type })}
                                                    className={`px-10 h-16 font-bold text-lg rounded-2xl ${isMatch ? 'bg-emerald-600 shadow-lg shadow-emerald-200 hover:bg-emerald-700' : ''}`}
                                                >
                                                    Accept Call
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Tabs for Rewards / Records */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
                        <div className="flex border-b border-slate-50">
                            {[
                                { id: 'rewards', label: 'Perks Marketplace', icon: Gift },
                                { id: 'records', label: 'Impact Ledger', icon: Clock },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-8 flex items-center justify-center space-x-3 transition-all font-bold text-sm tracking-wide ${activeTab === tab.id ? 'text-secondary border-b-4 border-secondary bg-slate-50/30' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/10'}`}
                                >
                                    <tab.icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-10">
                            {activeTab === 'rewards' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {REWARDS.map((reward, i) => (
                                        <div key={i} className="flex items-center space-x-6 p-6 rounded-[2rem] border border-slate-50 bg-slate-50/20 group hover:border-secondary/20 hover:bg-white transition-all shadow-sm">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white">
                                                <img src={reward.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{reward.category}</p>
                                                <h4 className="font-bold text-slate-800 text-base leading-tight mt-1">{reward.title}</h4>
                                                <p className="text-secondary text-sm font-bold mt-2">{reward.points} XP</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                disabled={user.points < reward.points}
                                                className={`p-3 h-12 w-12 flex items-center justify-center rounded-2xl transition-all ${user.points >= reward.points ? 'border-secondary text-secondary hover:bg-secondary hover:text-white shadow-sm' : 'opacity-20 pointer-events-none'}`}
                                            >
                                                <ArrowRight size={20} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] border-b border-slate-100">
                                                <th className="pb-6">Event Date </th>
                                                <th className="pb-6">Medical Facility</th>
                                                <th className="pb-6">Unit Type</th>
                                                <th className="pb-6 text-right">XP Reward</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {DONATION_HISTORY.map((h, i) => (
                                                <tr key={i} className="text-sm group hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-6 font-semibold text-slate-500">{h.date}</td>
                                                    <td className="py-6 font-bold text-slate-800 uppercase tracking-tight">{h.hospital}</td>
                                                    <td className="py-6 font-medium text-slate-600">{h.type}</td>
                                                    <td className="py-6 text-right font-bold text-emerald-600">+{h.points} XP</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* Modals */}
            {showEditModal && (
                <EditProfileModal
                    user={user}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveProfile}
                />
            )}

            {selectedHospital && (
                <SlotBookingModal
                    hospital={selectedHospital}
                    onClose={() => setSelectedHospital(null)}
                    onConfirm={handleConfirmBooking}
                />
            )}

            <style sx>{`
                .pulse-green {
                    animation: pulse-green 3s infinite;
                }
                @keyframes pulse-green {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.2); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); border-color: rgba(16, 185, 129, 0.1); }
                }
            `}</style>
        </div>
    );
};

export default DonorDashboard;
