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
import axios from "axios";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // For multiple price entries
  const [prices, setPrices] = useState([]);
  const [priceDate, setPriceDate] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // 🧾 Submit handler
  const onSubmit = (data) => {
    const productData = {
      ...data,
      date: selectedDate.toISOString().split("T")[0],
      status: "pending",
      productImage: imageURL,
      category: data.category,
      prices:
        prices.length > 0
          ? prices
          : [
              {
                date: selectedDate.toISOString().split("T")[0],
                price: parseFloat(data.pricePerUnit),
              },
            ],
      itemDescription: data.itemDescription || "",
    };

    console.log("Submitted product:", productData);

    axiosSecure.post("/products", productData).then((res) => {
      if (res.data.insertedId) {
        toast.success("✅ Product submitted successfully!");
        navigate("/dashboard/myProducts");
        reset();
        setPrices([]); // Clear price history
      }
    });
  };

  // 🖼️ Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      if (res.data.success) {
        setImageURL(res.data.data.url);
        toast.success("✅ Image uploaded successfully");
      } else {
        toast.error("❌ Image upload failed");
      }
    } catch (err) {
      toast.error("❌ Upload error: " + err.message);
    }
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
            defaultValue={user?.displayName}
            readOnly
            {...register("vendorName")}
          />
        </div>

        <div>
          <Label className="mb-2">🏪 Market Name</Label>
          <Input type="text" {...register("marketName", { required: true })} />
        </div>

        <div className="md:flex items-center gap-4">
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
            <Label className="mb-2">💵 Price per Unit (default)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="৳30/kg"
              {...register("pricePerUnit", { required: true })}
            />
          </div>
        </div>

        {/* 🔁 Dynamic Price Entry Section */}
        <div className="border p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">📈 Add Price Entries</h3>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <input
              type="date"
              value={priceDate}
              onChange={(e) => setPriceDate(e.target.value)}
              className="border p-2 rounded w-[40%]"
            />
            <input
              type="number"
              placeholder="৳ Price"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              className="border p-2 rounded w-[40%]"
            />
            <button
              type="button"
              onClick={() => {
                if (priceDate && priceValue) {
                  setPrices([
                    ...prices,
                    { date: priceDate, price: parseFloat(priceValue) },
                  ]);
                  setPriceDate("");
                  setPriceValue("");
                }
              }}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              ➕ Add
            </button>
          </div>
          {prices.length > 0 && (
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {prices.map((p, i) => (
                <li key={i}>
                  📅 {p.date} — ৳{p.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <Label className="mb-2">📝 Market Description</Label>
          <Textarea
            placeholder="Describe the market..."
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
          <Label className="mb-2">📦 Category</Label>
          <Input
            type="text"
            placeholder="e.g. Vegetable, Fruit, Fish..."
            {...register("category", { required: true })}
          />
        </div>

        <div>
          <Label className="mb-2">🖼️ Product Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div>
          <Label className="mb-2">📋 Item Description (Optional)</Label>
          <Textarea
            placeholder="Fresh, Organic, etc."
            {...register("itemDescription")}
          />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full"
        >
          ✅ Submit Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
