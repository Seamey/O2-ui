import { o2API } from "../api";
export const paymentAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // check payment
    createPaymentCheck: builder.mutation<any, { md5_hash: string }>({
      query: ({ md5_hash }) => ({
        url: `api/payments/check-payment`,
        method: "POST",
        body: { md5_hash },
      }),
    }),
  }),
});

export const { useCreatePaymentCheckMutation } = paymentAPI;
