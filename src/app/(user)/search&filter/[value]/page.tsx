'use client';
import {IoIosArrowBack} from "react-icons/io";
import {DataType} from "@/app/types/ProductDetail";
import {FaHeart} from "react-icons/fa";
import {GoClock} from "react-icons/go";
import {HiOutlineFire} from "react-icons/hi2";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useGetFilterListProductQuery, useGetSearchProductQuery} from "@/app/redux/service/product";
import {Input} from "@/components/ui/input";
import {FiSearch} from "react-icons/fi";
import FilterComponent from "@/components/home/FilterComponent";
import CardProductByColumnComponent from "@/components/home/CardProductByColumnComponent";
import SkeletonProductDiscountComponent from "@/components/home/SkeletonProductDiscountComponent";

type Props = {
    params: Promise<{ value: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function SearchAndFilter({params}: Props) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const {value} = resolvedParams;

    const isSearch = value.startsWith('s-');
    const isFilter = value.startsWith('f-');

    const searchTerm = isSearch ? value.split('s-')[1] : '';
    const [categoryUuid, maxPrice] = isFilter ? value.split('f-')[1].split('_') : ['', '0'];

    const searchQuery = useGetSearchProductQuery({search: searchTerm}, {skip: !isSearch});
    const filterQuery = useGetFilterListProductQuery(
        {
            category_uuid: categoryUuid,
            max_price: Number(maxPrice),
        },
        {skip: !isFilter}
    );

    const {data, isLoading} = isSearch ? searchQuery : filterQuery;
    const products = data?.data || [];
    const title = isSearch ? `Search: ${searchTerm}` : 'Filtered Products';

    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            router.push(`/search&filter/s-${searchValue}`);
        }
    };

    return (
        <section>
            {
                isLoading ? (
                    <SkeletonProductDiscountComponent/>
                ) : (
                    <section className="px-5 w-full">
                        <section className="flex items-center gap-5 my-3 w-full ">
                            <div className="bg-gray-100 rounded-full overflow-hidden p-2">
                                <IoIosArrowBack
                                    onClick={() => router.back()}
                                    className="cursor-pointer h-[30px] w-[30px] text-primary"
                                />
                            </div>

                            <section className="sticky top-[65px] z-50 bg-background_color py-4 w-full">
                                <section className="relative">
                                    <Input
                                        className="pl-[45px] bg-white rounded-3xl border-gray-100 text-lg h-[45px]"
                                        type="text"
                                        placeholder="ស្វែងរកនៅទីនេះ...."
                                        value={searchValue}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <FiSearch className="absolute top-2 left-0 text-gray-400 w-7 h-7 ml-3"/>
                                    <FilterComponent/>
                                </section>
                            </section>
                        </section>

                        <div className="flex flex-col gap-3 overflow-auto scrollbar-hide py-3">
                            {products.length > 0 ? (
                                products.map((product: DataType) => (
                                    <CardProductByColumnComponent
                                        key={product.uuid}
                                        uuid={product.uuid}
                                        single_image={product.single_image}
                                        name={product.name}
                                        discount_percentage={product.discount_percentage}
                                        discounted_price={product.discounted_price}
                                        price={product.price}
                                        category_name={product.category_name}
                                        created_at={product.created_at}
                                        stock={product.stock}
                                    />
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-5">Products not available</div>
                            )}
                        </div>
                    </section>
                )
            }
        </section>
    );
}