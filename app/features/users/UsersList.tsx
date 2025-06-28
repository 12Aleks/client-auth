import React from 'react';
import {User} from "@/app/utils/types";
import UserCard from "@/app/features/users/UserCard";

interface UsersListProps {
    data: User[];
}

const UsersList = ({data}: UsersListProps) => {
    return (
        <table className="table-fixed w-full border border-gray-300">
            <thead>
            <tr>
                <th className="border border-gray-300 px-4 py-2">Nr</th>
                <th className="border border-gray-300 px-4 py-2">User email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
            </tr>
            </thead>
            <tbody>
            {
                data?.map((user, index) => (
                    <UserCard user={user} index={index} key={index} />
                ))
            }
            </tbody>
        </table>
    );
};

export default UsersList;