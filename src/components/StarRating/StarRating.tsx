import { useState } from "react";
import { GoStarFill } from "react-icons/go";

type StarRatingProps = {
  onChange?: (value: number) => void;
};

export default function StarRating({ onChange }: StarRatingProps) {
  const [rating, setRating] = useState<number>(0); // State with explicit type

  const handleRatingClick = (value: number) => {
    setRating(value);
    if (onChange) onChange(value); // Pass rating to parent component if needed
  };

  return (
    <div className="flex h-full text-secondary cursor-pointer">
      {[1, 2, 3, 4, 5].map((star: number) => (
        <GoStarFill
          key={star}
          className={`text-2xl mx-1 ${
            star <= rating ? "text-secondary" : "text-description"
          }`}
          onClick={() => handleRatingClick(star)}
        />
      ))}
    </div>
  );
}
