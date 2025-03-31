import React from "react";
import {useGetRecommendationProductQuery} from "@/app/redux/service/product";
import {DataType} from "@/app/types/ProductDetail";
import {useRouter} from "next/navigation";
import {SkeletonProductComponent} from "@/components/home/SkeletonProductComponent";
import CardProductByRowComponent from "@/components/home/CardProductByRowComponent";

export default function RecommendationComponent() {
    const {data, isLoading, error} = useGetRecommendationProductQuery();
    const router = useRouter();

    if (error) return <div>Error loading recommendations</div>;

    const recommendations = data?.data?.data || [];

    // Add click handler for "See More"
    const handleSeeMore = () => {
        router.push('/categories-product/recommendation');
    };

    return (
        <section>
            {isLoading ? (
                <SkeletonProductComponent/>
            ) : (
                <section className="flex flex-col">
                    {
                        recommendations.length === 0 && <div></div>
                    }
                    <div className="flex justify-between items-end">
                        <h1 className="text-2xl font-normal">ត្រូវបានណែនាំសម្រាប់អ្នក</h1>
                        <p
                            className="font-light text-primary-light cursor-pointer hover:underline"
                            onClick={handleSeeMore}
                        >
                            មើលបន្ថែម
                        </p>
                    </div>
                    <div className="flex gap-3 overflow-auto scrollbar-hide py-3">
                        {recommendations.map((recommendation: DataType) => (
                            <CardProductByRowComponent
                                key={recommendation.uuid}
                                uuid={recommendation.uuid}
                                single_image={recommendation.single_image}
                                name={recommendation.name}
                                discounted_price={recommendation.discounted_price}
                                price={recommendation.price}
                                category_name={recommendation.category_name}
                                created_at={recommendation.created_at}
                            />
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
}