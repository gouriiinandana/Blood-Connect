import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    User,
    Heart,
    MapPin,
    History,
    Award,
    ClipboardCheck,
    Bell,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import HeartHandLogo from '../components/3d/HeartHandLogo';

const DonorLayout = () => {
    const { user, logout } = useAuth();
    const navItems = [
        { name: 'Dashboard', icon: User, path: '/donor/dashboard' },
        { name: 'Rewards & Impact', icon: Award, path: '/donor/rewards' },
        { name: 'Eligibility', icon: ClipboardCheck, path: '/donor/eligibility' },
        { name: 'Donation History', icon: History, path: '/donor/history' },
        { name: 'Nearby Requests', icon: MapPin, path: '/donor/requests' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-inter">
            {/* Mobile Header */}
            <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center">
                    <HeartHandLogo size={42} />
                    <span className="font-black text-xl tracking-tight text-slate-800 ml-2">Blood Connect</span>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="p-2 text-slate-500 relative hover:bg-slate-50 rounded-xl transition-all">
                        <Bell size={22} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                    </button>
                    <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-slate-800 leading-none">{user?.name || 'Guest Hero'}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{user?.level || 'Bronze'} Rank</p>
                        </div>
                        <div className="w-9 h-9 bg-slate-200 rounded-xl border-2 border-white overflow-hidden shadow-sm">
                            <img src={`https://ui-avatars.com/api/?name=${user?.name || 'G+N'}&background=C62828&color=fff`} alt="Avatar" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
                {/* Desktop Sidebar / Mobile Nav */}
                <aside className="lg:w-64 shrink-0">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === '/donor'}
                                className={({ isActive }) => `
                  flex items-center px-5 py-4 rounded-[1.5rem] transition-all whitespace-nowrap
                  ${isActive ? 'bg-secondary text-white shadow-lg shadow-secondary/20 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}
                `}
                            >
                                <item.icon size={18} className="mr-3" />
                                <span className="font-bold text-sm">{item.name}</span>
                            </NavLink>
                        ))}
                        <button
                            onClick={logout}
                            className="flex lg:mt-8 items-center px-5 py-4 rounded-[1.5rem] bg-white text-slate-400 hover:text-red-600 transition-all border border-slate-100 font-bold text-sm"
                        >
                            <LogOut size={18} className="mr-3" />
                            <span>Sign Out</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DonorLayout;
