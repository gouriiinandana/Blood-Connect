import React from 'react';
import { MapPin } from 'lucide-react';

const MapContainer = ({ height = '400px', hospitals = [], donors = [] }) => {
    return (
        <div
            className="w-full bg-slate-100 rounded-xl relative overflow-hidden border border-slate-200"
            style={{ height }}
        >
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(#1565C0 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Mock Map View */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-400 flex flex-col items-center">
                    <MapPin size={48} className="mb-2 text-secondary/40" />
                    <p className="font-medium">Interactive Map Placeholder</p>
                    <p className="text-sm">Integrating Hospital & Donor Heatmap</p>
                </div>
            </div>

            {/* Mock Pins */}
            <div className="absolute top-1/4 left-1/3">
                <div className="w-4 h-4 bg-primary rounded-full shadow-lg pulse-red"></div>
            </div>
            <div className="absolute top-1/2 right-1/4">
                <div className="w-4 h-4 bg-secondary rounded-full shadow-lg"></div>
            </div>
            <div className="absolute bottom-1/3 left-1/2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg"></div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-soft border border-slate-200 text-xs">
                <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div> Critical Need
                </div>
                <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div> Hospital
                </div>
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div> Donor Density
                </div>
            </div>
        </div>
    );
};

export default MapContainer;
