"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CardBlogComponent from "@/components/Components/CardComponents/CardBlogComponent";
import CardBlog from "@/components/Components/CardComponents/BlogCard";

import {
    useGetBlogTopQuery,
    useAddBookmarkMutation,
    // useGetALLTagQuery,
    useGetALLBlogQuery,
} from "@/app/redux/service/blog";
import { useGetUserQuery } from "@/app/redux/service/user";
import { BlogPost } from "@/app/types/BlogType";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";

export default function Page() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const [toggleBookmark] = useAddBookmarkMutation();
    // const { data: tagsData } = useGetALLTagQuery();
    const { data: topBlogs, isLoading: isTopLoading } = useGetBlogTopQuery();
    const { data: allBlogs, isLoading: isAllLoading } = useGetALLBlogQuery({ search });
    const { data: userData } = useGetUserQuery();

    const listBlog = allBlogs?.data?.data || [];
    console.log("data:", listBlog[0]?.views)

    const handleToggleBookmark = async (
        uuid: string,
        isCurrentlyBookmarked: boolean
    ) => {
        try {
            if (!userData) {
                router.push("/login");
                return;
            }

            await toggleBookmark({ blog_uuid: uuid }).unwrap();

            toast.success(
                isCurrentlyBookmarked ? "Bookmark removed" : "Bookmark added",
                {
                    style: { color: "white", background: "#22bb33" },
                }
            );
        } catch (error) {
            console.error("Error toggling bookmark", error);
            toast.error("Failed to toggle bookmark");
        }
    };


    const filteredBlog =
        listBlog.filter((blog) => {
            const normalizeString = (str: string) => str.replace(/\s+/g, "").toLowerCase();

            const matchesJobs =
                blog.title.toLowerCase().includes(normalizeString(search)) ||
                blog.content.toLowerCase().includes(normalizeString(search));

            return matchesJobs;
        }) || [];

    return (
        <section className="max-w-md mx-auto">
            {/* Search and Add Button */}
            <div className="flex justify-between items-center my-4 px-4 ">
                <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
                <div className="relative">
                    <IoIosSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                        className="w-64 pl-10 py-2.5 border rounded-2xl focus:border-primary/60 focus:primary/60"
                    />
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => router.push("/addBlog")}
                                className="rounded-full bg-primary p-2"
                            >
                                <Plus className="text-white" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            Add Blog
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </div>
            <h2 className="text-3xl px-4 text-semibold">Recommandation</h2>
            {/* Top Blogs  */}
            <div className="overflow-x-auto whitespace-nowrap space-x-4 p-4 gap-8 md:gap-14 scrollbar-hide">
                {isTopLoading ? (
                    [...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="inline-block w-64 h-40 bg-gray-200 animate-pulse rounded-lg"
                        ></div>
                    ))
                ) : topBlogs?.data?.length ? (
                    topBlogs.data.map((blog: any) => (

                        <div className="inline-block" key={blog.uuid}>
                            <CardBlogComponent
                                id={blog.uuid}
                                tag={blog.tags || []}
                                description={blog.title}
                                image={
                                    blog?.user?.avatar &&
                                        typeof blog.user.avatar === "string" &&
                                        blog.user.avatar.startsWith("http")
                                        ? blog.user.avatar
                                        : blog?.user?.avatar
                                            ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.user.avatar}`
                                            : "/assets/placeholder.png"
                                }
                                author={blog.user?.name || "Anonymous"}
                                date={blog.created_at}
                                view={blog.views}
                                profile={
                                    blog?.user?.avatar &&
                                        typeof blog.user.avatar === "string" &&
                                        blog.user.avatar.startsWith("http")
                                        ? blog.user.avatar
                                        : blog?.user?.avatar
                                            ? `${process.env.NEXT_PUBLIC_O2_API_URL}${blog.user.avatar}`
                                            : "/assets/placeholder.png"
                                }
                                isBookmarked={blog.is_bookmarked}
                                bookmarks={() =>
                                    handleToggleBookmark(blog.uuid, blog.is_bookmarked)
                                }
                            />
                        </div>
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>

            {/* Tags Section */}
            {/* <div className="p-4 flex flex-wrap gap-2">
                {tagsData?.tags?.length ? (
                    tagsData.tags.map((tag: any) => (
                        <Categories key={tag.uuid} categories={[tag]} />
                    ))
                ) : isTopLoading ? (
                    [...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="w-24 h-8 bg-gray-200 animate-pulse rounded-lg"
                        ></div>
                    ))
                ) : (
                    <p>No tags found.</p>
                )}
            </div> */}
            <h2 className="text-3xl px-4 text-semibold">All Blogs</h2>

            {/* Vertical Blog List */}
            <div className="p-4">
                {isAllLoading ? (
                    [...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-14 bg-gray-200 animate-pulse mb-4 rounded-xl"
                        ></div>
                    ))
                ) : filteredBlog.length ? (
                    filteredBlog.map((card: BlogPost) => {
                        console.log("content:", card.title);
                        return (
                            <CardBlog
                                key={card.uuid}
                                id={card.uuid}
                                tags={card.tags}
                                date={card.created_at}
                                view={card.views}
                                title={card.title}
                                image={
                                    card.image && typeof card.image === "string" && card.image.startsWith("http")
                                        ? card.image
                                        : card.image
                                            ? `${process.env.NEXT_PUBLIC_O2_API_URL}${card.image}`
                                            : "/assets/placeholder.png"
                                }
                            />
                        );
                    }
                    )
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </section>
    )
}
