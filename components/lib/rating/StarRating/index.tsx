import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <StarRatings
      rating={rating}
      starDimension="20px"
      starSpacing="2px"
      starRatedColor="rgb(230, 67, 47)"
    />
  );
};

export default StarRating;
