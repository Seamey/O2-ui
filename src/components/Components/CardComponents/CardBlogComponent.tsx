import { Bookmark, BookmarkCheck } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogProp {
    id: string;
    tag: {uuid: string; name: string} [];  
    description: string;
    image: string;
    author: string;
    date: string;
    view: number;
    profile: string;
    isBookmarked: boolean;
    bookmarks: (id: string) => void; // Updated function type
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const CardBlogComponent = ({
    id,
    tag,
    description,
    image,
    author,
    date,
    view,
    profile,
    isBookmarked,
    bookmarks,
}: BlogProp) => {
    return (
        <div className="min-w-80 min-h-64 sm:w-64" key={id}>
            <div className="relative">
                {/* Tag and Bookmark */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex flex-wrap gap-2">
                        {tag.length > 0 ? (
                            tag.map((tag) => (
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
                </div>
                <div className="absolute top-4 right-4 z-10 min-w-[80px]  ">
                    <button
                        onClick={() => bookmarks(id)} 
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-colors "
                    >
                        {isBookmarked ?<BookmarkCheck className="w-6 h-6 text-yellow-500"/>: <Bookmark className="w-5 h-5 " />}
                        
                        
                    </button>
                </div>

                {/* Main Image */}
                <Link href={`/blog/${id}`}>
                    <Image
                        src={image}
                        alt="image"
                        width={1000}
                        height={1000}
                        className="w-96 h-56 object-cover rounded-2xl"
                    />
                </Link>
            </div>

            <div className="p-4 space-y-4">
                <p className="text-gray-800 text-2xl text-wrap tracking-tight truncate line-clamp-1">
                    {description}
                </p>

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                        <Image
                            src={profile}
                            alt="Author avatar"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col sm:items-center gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">By:</span>
                            <span className="font-medium underline text-lg">{author}</span>
                        </div>
                        <div className="flex justify-end text-xs text-gray-500">
                            {formatDate(date)} • {view} views
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardBlogComponent;
