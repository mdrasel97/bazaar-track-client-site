import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

// const ReviewForm = ({ productId, onReviewAdded }) =>

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const review = {
      productId,
      name: user?.displayName,
      email: user?.email,
      rating: parseInt(data.rating),
      comment: data.comment,
      date: new Date().toISOString().split("T")[0],
    };

    const res = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    const result = await res.json();
    if (result.insertedId) {
      toast.success("Review submitted!");
      reset();
      onReviewAdded(); // রিভিউ রিফ্রেশের জন্য
    } else {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-6">
      <label className="block">
        <span className="block text-sm font-medium">Your Rating</span>
        <select {...register("rating", { required: true })} className="input">
          <option value="">Select stars</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block text-sm font-medium">Your Comment</span>
        <textarea
          {...register("comment", { required: true })}
          className="textarea w-full border border-blue-500 p-5"
          rows="4"
        ></textarea>
      </label>

      <Button type="submit" className="">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
