import React from "react";
import { GoStarFill } from "react-icons/go";
export default function RatingStar({ rating }: { rating: number }) {
  return (
    <div className="flex justify-between items-center space-x-2">
      {/* Logic to display stars based on the rounded rating */}
      {rating < 1 ? (
        <GoStarFill className="text-[#FFA629] text-body" />
      ) : rating >= 1 && rating < 2 ? (
        <div className="flex justify-between items-center space-x-2">
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-description text-body" />
          <GoStarFill className="text-description text-body" />
          <GoStarFill className="text-description text-body" />
          <GoStarFill className="text-description text-body" />
        </div>
      ) : rating >= 2 && rating < 3 ? (
        <div className="flex justify-between items-center space-x-2">
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-description text-body" />
          <GoStarFill className="text-description text-body" />
          <GoStarFill className="text-description text-body" />
        </div>
      ) : rating >= 3 && rating < 4 ? (
        <div className="flex justify-between items-center space-x-2">
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-description text-body" />
          <GoStarFill className="text-description text-body" />
        </div>
      ) : rating >= 4 && rating < 5 ? (
        <div className="flex justify-between items-center space-x-2">
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-description text-body" />
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-2">
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
          <GoStarFill className="text-[#FFA629] text-body" />
        </div>
      )}
    </div>
  );
}
