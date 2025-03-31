"use client";
import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { useGetAllProductWishlistQuery } from "@/app/redux/service/wishlist";
import { WishlistType } from "@/app/types/Wishlist";
import { useDeleteWishListProductMutation } from "@/app/redux/service/wishlist";
import { useCreateAddToCartMutation } from "@/app/redux/service/cart";
import { toast } from "sonner";
import { useCreateAddAllWishListProductMutation } from "@/app/redux/service/cart";
export default function Wishlist() {
  // add product to cart
  const [addToCart] = useCreateAddToCartMutation();

  // delete product in wishlist
  const [deleteWishListProduct] = useDeleteWishListProductMutation();

  // get all product in wishlist
  const wishlistData = useGetAllProductWishlistQuery({});
  const result = wishlistData?.data?.data;

  // add all product to cart
  const [addAllItemToCart] = useCreateAddAllWishListProductMutation();

  //   base image
  const imageBaseUrl = process.env.NEXT_PUBLIC_O2_API_URL;

  // handle delete wishlist item
  const handleDeleteWishlistItem = async (wishlist_uuid: string) => {
    try {
      const response = await deleteWishListProduct({ wishlist_uuid });
      if (response.data) {
        toast.success("ផលិតផលត្រូវបានដកចេញពីបញ្ជី", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ផលិតផលដកចេញពីបញ្ជីមិនបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   handle item to cart
  const handleAddToCart = async (product_uuid: string) => {
    try {
      const response = await addToCart({ product_uuid, quantity: 1 });
      if (response.data) {
        toast.success("ផលិតផលត្រូវបានដាក់ចូលកន្រ្តក", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ផលិតផលដាក់ចូលកន្រ្តកមិនបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   handle add all item to cart
  const handleAddAllItemToCart = async () => {
    try {
      const response = await addAllItemToCart({});
      if (response.data) {
        toast.success("ផលិតផលទាំងអស់ត្រូវបានដាក់ចូលកន្រ្តក", {
          style: {
            background: "#22bb33",
          },
        });
      } else {
        toast.success("ផលិតផលដាក់ចូលកន្រ្តកមិនបានជោគជ័យ", {
          style: {
            background: "#22bb33",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {result?.map((item: WishlistType, index: number) => (
        <div
          key={index}
          className="w-full  bg-card_color  rounded-[10px] my-5 p-2"
        >
          {/* wish and add to cart icon */}
          <div className="w-full flex justify-between ">
            {/* hearticon add to wishlist */}
            <div
              className="relative"
              onClick={() => handleDeleteWishlistItem(item?.wishlist_uuid)}
            >
              <div className="rounded-full h-[30px] w-[30px] bg-primary opacity-20 flex items-center justify-center"></div>
              <FaHeart className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* carticon add to cart */}
            <div
              className="relative"
              onClick={() => handleAddToCart(item?.product_uuid)}
            >
              <div className="rounded-full h-[30px] w-[30px] bg-primary opacity-20 flex items-center justify-center"></div>
              <MdOutlineShoppingCart className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/*  image, detail data, rating */}
          <div className="flex justify-between mt-2">
            <div className="flex ">
              {/* image */}
              <div className="h-[100px] w-[100px] ">
                <Image
                  src={imageBaseUrl + item?.single_image}
                  width={300}
                  height={300}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              {/* prodcut information */}
              <div className="ml-5">
                <p className="text-title">{item?.product_name}</p>
                <p className="text-body mt-2 text-description">
                  តម្លៃ{" "}
                  <span className="text-accent">${item?.product_price}</span>
                </p>
              </div>
            </div>

            {/* rating  */}
            <div className="flex items-end justify-end">
              <div className="flex items-center justify-center">
                <p className="text-body mr-2">{item?.average_rating}</p>
                <GoStarFill className="text-[#FFA629] text-body items-center " />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div
        onClick={() => handleAddAllItemToCart()}
        className="fixed bottom-0 right-0 w-full bg-primary p-4 flex justify-center items-center text-card_color text-body space-x-3 rounded-tr-[10px] rounded-tl-[10px]"
      >
        <p>បញ្ចូលទាំងអស់ទៅក្នុងកន្ត្រក</p>
      </div>
    </div>
  );
}
