import React from 'react';
import {User} from "@/app/utils/types";

interface Props {
    user: User;
    index: number
}

const UserCard = ({user, index}: Props) => {
    return (
        <tr className="hover:text-amber-500">
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2 ">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
        </tr>
    );
};

export default UserCard;