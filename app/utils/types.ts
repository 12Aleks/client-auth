export type Role = 'user' | 'admin' | 'distributor';

export interface User {
    _id: string;
    email: string;
    role: Role;
}

export interface Item {
    title: string;
    description: string;
}

export interface JwtPayload {
    role: 'user' | 'admin' | 'distributor';
}