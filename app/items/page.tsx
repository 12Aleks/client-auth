"use client"
import { useQuery} from "@tanstack/react-query";
import { getAllItems} from "@/app/lib/actions/api";
import ItemsList from "@/app/features/items/ItemsList";
import ItemForm from "@/app/features/items/ItemForm";
import {useAuth} from "@/app/providers/AuthProvider";

const ItemPage = () => {
    const {role} = useAuth()

    const { data, error, isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: getAllItems,
        enabled: role === 'admin' || role === 'distributor',
    })

    return (
        <div className="m-4">
            {role && <ItemForm role={role} />}
            {(isLoading ) && <p>Loading...</p>}
            {error && <p className="text-red-500">Insufficient rights to view users</p>}
            {data && <ItemsList data={data} />}
        </div>
    );
};

export default ItemPage;