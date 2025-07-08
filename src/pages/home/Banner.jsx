import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const slides = [
    {
      src: "https://i.ibb.co/35kz3x1F/Screenshot-2025-07-08-164620.png",
      alt: "Bazaar Scene 1",
      title: "Vibrant Marketplace",
      description:
        "Discover a world of unique products and fresh produce. Experience the lively atmosphere and find great deals everyday.",
      buttonText: "Explore Now",
      buttonLink: "#", // Add your link here
    },
    {
      src: "https://i.ibb.co/0yzbmN2d/Screenshot-2025-07-08-180003.png",
      alt: "Bazaar Scene 2",
      title: "Traditional Crafts",
      description:
        "Handmade items with stories to tell. Support local artisans and bring home a piece of authentic culture.",
      buttonText: "Shop Crafts",
      buttonLink: "#", // Add your link here
    },
    {
      src: "https://i.ibb.co/M5jCpb6B/bazar2.png",
      alt: "Bazaar Scene 3",
      title: "Fresh & Local Produce",
      description:
        "From farm to table, enjoy the freshest seasonal fruits and vegetables. Healthy choices for a healthy life.",
      buttonText: "View Produce",
      buttonLink: "#", // Add your link here
    },
  ];

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.src})` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 text-white p-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg mb-6 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonLink}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
