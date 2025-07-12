import React, { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Link } from "react-router";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      price: 299,
      quantity: 2,
      description:
        "Experience superior sound quality with these premium wireless headphones. Featuring advanced noise cancellation technology...",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 199,
      quantity: 3,
      description: "Advanced smartwatch with health monitoring",
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.08).toFixed(2); // 8% tax
  const shipping = 0;
  const total = (subtotal + tax + shipping).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">🛒 Shopping Cart</h1>
      <p className="text-gray-600 mb-6">
        {cartItems.length} item{cartItems.length !== 1 && "s"} in your cart
      </p>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    ${item.price}
                  </p>
                </div>

                <div className="flex items-center mt-4 sm:mt-0 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-3 sm:mt-0 flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="destructive"
              className="w-fit"
              onClick={handleClearCart}
            >
              🗑️ Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4 h-fit">
            <h3 className="text-xl font-bold mb-3">Order Summary</h3>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (8%)</span>
              <span>${tax}</span>
            </div>
            <hr />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Proceed to Checkout
            </Button>

            <div>
              <Link to={"/products"}>Continue Shopping </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
