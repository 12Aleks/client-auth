export type Role = 'user' | 'admin' | 'distributor';

export interface User {
    _id: string;
    email: string;
    role: Role;
}