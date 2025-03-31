import { o2API } from "../api";
export const cartAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // add to cart
    createAddToCart: builder.mutation<
      any,
      { product_uuid: string; quantity: number }
    >({
      query: ({ product_uuid, quantity }) => ({
        url: `api/carts/add`,
        method: "POST",
        body: { product_uuid, quantity },
      }),
      invalidatesTags: ["Carts"],
    }),

    // get all cart item
    getAllCart: builder.query({
      query: ({}) => ({
        url: `api/carts/items`,
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),

    //update_cart_quantity
    updateCartQuantity: builder.mutation<
      any,
      { product_uuid: string; quantity: number }
    >({
      query: ({ product_uuid, quantity }) => ({
        url: `api/carts/update-quantity`,
        method: "PATCH",
        body: { product_uuid, quantity },
      }),
      invalidatesTags: ["Carts"],
    }),

    // remove cart item
    removeCartItem: builder.mutation<any, { product_uuid: string }>({
      query: ({ product_uuid }) => ({
        url: `api/carts/remove`,
        method: "DELETE",
        body: { product_uuid },
      }),
      invalidatesTags: ["Carts"],
    }),

    // add all product to cart
    createAddAllWishListProduct: builder.mutation({
      query: () => ({
        url: `api/wishlists/move-to-cart`,
        method: "POST",
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useCreateAddToCartMutation,
  useGetAllCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveCartItemMutation,
  useCreateAddAllWishListProductMutation
} = cartAPI;
