import React from "react";
import {useGetDiscountProductQuery} from "@/app/redux/service/product";
import {DataType} from "@/app/types/ProductDetail";
import {useRouter} from "next/navigation";
import CardProductByColumnComponent from "@/components/home/CardProductByColumnComponent";
import SkeletonProductDiscountComponent from "@/components/home/SkeletonProductDiscountComponent";

export default function DiscountProductComponent() {
    // Fetch discount products using the RTK Query hook
    const {data, isLoading, error} = useGetDiscountProductQuery();
    const router = useRouter();

    // Handle loading and error states
    if (error) return <div>Error loading discounts</div>;

    // Extract the products array from the nested data structure
    const discounts = data?.data || [];

    // Function to navigate to the discount category page
    const handleSeeMore = () => {
        router.push('/categories-product/discount');
    };

    return (
        <section>
            {isLoading ? (
                <SkeletonProductDiscountComponent/>
            ) : (
                <section className="flex flex-col">
                    {discounts.length === 0 ? (
                        <div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-end">
                                <h1 className="text-2xl font-normal">ប្រម៉ូសិន និងការបញ្ចុះតម្លៃ</h1>
                                <p
                                    className="font-light text-primary-light cursor-pointer hover:underline"
                                    onClick={handleSeeMore}
                                >
                                    មើលបន្ថែម
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 overflow-auto scrollbar-hide py-3">
                                {discounts.map((discount: DataType) => (
                                    <CardProductByColumnComponent
                                        key={discount.uuid}
                                        uuid={discount.uuid}
                                        single_image={discount.single_image}
                                        name={discount.name}
                                        discounted_price={discount.discounted_price}
                                        discount_percentage={discount.discount_percentage}
                                        price={discount.price}
                                        category_name={discount.category_name}
                                        created_at={discount.created_at}
                                        stock={discount.stock}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </section>
            )}
        </section>
    );
}