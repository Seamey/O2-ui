import { AddBlogResponse, BlogCommentsResponse, BlogDetailApiResponse, BlogResponse, BookmarkApiResponse, getAllTags, GetCommentsResponse, LikeResponse, TopBlogResponse } from "@/app/types/BlogType";
import { o2API } from "../api";
export const blogsApi = o2API.injectEndpoints({
  endpoints: (builder) => ({

    postComment: builder.mutation<BlogCommentsResponse, { uuid: string; content: string; parent_uuid?: string }>(
      {
        query: ({ uuid, content, parent_uuid }) => ({
          url: `api/blogs/${uuid}/comment`,
          method: "POST",
          body: parent_uuid ? { content, parent_uuid } : { content }, // Only include parent_uuid if provided
          headers: {
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["Blogs"]
      }
    ),

    getComment: builder.query<GetCommentsResponse, { uuid: string; }>(
      {
        query: ({ uuid }) => ({
          url: `api/blogs/${uuid}/comments`,
          method: "GET",

        }),
        providesTags: ["Blogs"]
      }
    ),
    postLike: builder.mutation<LikeResponse, { uuid: string; }>(
      {
        query: ({ uuid }) => ({
          url: `api/blogs/${uuid}/like`,
          method: "POST",

        }),
        invalidatesTags: ["Blogs"]
      }
    ),
    deleteComment: builder.mutation<GetCommentsResponse, { uuid: string; }>({
      query: ({ uuid }) => ({
        url: `api/blogs/comment/${uuid}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Blogs"]
    }),
    getBlogTop: builder.query<TopBlogResponse, void>(
      {
        query: () => ({
          url: `api/blogs/top`,
          method: "GET",

        }),
        providesTags: ["Blogs"]
      }
    ),
    addBookmark: builder.mutation({
      query: (blogUuid) => ({
        url: 'api/bookmarks',
        method: 'POST',
        body: { blog_uuid: blogUuid },
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ["Blogs"],
    }),
    getALLTag: builder.query<getAllTags, void>({
      query: () => ({
        url: 'api/blogs/tags',
        method: "GET"
      }),
      providesTags: ["Blogs"]
    }),

    getBlogDetail: builder.query<BlogDetailApiResponse, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/blogs/${uuid}`,
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    // contact us 
    contactUs: builder.mutation<string, { name: string, email: string, message: string }>({
      query: ({ name, email, message }) => ({
        url: `api/contact-us`,
        method: "POST",
        body: { name, email, message },

      }),
      invalidatesTags: ["Blogs"]
    }),
    getAllBookmark: builder.query<BookmarkApiResponse, void>({
      query: () => ({
        url: 'api/bookmarks',
        method: "GET"
      }),
      providesTags: ["Blogs"]
    }),
    addBlog: builder.mutation<AddBlogResponse, { title: string; content: string; image: string; youtube_videos: string[]; tags: string[] }>({
      query: ({ title, content, image, youtube_videos, tags }) => ({
        url: `api/blogs`,
        method: "POST",
        body: {
          title, content, image, youtube_videos, tags
        }
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation<AddBlogResponse, { title: string; content: string; image: string; youtube_videos: string[]; tags: string[], uuid: string }>({
      query: ({ title, content, image, youtube_videos, tags, uuid }) => ({
        url: `api/blogs/${uuid}`,
        method: "PUT",
        body: {
          title, content, image, youtube_videos, tags
        }
      }),
      invalidatesTags: ["Blogs"],
    }),

    getMyBlog: builder.query<BlogResponse, { search: string }>({
      query: ({ search }) => {
        const query = new URLSearchParams();
        if (search) query.append("search", search);

        return {
          url: `api/blogs/my${query.toString()}`,
          method: "GET"
        }
      },
      providesTags: ["Blogs"],
    }),
    getALLBlog: builder.query<BlogResponse, { search: string }>({
      query: ({ search }) => {
        const query = new URLSearchParams();
        if (search) query.append("search", search);

        return {
          url: `api/blogs${query.toString()}`,
          method: "GET"
        }
      },
      providesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation<BlogResponse, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/blogs/${uuid}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Blogs"],
    })
  }),
});

export const {
  usePostCommentMutation,
  useGetCommentQuery,
  usePostLikeMutation,
  useDeleteCommentMutation,
  useGetBlogTopQuery,
  useAddBookmarkMutation,
  useGetALLTagQuery,
  useGetBlogDetailQuery,
  useContactUsMutation,
  useGetAllBookmarkQuery,
  useAddBlogMutation,
  useGetMyBlogQuery,
  useGetALLBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation

} = blogsApi;
