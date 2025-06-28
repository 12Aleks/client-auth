import React from 'react';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Item, ItemSchema} from "@/app/lib/zodSchema";
import {useMutation} from "@tanstack/react-query";
import {createItem} from "@/app/lib/actions/api";
import { useQueryClient } from "@tanstack/react-query";

interface FormComponentProps {
    role: string;
}

const ItemForm = ({role}: FormComponentProps) => {
    const queryClient = useQueryClient();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<Item>({
       resolver: zodResolver(ItemSchema)
    });

    const {mutateAsync: createNewItem} = useMutation({
        mutationKey: ['items'],
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });// <--- это обновит список
        }
    });

    const onSubmit = async (data: Item) => {
        if(role === 'admin' || role === 'distributor'){
            await createNewItem(data);
            reset();
        }else{
            console.warn('User does not have permission to create items.');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 justify-center max-w-2xl m-auto bg-white p-3 rounded">
            <div className="flex flex-col w-full">
                <input {...register("title")} placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className="flex flex-col w-full">
                <textarea {...register("description")} placeholder="Last name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create new Item</button>
        </form>
    );
};

export default ItemForm;