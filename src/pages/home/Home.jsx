import React from "react";
import Banner from "./Banner";
import WhyChooseBazaarTrack from "./WhyChooseBazaarTrack";
import { useLoaderData } from "react-router";
import ProductCard from "../../components/productCard/ProductCard";
import Contact from "./Contact";
import AdvertisementHighlights from "./AdvertisementHighlights";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const Home = () => {
  const products = useLoaderData();
  // console.log(products);
  return (
    <div>
      <title>Home</title>
      <Banner />
      <motion.div
        className="mt-10 md:mt-16"
        viewport={{ once: true, amount: 0.2 }} // 👈 triggers only once when 20% visible
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-center my-6">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-11/12 mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <WhyChooseBazaarTrack />
      </motion.div>
      <AdvertisementHighlights />
      <Contact />
    </div>
  );
};

export default Home;
