import { o2API } from "../api";
export const provinceAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get product detail
    getAllProvince: builder.query({
      query: ({}) => ({
        url: `api/provinces`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProvinceQuery } = provinceAPI;
