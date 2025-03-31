'use client';
import React from "react";
import {useGetPopularProductQuery} from "@/app/redux/service/product";
import {DataType} from "@/app/types/ProductDetail";
import {useRouter} from "next/navigation";
import {SkeletonProductComponent} from "@/components/home/SkeletonProductComponent";
import CardProductByRowComponent from "@/components/home/CardProductByRowComponent";

export default function PopularProductComponent() {
    const router = useRouter();
    // Fetch recommended products using the RTK Query hook
    const {data, isLoading, error} = useGetPopularProductQuery();

    // Handle loading and error states
    if (error) return <div>Error loading popular</div>;

    // console.log("  DATA : ", data)

    // Extract the products array from the nested data structure
    const popular = data?.data || [];

    const handleSeeMore = () => {
        router.push('/categories-product/popular');
    };

    return (
        <section>
            {
                isLoading ? (
                    <SkeletonProductComponent/>
                ) : (
                    <section className="flex flex-col">{
                        popular === 0 && <div></div>
                    }
                        <div className="flex justify-between items-end">
                            <h1 className="text-2xl font-normal">ផលិតផលដែលពេញនិយមបំផុត</h1>
                            <p
                                className="font-light text-primary-light cursor-pointer hover:underline"
                                onClick={handleSeeMore}
                            >
                                មើលបន្ថែម
                            </p>
                        </div>
                        <div className="flex flex-row gap-3 scrollbar-hide py-3 overflow-auto">
                            {popular.map((product: DataType) => (
                                <CardProductByRowComponent
                                    key={product.uuid}
                                    uuid={product.uuid}
                                    single_image={product.single_image}
                                    name={product.name}
                                    discounted_price={product.discounted_price}
                                    price={product.price}
                                    category_name={product.category_name}
                                    created_at={product.created_at}
                                />
                            ))}
                        </div>
                    </section>

                )
            }
        </section>

    );
}