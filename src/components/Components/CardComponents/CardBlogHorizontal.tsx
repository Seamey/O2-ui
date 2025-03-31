'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { MoreVertical } from 'lucide-react';
import { useDeleteBlogMutation } from "@/app/redux/service/blog";
import ConfirmationModal from "./PopupConfirm";
import Link from "next/link";

interface CardBlogHorizontalProps {
  id: string;
  tags: { uuid: string; name: string }[];
  date: string;
  view: number;
  title: string;
  image: string;
  isBookmarked: boolean;
  bookmarks: (id: string) => void;
  disabledBookmark?: boolean;
}

const CardBlogHorizontal = ({
  id,
  tags,
  date,
  view,
  title,
  image
}: CardBlogHorizontalProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteBlog] = useDeleteBlogMutation();
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Handle delete action
  const handleDeleteClick = () => {
    deleteBlog({uuid: id})
      .unwrap()
      .then(() => {
        setShowConfirmModal(false); // Close the modal after successful deletion
      })
      .catch((error) => {
        console.error("Failed to delete the blog:", error);
        setShowConfirmModal(false); // Close modal even on failure
      });
  };

  return (
    <div className="w-full mx-auto py-4 relative">
      <div className="flex justify-between gap-4 items-start">
        {/* Image */}
        <Link
          href={`/blog/${id}`}
          className="w-24 h-24 aspect-square rounded-lg overflow-hidden flex-shrink-0"
        >
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

            {/* Right-side Menu */}
            <div className="relative">
              <button
                className="p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MoreVertical className="w-5 h-5 text-gray-700" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 bg-white border shadow-md rounded-md text-sm z-10 min-w-[120px]">
                  <button
                    onClick={() => router.push(`/blog/${id}`)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/editBlog/${id}`)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowConfirmModal(true)} // Trigger the confirmation modal
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Date and Views */}
          <div className="flex justify-end text-xs text-gray-500">
            <span>{formatDate(date)} • {view} views</span>
          </div>

          {/* Blog Title */}
          <Link href={`/blog/${id}`}>
            <h1 className="text-xl font-semibold tracking-tight truncate max-w-[250px]">
              {title}
            </h1>
          </Link>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)} // Close the modal without action
        onConfirm={handleDeleteClick} // Handle the delete action
        message="Do you really want to delete this blog?" // Custom message
      />
    </div>
  );
};

export default CardBlogHorizontal;
