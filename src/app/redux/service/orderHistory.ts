import { OrderDetail, OrderHistoryResponse } from "@/app/types/purchaseHistoryType";
import { o2API } from "../api";

export const orderAPI = o2API.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<OrderHistoryResponse, void>({
            query: () => ({
                url:    `api/orders`,
                method: "GET"
            }),
            providesTags: ["Orders"]
        }),
        getOrdersByUuid: builder.query<OrderDetail, {uuid: string}>({
            query: ({uuid}) => ({
                url:    `api/orders/${uuid}`,
                method: "GET"
            }),
            providesTags: ["Orders"]
        })

    })
})

export const { useGetOrdersQuery, useGetOrdersByUuidQuery } = orderAPI; 