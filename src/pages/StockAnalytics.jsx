import React from 'react';
import {
    TrendingDown,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    BrainCircuit,
    Info,
    Calendar,
    Filter
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ChartWrapper from '../components/ui/ChartWrapper';
import Badge from '../components/ui/Badge';
import { DEPLETION_STATS } from '../data/mockData';

const StockAnalytics = () => {
    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Stock Analytics</h1>
                    <p className="text-slate-500 font-medium">Predictive health scoring and inventory optimization intelligence.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="flex items-center space-x-2">
                        <Calendar size={18} />
                        <span>Select Range</span>
                    </Button>
                    <Button variant="outline" className="p-2.5">
                        <Filter size={18} />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Health Score Panel */}
                <Card className="lg:col-span-1 bg-secondary text-white overflow-hidden relative border-none">
                    <div className="absolute top-0 right-0 p-8 text-white/10 -rotate-12">
                        <BrainCircuit size={180} />
                    </div>
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center space-x-2 text-secondary-light">
                            <BrainCircuit size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest text-white/60">Predictive Health Score</span>
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-8xl font-bold tracking-tighter">84</span>
                            <span className="text-3xl font-bold opacity-60">%</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-bold">System Stability</span>
                                <span className="font-medium opacity-80">Good</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 w-[84%] rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-500 font-medium uppercase tracking-wide">
                            "Inventory is stable for next 72 hours. O- negative replenishment recommended within 48 hours to maintain buffer."
                        </p>
                    </div>
                </Card>

                {/* Depletion Trends */}
                <Card className="lg:col-span-2" title="Inventory Depletion Velocity" subtitle="Comparison of actual vs. predicted usage">
                    <ChartWrapper data={DEPLETION_STATS} type="bar" color="#1565C0" />
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* AI Recommendations */}
                <Card title="Smart Recommendations" className="lg:col-span-2">
                    <div className="space-y-4">
                        {[
                            {
                                type: 'critical',
                                title: 'O- Negative Buffer Alert',
                                desc: 'Current usage velocity exceeds incoming donations. Request 5 units from Central Hub.',
                                action: 'Request Units'
                            },
                            {
                                type: 'standard',
                                title: 'Optimal Stocking Level',
                                desc: 'A+ and B+ levels are above 90% capacity. No action required for these groups.',
                                action: 'View Detail'
                            },
                            {
                                type: 'urgent',
                                title: 'Impending Rare Type Shortage',
                                desc: 'AB- units reaching expiry in 4 days. Prioritize use in upcoming scheduled surgeries.',
                                action: 'Review Inventory'
                            },
                        ].map((rec, i) => (
                            <div key={i} className="flex items-start p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-secondary transition-all">
                                <div className={`p-3 rounded-xl mr-5 ${rec.type === 'critical' ? 'bg-red-100 text-red-600' :
                                    rec.type === 'urgent' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    {rec.type === 'critical' ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800">{rec.title}</h4>
                                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{rec.desc}</p>
                                    <button className="mt-3 text-secondary text-xs font-bold uppercase tracking-wider hover:underline">{rec.action}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Insights */}
                <Card title="Network Intelligence">
                    <div className="space-y-6">
                        <div className="p-4 rounded-xl border border-slate-100 bg-white">
                            <div className="flex items-center text-slate-400 mb-2">
                                <TrendingDown size={14} className="mr-1" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Usage Decrease</span>
                            </div>
                            <p className="text-lg font-bold text-slate-800">A+ Inventory</p>
                            <div className="flex items-center text-emerald-600 text-sm font-bold mt-1">
                                -12% vs last week
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-100 bg-white">
                            <div className="flex items-center text-slate-400 mb-2">
                                <TrendingUp size={14} className="mr-1" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Demand Spike</span>
                            </div>
                            <p className="text-lg font-bold text-slate-800">O Negative</p>
                            <div className="flex items-center text-red-600 text-sm font-bold mt-1">
                                +24% velocity
                            </div>
                        </div>

                        <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 flex flex-col items-center text-center">
                            <Info size={32} className="text-secondary mb-3" />
                            <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                Our AI considers local events, weather, and seasonal trends for higher accuracy.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StockAnalytics;
