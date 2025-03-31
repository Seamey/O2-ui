"use client";
import Image from "next/image";

import { IoCloseOutline } from "react-icons/io5";

import {
  useGetAllCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartQuantityMutation,
} from "@/app/redux/service/cart";
import { Cart } from "@/app/types/Cart";
import { useRouter } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
export default function CardItem() {
  const router = useRouter();

  // get all item
  const getAllCart = useGetAllCartQuery({});
  const data = getAllCart?.data?.data?.cart_items;

  // image base url
  const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

  // update cart quantity
  const [updateCartQuantity] = useUpdateCartQuantityMutation({});

  // remove cart item
  const [removeCartItem] = useRemoveCartItemMutation({});

  const handleIncrease = async (product_uuid: string, newQuantity: number) => {
    const quantity = newQuantity + 1;
    const response = await updateCartQuantity({ product_uuid, quantity });
    try {
      if (!response.data) {
        const errorResponse = response.error as FetchBaseQueryError;
        if (
          errorResponse.data &&
          typeof errorResponse.data === "object" &&
          "errors" in errorResponse.data
        ) {
          toast.success(
            `${(errorResponse.data as { errors: any }).errors.stock}`,
            {
              style: {
                background: "#bb2124",
              },
            }
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDecrease = (product_uuid: string, newQuantity: number) => {
    const quantity = newQuantity - 1;
    updateCartQuantity({ product_uuid, quantity });
  };

  const handleRemoveCartItem = async (product_uuid: string) => {
    try {
      const response = await removeCartItem({ product_uuid });
      if (response.data) {
        toast.success("ផលិតផលបានដកចេញពីបញ្ជី", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ផលិតផលបានដកចេញពីបញ្ជីរួចហើយ", {
          style: {
            background: "#bb2124",
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {data?.map((item: Cart, index: number) => {
        const image = `${imageBaseUrl}${item?.image}`.trim();
        return (
          <div
            key={index}
            className="w-full flex justify-between px-2 my-5      "
          >
            <div className="flex  ">
              {/* image */}
              <div
                onClick={() => router.push(`/product/${item.uuid}`)}
                className="w-[150px] h-[150px] bg-red-400  flex-none "
              >
                <Image
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                  src={image}
                  alt={item?.name}
                />
              </div>
              {/* information */}
              <div className="flex flex-col justify-around ml-5 ">
                <p className="text-title text-start w-[160px] line-clamp-2 ">
                  {item?.name}
                </p>

                {/* price */}
                {item?.discounted_price === null ? (
                  <div className="flex   ">
                    <p className="text-title text-accent pr-2">
                      ${item?.original_price}
                    </p>
                  </div>
                ) : (
                  <div className="flex  ">
                    <p className="text-title text-accent pr-2">
                      ${item?.discounted_price}
                    </p>
                    <p className="text-description text-[16px] line-through">
                      ${item?.original_price}
                    </p>
                  </div>
                )}

                {/* Increase / Decrease */}
                <div className="flex items-center space-x-3">
                  {/* Decrease */}
                  <button
                    onClick={() => handleDecrease(item?.uuid, item?.quantity)}
                    className="bg-primary-light-70 h-[30px] w-[30px] rounded-full flex items-center justify-center"
                  >
                    <FaMinus className="text-card_color" />
                  </button>

                  {/* Total Count */}
                  <p className="text-body">{item?.quantity}</p>

                  {/* Increase */}
                  <button
                    onClick={() => handleIncrease(item?.uuid, item?.quantity)}
                    className="bg-primary h-[30px] w-[30px] rounded-full flex items-center justify-center"
                  >
                    <FaPlus className="text-card_color" />
                  </button>
                </div>
              </div>
            </div>

            {/* remove item  */}
            <IoCloseOutline
              onClick={() => handleRemoveCartItem(item?.uuid)}
              className="text-heading text-description mt-2 "
            />
          </div>
        );
      })}
    </div>
  );
}
