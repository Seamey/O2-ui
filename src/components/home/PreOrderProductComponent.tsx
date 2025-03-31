import { FaHeart } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { HiOutlineFire } from "react-icons/hi2";
import React from "react";
import { useGetPreOrderProductQuery } from "@/app/redux/service/product";
import { DataType } from "@/app/types/ProductDetail";
import { useRouter } from "next/navigation";
import { SkeletonProductComponent } from "@/components/home/SkeletonProductComponent";
import CardProductByRowComponent from "@/components/home/CardProductByRowComponent";

const PreOrderHeader = ({ handleSeeMore }: { handleSeeMore: () => void }) => (
    <div className="flex justify-between items-end">
        <h1 className="text-2xl font-normal">បញ្ជាទិញផលិតផលជាមុន</h1>
        <p
            className="font-light text-primary-light cursor-pointer hover:underline"
            onClick={handleSeeMore}
        >
            មើលបន្ថែម
        </p>
    </div>
);

const PreOrderList = ({ preorders }: { preorders: DataType[] }) => (
    <div className="flex gap-3 overflow-auto scrollbar-hide py-3">
        {preorders.map((preorder: DataType) => (
            <CardProductByRowComponent
                key={preorder.uuid}
                uuid={preorder.uuid}
                single_image={preorder.single_image}
                name={preorder.name}
                discounted_price={preorder.discounted_price}
                price={preorder.price}
                category_name={preorder.category_name}
                created_at={preorder.created_at}
            />
        ))}
    </div>
);

export default function PreOrderProductComponent() {
    const { data, isLoading, error } = useGetPreOrderProductQuery();
    const router = useRouter();

    if (error) return <div>Error loading pre-orders</div>;

    const preorders = data?.data?.data || [];

    const handleSeeMore = () => {
        router.push('/categories-product/preorder');
    };

    return (
        <section>
            {isLoading ? (
                <SkeletonProductComponent />
            ) : (
                <section className="flex flex-col">
                    {preorders.length === 0 && <div></div>}
                    <PreOrderHeader handleSeeMore={handleSeeMore} />
                    <PreOrderList preorders={preorders} />
                </section>
            )}
        </section>
    );
}