"use client"
import {useEffect, useState} from 'react';
import UsersList from "@/app/features/users/UsersList";
import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/app/lib/actions/api";
import {useAuth} from "@/app/providers/AuthProvider";

const UsersPage = () => {
    const [visible, setVisible] = useState(false);
    const {role} = useAuth()

    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: visible && role === 'admin', // if role is admin
    });

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