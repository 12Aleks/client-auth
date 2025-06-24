'use client';
import { useMutation } from '@tanstack/react-query';
import { login } from '../lib/actions/api';
import { authSchema } from '../lib/zodSchema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Role} from "@/app/utils/types";

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role] = useState<Role>('user');
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            router.push('/');
        },
        onError: () => {
            alert('Неверный email или пароль');
        },
    });

    return (
        <div className="max-w-sm mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Log in to the system</h1>
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
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                >  Login

                </button>
            </form>
        </div>
    );
}
