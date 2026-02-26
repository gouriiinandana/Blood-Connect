import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Navigation, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

const SlotBookingModal = ({ hospital, onClose, onConfirm }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const slots = [
        { time: '09:00 AM', available: true },
        { time: '10:30 AM', available: true },
        { time: '12:00 PM', available: false },
        { time: '02:30 PM', available: true },
        { time: '04:00 PM', available: true },
    ];

    const handleConfirm = () => {
        setIsConfirmed(true);
        setTimeout(() => {
            onConfirm(selectedSlot);
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
                {!isConfirmed ? (
                    <>
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Book Donation Slot</h2>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mt-2">{hospital.name.toUpperCase()} • {hospital.need} NEEDED</p>
                            </div>
                            <button onClick={onClose} className="p-3 bg-white text-slate-400 hover:text-primary rounded-2xl shadow-sm transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Available Today</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {slots.map((slot, i) => (
                                        <button
                                            key={i}
                                            disabled={!slot.available}
                                            onClick={() => setSelectedSlot(slot.time)}
                                            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${!slot.available ? 'bg-slate-50 text-slate-300 border-transparent cursor-not-allowed opacity-50' :
                                                selectedSlot === slot.time ? 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-lg' :
                                                    'bg-white border-slate-100 text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span className="font-bold">{slot.time}</span>
                                            {selectedSlot === slot.time && <CheckCircle2 size={18} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start space-x-3">
                                <ShieldCheck size={20} className="text-slate-400 mt-1" />
                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                    By booking, you confirm you meet the medical eligibility criteria. Please bring your ID and donor card.
                                </p>
                            </div>

                            <Button
                                disabled={!selectedSlot}
                                onClick={handleConfirm}
                                className={`w-full h-16 text-lg shadow-xl ${!selectedSlot ? 'grayscale opacity-50' : 'bg-emerald-600 shadow-emerald-200'}`}
                            >
                                Confirm Booking Slot
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="p-12 text-center space-y-6 animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner pulse-green mb-8">
                            <CheckCircle2 size={48} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">Slot Secured</h2>
                            <p className="text-slate-500 font-medium mt-3 text-lg">Your hero slot is secured for {selectedSlot}.</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                            <div className="flex items-center space-x-3">
                                <Navigation size={20} className="text-secondary" />
                                <div>
                                    <p className="text-xs font-bold text-slate-800 leading-none bg-white/50 px-2 py-1 rounded-md">{hospital.name}</p>
                                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">{hospital.address}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing with hospital command center...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SlotBookingModal;
