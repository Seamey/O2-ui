import { o2API } from "../api";
export const invoiceAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get order detail payment
    getInvoicePDF: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/orders/invoice/${uuid}`,
        method: "GET",
        responseHandler: (response: any) => response.blob(),
      }),
      serializeQueryArgs: () => "",
      keepUnusedDataFor: 0,
    }),

    // get payment invoice
    getPaymentInvoice: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/orders/payment-invoice/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetInvoicePDFQuery, useGetPaymentInvoiceQuery } =
  invoiceAPI;
