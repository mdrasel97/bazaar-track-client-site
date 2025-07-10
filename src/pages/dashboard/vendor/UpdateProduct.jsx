import { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const product = useLoaderData();
  console.log(product);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const { register, handleSubmit, control, reset } = useForm();

  // 🚀 Fetch existing product data
  useEffect(() => {
    if (product) {
      reset({
        vendorEmail: product.vendorEmail,
        vendorName: product.vendorName,
        marketName: product.marketName,
        pricePerUnit: product.pricePerUnit,
        marketDescription: product.marketDescription,
        itemName: product.itemName,
        productImage: product.productImage,
        itemDescription: product.itemDescription || "",
      });

      if (product.date) {
        setSelectedDate(new Date(product.date));
      }
    }
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        const product = res.data;

        reset();

        if (product.date) {
          setSelectedDate(new Date(product.date));
        }
      } catch (error) {
        toast.error("Failed to load product!");
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, product, reset, axiosSecure]);

  // 🚀 Submit updated product
  const onSubmit = async (data) => {
    try {
      const updatedProduct = {
        ...data,
        date: selectedDate.toISOString().split("T")[0],
      };

      const res = await axiosSecure.put(`/products/${id}`, updatedProduct);
      if (res.status === 200) {
        toast.success("✅ Product updated successfully!");
        navigate("/dashboard/myProducts");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto shadow p-6 rounded-md">
      <h2 className="text-3xl font-bold mb-5 text-center">✏️ Update Product</h2>
      <div className="border border-blue-500 my-10"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className="mb-2">📧 Vendor Email</Label>
          <Input type="email" readOnly {...register("vendorEmail")} />
        </div>

        <div>
          <Label className="mb-2">🧑‍🌾 Vendor Name</Label>
          <Input type="text" readOnly {...register("vendorName")} />
        </div>

        <div>
          <Label className="mb-2">🏪 Market Name</Label>
          <Input type="text" {...register("marketName", { required: true })} />
        </div>

        <div className="md:flex items-center space-y-3 md:space-y-0 md:gap-5">
          <div className="md:w-[30%]">
            <Label className="mb-2">📅 Date</Label>
            <Controller
              control={control}
              name="date"
              render={() => (
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full p-2 border rounded-md"
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
          </div>
          <div className="md:w-[70%]">
            <Label className="mb-2">💵 Price per Unit</Label>
            <Input
              type="number"
              step="0.01"
              {...register("pricePerUnit", { required: true })}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2">📝 Market Description</Label>
          <Textarea {...register("marketDescription", { required: true })} />
        </div>

        <div>
          <Label className="mb-2">🥦 Item Name</Label>
          <Input type="text" {...register("itemName", { required: true })} />
        </div>

        <div>
          <Label className="mb-2">🖼️ Product Image URL</Label>
          <Input
            type="text"
            {...register("productImage", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">📝 Item Description (Optional)</Label>
          <Textarea {...register("itemDescription")} />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full"
        >
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
