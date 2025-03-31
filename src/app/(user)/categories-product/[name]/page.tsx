'use client';
import {IoIosArrowBack} from "react-icons/io";
import {
    useGetRecommendationProductQuery,
    useGetPreOrderProductQuery,
    useGetDiscountProductQuery,
    useGetPopularProductQuery
} from "@/app/redux/service/product";
import {DataType} from "@/app/types/ProductDetail";
import React from "react";
import {useRouter} from "next/navigation";
import CardProductByColumnComponent from "@/components/home/CardProductByColumnComponent";
import SkeletonProductDiscountComponent from "@/components/home/SkeletonProductDiscountComponent";

type Props = {
    params: Promise<{ name: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};


export default function CategoryProduct({params}: Props) {
    const router = useRouter();
    const {name} = React.use(params);

    const recommendationQuery = useGetRecommendationProductQuery();
    const discountQuery = useGetDiscountProductQuery();
    const preorderQuery = useGetPreOrderProductQuery();
    const popularQuery = useGetPopularProductQuery();

    let title = "";
    let queryData;

    switch (name) {
        case "recommendation":
            title = "ត្រូវបានណែនាំសម្រាប់អ្នក";
            queryData = recommendationQuery;
            break;
        case "discount":
            title = "ផលិតផលដែលមានការបញ្ចុះតម្លៃ";
            queryData = discountQuery;
            break;
        case "preorder":
            title = "បញ្ជាទិញផលិតផលជាមុន";
            queryData = preorderQuery;
            break;
        case "popular":
            title = "ផលិតផលដែលពេញនិយមបំផុត";
            queryData = popularQuery;
            break;
        default:
            title = "";
            queryData = {data: null, isLoading: false, error: null};
    }

    const {data, isLoading, error} = queryData;

    const products = (name === "preorder" || name === "recommendation")
        ? (data?.data?.data || [])
        : (data?.data || []);

    if (error) return <div>Error loading products</div>;

    return (
        <section>
            {
                isLoading ? (
                    <SkeletonProductDiscountComponent/>
                ) : (
                    <section className="px-5 w-full">
                        <section className="flex items-center gap-5 my-3">
                            <div className="bg-gray-100 rounded-full overflow-hidden p-2">
                                <IoIosArrowBack
                                    onClick={() => router.back()}
                                    className="cursor-pointer h-[30px] w-[30px] text-primary"
                                />
                            </div>
                            <h1 className="text-2xl text-gray-600">{title}</h1>
                        </section>

                        <div className="flex flex-col gap-3 overflow-auto scrollbar-hide py-3">
                            {products.map((product: DataType) => (
                                <CardProductByColumnComponent
                                    key={product.uuid}
                                    uuid={product.uuid}
                                    single_image={product.single_image}
                                    name={product.name}
                                    discounted_price={product.discounted_price}
                                    price={product.price}
                                    discount_percentage={product.discount_percentage}
                                    category_name={product.category_name}
                                    created_at={product.created_at}
                                    stock={product.stock}
                                />
                            ))}
                        </div>
                    </section>
                )
            }
        </section>
    );
}