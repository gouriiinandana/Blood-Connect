import React from 'react';
import {
    ArrowLeft,
    Navigation,
    Clock,
    MapPin,
    PhoneCall,
    Database,
    ShieldCheck,
    ChevronUp,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MapContainer from '../components/ui/MapContainer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const DeliveryTracking = () => {
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
            <div className="flex-1 bg-slate-100">
                <MapContainer height="100%" />

                {/* Floating Top Info */}
                <div className="absolute top-6 left-6 right-6 flex flex-col sm:row justify-between items-start gap-4">
                    <Link to="/hospital">
                        <button className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center hover:bg-slate-50 transition-all group">
                            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold text-sm">Active Logistics</span>
                        </button>
                    </Link>

                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                            <Navigation size={24} className="animate-pulse" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                            <div className="flex items-center mt-1">
                                <p className="text-sm font-bold text-slate-800">In Transit</p>
                                <span className="ml-2 w-2 h-2 bg-primary rounded-full animate-ping"></span>
                            </div>
                        </div>
                        <div className="border-l border-slate-100 pl-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">E.T.A</p>
                            <p className="text-lg font-black text-secondary mt-1">4.2 min</p>
                        </div>
                    </div>
                </div>

                {/* Delivery Path visualization */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Custom SVG Path could go here */}
                </div>
            </div>

            {/* Bottom Information Sheet */}
            <div className="bg-white border-t border-slate-200 z-20">
                <div className="h-2 w-12 bg-slate-200 rounded-full mx-auto my-3"></div>
                <div className="px-8 pb-8 space-y-8">
                    <div className="flex flex-col md:row justify-between gap-6">
                        <div className="space-y-6 flex-1">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Rapid Response Delivery</h2>
                                <Badge status="critical">Urgent Priority</Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-red-50 text-primary rounded-lg">
                                        <Database size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Blood Units</p>
                                        <p className="text-base font-bold text-slate-800">O Negative (2 Units)</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Chain of Custody</p>
                                        <p className="text-base font-bold text-slate-800">Level 4 Secured</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="p-2 bg-slate-50 text-slate-500 rounded-lg">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Dispatched At</p>
                                        <p className="text-base font-bold text-slate-800">14:23 (8m ago)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-end gap-4 min-w-[240px]">
                            <div className="flex items-center space-x-3 w-full">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Courier+John&background=1565C0&color=fff" className="rounded-full" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Johnathan Doe</p>
                                    <p className="text-xs text-slate-500">Certified Medical Courier</p>
                                </div>
                                <button className="p-2 bg-secondary text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all">
                                    <PhoneCall size={18} />
                                </button>
                            </div>

                            <Link to="/hospital/handoff" className="w-full">
                                <Button className="w-full h-12 flex items-center justify-center space-x-2">
                                    <ShieldCheck size={18} />
                                    <span>Prepare for Handoff</span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                            Sensors Online (Temp: 3.2°C)
                        </div>
                        <button className="hover:text-secondary flex items-center">
                            View Transport Protocol <ExternalLink size={14} className="ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryTracking;
