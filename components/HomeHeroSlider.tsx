"use client";

import Link from "next/link";
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

export default function HomeHeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const active = slides[index];

  return (
    <section className="relative mt-2 overflow-hidden bg-[#2a1d13]">
      <img src={active.image} alt={active.title} className="h-[52vh] w-full object-contain sm:h-[64vh]" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center px-4">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-xl rounded-2xl bg-brand-cream/92 p-5 shadow-xl backdrop-blur sm:p-8">
            <p className="text-xs font-semibold tracking-wide text-brand-brown sm:text-sm">{active.subtitle}</p>
            <h1 className="mt-2 text-2xl font-extrabold text-brand-ink sm:text-4xl">{active.title}</h1>
            <Link href={active.cta} className="mt-4 inline-block rounded-lg bg-brand-brown px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-brown2">
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, idx) => (
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
