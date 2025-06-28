import React from 'react';

interface Props {
    title: string;
    description: string;
}

const ItemCard = (item: Props) => {
    return (
        <div key={item.title} className="border p-4 rounded shadow m-4 hover:border-amber-500 transition duration-200
         hover:text-amber-500">
            <h2 className="font-bold text-lg">{item.title}</h2>
            <p>{item.description}</p>
        </div>
    );
};

export default ItemCard;