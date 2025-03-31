import { o2API } from "../api";
export const orderAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // create order total amount
    createOrder: builder.mutation<
      any,
      { province_uuid: string; coupon_code: string }
    >({
      query: ({ province_uuid, coupon_code }) => ({
        url: `api/orders/get-total-amount`,
        method: "POST",
        body: { province_uuid, coupon_code },
      }),
    }),

    // create submit order
    createSubmitOrder: builder.mutation<
      any,
      {
        payment_id: number;
        total_cart_value: number;
        final_total: number;
        delivery_fee: number;
        province_uuid: string;
        email: string;
        phone_number: string;
        current_address: string;
        google_map_link: string;
        remarks: string;
      }
    >({
      query: ({
        payment_id,
        total_cart_value,
        final_total,
        delivery_fee,
        province_uuid,
        email,
        phone_number,
        current_address,
        google_map_link,
        remarks,
      }) => ({
        url: `api/orders/submit`,
        method: "POST",
        body: {
          payment_id,
          total_cart_value,
          final_total,
          delivery_fee,
          province_uuid,
          email,
          phone_number,
          current_address,
          google_map_link,
          remarks,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useCreateSubmitOrderMutation } =
  orderAPI;
