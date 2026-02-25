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
        if (!error && data) setDonor(data);
        setLoading(false);
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
        session,
        loading,
        isAuthenticated: !!session && !!donor,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
