import {FaHeart} from "react-icons/fa";
import {GoClock} from "react-icons/go";
import {HiOutlineFire} from "react-icons/hi2";
import React from "react";
import TimeDifferenceComponent from "@/components/home/TimeDifferenceComponent";
import {useRouter} from "next/navigation";

type Props = {
    uuid: string;
    single_image: string;
    name: string;
    discount_percentage: string;
    discounted_price: number;
    price: number;
    category_name: string;
    created_at: string;
    stock: number;
}

export default function CardProductByColumnComponent({
                                                         uuid,
                                                         single_image,
                                                         name,
                                                         discounted_price,
                                                         discount_percentage,
                                                         price,
                                                         category_name,
                                                         created_at,
                                                         stock
                                                     }: Props) {
    const router = useRouter();
    return (
        <div
            key={uuid}
            onClick={() => router.push(`/product/${uuid}`)}
            className="relative max-w-[450px] h-[300px] rounded-xl bg-white p-3 cursor-pointer hover:shadow-sm hover:transform hover:-translate-y-1 transition-transform duration-200"
        >
            <div
                className="rounded-xl w-full h-[65%] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_O2_API_URL + single_image})`
                }}
            />
            {
                discounted_price >= 0 || discount_percentage === '0' ? (
                    <div></div>
                ) : (
                    <div
                        className="absolute top-5 left-5 bg-primary flex justify-center items-center rounded-[6px] w-auto h-7 px-3 py-2"
                    >
                        {discount_percentage === '0' ? (
                            <p className="text-white">បញ្ចុះតម្លៃ {discounted_price}$</p>
                        ) : (
                            <p className="text-white">បញ្ចុះតម្លៃ {discount_percentage}%</p>
                        )}
                    </div>
                )
            }

            <div
                className="absolute top-5 right-5 bg-white flex justify-center items-center rounded-[6px] w-7 h-7"
            >
                <FaHeart className="w-5 h-5 text-primary-light"/>
            </div>
            <div className="flex flex-col gap-1 justify-start">
                <p className="text-base font-light mt-2 line-clamp-1 ">{name}</p>
                <div className="flex justify-start items-center gap-1">
                    <p className="font-light text-gray-500 text-sm">
                        ${price}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-accent"></span>
                    <p className="font-light text-gray-500 text-sm line-clamp-1 ">{category_name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex justify-start items-center gap-1">
                        <GoClock className="text-gray-500 w-[14px] h-[14px]"/>
                        {/*<p className="font-light text-gray-500 text-sm">*/}
                            <TimeDifferenceComponent createdAt={created_at}/>
                        {/*</p>*/}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    <div className="flex justify-start items-center gap-1">
                        <HiOutlineFire className="text-gray-500 w-[14px] h-[14px]"/>
                        <p className="font-light text-gray-500 text-sm">បានលក់</p>
                        <p className="font-light text-gray-500 text-sm">{stock}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}