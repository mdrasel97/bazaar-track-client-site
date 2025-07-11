import React from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const ProductCard = ({ product, viewMode, handleAddToCart }) => {
  const { itemName, productImage, itemDescription, pricePerUnit } = product;
  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 ${
        viewMode === "list" ? "flex flex-row" : ""
      }`}
    >
      <CardContent
        className={`p-6 ${viewMode === "list" ? "flex w-full gap-6" : ""}`}
      >
        <div
          className={`${
            viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "aspect-square"
          } bg-gray-100 rounded-lg mb-4 overflow-hidden`}
        >
          <img
            src={productImage}
            alt={itemName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {itemName}
          </h3>

          {viewMode === "list" && (
            <p className="text-gray-600 mb-3 line-clamp-2">{itemDescription}</p>
          )}

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div
            className={`flex items-center justify-between ${
              viewMode === "list" ? "mt-4" : ""
            }`}
          >
            <span className="text-2xl font-bold text-gray-900">
              ৳{pricePerUnit}
            </span>
            <div className="flex gap-2">
              <Link to={`/products/${product.id}`}>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={() => handleAddToCart(product)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
