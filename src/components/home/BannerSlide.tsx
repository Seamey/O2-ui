"use client";

import React from "react";

// Swiper components, modules and styles
import {
    Autoplay, Navigation,
    // Pagination
} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useGetDiscountBannerProductQuery} from "@/app/redux/service/product";
import SkeletonBannerDiscount from "@/components/home/SkeletonBannerDiscount";

type Slide = {
    name: string;
    discount_percentage: string;
    image: string;
    uuid: string;
}

const BannerSlide: React.FC = () => {

    const {data, isLoading, error} = useGetDiscountBannerProductQuery();


    // Handle error state
    if (error) {
        return (
            <section className="w-full rounded-[10px]">
                <div className="w-full h-[180px] rounded-[10px] bg-red-100">
                    Error loading banners
                </div>
            </section>
        );
    }

    // Extract discounts from API response
    const discounts = data?.data || [];

    return (
        <section>
            {
                isLoading ? (
                    <SkeletonBannerDiscount/>
                ) : (
                    <section className="w-full rounded-[10px]">
                        <div className=" w-full rounded-[10px]">
                            <ul className="h-[180px] w-full rounded-[10px]">
                                <Swiper
                                    className={`h-full w-full rounded-[10px]`}
                                    // navigation
                                    pagination={{type: "bullets", clickable: true}}
                                    autoplay={true}
                                    loop={true}
                                    modules={[Autoplay, Navigation]}
                                >
                                    {discounts.map((discount) => (
                                        <SwiperSlide key={discount.uuid}>
                                            <div
                                                className="h-full w-full absolute left-0 top-0"
                                                style={{
                                                    background: `url(${process.env.NEXT_PUBLIC_O2_API_URL + discount.image}) center center / cover scroll no-repeat`,
                                                }}
                                            ></div>
                                            <div
                                                className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
                                            <div className="relative z-10 h-full flex items-center justify-start">
                                                <div className=" flex flex-col pl-10">
                                                    <p className="text-red-600 text-xl font-bold">{discount.discount_percentage}%<span
                                                        className=" text-sm px-1 font-light text-white">OFF</span></p>
                                                    <p className="text-2xl uppercase text-white font-normal">
                                                        {discount.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </ul>
                        </div>
                    </section>
                )
            }
        </section>
    );
};

export default BannerSlide;