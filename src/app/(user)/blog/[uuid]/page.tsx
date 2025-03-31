"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, ThumbsUp, Bookmark, BookmarkCheck } from "lucide-react";
import { useParams } from "next/navigation";
import {
    usePostCommentMutation, useGetCommentQuery, usePostLikeMutation,
    useDeleteCommentMutation, useAddBookmarkMutation, useGetBlogDetailQuery
} from "@/app/redux/service/blog";
import { toast } from "sonner";
import { useGetUserQuery } from "@/app/redux/service/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Comment } from "@/app/types/BlogType";
import { getYouTubeThumbnail} from "@/app/types/YouTubeThumbnail";

export default function Page() {
    const { uuid } = useParams() as { uuid: string };
    const [error] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [replyToUuid, setReplyToUuid] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState(false);

    const [postComment] = usePostCommentMutation();
    const { data: commentsList, refetch } = useGetCommentQuery({ uuid: uuid ?? "" });
    const [likeData] = usePostLikeMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const [deleteConfirm, setDeleteConfirm] = useState<{ uuid: string | null }>({ uuid: null });
    const [toggleBookmark] = useAddBookmarkMutation();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { data: blogDetailData } = useGetBlogDetailQuery({ uuid: uuid ?? "" });
    const blogDetail = blogDetailData?.data;
    const { data: userData } = useGetUserQuery();
    const router = useRouter();

    // Set isLiked and isBookmarked when blogDetail data is fetched
    useEffect(() => {
        if (blogDetail) {
            setIsLiked(blogDetail.user_liked);
            console.log("like:", blogDetail.user_liked);
            setIsBookmarked(blogDetail.is_bookmarked);
            console.log("bookmark: ", blogDetail.is_bookmarked);
        }
    }, [blogDetail]);

    // Toggle Bookmark Function
    const handleToggleBookmark = async () => {
        try {
            if (userData === undefined) {
                router.push("/login");
            } else {
                await toggleBookmark({ blog_uuid: uuid }).unwrap();
                setIsBookmarked((prev) => !prev);
                toast.success("ការរក្សាទុកជោគជ័យ", {
                    style: {
                        background: "#22bb33",
                    },
                });
            }
        } catch (error) {
            console.error("Error toggling bookmark", error);
            toast.error("ការរក្សាទុកបរាជ័យ", {
                style: {
                    background: "#e0391f",
                },
            });
        }
    };

    const confirmDelete = async (uuid: string) => {
        try {
            await deleteComment({ uuid }).unwrap();
            setDeleteConfirm({ uuid: null });
            refetch();
        } catch (error) {
            console.error("Failed to delete comment", error);
        }
    };

    const handleLiked = async () => {
        if (!uuid) return;
        try {
            if (userData === undefined) {
                router.push("/login");
            } else {
                await likeData({ uuid });
                setIsLiked((prev) => !prev);
                toast.success("ការចូលចិត្តជោគជ័យ", {
                    style: {
                        color: "white",
                        background: "#22bb33",
                    },
                });
            }
        } catch (error) {
            console.error("Error liking post", error);
            toast.error("ការចូលចិត្តបរាជ័យ", {
                style: {
                    color: "white",
                    background: "#e0391f",
                },
            });
        }
    };

    const handleCommentSubmit = async () => {
        if (!uuid || !newComment.trim()) return;
        try {
            if (userData === undefined) {
                router.push("/login");
            } else {
                await postComment({
                    uuid,
                    content: newComment,
                    parent_uuid: replyToUuid || undefined,
                }).unwrap();
                setNewComment("");
                setReplyToUuid(null);
                refetch();
                toast.success("ការបញ្ចេញមតិរបស់អ្នកជោគជ័យ", {
                    style: {
                        color: "white",
                        background: "#22bb33",
                    },
                });
            }
        } catch (error) {
            console.error("Failed to post comment", error);
            toast.error("ការបញ្ចេញមតិរបស់អ្នកបរាជ័យ", {
                style: {
                    color: "white",
                    background: "#e0391f",
                },
            });
        }
    };

    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!blogDetail) return <div className="p-4">Blog post not found.</div>;

    return (
        <article className="pb-20 mx-3 max-w-md mx-auto">
            {/* Blog Info */}
            <div className="flex justify-between items-start p-4">
                <div className="flex flex-wrap gap-2 w-1/2">
                    {blogDetail.tags && blogDetail.tags.length > 0 ? (
                        blogDetail.tags.map((tag, index) => (
                            <span
                                key={`${tag}-${index}`}
                                className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg text-gray-500">
                            Untagged
                        </span>
                    )}
                </div>
                <span className="text-sm text-gray-500 justify-end">
                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(blogDetail.created_at))} • {blogDetail.views} views
                </span>
            </div>

            {/* Blog Image */}
            <Image
                width={1000}
                height={1000}
                src={blogDetail.image.startsWith("http")
                    ? blogDetail.image
                    : `${process.env.NEXT_PUBLIC_O2_API_URL}${blogDetail.image}`}
                alt={blogDetail.title}
                className="min-w-84 h-64 object-cover rounded-lg mx-auto"
            />

            {/* YouTube Videos as Thumbnails */}
            <div className="flex gap-4 overflow-x-auto py-4">
                {blogDetail.youtube_videos.map((videoUrl, index) => {
                    const thumbnailUrl = getYouTubeThumbnail(videoUrl, "hq");
                    if (!thumbnailUrl) return null;
                    const url = new URL(videoUrl);
                    const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
                    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

                    return (
                        <Link key={index} href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block min-w-[8rem]">
                            <img src={thumbnailUrl} alt={`YouTube Video ${index + 1}`} className="rounded-lg object-cover w-42 h-24" />
                        </Link>
                    );
                })}
            </div>

            {/* Blog Title & Author */}
            <p className="text-3xl text-bold p-3">{blogDetail.title}</p>
            <div className="flex justify-between items-center px-3">
                <div className="flex items-center gap-5">
                    <Image
                        width={1000}
                        height={1000}
                        src={`${process.env.NEXT_PUBLIC_O2_API_URL}${blogDetail.user?.avatar}` || "/assets/placeholder.png"}
                        alt={"Profile"}
                        className="rounded-md w-10 h-10 object-cover"
                    />
                    <p className="text-lg">
                        By <span className="underline text-lg text-medium text-black">{blogDetail.user?.name}</span>
                    </p>
                </div>

                {/* Like & Comment Buttons */}
                <div className="flex gap-4">
                    <button onClick={handleLiked} className="py-5 px-2">
                        <ThumbsUp className={`w-5 h-5 ${isLiked ? "text-blue-500" : "text-gray-500"}`} />
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-gray-900">
                        <MessageCircle className="w-5 h-5" />
                    </button>
                    <button onClick={handleToggleBookmark} className="text-gray-600 hover:text-gray-900">
                        {isBookmarked ? (
                            <BookmarkCheck className="w-6 h-6 text-yellow-500" />
                        ) : (
                            <Bookmark className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Comments Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-11/12 md:w-[400px] rounded-lg p-6 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Comments</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>

                        {/* Parent Comments & Replies */}
                        <div className="mt-4 space-y-5 max-h-96 overflow-y-auto">
                            {commentsList?.data.comments
                                .filter((comment: Comment) => !comment.parent_uuid)
                                .map((comment: Comment) => (
                                    <div key={comment.uuid} className="p-2.5">
                                        <div className="flex gap-2.5">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_O2_API_URL}${comment.user?.avatar}` || "/assets/placeholder.png"}
                                                alt={comment.user?.name}
                                                width={1000}
                                                height={1000}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <div className="bg-gray-100 rounded-lg p-3.5">
                                                    <span className="font-semibold">{comment.user?.name}</span>
                                                    <p className="text-sm">{comment.content}</p>
                                                </div>
                                                <div className="flex gap-4 items-center">
                                                    <button
                                                        onClick={() => setReplyToUuid(comment.uuid)}
                                                        className="text-blue-500 hover:text-blue-700 mt-1 text-left"
                                                    >
                                                        Reply
                                                    </button>
                                                    {userData?.data?.uuid === comment.user?.uuid && (
                                                        <button
                                                            onClick={() => setDeleteConfirm({ uuid: comment.uuid })}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Replies */}
                                        {comment.replies.length > 0 && (
                                            <div className="ml-10 mt-2 space-y-2">
                                                {comment.replies.map((reply: Comment) => (
                                                    <div key={reply.uuid} className="p-2.5">
                                                        <div className="grid">
                                                            <div className="flex gap-2.5">
                                                                <Image
                                                                    src={`${process.env.NEXT_PUBLIC_O2_API_URL}${reply.user?.avatar}` || "/assets/placeholder.png"}
                                                                    alt={reply.user.name}
                                                                    width={1000}
                                                                    height={1000}
                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                />
                                                                <div className="bg-blue-100 rounded-lg p-2.5">
                                                                    <span className="font-semibold">{reply.user?.name}</span>
                                                                    <p className="text-sm">{reply.content}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4 px-12">
                                                                <button
                                                                    onClick={() => setReplyToUuid(comment.uuid)}
                                                                    className="text-blue-500 hover:text-blue-700 mt-1"
                                                                >
                                                                    Reply
                                                                </button>
                                                                {userData?.data?.uuid === reply.user?.uuid && (
                                                                    <button
                                                                        onClick={() => setDeleteConfirm({ uuid: reply.uuid })}
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>

                        {/* Comment Input */}
                        <div className="flex items-center mt-4 border-t pt-3">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder={replyToUuid ? "Replying to comment..." : "Write a comment..."}
                                className="w-full p-2 border rounded-lg"
                            />
                            <button onClick={handleCommentSubmit} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {deleteConfirm.uuid && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-80">
                        <p className="text-lg font-medium">Are you sure you want to delete this comment?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => confirmDelete(deleteConfirm.uuid!)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setDeleteConfirm({ uuid: null })}
                                className="ml-2 px-4 py-2 bg-gray-300 rounded-lg"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <p className="text-lg text-black/65">{blogDetail.content}</p>
        </article>
    );
}