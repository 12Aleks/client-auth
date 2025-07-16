import {Metadata} from "next";
import {getItem} from "@/app/lib/actions/api";
import {Item} from "@/app/utils/types";
import NotFound from "next/dist/client/components/not-found-error";
import {notFound} from "next/navigation";


type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data: Pick<Item, "title" | "description"> | null = await getItem(params.id);

    return {
        title: data?.title || 'Single item',
        description: data?.description || 'Description information',
    }
}


const ItemPage = async({ params }: Props) => {
    const data: Pick<Item, "title" | "description"> | null = await getItem(params.id)

    if (!data) return notFound();

    return (
        <div className="flex flex-col p-5">
            <h1 className="text-3xl mb-5">{data.title}</h1>
            <div>{data.description}</div>
        </div>
    )

};

export default ItemPage;