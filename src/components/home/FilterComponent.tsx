import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {FaArrowRightLong} from "react-icons/fa6";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import * as React from "react";
import {PiSlidersHorizontalBold} from "react-icons/pi";
import {useGetFilterProductQuery} from "@/app/redux/service/product";
import {Slider} from "@/components/ui/slider";
import {useRouter} from "next/navigation";

export default function FilterComponent() {
    const {data, isLoading, error} = useGetFilterProductQuery();
    const [mainCategory, setMainCategory] = React.useState<string>("");
    const [subCategory, setSubCategory] = React.useState<string>("");
    const [priceValue, setPriceValue] = React.useState<number[]>([10]);
    const filterValue = `f-${mainCategory}_${priceValue[0]}`;
    const filter = data?.data || [];
    const router = useRouter();

    // Handle main select change
    const handleMainChange = (value: string) => {
        setMainCategory(value);
        setSubCategory("");
    };

    // Handle sub select change
    const handleSubChange = (value: string) => {
        setSubCategory(value);
    };

    // Handle slider change
    const handlePriceChange = (value: number[]) => {
        setPriceValue(value);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading filters</div>;

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div
                    className={`cursor-pointer absolute top-[5px] right-[10px] bg-primary rounded-full p-2 flex justify-between items-center`}>
                    <PiSlidersHorizontalBold className={`text-white w-5 h-5`}/>
                </div>
            </DrawerTrigger>
            <DrawerContent className={`h-[400px] bg-white flex justify-start items-start`}>
                <div className="w-full flex flex-col items-start">
                    <DrawerHeader className={`w-full flex flex-col justify-start items-start gap-2`}>
                        <DrawerTitle className={`text-xl`}>កំណត់ការស្វែងរក!</DrawerTitle>

                        {/* Main Select */}
                        <section className={`w-full`}>
                            <DrawerDescription
                                className={`text-start font-light text-lg text-gray-600`}>
                                សេវាកម្ម
                            </DrawerDescription>
                            <Select
                                onValueChange={handleMainChange}
                                value={mainCategory}
                            >
                                <SelectTrigger className="w-full h-[50px] text-base">
                                    <SelectValue placeholder="ជ្រើសរើសសេវាកម្ម"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {filter.map((category) => (
                                            <SelectItem
                                                key={category.uuid}
                                                value={category.uuid}
                                                className={`text-base`}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </section>

                        {/* Sub Select */}
                        <section className={`w-full`}>
                            <DrawerDescription
                                className={`text-start font-light text-lg text-gray-600`}>
                                ប្រភេទ
                            </DrawerDescription>
                            <Select
                                onValueChange={handleSubChange}
                                value={subCategory}
                                disabled={!mainCategory}
                            >
                                <SelectTrigger className="w-full h-[50px] text-base">
                                    <SelectValue placeholder="ជ្រើសរើសប្រភេទសេវាកម្ម"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {mainCategory && filter
                                            .find(cat => cat.uuid === mainCategory)
                                            ?.subcategories.map((sub) => (
                                                <SelectItem
                                                    key={sub.uuid}
                                                    value={sub.uuid}
                                                    className={`text-base`}
                                                >
                                                    {sub.name}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </section>

                        {/* Price Slider */}
                        <section className={`w-full text-start`}>
                            <DrawerDescription
                                className={`text-start flex font-light text-lg text-gray-600 mb-2`}>
                                តម្លៃ  <span className={` flex items-center px-2 text-[16px]`}> ( ពី 0$ ទៅដល់ {priceValue[0]}$ )</span>
                            </DrawerDescription>
                            <Slider
                                defaultValue={[10]}
                                max={1000}
                                step={1}
                                value={priceValue}
                                onValueChange={handlePriceChange}
                            />
                        </section>
                    </DrawerHeader>

                    <DrawerFooter className={`flex flex-row w-full justify-end`}>
                        <DrawerClose asChild>
                            <Button variant="outline">បោះបងការកំណត់់</Button>
                        </DrawerClose>
                        <Button
                            onClick={() => router.push(`/search&filter/${filterValue}`)}
                            className={`text-white`}
                            disabled={!mainCategory || !subCategory || priceValue[0] <= 0}
                        >
                            ស្វែងរកការកំណត់
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}