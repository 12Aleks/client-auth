"use client"
import {useEffect, useState} from 'react';
import UsersList from "@/app/components/users/UsersList";
import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/app/lib/actions/api";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "@/app/utils/types";

const UsersPage = () => {
    const [visible, setVisible] = useState(false);
    const [role, setRole] = useState<JwtPayload['role'] | null>(null);


    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: visible && role === 'admin', // if role is admin
    });


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
        <div className="flex flex-col gap-y-4 m-4">
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer max-w-[200px] w-full m-auto block"
                onClick={() => setVisible(true)}
            >
                See all users
            </button>

            {visible && (
                <div className="mt-4">
                    {isLoading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Insufficient rights to view users</p>}
                    {data && <UsersList data={data} />}
                </div>
            )}
        </div>
    );
};

export default UsersPage;