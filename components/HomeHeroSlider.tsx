"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Premium Cycles & Toys in Kolhapur",
    subtitle: "Poonam Cycle & Toy World",
    cta: "/shop",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "Electric Ride-On Collection",
    subtitle: "Cars, bikes, jeeps and scooters for kids",
    cta: "/category/electric-cars-toys",
    image:
      "https://images.unsplash.com/photo-1519583272095-6433daf26b6e?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "Electric Cycles Collection",
    subtitle: "Reliable builds for everyday smooth rides",
    cta: "/category/electric-cycles",
    image:
      "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "Tricycles for Happy Rides",
    subtitle: "Comfortable three-wheelers for kids",
    cta: "/category/tricycles",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "Everyday Cycles, Premium Build",
    subtitle: "Clean design. Strong frames. Smooth ride.",
    cta: "/shop",
    image:
      "https://images.unsplash.com/photo-1517949908119-7207687c0c54?q=80&w=1800&auto=format&fit=crop"
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
    <section className="relative mt-2 overflow-hidden">
      <img src={active.image} alt={active.title} className="h-[52vh] w-full object-cover sm:h-[64vh]" />
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
