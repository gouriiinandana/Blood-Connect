import React, { useState } from 'react';
import { X, Save, Phone, MapPin, Target, Camera } from 'lucide-react';
import Button from '../ui/Button';

const EditProfileModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        phone: user.phone || '',
        location: user.location || '',
        pincode: user.pincode || '',
        radius: user.radius || 10,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 italic">Edit Hero Profile</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Update neighborhood & contact details</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white text-slate-400 hover:text-primary rounded-2xl shadow-sm transition-all">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] border-4 border-white shadow-lg overflow-hidden shrink-0">
                                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=C62828&color=fff&size=128`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mt-4 tracking-tighter">Change Photo</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-slate-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Location / City</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input name="location" value={formData.location} onChange={handleChange} className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-slate-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pincode</label>
                            <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-slate-800" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Alert Radius: {formData.radius}km</label>
                            <input name="radius" type="range" min="5" max="100" step="5" value={formData.radius} onChange={handleChange} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-secondary" />
                        </div>
                    </div>

                    <div className="pt-4 flex space-x-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 py-4 border border-slate-100 rounded-[1.5rem] font-bold">Cancel</Button>
                        <Button type="submit" className="flex-1 py-4 bg-secondary shadow-lg shadow-secondary/20 flex items-center justify-center space-x-2">
                            <Save size={18} />
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
