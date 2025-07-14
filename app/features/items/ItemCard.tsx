import React from 'react';
import {useRouter} from "next/navigation";


interface Props {
    _id:  string;
    title: string;
    description: string;
}

const ItemCard = (item: Props) => {

    const router = useRouter();

    const handleOpen = () => {
        router.push(`/items/${item._id}`);
    };

    return (
        <div key={item.title} className="border p-4 rounded shadow m-4 hover:border-amber-500 transition duration-200
         hover:text-amber-500">
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p>{item.description}</p>

            <button
                onClick={handleOpen}
                className="mt-2 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
            >
                open
            </button>
        </div>
    );
};

export default ItemCard;