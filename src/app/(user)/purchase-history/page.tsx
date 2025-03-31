
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetOrdersQuery } from "@/app/redux/service/orderHistory";
import { Order } from "@/app/types/purchaseHistoryType";
import OrderItem from "@/components/Components/OrderHistory";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import "dayjs/locale/km"; 

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default function OrderHistory() {
  const { data } = useGetOrdersQuery();
  const orders = data?.data || [];
  const router = useRouter();

  // Group orders based on their creation date
  const todayOrders = orders.filter((order: Order) =>
    dayjs(order.created_at).isToday()
  );
  const yesterdayOrders = orders.filter((order: Order) =>
    dayjs(order.created_at).isYesterday()
  );
  const earlierOrders = orders.filter(
    (order: Order) =>
      !dayjs(order.created_at).isToday() &&
      !dayjs(order.created_at).isYesterday()
  );

  dayjs.locale("km"); // Set Day.js to use Khmer locale

  // Group orders by formatted date
  const groupOrdersByDate = (orders: Order[]) => {
    return orders.reduce((groups: Record<string, Order[]>, order) => {
      const date = dayjs(order.created_at).format("DD MMMM YYYY");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  }


  return (
    <main className="max-w-md mx-auto min-h-screen">
      <header className="sticky top-0 z-10 border-b">
        <div className="flex items-center p-4">
          <ArrowLeft size={24} onClick={() => router.back()} />
          <h1 className="flex-1 text-center text-xl font-medium">
            ប្រវត្តិការទិញ
          </h1>
        </div>
      </header>

      <div className="px-4 py-2">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <>
            {todayOrders.length > 0 && (
              <>
                <div className="text-gray-500 text-sm py-2"><span className="text-lg text-black/70">ថ្ងៃនេះ</span></div>
                {todayOrders.map((order: Order) => (
                  <OrderItem key={order.uuid} uuid={order.uuid} order={order} />
                ))}
              </>
            )}

            {yesterdayOrders.length > 0 && (
              <>
                <div className="text-gray-500 text-sm py-2"><span className="text-lg text-black/70">ថ្ងៃម្សិលមិញ</span></div>
                {yesterdayOrders.map((order: Order) => (
                  <OrderItem key={order.uuid} uuid={order.uuid} order={order} />
                ))}
              </>
            )}

            {earlierOrders.length > 0 && (
              <>
                {Object.entries(groupOrdersByDate(earlierOrders)).map(
                  ([date, orders]) => (
                    <div key={date}>
                      <div className="text-gray-500 text-sm py-2 "><span className="text-lg text-black/70">{date}</span></div>
                      {orders.map((order: Order) => (
                        <OrderItem key={order.uuid} uuid={order.uuid} order={order} />
                      ))}
                    </div>
                  )
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
