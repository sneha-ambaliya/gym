import React from "react";
import { ArrowUpRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const services = [
  {
    title: "Personal Training",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200",
  },
  {
    title: "Fitness Classes",
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=1200",
  },
  {
    title: "Swim Training",
    image:
      "https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=1200",
  },
  {
    title: "Recovery Sessions",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1200",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#111111] py-20 px-6 md:px-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[#FF6A00] text-sm font-semibold mb-3">
          Our Services
        </p>

        <h2 className="text-3xl md:text-5xl font-bold text-[#F5F5F5] leading-tight">
          UNLEASH YOUR POTENTIAL:{" "}
          <span className="text-[#FF6A00]">
            PREMIUM FITNESS SERVICES
          </span>{" "}
          TAILORED FOR YOU
        </h2>

        <p className="text-[#9E9E9E] mt-6 max-w-3xl">
          At FFL Gym, we offer personalized fitness services to help you reach
          your goals. From one-on-one training to high-energy classes and
          recovery sessions, we provide everything you need.
        </p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="relative group rounded-2xl overflow-hidden cursor-pointer">
              
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className="h-80 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <h3 className="text-[#F5F5F5] text-lg font-semibold">
                  {service.title}
                </h3>

                <div className="bg-[#FF6A00] p-2 rounded-full group-hover:bg-[#FF8C1A] transition">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ServicesSection;
