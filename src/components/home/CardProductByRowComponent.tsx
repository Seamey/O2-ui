import {useRouter} from "next/navigation";
import {FaHeart} from "react-icons/fa";
import {GoClock} from "react-icons/go";
import {HiOutlineFire} from "react-icons/hi2";
import TimeDifferenceComponent from "@/components/home/TimeDifferenceComponent";
import {toast} from "sonner";
import {useCreateWishListProductMutation} from "@/app/redux/service/wishlist";

type Props = {
    uuid: string;
    single_image: string;
    name: string;
    discounted_price: number;
    price: number;
    category_name: string;
    created_at: string;
}


export default function CardProductByRowComponent({
                                                      uuid,
                                                      single_image,
                                                      name,
                                                      discounted_price,
                                                      price,
                                                      category_name,
                                                      created_at
                                                  }: Props) {
    const router = useRouter();
    const env = process.env.NEXT_PUBLIC_O2_API_URL;
    const [createWishlist] = useCreateWishListProductMutation();

    const addToWishList = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents the click from bubbling up to the parent div
        try {
            const response = await createWishlist({product_uuid: uuid});
            if (response.data) {
                toast.success("ការបញ្ចូលទៅកាន់បញ្ជីបានជោគជ័យ", {
                    style: {
                        background: "#22bb33",
                    },
                });
            } else {
                toast.success("សូមចូលគណីដើម្បីបញ្ចូលទៅកាន់បញ្ជីបាន", {
                    style: {
                        background: "#bb2124",
                    },
                });
            }
        } catch {
            toast.success("ការបញ្ចូលទៅកាន់បញ្ជីមិនបានជោគជ័យ", {
                style: {
                    background: "#bb2124",
                },
            });
        }
    };

    return (
        <div
            key={uuid}
            onClick={() => router.push(`/product/${uuid}`)}
            className="relative min-w-[290px] max-w-[290px] h-[240px] rounded-xl bg-white p-3 cursor-pointer hover:shadow-sm hover:transform hover:-translate-y-1 transition-transform duration-200"
        >
            <div
                className="rounded-xl w-full h-[60%] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url(${env}${single_image})`
                }}
            />
            <button
                onClick={addToWishList} // Updated to use the event handler directly
                className="absolute top-5 right-5"
            >
                <div className="rounded-full h-[30px] w-[30px] bg-white opacity-60 flex items-center justify-center">
                </div>
                <FaHeart
                    className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
            </button>

            <div className="flex flex-col gap-1 justify-start">
                <p className="text-base font-light mt-2 line-clamp-1">{name}</p>
                <div className="flex justify-start items-center gap-1">
                    <p className="font-light text-gray-500 text-sm">
                        ${price}
                    </p>
                    <span className="w-1 h-1 rounded-full bg-accent"></span>
                    <p className="text-gray-500 text-sm line-clamp-1 font-light">{category_name}</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
}