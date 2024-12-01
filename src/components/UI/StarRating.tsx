import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
          <FaStar key={`full-${index}`} className="text-primary" />
        ))}

      {hasHalfStar && <FaStarHalfAlt className="text-primary" />}

      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-gray-300" />
        ))}
    </div>
  );
};

export default StarRating;
