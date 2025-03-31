import {FeedbackDrawerComponent} from "@/components/home/FeedbackDrawerComponent";
import FeedbackSlide from "@/components/home/FeedbackSlide";
import React from "react";
import {useGetFeedbackQuery} from "@/app/redux/service/product";
import SkeletonFeedback from "@/components/home/SkeletonFeedback";

export default function FeedbackComponent() {
    const {data, error, isLoading} = useGetFeedbackQuery();
    const env = process.env.NEXT_PUBLIC_O2_API_URL;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading feedback</div>;

    const feedback = data?.data.map((item: any) => ({
        id: item.uuid,
        userName: item.username,
        description: item.message,
        userProfile: item.avatar,
        created_at: item.created_at,
    })) || [];

    return (
        <section>
            {
                isLoading ? (
                    <SkeletonFeedback/>
                ) : (

                    <section className="flex flex-col">
                        <div className="flex justify-between items-end">
                            <h1 className="text-2xl font-normal">មតិយោបល់របស់អតិថិជន</h1>
                            <FeedbackDrawerComponent/>
                        </div>
                        <div className="flex gap-3 overflow-auto scrollbar-hide py-3">
                            <FeedbackSlide feedback={feedback} env={env}/>
                        </div>

                    </section>
                )
            }
        </section>
    )
}