"use client";
import { useGetAllCartQuery } from "@/app/redux/service/cart";
import { useRouter } from "next/navigation";
import { MdOutlineShoppingCart } from "react-icons/md";
export default function Cart() {
  const router = useRouter();

  // API call to fetch total cart items
  const getAllCart = useGetAllCartQuery({});
  const data = getAllCart?.data?.data;

  return (
    <section>
      <div
        onClick={() => router.push("/cart")}
        className="relative p-2 rounded-md bg-secondary"
      >
        {/* ✅ Add `relative` positioning */}
        <MdOutlineShoppingCart className="text-[20px] text-background_color" />

        {/* display total  */}
        {data?.total_cart_items > 0 ? (
          <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-background_color text-center">
            {/* display total item in cart */}
            {data?.total_cart_items}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
}
