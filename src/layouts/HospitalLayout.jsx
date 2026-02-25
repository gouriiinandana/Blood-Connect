import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Database, Send, BarChart3, Map as MapIcon,
    Bell, AlertTriangle, FileText, Search, ChevronDown, Menu, X,
    Building2, LogOut, LogIn, ClipboardCheck, Clock, ChevronUp
} from 'lucide-react';
import { useHospitalAuth } from '../context/HospitalAuthContext';
import HeartHandLogo from '../components/3d/HeartHandLogo';

const HospitalLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [handoffPanelOpen, setHandoffPanelOpen] = useState(true);
    const { hospital, logoutHospital, pendingHandoffs, dismissHandoff } = useHospitalAuth();
    const navigate = useNavigate();

    // Only show pending (not completed) handoffs
    const pendingOnly = (pendingHandoffs || []).filter(h => h.status === 'pending');

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/hospital' },
        { name: 'Inventory', icon: Database, path: '/hospital/inventory' },
        { name: 'Requests', icon: Send, path: '/hospital/request' },
        { name: 'AI Analytics', icon: BarChart3, path: '/hospital/analytics' },
        { name: 'Nearby Hospitals', icon: MapIcon, path: '/hospital/nearby' },
        { name: 'Emergency Alerts', icon: AlertTriangle, path: '/hospital/alerts' },
        { name: 'Reports', icon: FileText, path: '/hospital/reports' },
    ];

    const handleLogout = () => {
        logoutHospital();
        navigate('/hospital/login');
    };

    const initials = hospital ? hospital.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : 'H';

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-slate-100 transition-all duration-300 z-30 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="h-20 flex items-center px-4 border-b border-slate-50 shrink-0">
                    <HeartHandLogo size={44} />
                    {sidebarOpen && <span className="font-black text-xl tracking-tight text-slate-800 ml-2">Blood Connect</span>}
                </div>

                <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/hospital'}
                            className={({ isActive }) => `
                                flex items-center p-3 rounded-xl transition-all group
                                ${isActive ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
                            `}
                        >
                            <item.icon size={20} className={sidebarOpen ? 'mr-3' : 'mx-auto'} />
                            {sidebarOpen && <span className="font-semibold text-sm">{item.name}</span>}
                        </NavLink>
                    ))}

                    {/* ── Pending Handoffs Panel ── */}
                    {sidebarOpen && pendingOnly.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <button
                                onClick={() => setHandoffPanelOpen(o => !o)}
                                className="w-full flex items-center justify-between px-1 py-2 group"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="relative">
                                        <ClipboardCheck size={16} className="text-amber-500" />
                                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-primary text-white rounded-full text-[8px] font-black flex items-center justify-center">
                                            {pendingOnly.length}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending Handoffs</span>
                                </div>
                                {handoffPanelOpen ? <ChevronUp size={12} className="text-slate-300" /> : <ChevronDown size={12} className="text-slate-300" />}
                            </button>

                            {handoffPanelOpen && (
                                <div className="space-y-2 mt-1">
                                    {pendingOnly.map(h => (
                                        <div
                                            key={h.id}
                                            className="bg-amber-50 border border-amber-100 rounded-2xl p-3 relative group/card"
                                        >
                                            {/* Dismiss button */}
                                            <button
                                                onClick={() => dismissHandoff(h.id)}
                                                className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors opacity-0 group-hover/card:opacity-100"
                                            >
                                                <X size={12} />
                                            </button>

                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xs italic shadow-sm">
                                                    {h.bloodType}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-black text-slate-700 leading-none">{h.units} units · {h.urgency}</p>
                                                    <p className="text-[9px] text-slate-400 font-medium mt-0.5 flex items-center">
                                                        <Clock size={8} className="mr-1" />{h.requestedAt}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/hospital/handoff`}
                                                state={{ handoffId: h.id, bloodType: h.bloodType, units: h.units }}
                                                className="flex items-center justify-center w-full py-1.5 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all"
                                            >
                                                Complete Handoff →
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </nav>

                {/* Sidebar Footer */}
                {sidebarOpen && (
                    <div className="p-4 border-t border-slate-50 shrink-0">
                        {hospital ? (
                            <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all text-sm font-bold space-x-3">
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </button>
                        ) : (
                            <Link to="/hospital/login" className="flex items-center p-3 rounded-xl text-slate-400 hover:bg-secondary/5 hover:text-secondary transition-all text-sm font-bold space-x-3">
                                <LogIn size={18} />
                                <span>Hospital Login</span>
                            </Link>
                        )}
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-20 shrink-0">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-500 transition-all">
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search inventory, donors, or hospitals..."
                                className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-secondary/20 transition-all text-sm font-medium outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl relative hover:bg-slate-100 transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                        </button>

                        {hospital ? (
                            <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-black text-slate-800 leading-none italic">{hospital.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">#{hospital.registrationNo}</p>
                                </div>
                                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md shadow-secondary/25">
                                    {initials}
                                </div>
                            </div>
                        ) : (
                            <Link to="/hospital/login" className="flex items-center space-x-2 px-5 py-2.5 bg-secondary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/25">
                                <LogIn size={16} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HospitalLayout;
