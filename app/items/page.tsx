"use client"
import {useEffect, useState} from 'react';
import { useQuery} from "@tanstack/react-query";
import { getAllItems} from "@/app/lib/actions/api";
import ItemsList from "@/app/components/items/ItemsList";
import {JwtPayload} from "@/app/utils/types";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import FormComponent from "@/app/components/items/FormComponent";

const ItemPage = () => {
    const [role, setRole] = useState<JwtPayload['role'] | null>(null);

    const { data, error, isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: getAllItems,
        enabled: role === 'admin' || role === 'distributor',
    })

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
        <>
            {(isLoading ) && <p>Loading...</p>}
            {error && <p className="text-red-500">Insufficient rights to view users</p>}
            {data && <ItemsList data={data} />}
            {role && <FormComponent role={role} />}
        </>
    );
};

export default ItemPage;