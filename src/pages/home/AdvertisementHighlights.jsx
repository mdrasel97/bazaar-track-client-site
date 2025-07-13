import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const AdvertisementHighlights = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/advertisements/highlights") // Change to your actual API
      .then((res) => res.json())
      .then((data) => {
        const approvedAds = data.filter((ad) => ad.status === "approved");
        setAds(approvedAds);
      })
      .catch((error) => {
        console.error("Failed to fetch ads:", error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Advertisement Highlights
      </h2>

      {ads.length === 0 ? (
        <p className="text-center text-gray-500">
          No active advertisements available.
        </p>
      ) : (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          loop={true}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white rounded-xl shadow p-6">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full rounded-xl object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">{ad.title}</h3>
                  <p className="text-gray-700">{ad.description}</p>
                  <p className="text-sm text-gray-500">
                    By <span className="font-medium">{ad.vendorName}</span> (
                    {ad.vendorEmail})
                  </p>
                  <p className="text-sm text-gray-400">
                    Posted on: {new Date(ad.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default AdvertisementHighlights;
