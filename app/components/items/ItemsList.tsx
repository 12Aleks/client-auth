import React from 'react';
import { Item } from "@/app/utils/types";
import SingleItem from "@/app/components/items/SingleItem";

interface Props {
    data: Item[];
}

const ItemsList = ({ data }: Props) => {
    return (
        <div className="space-y-4">
            {data?.length === 0 ? (
                <p>Items not found...</p>
            ) : (
                data?.map((item) => (
                    <SingleItem  key={item.title} {...item} />
                ))
            )}
        </div>
    );
};

export default ItemsList;