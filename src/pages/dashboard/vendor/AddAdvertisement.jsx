import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const AddAdvertisement = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    // console.log("Submitted data:", data);
    const newAd = {
      vendorEmail: user?.email,
      vendorName: user?.displayName,
      title: data.title,
      description: data.description,
      image: data.image,
      status: "pending", // default
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/advertisements", newAd);
      if (res.data.insertedId) {
        navigate("/dashboard/myAdvertisements");
        toast.success("Advertisement submitted successfully!");
        reset();
      } else {
        toast.error("Failed to submit advertisement.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📢 Add Advertisement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className="mb-2">📌 Ad Title</Label>
          <Input
            type="text"
            placeholder="Enter advertisement title"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">📝 Short Description</Label>
          <Textarea
            placeholder="Write a short promotional description"
            {...register("description", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">🖼️ Image URL</Label>
          <Input
            type="text"
            placeholder="Paste promotional banner image link"
            {...register("image", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">Status</Label>
          <Input
            type="text"
            readOnly
            defaultValue="pending"
            {...register("status")}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        >
          Submit Advertisement
        </Button>
      </form>
    </div>
  );
};

export default AddAdvertisement;
