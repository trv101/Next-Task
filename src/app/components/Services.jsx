"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./services.css";// ✅ Import styles

const services = [
  {
    title: "Tire Installation",
    description: "Expert tire fitting services for all vehicles.",
    image: "/services/tire-installation.jpg",
  },
  {
    title: "Wheel Alignment",
    description: "Precision wheel alignment to improve handling.",
    image: "/services/wheel-alignment.jpg",
  },
  {
    title: "Tire Repair",
    description: "Quick and reliable tire puncture repairs.",
    image: "/services/tire-repair.jpg",
  },
  {
    title: "Balancing",
    description: "Ensure smooth driving with tire balancing.",
    image: "/services/tire-balancing.jpg",
  },
  {
    title: "Winter Tires",
    description: "Stay safe in winter conditions with specialized tires.",
    image: "/services/winter-tires.jpg",
  },
];

export default function Services() {
  return (
    <div className="services-section">
      <h2 className="section-title">Our Services</h2>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className="service-card">
            <img src={service.image} alt={service.title} className="service-image" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
