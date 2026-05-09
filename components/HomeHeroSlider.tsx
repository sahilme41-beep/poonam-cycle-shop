"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "Premium Cycles & Toys in Kolhapur",
    subtitle: "Poonam Cycle & Toy World",
    cta: "/category/electric-cars-toys",
    image: "/home-banners/banner-1-bike-trike.png"
  },
  {
    title: "Electric Cars & Toys",
    subtitle: "Cars, bikes, jeeps and scooters",
    cta: "/category/electric-cars-toys",
    image: "/home-banners/banner-2-superbike.png"
  },
  {
    title: "Electric Cycles Collection",
    subtitle: "Power and comfort for daily rides",
    cta: "/category/electric-cycles",
    image: "/home-banners/banner-4-emotorad.png"
  },
  {
    title: "Stylish Ride-On Scooters",
    subtitle: "Popular color variants in stock",
    cta: "/category/electric-cars-toys",
    image: "/home-banners/banner-3-vespa.png"
  },
  {
    title: "Luxury Electric Cars for Kids",
    subtitle: "Top premium models available",
    cta: "/category/electric-cars-toys",
    image: "/home-banners/banner-5-rolls.png"
  }
];

export default function HomeHeroSlider({ images }: { images?: string[] }) {
  const [index, setIndex] = useState(0);
  const activeSlides =
    images && images.length
      ? images.map((img, idx) => ({
          ...slides[idx % slides.length],
          image: img
        }))
      : slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const active = activeSlides[index];

  return (
    <section className="relative mt-2 overflow-hidden bg-[#2a1d13]">
      <img src={active.image} alt={active.title} className="h-[52vh] w-full object-contain sm:h-[64vh]" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-2.5 w-2.5 rounded-full ${idx === index ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
