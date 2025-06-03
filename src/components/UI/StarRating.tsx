import React from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating);

  const hasHalfStar = rating % 1 >= 0.5;

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex flex-row gap-1 text-base">
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <Star className="text-primary w-4 h-4" fill="currentColor" />
        ))}

      {hasHalfStar &&
        <div className="flex relative">
          <Star className="text-primary w-4 h-4" />
          <StarHalf
            className="text-primary w-4 h-4 absolute top-0"
            fill="currentColor"
          />
        </div>}

      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <Star className="text-gray-300 w-4 h-4" />
        ))}
    </div>
  );
};

export default StarRating;
