import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const HospitalAuthContext = createContext(null);
export const useHospitalAuth = () => useContext(HospitalAuthContext);

export const HospitalAuthProvider = ({ children }) => {
    const [hospital, setHospital] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // ── Load session & hospital profile on mount ──────────────
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchHospitalProfile(session.user.id);
            else setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            if (event === 'PASSWORD_RECOVERY') {
                // We're in recovery mode, don't fetch profile yet
                setLoading(false);
            } else if (session) {
                fetchHospitalProfile(session.user.id);
            } else {
                setHospital(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchHospitalProfile = async (userId) => {
        const { data, error } = await supabase
            .from('hospitals')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (!error && data) setHospital(data);
        setLoading(false);
    };

    // ── Register ──────────────────────────────────────────────
    const register = async (formData) => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });
        if (authError) throw authError;

        // Insert profile row
        await supabase.from('profiles').insert({
            id: authData.user.id,
            role: 'hospital',
        });

        // Insert hospital row
        const { error: hospError } = await supabase.from('hospitals').insert({
            user_id: authData.user.id,
            name: formData.hospitalName,
            reg_number: formData.regNumber,
            facility_type: formData.facilityType,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            website: formData.website,
            bed_count: formData.bedCount ? parseInt(formData.bedCount) : null,
        });
        if (hospError) throw hospError;

        // Seed default blood inventory
        const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
        const { data: hospRow } = await supabase
            .from('hospitals').select('id').eq('user_id', authData.user.id).single();
        if (hospRow) {
            await supabase.from('blood_inventory').insert(
                bloodTypes.map(bt => ({ hospital_id: hospRow.id, blood_type: bt, units: 0 }))
            );
        }

        return authData;
    };

    // ── Reset Password ───────────────────────────────────────
    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/hospital/login`,
        });
        if (error) throw error;
    };

    // ── Login ─────────────────────────────────────────────────
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    // ── Logout ────────────────────────────────────────────────
    const logout = async () => {
        await supabase.auth.signOut();
        setHospital(null);
        setSession(null);
    };

    // ── Update password ──────────────────────────────────────
    const updatePassword = async (newPassword) => {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
    };

    // ── Update blood inventory ────────────────────────────────
    const updateInventory = async (bloodType, units) => {
        if (!hospital) return;
        await supabase.from('blood_inventory').upsert({
            hospital_id: hospital.id,
            blood_type: bloodType,
            units,
            updated_at: new Date().toISOString(),
        }, { onConflict: 'hospital_id,blood_type' });
    };

    const value = {
        hospital,
        session,
        loading,
        isAuthenticated: !!session && !!hospital,
        register,
        login,
        resetPassword,
        logout,
        updatePassword,
        updateInventory,
    };

    return (
        <HospitalAuthContext.Provider value={value}>
            {children}
        </HospitalAuthContext.Provider>
    );
};
