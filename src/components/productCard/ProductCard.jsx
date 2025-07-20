import React, { useContext } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import ReviewList from "../../pages/review/ReviewList";

const ProductCard = ({ product, viewMode }) => {
  const {
    _id,
    itemName,
    productImage,
    itemDescription,
    category,
    pricePerUnit,
  } = product;

  const { cartItems, updateCart } = useContext(CartContext);

  const handleAddToCart = (id) => {
    const productToAdd = {
      _id: id,
      itemName: product.itemName,
      pricePerUnit: product.pricePerUnit,
      productImage: product.productImage,
      quantity: 1,
    };

    const existingCart = [...cartItems];
    const isAlreadyInCart = existingCart.find((item) => item._id === id);

    if (isAlreadyInCart) {
      const updatedCart = existingCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(updatedCart);
    } else {
      updateCart([...existingCart, productToAdd]);
    }
  };

  // const handleAddToCart = (id) => {
  //   const productToAdd = {
  //     _id: id,
  //     itemName,
  //     pricePerUnit,
  //     productImage,
  //     quantity: 1,
  //   };

  //   // আগের কার্ট থেকে ডেটা নেওয়া
  //   const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  //   // যদি প্রোডাক্ট আগে থেকে থাকে তাহলে quantity বাড়াও
  //   const isAlreadyInCart = existingCart.find((item) => item._id === id);

  //   if (isAlreadyInCart) {
  //     const updatedCart = existingCart.map((item) =>
  //       item._id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     );
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   } else {
  //     localStorage.setItem(
  //       "cart",
  //       JSON.stringify([...existingCart, productToAdd])
  //     );
  //   }

  //   // success message দেখাও
  //   toast.success(`${itemName} added to cart!`);
  // };

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 ${
        viewMode === "list" ? "flex flex-row" : ""
      }`}
    >
      <CardContent
        className={` ${viewMode === "list" ? "flex w-full gap-6" : ""}`}
      >
        <div
          className={`${
            viewMode === "list" ? "w-40 h-40 flex-shrink-0" : "aspect-square"
          } bg-gray-100 rounded-lg mb-4 overflow-hidden`}
        >
          <img
            src={productImage || " "}
            alt={itemName}
            className="w-full h-full object-content group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold mb-2">{itemName}</h3>

          {viewMode === "list" && (
            <p className="text-gray-600 mb-3 line-clamp-2">{itemDescription}</p>
          )}

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {/* {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))} */}
              <ReviewList productId={_id} />
            </div>
            {/* <span className="text-sm ml-2">
              {product.rating} ({product.reviews})
            </span> */}
          </div>

          <div
            className={`flex items-center justify-between ${
              viewMode === "list" ? "mt-4" : ""
            }`}
          >
            <span className="text-2xl font-bold">৳ {pricePerUnit} </span> 1 kg
          </div>
          <div className="flex gap-2 justify-between items-center mt-5">
            <Link to={`/products/${_id}`}>
              <Button size="sm" variant="outline">
                Details
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={() => handleAddToCart(_id)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:text-white"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
