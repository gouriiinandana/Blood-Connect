import React from 'react';
import {
    Award,
    Trophy,
    Zap,
    Heart,
    Star,
    TrendingUp,
    ArrowUpRight,
    Gift,
    ExternalLink
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const DonorRewards = () => {
    return (
        <div className="space-y-12 pb-20">
            {/* Impact Overview Header */}
            <div className="relative bg-secondary p-12 sm:p-20 rounded-[3rem] overflow-hidden text-white shadow-2xl">
                <div className="absolute top-0 right-0 p-12 text-white/10 -rotate-12 translate-x-1/4 -translate-y-1/4">
                    <Trophy size={400} />
                </div>

                <div className="relative z-10 max-w-2xl space-y-8">
                    <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-secondary-light">
                        <Star size={14} className="mr-2 fill-current" />
                        Current Rank: Silver Hero
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black italic tracking-tighter leading-tight">
                        Your Impact <br />
                        <span className="text-emerald-400 italic">Is Life-Saving.</span>
                    </h1>
                    <div className="flex items-center space-x-8">
                        <div>
                            <p className="text-5xl font-black italic">12</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Lives Saved</p>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div>
                            <p className="text-5xl font-black italic">4.2k</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">Hero Points</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Achievements Grid */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight flex items-center">
                        <Trophy className="text-amber-500 mr-3" size={28} />
                        Badge Progress
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Rare Type Hero', desc: 'Donate O- Neg blood 3 times.', progress: 66, icon: Heart, color: 'text-primary' },
                            { title: 'Emergency Responder', desc: 'Respond to alert in < 1hr.', progress: 100, icon: Zap, color: 'text-amber-500' },
                            { title: 'Community Pillar', desc: 'Refer 5 active donors.', progress: 40, icon: Star, color: 'text-secondary' },
                            { title: 'Consistency King', desc: 'Donate 3 times in 1 year.', progress: 85, icon: Award, color: 'text-emerald-600' },
                        ].map((achievement, i) => (
                            <Card key={i} className="group hover:scale-105 transition-all cursor-pointer">
                                <div className="flex space-x-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 group-hover:border-slate-300 transition-all ${achievement.color}`}>
                                        <achievement.icon size={28} fill={achievement.progress === 100 ? 'currentColor' : 'none'} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800">{achievement.title}</h4>
                                            {achievement.progress === 100 && <div className="text-[10px] font-black text-emerald-600 uppercase">Unlocked</div>}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">{achievement.desc}</p>
                                        <div className="mt-4 space-y-1.5">
                                            <div className="flex justify-between text-[10px] font-black text-slate-400">
                                                <span>PROGRESS</span>
                                                <span>{achievement.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                                <div className={`h-full transition-all duration-1000 ${achievement.progress === 100 ? 'bg-emerald-500' : 'bg-slate-300'}`} style={{ width: `${achievement.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Rewards Sidebar */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight flex items-center">
                        <Gift className="text-primary mr-3" size={28} />
                        Hero Rewards
                    </h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Health Wellness Pack', points: 1200, category: 'Medical' },
                            { title: 'Premium Lab Screening', points: 2500, category: 'Health' },
                            { title: 'Emergency Responder Kit', points: 5000, category: 'Safety' },
                        ].map((reward, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-secondary transition-all">
                                <div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{reward.category}</span>
                                    <h4 className="font-bold text-slate-800 mt-1">{reward.title}</h4>
                                    <p className="text-sm font-black text-secondary mt-1 italic">{reward.points} XP</p>
                                </div>
                                <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-secondary group-hover:text-white transition-all">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-4 text-xs italic">View Reward Marketplace</Button>
                    </div>

                    <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 text-center">
                        <TrendingUp className="text-emerald-600 mx-auto mb-4" size={40} />
                        <h3 className="text-lg font-black text-emerald-900 italic leading-none">Hero Multiplier Active!</h3>
                        <p className="text-xs text-emerald-800/60 mt-3 font-medium leading-relaxed">
                            Emergency O- Neg donations currently grant <span className="font-black">2x Hero Points</span> across the network.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorRewards;
