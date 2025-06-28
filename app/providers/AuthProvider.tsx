'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/app/utils/types';

interface AuthContextType {
    role: JwtPayload['role'] | null;
    setRole: (role: JwtPayload['role'] | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<JwtPayload['role'] | null>(null);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                setRole(decoded.role);
            } catch {
                setRole(null);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
