import { useEffect, useState } from 'react';
import { supabase } from './supabase';

/** Supabase email/password session for the admin pages. */
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
      setAuthChecked(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    if (!supabase) return 'Blog backend is not configured.';
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message || 'Invalid email or password';
    setIsAuthenticated(true);
    return null;
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, authChecked, login, logout };
}
