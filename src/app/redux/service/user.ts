import { o2API } from "../api";

type ChangePasswordResponse = { message: string };
type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

type UserPayload = {
  uuid: string;
  name: string;
  email: string;
  avatar: string | null;
  phone_number: string | null;
  address: string | null;
  bio: string | null;
  gender: string | null;
  date_of_birth: string | null;
  country: string | null;
  is_verified: number;
  is_blocked: number;
  created_at: string;
  updated_at: string;
};

type UserResponse = {
  date: string;
  code: number;
  message: string;
  data: UserPayload;
};

type UpdateProfileResponse = {
  status: number;
  message: string;
  payload: UserPayload;
};

type UpdateUserProfile = {
  name?: string | null;
  address?: string | null;
  phone_number?: string | null;
  date_of_birth?: string | null;
  bio?: string | null;
  avatar: string | null;
};

type Items = {
  bookmark_uuid: string;
  job_uuid: string;
  job_type: string;
  title: string;
  company_name: string;
  company_logo: string;
  province_name: string;
  closing_date: string;
};

type Metadata = {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

type UserBookMarkResponse = {
  date: string;
  status: number;
  payload: {
    items: Items[];
    metadata: Metadata;
  };
  message: string;
};

type UserBookMarkDeleteResponse = {
  status: number;
  message: string;
};

type UploadResponse = {
  date: string;
  code: number;
  message: string;
  data: {
    file_name: string;
    file_path: string;
    file_type: string;
    file_size: number;
    message: string;
  };
};


export const userApi = o2API.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUser: builder.query<UserResponse, void>({
      query: () => ({
        url: `api/users/current-user`,
        method: "GET",
      }),
      providesTags: ["userProfile"],
    }),

    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: ({ current_password, new_password, new_password_confirmation }) => ({
        url: `api/users/change-password`,
        method: "POST",
        body: { current_password, new_password, new_password_confirmation },
      }),
    }),

    updateProfileUser: builder.mutation<UpdateProfileResponse, UpdateUserProfile >({
      query: ({ name, bio, avatar }) => ({
        url: `api/users/update-profile`,
        method: "PATCH",
        body: {
          name: name,
          bio: bio,
          avatar: avatar,
        },
      }),
      invalidatesTags: ["userProfile"],
    }),

    postImage: builder.mutation<UploadResponse, { image: File }>({
      query: ({  image }) => {
        const formData = new FormData();
        formData.append("image", image);
        return {
          url: `api/images/upload-single`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["userProfile"],
    }),

    postBookmark: builder.mutation<{ message: string }, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/bookmarks/${uuid}`,
        method: "POST",
      }),
      invalidatesTags: ["bookmarks"],
    }),

    getAllUserBookMark: builder.query<UserBookMarkResponse, { page: number; page_size: number }>({
      query: ({ page = 1, page_size = 10 }) => ({
        url: `api/v1/bookmarks/?page=${page}&page_size=${page_size}`,
        method: "GET",
      }),
    }),

    deleteUserBookMark: builder.mutation<UserBookMarkDeleteResponse, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/v1/bookmarks/${uuid}`,
        method: "DELETE",
      }),
    }),

    getTestimonial: builder.query({
      query: () => ({
        url: "api/v1/feedback/promoted",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useChangePasswordMutation,
  useUpdateProfileUserMutation,
  usePostImageMutation,
  usePostBookmarkMutation,
  useGetAllUserBookMarkQuery,
  useDeleteUserBookMarkMutation,
  useGetTestimonialQuery,
} = userApi;