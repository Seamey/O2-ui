
'use client';

import React, { useState } from "react";
import CardBlogHorizontal from "@/components/Components/CardComponents/CardBlogHorizontal";
import { useGetMyBlogQuery } from "@/app/redux/service/blog";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const MyBlogPage = () => {
  const [search, ] = useState("")
  const { data, error, isLoading } = useGetMyBlogQuery({search});

  const blogs = data?.data.data || [];
  const router = useRouter()

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center pr-4 py-7 gap-8">
              <div className="p-2 bg-gray-100 rounded-full">
                <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-center">My Blog</h1>
              
            </div>

      {isLoading ? (
        // Skeleton loader while data is fetching
        [...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full h-24 bg-gray-200 animate-pulse mb-4 rounded-lg"
          />
        ))
      ) : error ? (
        <p className="text-red-500">Failed to load blogs.</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">You have not written any blogs yet.</p>
      ) : (
        blogs.map((blog: any) => (
          <CardBlogHorizontal
            key={blog.uuid}
            id={blog.uuid}
            title={blog.title}
            date={blog.created_at}
            view={blog.views}
            tags={blog.tags || []}
            isBookmarked={blog.is_bookmarked}
            image={
              blog.image?.startsWith("http")
                ? blog.image
                : blog.image
                ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.image}`
                : "/assets/placeholder.png"
            }
            bookmarks={() =>
              console.log(`Bookmark toggle for ${blog.uuid}`) // replace with your handler if needed
            }
            disabledBookmark={false} // optional, you can make it dynamic
          />
        ))
      )}
    </div>
  );
};

export default MyBlogPage;
