import {o2API} from "../api";
import {DataSelect, DiscountBannerType, RecommendationType} from "@/app/types/ProductDetail";

export const productApi = o2API.injectEndpoints({
    endpoints: (builder) => ({
        // get product detail
        getProductDetailByUUID: builder.query<any, { uuid: string }>({
            query: ({uuid}) => ({
                url: `api/products/${uuid}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),


        // get recommendation product
        getRecommendationProduct: builder.query<RecommendationType, void>({
            query: () => ({
                url: `api/products/recommended`,
                method: "GET",
            }),
        }),


        //Popular Product
        getPopularProduct: builder.query<any, void>({
            query: () => ({
                url: `api/products/popular-products`,
                method: "GET",
            }),
        }),

        //Get PreOrder Product
        getPreOrderProduct: builder.query<RecommendationType, void>({
            query: () => ({
                url: `api/products/preorders`,
                method: "GET",
            }),
        }),

        //Get Discount Product
        getDiscountProduct: builder.query<any, void>({
            query: () => ({
                url: `api/products/discounted`,
                method: "GET",
            }),
        }),


        //Get Feedback
        getFeedback: builder.query<any, void>({
            query: () => ({
                url: `api/feedbacks/promoted`,
                method: "GET",
            }),
        }),


        // Get Filter Product
        getFilterProduct: builder.query<DataSelect, void>({
            query: () => ({
                url: `api/categories`,
                method: "GET",
            }),
        }),


        // Filter Product
        getFilterListProduct: builder.query<any, { category_uuid: string, max_price: number }>({
            query: ({category_uuid, max_price}) => ({
                url: `api/products?category_uuid=${category_uuid}&min_price=0&max_price=${max_price}&sort_price=asc`,
                method: "GET",
            }),
        }),

        //Search Product
        getSearchProduct: builder.query<any, { search: string }>({
            query: ({search}) => ({
                url: `api/products?search=${search}`,
                method: "GET",
            }),
        }),

        //Discount Banner Product
        getDiscountBannerProduct: builder.query<DiscountBannerType, void>({
            query: () => ({
                url: `api/promotion/discounts`,
                method: "GET",
            }),
        }),

        // Coupon Banner Product
        getCouponBannerProduct: builder.query<any, void>({
            query: () => ({
                url: `api/promotion/coupons`,
                method: "GET",
            }),
        }),


        //update_cart_quantity
        CreateUserFeedbackProductQuery: builder.mutation<
            any,
            { product_uuid: string; comment: string; rating: number }
        >({
            query: ({product_uuid, comment, rating}) => ({
                url: `api/product-feedbacks/submit`,
                method: "POST",
                body: {product_uuid, comment, rating},
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductDetailByUUIDQuery,
    useGetRecommendationProductQuery,
    useGetPopularProductQuery,
    useGetDiscountProductQuery,
    useGetPreOrderProductQuery,
    useGetFilterProductQuery,
    useGetFilterListProductQuery,
    useGetSearchProductQuery,
    useGetFeedbackQuery,
    useCreateUserFeedbackProductQueryMutation,
    useGetDiscountBannerProductQuery,
    useGetCouponBannerProductQuery,
} = productApi;
