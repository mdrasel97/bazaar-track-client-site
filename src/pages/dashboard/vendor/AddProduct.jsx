import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = (data) => {
    const productData = {
      vendorEmail: data.vendorEmail,
      vendorName: data.vendorName,
      marketName: data.marketName,
      date: selectedDate.toISOString().split("T")[0],
      marketDescription: data.marketDescription,
      itemName: data.itemName,
      status: "pending",
      productImage: data.image,
      pricePerUnit: data.pricePerUnit,
      prices: [
        {
          date: selectedDate.toISOString().split("T")[0],
          price: parseFloat(data.pricePerUnit),
        },
      ],
      itemDescription: data.itemDescription || "",
    };
    console.log("Submitted product:", productData);

    axiosSecure.post("/products", productData).then(async (res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Product submitted successfully!");
      }
      navigate("/dashboard/myProducts");
    });
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto shadow p-6 rounded-md">
      <h2 className="text-3xl font-bold mb-5 text-center">
        🛒 Add New Product
      </h2>
      <div className="border border-blue-500 my-10"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className="mb-2">📧 Vendor Email</Label>
          <Input
            type="email"
            defaultValue={user?.email}
            readOnly
            {...register("vendorEmail")}
          />
        </div>

        <div>
          <Label className="mb-2">🧑‍🌾 Vendor Name</Label>
          <Input
            type="text"
            placeholder="Optional"
            defaultValue={user?.displayName}
            {...register("vendorName")}
            readOnly
          />
        </div>

        <div>
          <Label className="mb-2">🏪 Market Name</Label>
          <Input
            type="text"
            required
            {...register("marketName", { required: true })}
          />
        </div>

        <div className="md:flex items-center space-y-3">
          {/* left site  */}
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

          {/* right site  */}
          <div className="md:w-[70%]">
            <Label className="mb-2">💵 Price per Unit</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="৳30/kg"
              {...register("pricePerUnit", { required: true })}
            />
          </div>
        </div>

        <div>
          <Label className="mb-2">📝 Market Description</Label>
          <Textarea
            placeholder="Describe the market location, history, etc."
            {...register("marketDescription", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">🥦 Item Name</Label>
          <Input
            type="text"
            placeholder="e.g. Onion"
            {...register("itemName", { required: true })}
          />
        </div>
        <div>
          <Label className="mb-2">Category</Label>
          <Input
            type="text"
            placeholder="Fresh Vegetables, Fresh Fruits, Fish & Meat, Rice & Grains, Spices, Cooking Oil,Dairy & Eggs, Dry Food"
            {...register("category", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">Product Image (URL or Upload)</Label>
          <Input
            type="text"
            placeholder="Image URL (use imgbb or others)"
            {...register("image", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">📝 Item Description (Optional)</Label>
          <Textarea
            placeholder="Fresh, organic, imported, etc."
            {...register("itemDescription")}
          />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full"
        >
          Submit Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
