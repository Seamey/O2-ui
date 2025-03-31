'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import SplashScreenComponent from "@/components/home/SplashScreenComponent";
import dataSlider from "@/lib/slider_data.json";
import BannerSlide from "@/components/home/BannerSlide";
import {Input} from "@/components/ui/input";
import {FiSearch} from "react-icons/fi";
import CategoryComponent from "@/components/home/CategoryComponent";
import RecommendationComponent from "@/components/home/RecommendationComponent";
import FeedbackSlide from "@/components/home/FeedbackSlide";
import {FeedbackDrawerComponent} from "@/components/home/FeedbackDrawerComponent";
import PopularProductComponent from "@/components/home/PopularProductComponent";
import PreOrderProductComponent from "@/components/home/PreOrderProductComponent";
import DiscountProductComponent from "@/components/home/DiscountProductComponent";
import FilterComponent from "@/components/home/FilterComponent";
import FeedbackComponent from "@/components/home/FeedbackComponent";

export default function Page() {
    const [showSplash, setShowSplash] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/search&filter/${"s-" + searchValue}`);
        }
    };

    return (
        <div className="relative">
            {/* Splash Screen */}
            {showSplash && <SplashScreenComponent onComplete={handleSplashComplete}/>}

            {/* main section */}
            {!showSplash && (
                <section className="flex min-h-screen flex-col px-5 gap-7 ">

                    {/* Search section*/}
                    <section className=" sticky top-[65px] z-50 bg-background_color py-4">
                        <section className=" relative ">
                            <Input
                                className=" pl-[45px] bg-white rounded-3xl border-gray-100 text-lg h-[45px]"
                                type="text"
                                placeholder="ស្វែងរកនៅទីនេះ...."
                                value={searchValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <FiSearch className=" absolute top-2 left-0 text-gray-400 w-7 h-7 ml-3"/>
                            <FilterComponent/>
                        </section>
                    </section>

                    {/* Banner Slide */}
                    <BannerSlide/>

                    {/* Category section*/}
                    <CategoryComponent/>

                    {/* Recommendation section */}
                    <RecommendationComponent/>

                    {/* Popular section */}
                    <PopularProductComponent/>

                    {/* Order section */}
                    <PreOrderProductComponent/>

                    <DiscountProductComponent/>

                    {/* Feedback section */}
                    <FeedbackComponent/>

                </section>
            )}
        </div>
    )
}