// components/review/ReviewList.jsx
import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { Star } from "lucide-react"; // ✅ Make sure Star is imported

const ReviewList = ({ productId }) => {
  const axiosSecure = useAxios();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/${productId}`);
        const data = res.data;
        setReviews(data);

        if (data.length > 0) {
          const avg =
            data.reduce((acc, curr) => acc + Number(curr.rating), 0) /
            data.length;
          setAverageRating(avg.toFixed(1));
        } else {
          setAverageRating(0);
        }
      } catch (err) {
        console.error("❌ Failed to load reviews", err);
      }
    };

    fetchReviews();
  }, [productId, axiosSecure]); // dependency should be productId, not _id

  return (
    <div className="flex items-center mb-3">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.round(averageRating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm ml-2">
        {averageRating} ({reviews.length})
      </span>
    </div>
  );
};

export default ReviewList;
