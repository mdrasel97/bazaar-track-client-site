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
  const { register, handleSubmit, control, reset } = useForm();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [prices, setPrices] = useState([]);
  const [priceDate, setPriceDate] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const [editIndex, setEditIndex] = useState(-1);

  const handleAddOrUpdate = () => {
    if (!priceDate || !priceValue) return;

    const newPriceEntry = { date: priceDate, price: parseFloat(priceValue) };

    if (editIndex === -1) {
      // নতুন এন্ট্রি যোগ করো
      setPrices([...prices, newPriceEntry]);
    } else {
      // এডিট মোডে আপডেট করো
      const updatedPrices = [...prices];
      updatedPrices[editIndex] = newPriceEntry;
      setPrices(updatedPrices);
      setEditIndex(-1);
    }

    setPriceDate("");
    setPriceValue("");
  };

  const handleDelete = (index) => {
    const updatedPrices = prices.filter((_, i) => i !== index);
    setPrices(updatedPrices);
    // add delete
    if (editIndex === index) {
      setEditIndex(-1);
      setPriceDate("");
      setPriceValue("");
    }
  };

  const handleEdit = (index) => {
    const p = prices[index];
    setPriceDate(p.date);
    setPriceValue(p.price);
    setEditIndex(index);
  };

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

      if (product.prices?.length) {
        setPrices(product.prices);
      }
    }
  }, [product, reset]);

  // 🚀 Submit updated product
  const onSubmit = async (data) => {
    try {
      const updatedProduct = {
        ...data,
        date: selectedDate.toISOString().split("T")[0],
        prices:
          prices.length > 0
            ? prices
            : [
                {
                  date: selectedDate.toISOString().split("T")[0],
                  price: parseFloat(data.pricePerUnit),
                },
              ],
      };

      const res = await axiosSecure.put(`/products/${id}`, updatedProduct);
      if (res.status === 200) {
        toast.success("✅ Product updated successfully!");
        navigate("/dashboard/myProducts");
      }
    } catch (error) {
      toast.error("❌ Update failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto shadow p-6 rounded-md">
      <h2 className="text-3xl font-bold mb-5 text-center">✏️ Update Product</h2>
      <div className="border border-blue-500 my-10"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className="mb-2">Vendor Email</Label>
          <Input type="email" readOnly {...register("vendorEmail")} />
        </div>

        <div>
          <Label className="mb-2">🧑‍🌾 Vendor Name</Label>
          <Input type="text" readOnly {...register("vendorName")} />
        </div>

        <div>
          <Label className="mb-2">Market Name</Label>
          <Input type="text" {...register("marketName", { required: true })} />
        </div>

        <div className="md:flex items-center space-y-3 md:space-y-0 md:gap-5">
          <div className="md:w-[30%]">
            <Label className="mb-2">Date</Label>
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
            <Label className="mb-2">Price per Unit (Default)</Label>
            <Input
              type="number"
              step="0.01"
              {...register("pricePerUnit", { required: true })}
            />
          </div>
        </div>

        {/* 🔁 Price History Section */}
        <div className="border p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Price Entries</h3>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <input
              type="date"
              value={priceDate}
              onChange={(e) => setPriceDate(e.target.value)}
              className="border p-2 rounded w-[40%]"
            />
            <input
              type="number"
              placeholder="Price"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              className="border p-2 rounded w-[40%]"
            />
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className={`px-4 py-2 rounded ${
                editIndex === -1 ? "bg-green-600" : "bg-blue-600"
              } text-white`}
            >
              {editIndex === -1 ? "➕ Add" : "✏️ Update"}
            </button>
            {editIndex !== -1 && (
              <button
                type="button"
                onClick={() => {
                  setEditIndex(-1);
                  setPriceDate("");
                  setPriceValue("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
          {prices.length > 0 && (
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {prices.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="flex-grow">
                    📅 {p.date} — ৳{p.price}
                  </span>
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-blue-600 hover:underline"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-600 hover:underline"
                    title="Delete"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
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
          <Label className="mb-2">📋 Item Description (Optional)</Label>
          <Textarea {...register("itemDescription")} />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full"
        >
          ✅ Update Product
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
