import React, { useState, useEffect } from "react";
import SkeletonCategoryProduct from "@/components/home/SkeletonCategoryProduct";

const categories = [
    {id: 1, name: "បញ្ចុះតម្លៃ", imageUrl: "/category/product-marketing.png", description: "ការផ្សព្វផ្សាយ 50%"}, // 50% discount promotion
    {id: 2, name: "បន្លែ", imageUrl: "/category/vegetable.png", description: "បន្លែស្រស់"}, // Vegetables
    {id: 5, name: "អាហារសុខភាព", imageUrl: "/category/diet.png", description: "អាហារសម្រកទម្ងន់"}, // Diet/healthy food
    {id: 6, name: "ទឹកដោះគោ", imageUrl: "/category/milk.png", description: "ផលិតផលទឹកដោះ"}, // Milk products
    {id: 3, name: "ឧបករណ៍", imageUrl: "/category/speaker.png", description: "ឧបករណ៍សំឡេង"}, // Speaker-related
    {id: 4, name: "គ្រឿងសម្អាង", imageUrl: "/category/cosmetics.png", description: "ផលិតផលសម្អាង"}, // Cosmetics
];

export default function CategoryComponent() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section>
            {
                isLoading ? (
                    <SkeletonCategoryProduct/>
                ) : (
                    <section className="flex flex-col">
                        <h1 className="text-2xl font-normal">ប្រភេទសេវាកម្ម</h1>
                        <section className="flex gap-3 overflow-auto scrollbar-hide py-4 ">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center max-w-[300px] gap-5 bg-white py-[6px] border-gray-200 border rounded-xl px-3 hover:bg-white hover:transform hover:-translate-y-1 transition-transform duration-200"
                                >
                                    <div className="bg-primary/20 p-2 rounded-full flex items-center justify-center">
                                        <div
                                            className="w-[30px] h-[30px] flex items-center justify-center bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${category.imageUrl})`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex flex-col ">
                                        <p className="whitespace-nowrap text-base ">{category.name}</p>
                                        <p className="whitespace-nowrap text-gray-400 text-sm">{category.description}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </section>
                )
            }
        </section>
    );
}