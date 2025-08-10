import { useContext, createContext, useState, useEffect, type ReactNode } from "react";
import {type Session, type User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

type SignUpResponse = Awaited<ReturnType<typeof supabase.auth.signUp>>;
type SignInResponse = Awaited<ReturnType<typeof supabase.auth.signInWithPassword>>;
type SignOutResponse = Awaited<ReturnType<typeof supabase.auth.signOut>>;
type AuthStateChange = ReturnType<typeof supabase.auth.onAuthStateChange>['data']['subscription'];

export interface AuthContextType{
    user: User | null;
    session: Session | null;
    signUp: (email: string, password: string) => Promise<SignUpResponse>;
    signIn: (email: string, password: string) => Promise<SignInResponse>;
    signOut: () => Promise<SignOutResponse>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    signUp: async () => {throw new Error('AuthProvider not mounted'); },
    signIn: async () => {throw new Error('AuthProvider not mounted'); },
    signOut: async () => {throw new Error('AuthProvider not mounted'); },
});

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null> (null);

    useEffect(() => {
        supabase.auth.getSession()
            .then(({ data }) => {
                setSession(data.session);
                setUser(data.session?.user ?? null);
            });
        
        const {data:{subscription}} : {data: {subscription: AuthStateChange}} =
            supabase.auth.onAuthStateChange((_, newSession) => {
                setSession(newSession);
                setUser(newSession?.user ?? null);
            });
        
        return () => {
            subscription.unsubscribe();
        };

    }, []);

    const signUp = (email: string, password: string): Promise<SignUpResponse> =>
        supabase.auth.signUp({email, password});
    
    const signIn = (email: string, password: string): Promise<SignInResponse> =>
        supabase.auth.signInWithPassword({email, password});

    const signOut = (): Promise<SignOutResponse> =>
        supabase.auth.signOut();

    return(
        <AuthContext.Provider value = {{user, session, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within KanbanProvider');
  return context;
}