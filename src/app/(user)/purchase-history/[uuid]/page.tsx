"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetOrdersByUuidQuery } from "@/app/redux/service/orderHistory";
import { OrderItem } from "@/app/types/purchaseHistoryType";
import { useRouter } from "next/navigation";
import Loading from "@/components/Components/Loading";

export default function OrderDetail() {
  const params = useParams();
  const uuid = params?.uuid as string;

  const { data, error, isLoading } = useGetOrdersByUuidQuery({ uuid });
  const router = useRouter();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loading/></div>;
  }

  if (error) {
    return <div>Error fetching order details.</div>;
  }

  const order = data?.data;
  const products = order?.items || [];
  console.log("order data :", order)
  console.log("product data", products)
  console.log("delivery:", order?.delivery_fee)

  return (
    <div className="p-4 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center gap-2 text-primary">
        <div className="p-2.5 rounded-full bg-primary/10 f">
        <ChevronLeft onClick={()=>router.back()} className="cursor-pointer w-7 h-7 " />
        </div>
        <h1 className="text-3xl font-bold text-center">ពត៌មានស្ថានភាពបញ្ជាទិញ</h1>
      </div>

      {/* Order Info */}
      <div className="mt-8 text-sm text-gray-600">
        <p className="text-lg">កូដបញ្ជា #: <span className="text-black font-medium text-lg">{order?.order_code}</span></p>
        <p className="text-lg">ទីតាំង: <span className="text-black font-medium text-lg">{order?.delivery_method}</span></p>
      </div>

      {/* Product List */}
      <div className="mt-6 space-y-4">
        {products?.map((item: OrderItem) => (
          <div key={item?.product_uuid} className="flex justify-between items-center p-2 rounded-lg ">
            <div className="flex gap-4 items-center">
              <Image src={`${process.env.NEXT_PUBLIC_O2_API_URL}`|| "/assets/placeholder.png"} alt={item?.product_name} width={50} height={50} className="rounded-full object-over w-14 h-14" />
              <div>
                <p className="text-black font-medium">{item?.product_name}</p>
                <p className="text-gray-500 text-xs">{item?.quantity}, Price</p>
              </div>
            </div>
            <p className="text-black font-semibold">${item?.original_price}</p>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-6 border-t pt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <p className="text-lg">ការដឹកជញ្ជូន:</p>
          <p className="text-black text-lg">${order?.delivery_fee || 0}</p>
        </div>
        <div className="flex justify-between ">
          <p className="text-lg">បញ្ចុះតម្លៃ:</p>
          <p className="text-black text-lg">{order?.coupon?.discount_percentage || 0  }%</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p className="text-lg">តម្លៃសរុប:</p>
          <p className="text-primary text-lg">${order?.total_price || 0}</p>
        </div>
      </div>

    </div>
  );
}
