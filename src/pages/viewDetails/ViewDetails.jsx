import { Link, useNavigate } from "react-router";
import {
  Star,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoaderData } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
// import BuyNowForm from "../payment/BuyNowForm";
import Payment from "../payment/Payment";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ViewDetails = () => {
  const product = useLoaderData();
  // console.log(product);
  const {
    _id,
    itemDescription,
    itemName,
    productImage,
    rating,
    reviews,
    pricePerUnit,
    marketName,
    date,
    vendorName,
    vendorEmail,
  } = product;

  const [quantity, setQuantity] = useState(1); // default quantity
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      return newQty < 1 ? 1 : newQty;
    });
  };

  const { cartItems, updateCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const productToAdd = {
      _id,
      itemName,
      pricePerUnit,
      productImage,
      quantity,
    };

    const existingCart = [...cartItems];
    const isAlreadyInCart = existingCart.find((item) => item._id === _id);

    if (isAlreadyInCart) {
      const updatedCart = existingCart.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      updateCart(updatedCart);
    } else {
      updateCart([...existingCart, productToAdd]);
    }
  };

  // const handlePay = (id) => {
  //   console.log("procid to pay", id);
  //   navigate(`/payment/${id}`);
  // };

  // watch list
  const handleAddToWatchList = async () => {
    const watchItem = {
      email: user?.email,
      itemName,
      marketName,
      date,
      productImage,
      pricePerUnit,
      vendorEmail,
    };

    try {
      const res = await axiosSecure.post("/watchList", watchItem);
      if (res.data.insertedId) {
        navigate("/dashboard/watchList");
        toast.success("✅ Added to WatchList!");
      } else {
        toast.error("❌ Already exists or failed to add.");
      }
    } catch (err) {
      toast.error("❌ Failed to add to WatchList.", err);
    }
  };

  return (
    <div className="">
      <div className=" mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/products" className="flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="w-full h-3/6">
            <div className="aspect-square w-full h-4/6 rounded-lg shadow-sm">
              <img
                src={productImage}
                // alt=
                // // {product.name}
                className="w-full object-cover"
              />
            </div>
            {/* <div className="grid grid-cols-4 gap-2">
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {itemName}
              </Badge>
              <h1 className="text-3xl font-bold  mb-4">{itemName}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? "text-yellow-400 fill-current"
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="">
                  {rating} ({reviews} reviews)
                </span>
              </div>

              <p className="text-3xl font-bold  mb-4">${pricePerUnit}</p>
              <p className="leading-relaxed">{itemDescription}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 p-6  rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpen(true);
                      }}
                      className="bg-red-600 flex-1"
                    >
                      Buy Now
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>

                    {selectedProduct && (
                      <Payment
                        amount={pricePerUnit * quantity}
                        closeModal={() => setOpen(false)}
                        selectedProduct={selectedProduct}
                      ></Payment>
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                {/* watchList button  */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToWatchList}
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Market Name */}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium">Market Name:</span>
                      <span className="">{marketName}</span>
                    </div>

                    {/* Date */}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium ">Date:</span>
                      <span className="">{date}</span>
                    </div>

                    {/* Full item list with prices */}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium ">Item & Price:</span>
                      <span className="">
                        🥒{" "}
                        {itemName.charAt(0).toUpperCase() + itemName.slice(1)} —
                        ৳{pricePerUnit}/kg
                      </span>
                    </div>

                    {/* Vendor Info */}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium ">Vendor:</span>
                      <span className="">
                        {vendorName} ({vendorEmail})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {review.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))} */}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-medium  mb-2">Shipping Information</h3>
                    <ul className=" space-y-1">
                      <li>• Free shipping on orders over $50</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days</li>
                      <li>• International shipping available</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium  mb-2">Returns Policy</h3>
                    <ul className=" space-y-1">
                      <li>• 30-day return policy</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free returns for defective items</li>
                      <li>• Return shipping fees may apply</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
