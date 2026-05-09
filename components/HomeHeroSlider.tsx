"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Premium Cycles & Toys",
    subtitle: "Kolhapur's most trusted cycle & toy destination",
    cta: "/shop",
    ctaLabel: "Shop Now",
    image: "/home-banners/banner-1-bike-trike.png"
  },
  {
    title: "Electric Cars & Toys for Kids",
    subtitle: "Cars, bikes, jeeps and scooters — multiple colours",
    cta: "/category/electric-cars-toys",
    ctaLabel: "Explore Toys",
    image: "/home-banners/banner-2-superbike.png"
  },
  {
    title: "Electric Cycles Collection",
    subtitle: "Power and comfort for daily rides",
    cta: "/category/electric-cycles",
    ctaLabel: "View Cycles",
    image: "/home-banners/banner-4-emotorad.png"
  },
  {
    title: "Stylish Ride-On Scooters",
    subtitle: "Popular colour variants in stock — limited availability",
    cta: "/category/electric-cars-toys",
    ctaLabel: "See Scooters",
    image: "/home-banners/banner-3-vespa.png"
  },
  {
    title: "Luxury Electric Cars for Kids",
    subtitle: "Top premium models — perfect gift for your little ones",
    cta: "/category/electric-cars-toys",
    ctaLabel: "Explore Now",
    image: "/home-banners/banner-5-rolls.png"
  }
];

export default function HomeHeroSlider({ images }: { images?: string[] }) {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const activeSlides =
    images && images.length
      ? images.map((img, idx) => ({ ...slides[idx % slides.length], image: img }))
      : slides;

  const len = activeSlides.length;

  const goTo = useCallback((i: number) => {
    setIndex((i + len) % len);
    setAnimKey((k) => k + 1);
  }, [len]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % len);
      setAnimKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [len]);

  const active = activeSlides[index];

  return (
    <section className="relative overflow-hidden bg-brand-ink" style={{ height: "clamp(320px, 60vh, 680px)" }}>
      {/* Background image with fade */}
      <img
        key={animKey}
        src={active.image}
        alt={active.title}
        className="hero-img-enter absolute inset-0 h-full w-full object-contain"
      />


      {/* Prev / Next arrows */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur hover:bg-black/50 md:left-6"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur hover:bg-black/50 md:right-6"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === index ? "w-6 bg-brand-green" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
