export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const INVENTORY_DATA = [
    { type: 'A+', units: 45, status: 'available' },
    { type: 'A-', units: 12, status: 'low' },
    { type: 'B+', units: 38, status: 'available' },
    { type: 'B-', units: 5, status: 'critical' },
    { type: 'O+', units: 62, status: 'available' },
    { type: 'O-', units: 8, status: 'low' },
    { type: 'AB+', units: 24, status: 'available' },
    { type: 'AB-', units: 2, status: 'critical' },
];

export const RECENT_REQUESTS = [
    { id: 'REQ-001', hospital: 'City Memorial', type: 'O-', units: 2, urgency: 'critical', time: '10m ago' },
    { id: 'REQ-002', hospital: 'St. Marys General', type: 'A+', units: 5, urgency: 'urgent', time: '25m ago' },
    { id: 'REQ-003', hospital: 'Childrens Clinic', type: 'B-', units: 1, urgency: 'critical', time: '45m ago' },
];

export const DEPLETION_STATS = [
    { day: 'Mon', usage: 45 },
    { day: 'Tue', usage: 52 },
    { day: 'Wed', usage: 38 },
    { day: 'Thu', usage: 65 },
    { day: 'Fri', usage: 48 },
    { day: 'Sat', usage: 30 },
    { day: 'Sun', usage: 25 },
];

export const DONOR_ACHIEVEMENTS = [
    { id: 'first', title: 'First Donation', desc: 'Completed initial life-saving act.', icon: 'Award', unlocked: true },
    { id: 'milestone_5', title: '5 Donations Milestone', desc: 'Saved up to 15 lives.', icon: 'Trophy', unlocked: true },
    { id: 'rare_hero', title: 'Rare Blood Hero', desc: 'O- or AB- donor reliability.', icon: 'Heart', unlocked: false },
    { id: 'emergency', title: 'Emergency Responder', desc: 'Responded to critical alert.', icon: 'Zap', unlocked: true },
    { id: 'lives_10', title: '10 Lives Saved', desc: 'Significant community impact.', icon: 'Star', unlocked: false },
    { id: 'platinum', title: 'Platinum Saver', desc: 'Reached the highest donor rank.', icon: 'ShieldCheck', unlocked: false },
];

export const REWARDS = [
    { title: 'Health Wellness Pack', points: 1200, category: 'Medical', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop' },
    { title: 'Pharmacy Discount Coupon', points: 2500, category: 'Health', image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=200&h=200&fit=crop' },
    { title: 'Free Lab Screening', points: 5000, category: 'Diagnostics', image: 'https://images.unsplash.com/photo-1579152276516-ec082664972e?w=200&h=200&fit=crop' },
    { title: 'Recognition Certificate', points: 500, category: 'Status', image: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=200&h=200&fit=crop' },
];

export const NEARBY_HOSPITALS = [
    { name: 'City Memorial', distance: '3.2 km', stock: 'Low', need: 'O-', address: '123 Medical Way' },
    { name: 'St. Marys General', distance: '5.8 km', stock: 'Critical', need: 'O-', address: '456 Healthcare St' },
    { name: 'Central Hub', distance: '8.1 km', stock: 'Stable', need: 'A+', address: '789 Logistics Dr' },
];

export const DONATION_HISTORY = [
    { date: '2025-11-12', hospital: 'City Memorial', type: 'O-', units: '1 Unit', points: 150 },
    { date: '2025-08-04', hospital: 'Red Cross Center', type: 'O-', units: '1 Unit', points: 100 },
    { date: '2025-05-10', hospital: 'General Hospital', type: 'O-', units: '1 Unit', points: 100 },
];
