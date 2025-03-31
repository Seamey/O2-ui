import { o2API } from "../api";
export const wishlistAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // add product to wishlist
    createWishListProduct: builder.mutation<any, { product_uuid: string }>({
      query: ({ product_uuid }) => ({
        url: `api/wishlists/add`,
        method: "POST",
        body: { product_uuid },
      }),
      invalidatesTags: ["WishList"],
    }),

    // get all wish list
    getAllProductWishlist: builder.query({
      query: ({}) => ({
        url: "/api/wishlists",
        method: "GET",
      }),
      providesTags: ["WishList"],
    }),

    // detele product from wishlist
    deleteWishListProduct: builder.mutation<any, { wishlist_uuid: string }>({
      query: ({ wishlist_uuid }) => ({
        url: `api/wishlists/remove`,
        method: "DELETE",
        body: { wishlist_uuid },
      }),
      invalidatesTags: ["WishList"],
    }),

    
  }),
});

export const {
  useCreateWishListProductMutation,
  useGetAllProductWishlistQuery,
  useDeleteWishListProductMutation,
 
} = wishlistAPI;
