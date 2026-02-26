import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import HeartHandLogo from '../components/3d/HeartHandLogo';

const LandingLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Emergency Global Banner */}
            <div className="bg-primary text-white py-2 px-6 flex items-center justify-center space-x-4 animate-in fade-in slide-in-from-top duration-500">
                <Phone size={16} className="animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">Emergency Blood Hotline: +1 (800) BLOOD-LINK</span>
            </div>

            <nav className="h-20 border-b border-slate-50 px-6 sm:px-12 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40">
                <Link to="/" className="flex items-center">
                    <HeartHandLogo size={48} />
                    <span className="font-black text-2xl tracking-tight text-slate-800 ml-2">Blood Connect</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <a href="#how-it-works" className="text-slate-600 font-medium hover:text-primary transition-colors">How It Works</a>
                    <a href="#inventory" className="text-slate-600 font-medium hover:text-primary transition-colors">Live Inventory</a>
                    <Link to="/hospitals" className="text-slate-600 font-medium hover:text-primary transition-colors">Hospitals</Link>
                </div>

                <div className="flex items-center space-x-3">
                    <Link to="/hospital/login">
                        <Button variant="outline" className="hidden sm:block">Hospital Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button>Register as Donor</Button>
                    </Link>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-white py-16 px-6 sm:px-12 mt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6">
                            <HeartHandLogo size={36} />
                            <span className="font-black text-xl tracking-tight -ml-1">Blood Connect</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering healthcare systems with real-time blood coordination and life-saving AI matching.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link to="/hospital/login" className="hover:text-white transition-colors">Hospital Login</Link></li>
                            <li><Link to="/donor" className="hover:text-white transition-colors">Donor Portal</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">AI Logistics</Link></li>
                            <li><Link to="/" className="hover:text-white transition-colors">Real-time Map</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link to="/donation-guide" className="hover:text-white transition-colors">Donation Guide</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                            <li><Link to="/safety-protocols" className="hover:text-white transition-colors">Safety Protocols</Link></li>
                            <li><Link to="/health-data-protection" className="hover:text-white transition-colors">Health Data Protection</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li>Emergency: 1-800-BLOOD-LINK</li>
                            <li>Support: help@bloodlink.tech</li>
                            <li>Location: Global Medical Hub</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 flex flex-col md:row justify-between items-center text-slate-500 text-xs">
                    <p>© 2026 Blood Connect Infrastructure. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Security Certificate</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingLayout;
