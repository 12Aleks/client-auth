'use client'

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/app/lib/actions/api";
import { useParams } from "next/navigation";

const ItemPage = () => {
    const {id} = useParams();


    console.log("single", id);

    const { data, error, isLoading } = useQuery({
        queryKey: ['item', id],
        queryFn: ({ queryKey }) => getItem(queryKey[1] as string),
        enabled: !!id,
    });

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {(error as Error).message}</div>;

    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.description}</p>
        </div>
    );
};

export default ItemPage;