import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [donor, setDonor] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchDonorProfile(session.user.id);
            else setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchDonorProfile(session.user.id);
            else { setDonor(null); setLoading(false); }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchDonorProfile = async (userId) => {
        const { data, error } = await supabase
            .from('donors')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (!error && data) {
            // Map snake_case to camelCase
            setDonor({
                ...data,
                name: data.full_name,
                bloodType: data.blood_type,
                dateOfBirth: data.date_of_birth,
                lastDonationDate: data.last_donation_date,
                totalDonations: data.total_donations,
                isEligible: data.is_eligible,
                points: data.points || 0,
                livesSaved: data.lives_saved || 0,
                location: `${data.city || ''}${data.city && data.state ? ', ' : ''}${data.state || ''}` || 'Location not set',
                availability: data.emergency_available ?? true
            });
        }
        setLoading(false);
    };

    const updateProfile = async (updates) => {
        if (!session?.user?.id) return;

        // Map camelCase back to snake_case
        const dbUpdates = {};
        if (updates.name) dbUpdates.full_name = updates.name;
        if (updates.phone) dbUpdates.phone = updates.phone;
        if (updates.city) dbUpdates.city = updates.city;
        if (updates.state) dbUpdates.state = updates.state;
        if (updates.availability !== undefined) dbUpdates.emergency_available = updates.availability;
        if (updates.points !== undefined) dbUpdates.points = updates.points;
        if (updates.livesSaved !== undefined) dbUpdates.lives_saved = updates.livesSaved;

        const { error } = await supabase
            .from('donors')
            .update(dbUpdates)
            .eq('user_id', session.user.id);

        if (!error) {
            setDonor(prev => ({ ...prev, ...updates }));
        }
        return { error };
    };

    // ── Reset Password ────────────────────────────────────────
    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login`,
        });
        if (error) throw error;
    };

    // ── Register donor ────────────────────────────────────────
    const register = async (formData) => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });
        if (authError) throw authError;

        await supabase.from('profiles').insert({
            id: authData.user.id,
            role: 'donor',
        });

        const { error: donorError } = await supabase.from('donors').insert({
            user_id: authData.user.id,
            full_name: formData.fullName || formData.name,
            blood_type: formData.bloodType,
            phone: formData.phone,
            city: formData.city,
            state: formData.state,
            date_of_birth: formData.dateOfBirth || null,
        });
        if (donorError) throw donorError;

        return authData;
    };

    // ── Login donor ───────────────────────────────────────────
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    // ── Logout ────────────────────────────────────────────────
    const logout = async () => {
        await supabase.auth.signOut();
        setDonor(null);
        setSession(null);
    };

    const value = {
        donor,
        user: donor, // Alias for compatibility
        session,
        loading,
        isAuthenticated: !!session && !!donor,
        register,
        login,
        resetPassword,
        logout,
        updateUser: updateProfile, // Alias for compatibility
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
