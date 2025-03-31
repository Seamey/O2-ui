import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface CardBlogHorizontalProps {
    id: string
    tags: { uuid: string; name: string }[];
    date: string
    view: number
    title: string
    image: string
    isBookmarked: boolean;
    bookmarks: (id: string) => void;
}

// Function to format date from "2025-02-25T05:20:22.000000Z" to "25 Feb 2025"
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const CardBlogBookmark = ({
    id,
    tags,
    date,
    view,
    title,
    image,
    isBookmarked,
    bookmarks,
}: CardBlogHorizontalProps) => {
    return (
        <div className="w-full mx-auto py-4">
            <div className="flex justify-between gap-4 items-start">
                {/* Image */}
                <Link href={`/blog/${id}`} className="w-24 h-24 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        width={1000}
                        height={1000}
                        unoptimized
                        className="w-full h-full object-cover"
                    />
                </Link>

                {/* Content */}
                <div className="flex-1 space-y-1 w-full items-center">
                    <div className="flex justify-between gap-y-3">
                        <div className="flex flex-wrap gap-2 items-center">
                            {tags.length > 0 ? (
                                tags.map((tag) => (
                                    <span
                                        key={tag.uuid}
                                        className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg"
                                    >
                                        {tag.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm font-medium bg-gray-200 px-2 py-1 rounded-lg">
                                    Untagged
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => bookmarks(id)}
                            className="p-2 "
                        >
                            {isBookmarked ? <BookmarkCheck className="w-6 h-6 text-yellow-500" /> : <Bookmark className="w-5 h-5 " />}
                        </button>
                    </div>
                    {/* Wrap date & views inside a div and align to end */}
                    <div className="flex justify-end text-xs text-gray-500">
                        <span>{formatDate(date)} • {view} views</span>
                    </div>
                    <Link href={`/blog/${id}`} >
                        <h1 className="text-xl font-semibold tracking-tight truncate max-w-[250px]">{title}</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardBlogBookmark;