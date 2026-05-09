"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  function goTo(i: number) {
    setIndex((i + activeSlides.length) % activeSlides.length);
    setAnimKey((k) => k + 1);
  }

  useEffect(() => {
    const timer = setInterval(() => goTo(index + 1), 4000);
    return () => clearInterval(timer);
  }, [index, activeSlides.length]);

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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center px-6 md:px-16">
        <div key={`text-${animKey}`} className="animate-fade-in-up max-w-lg">
          <span className="inline-block rounded-full bg-brand-green/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            Poonam Cycle & Toy World
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl">
            {active.title}
          </h1>
          <p className="mt-2 text-sm text-white/80 sm:text-base">{active.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={active.cta}
              className="rounded-xl bg-brand-green px-6 py-3 font-bold text-white shadow-lg hover:bg-brand-green2 hover:shadow-xl"
            >
              {active.ctaLabel} →
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/60 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

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
