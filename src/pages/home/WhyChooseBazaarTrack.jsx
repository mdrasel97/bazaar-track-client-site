import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Adjust import path based on your shadcn setup
import { Package, Truck, Headset } from "lucide-react"; // For icons

const WhyChooseBazaarTrack = () => {
  const features = [
    {
      icon: <Package className="w-10 h-10 text-white" />,
      title: "Wide Selection",
      description: "Thousands of products from trusted sellers worldwide",
    },
    {
      icon: <Truck className="w-10 h-10 text-white" />,
      title: "Fast Shipping",
      description: "Free shipping on orders over $50 with tracking",
    },
    {
      icon: <Headset className="w-10 h-10 text-white" />,
      title: "Customer Support",
      description: "24/7 support to help you with any questions",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Main Heading */}
        <h2 className="text-4xl font-bold mb-4">Why Choose Bazaar Track?</h2>
        {/* Subheading */}
        <p className="text-lg mb-12">
          We're committed to providing you with the best shopping experience
          possible.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center p-6 shadow-md border-none transition-transform duration-300 hover:scale-105"
            >
              <CardContent className="flex flex-col items-center p-0">
                {/* Icon Circle */}
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                {/* Feature Title */}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                {/* Feature Description */}
                <p className=" text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBazaarTrack;
