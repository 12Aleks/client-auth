'use client';
import { useMutation } from '@tanstack/react-query';
import { register } from '../lib/actions/api';
import { authSchema } from '../lib/zodSchema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Role} from "@/app/utils/types";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'user' | 'admin' | 'distributor'>('user');
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            router.push('/');
        },
        onError: () => {
            alert('Error with registration');
        },
    });

    return (
        <div className="max-w-sm mx-auto mt-20 px-5 py-7 border rounded-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Registration:</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const result = authSchema.safeParse({ email, password, role });
                    if (!result.success) return alert('Data is not correct');
                    mutation.mutate(result.data);
                }}
                className="space-y-4"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    className="border p-2 w-full"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="distributor">Distributor</option>
                </select>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded m-auto block">
                    Send your data and create an account
                </button>
            </form>
        </div>
    );
}