import React from "react";
import Banner from "./Banner";
import WhyChooseBazaarTrack from "./WhyChooseBazaarTrack";
import { useLoaderData } from "react-router";
import ProductCard from "../../components/productCard/ProductCard";
import Contact from "./Contact";
import AdvertisementHighlights from "./AdvertisementHighlights";

const Home = () => {
  const products = useLoaderData();
  // console.log(products);
  return (
    <div>
      <Banner />
      <div className="mt-10 md:mt-16">
        <h2 className="text-4xl font-bold text-center my-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-11/12 mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>
      <WhyChooseBazaarTrack />
      <AdvertisementHighlights />
      <Contact />
    </div>
  );
};

export default Home;
