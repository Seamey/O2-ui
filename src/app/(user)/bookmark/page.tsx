"use client";
import {  ChevronLeft } from "lucide-react";
import CardBlogBookmark from "@/components/Components/CardComponents/CardBookmark";
import { useGetAllBookmarkQuery, useAddBookmarkMutation } from "@/app/redux/service/blog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
    const { data, isLoading, error } = useGetAllBookmarkQuery();
    const router = useRouter();
    const articles = data?.data || [];
      const [toggleBookmark] = useAddBookmarkMutation();
 // Toggle Bookmark Function
 const handleToggleBookmark = async (uuid: string, isCurrentlyBookmarked: boolean) => {
    try {
            await toggleBookmark({ blog_uuid: uuid }).unwrap();

            // Show appropriate toast based on current bookmark status
            if (isCurrentlyBookmarked) {
                toast.success("Bookmark removed", {
                    style: { color: "white", background: "#22bb33" },
                });
            } else {
                toast.success("Bookmark added", {
                    style: { color: "white", background: "#22bb33" },
                });
            }

    } catch (error) {
        console.error("Error toggling bookmark", error);
        toast.error("Failed to toggle bookmark");
    }
};


    return (
        <main className="max-w-md mx-auto min-h-screen">
            <header className="sticky top-0 z-10 border-b">
                <div className="flex items-center p-4">
                <ChevronLeft size={24} onClick={() => router.back()} className="cursor-pointer text-primary" />
                    <h1 className="flex-1 text-center text-xl font-medium">ការរក្សាទុក</h1>
                </div>
            </header>

            <div className="px-4 py-2">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading bookmarks...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Failed to load bookmarks. Please try again later.</p>
                ) : articles.length === 0 ? (
                    <p className="text-center text-gray-500">No bookmarks found.</p>
                ) : (
                    articles.map((article) => (
                        <div className="border-b" key={article.uuid}>
                            <CardBlogBookmark
                                id={article.blog.uuid}
                                title={article.blog.title}
                                image={
                                    article.blog.image.startsWith("http")
                                        ? article.blog.image
                                        : `${process.env.NEXT_PUBLIC_O2_API_URL}${article.blog.image}`
                                }
                                date={article.blog.published_at}
                                view={article.blog.views}
                                tags={article.blog.tags}
                                isBookmarked={article.blog.is_bookmarked}
                                bookmarks={() => handleToggleBookmark(article.blog.uuid, article.blog.is_bookmarked)}
                            />
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
