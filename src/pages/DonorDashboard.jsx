import React, { useState } from 'react';
import {
    Activity, MapPin, Clock, TrendingUp, Heart,
    AlertCircle, ChevronRight, ExternalLink, ShieldCheck,
    Award, Trophy, Zap, Star, Gift, Search, Calendar,
    Edit3, Bell, CheckCircle2, Navigation, PhoneCall,
    Droplet, XCircle
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
import {
    DONOR_ACHIEVEMENTS,
    REWARDS,
    NEARBY_HOSPITALS,
    DONATION_HISTORY,
    RECENT_REQUESTS
} from '../data/mockData';

const DonorDashboard = () => {
    const { user, updateUser } = useAuth();
    const [isAvailable, setIsAvailable] = useState(user?.availability || true);
    const [activeTab, setActiveTab] = useState('impact'); // impact, rewards, records
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);

    if (!user) return <div className="p-20 text-center">Loading Hero Data...</div>;

    const handleToggleAvailability = () => {
        const newState = !isAvailable;
        setIsAvailable(newState);
        updateUser({ availability: newState });
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
        <div className="space-y-8 pb-20">
            {/* 1. Profile Summary Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col lg:row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-primary/5 -z-0">
                    <Droplet size={150} fill="currentColor" />
                </div>

                <div className="flex items-center space-x-6 relative z-10">
                    <div className="relative group">
                        <div className="w-24 h-24 bg-slate-100 rounded-[2rem] border-4 border-white shadow-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=C62828&color=fff&size=128`} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-sm border-4 border-white shadow-md rotate-12 italic">
                            {user.bloodType}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">Hi, {user.name.split(' ')[0]}!</h1>
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="p-1.5 text-slate-300 hover:text-secondary rounded-lg transition-all"
                            >
                                <Edit3 size={16} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-3 mt-2">
                            <Badge status={user.isEligible ? 'available' : 'low'}>{user.isEligible ? 'Eligible to Save Lives' : 'Resting Hero'}</Badge>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center">
                                <MapPin size={10} className="mr-1" /> {user.location}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative z-10 w-full lg:w-auto">
                    <div className="mr-6">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Emergency Availability</p>
                        <p className="text-sm font-bold text-slate-400 mt-1 italic">{isAvailable ? 'Broadcasting Location' : 'Offline'}</p>
                    </div>
                    <button
                        onClick={handleToggleAvailability}
                        className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${isAvailable ? 'bg-primary' : 'bg-slate-300'}`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Heart Hero Side Panel */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 flex flex-col items-center justify-center text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Vital Pulse System</p>
                        <HeartHeroVisual />
                        <p className="text-xs font-bold text-emerald-600 mt-4 italic uppercase">Synchronized with Heartbeat</p>
                    </div>

                    {/* 2. Impact & Point System */}
                    <Card title="Hero Impact Tracker" className="bg-secondary text-white border-none overflow-hidden relative group">
                        <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                            <Trophy size={200} fill="currentColor" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-4xl font-black italic">{user.livesSaved}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Lives Impacted</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black italic leading-none">{levelInfo.level}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">Status Rank</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span>{user.points} Hero Points</span>
                                    <span>Next: {levelInfo.next} XP</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400 transition-all duration-1000" style={{ width: `${(user.points / levelInfo.next) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-lg font-bold">3</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Donations</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold">Feb 12</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Next Eligible</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 3. Achievements Quick View */}
                    <Card title="Recent Badges" action={<Link to="/donor/rewards" className="text-secondary text-xs font-bold hover:underline">View All</Link>}>
                        <div className="grid grid-cols-3 gap-4">
                            {DONOR_ACHIEVEMENTS.slice(0, 3).map(badge => (
                                <div key={badge.id} className="flex flex-col items-center text-center group cursor-help">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-all ${badge.unlocked ? 'bg-secondary/5 text-secondary border border-secondary/10 shadow-sm' : 'bg-slate-50 text-slate-200 border border-slate-100 grayscale'}`}>
                                        <Award size={24} className={badge.unlocked ? 'animate-in zoom-in' : ''} />
                                    </div>
                                    <p className={`text-[9px] font-black uppercase tracking-tighter leading-tight ${badge.unlocked ? 'text-slate-800' : 'text-slate-300'}`}>{badge.title}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Hospital Availability View */}
                    <Card title="Nearby Opportunities" subtitle="Hospital needs matching your type">
                        <div className="space-y-4">
                            {NEARBY_HOSPITALS.map((h, i) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-secondary transition-all group">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm italic">{h.name}</h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                                    <MapPin size={10} className="mr-1" /> {h.distance}
                                                </span>
                                                <Badge status={h.stock.toLowerCase()} className="scale-75 origin-left">{h.stock} Stock</Badge>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedHospital(h)}
                                            className="p-2 bg-white text-slate-400 rounded-xl shadow-sm group-hover:bg-secondary group-hover:text-white transition-all"
                                        >
                                            <Calendar size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* 4. Emergency Alerts & Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Emergency Alerts Panel */}
                    <Card
                        title="Critical Network Alerts"
                        subtitle="Real-time regional blood requirements."
                        action={<Badge status="critical">Action Required</Badge>}
                        className="border-primary/20 bg-red-50/10"
                    >
                        <div className="space-y-4 mt-2">
                            {RECENT_REQUESTS.map((alert, i) => {
                                const isMatch = alert.type === user.bloodType;
                                return (
                                    <div key={i} className={`flex flex-col sm:row items-center border rounded-[2rem] p-6 transition-all bg-white shadow-sm ${isMatch ? 'border-emerald-200 ring-4 ring-emerald-500/5 pulse-green' : 'border-slate-100'}`}>
                                        <div className="w-full sm:w-auto flex items-center mb-4 sm:mb-0">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-5 shadow-inner ${alert.urgency === 'critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                                <AlertCircle size={28} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-slate-800 italic uppercase tracking-tighter text-lg">{alert.hospital}</h4>
                                                <div className="flex items-center space-x-3 mt-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                                        <Navigation size={10} className="mr-1" /> {alert.distance || '4.2 km'}
                                                    </span>
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{alert.urgency}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-auto sm:ml-auto flex items-center space-x-6">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-[10px] font-black text-slate-400 italic uppercase">Required</p>
                                                <p className={`text-xl font-black ${isMatch ? 'text-emerald-600' : 'text-slate-800'}`}>{alert.type}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" className="p-3 text-slate-300 hover:text-red-500">
                                                    <XCircle size={24} />
                                                </Button>
                                                <Button
                                                    onClick={() => setSelectedHospital({ name: alert.hospital, address: 'Emergency Dispatch', need: alert.type })}
                                                    className={`px-8 h-14 italic font-black text-lg ${isMatch ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700' : ''}`}
                                                >
                                                    Accept Match
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Tabs for Rewards / Records */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="flex border-b border-slate-50">
                            {[
                                { id: 'rewards', label: 'Reward Marketplace', icon: Gift },
                                { id: 'records', label: 'Donation Ledger', icon: Clock },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-6 flex items-center justify-center space-x-2 transition-all font-bold text-sm ${activeTab === tab.id ? 'text-secondary border-b-4 border-secondary bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <tab.icon size={18} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-8">
                            {activeTab === 'rewards' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {REWARDS.map((reward, i) => (
                                        <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 group hover:border-secondary transition-all">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm border border-white">
                                                <img src={reward.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{reward.category}</p>
                                                <h4 className="font-bold text-slate-800 text-sm leading-tight">{reward.title}</h4>
                                                <p className="text-secondary text-xs font-black mt-1 italic">{reward.points} XP</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                disabled={user.points < reward.points}
                                                className={`p-2 h-10 w-10 text-xs flex items-center justify-center rounded-xl ${user.points >= reward.points ? 'border-secondary text-secondary hover:bg-secondary hover:text-white' : 'opacity-30'}`}
                                            >
                                                <ArrowRight size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                                <th className="pb-4">Date</th>
                                                <th className="pb-4">Hospital</th>
                                                <th className="pb-4">Type</th>
                                                <th className="pb-4 text-right">Points Earned</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {DONATION_HISTORY.map((h, i) => (
                                                <tr key={i} className="text-sm">
                                                    <td className="py-4 font-bold text-slate-500">{h.date}</td>
                                                    <td className="py-4 font-black text-slate-800 italic uppercase tracking-tighter">{h.hospital}</td>
                                                    <td className="py-4 font-medium text-slate-600">{h.type}</td>
                                                    <td className="py-4 text-right font-black text-emerald-600">+{h.points} XP</td>
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
