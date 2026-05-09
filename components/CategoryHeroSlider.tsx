"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Slide = { title: string; subtitle: string; cta: string; image: string };

const defaultSlides: Slide[] = [
  {
    title: "Explore Our Collection",
    subtitle: "Premium cycles & kids rides",
    cta: "/shop",
    image: "https://images.unsplash.com/photo-1517949908119-7207687c0c54?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "Gear Cycles",
    subtitle: "Performance bikes for every rider",
    cta: "/category/gear-cycles",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "MTB Cycles",
    subtitle: "Rugged bikes for off-road adventures",
    cta: "/category/mtb-cycles",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "Kids Cycles",
    subtitle: "Safe and fun bikes for children",
    cta: "/category/kids-cycles",
    image: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?q=80&w=1800&auto=format&fit=crop"
  },
  {
    title: "Electric Ride-On",
    subtitle: "Eco-friendly power-assisted rides",
    cta: "/category/electric-ride-on",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1800&auto=format&fit=crop"
  }
];

export default function CategoryHeroSlider({
  title,
  subtitle,
  cta = "/shop",
  slides = defaultSlides
}: {
  title: string;
  subtitle?: string;
  cta?: string;
  slides?: Slide[];
}) {
  const mergedSlides = useMemo(() => {
    const first = slides[0];
    const hero: Slide = {
      title,
      subtitle: subtitle || first?.subtitle || "Browse products",
      cta,
      image: first?.image || defaultSlides[0].image
    };
    return [hero, ...slides.slice(1)];
  }, [cta, slides, subtitle, title]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % mergedSlides.length), 3500);
    return () => clearInterval(timer);
  }, [mergedSlides.length]);

  const active = mergedSlides[index];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#e9d8c7] bg-brand-cream shadow-sm">
      <img src={active.image} alt={active.title} className="h-44 w-full object-cover sm:h-56" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 flex items-center px-4">
        <div className="w-full">
          <div className="max-w-2xl rounded-2xl bg-brand-cream/92 p-4 shadow-lg backdrop-blur sm:p-6">
            <p className="text-xs font-semibold tracking-wide text-brand-brown sm:text-sm">{active.subtitle}</p>
            <h2 className="mt-1 text-xl font-extrabold text-brand-ink sm:text-3xl">{active.title}</h2>
            <Link href={active.cta} className="mt-3 inline-block rounded-lg bg-brand-brown px-4 py-2 text-sm font-semibold text-white hover:bg-brand-brown2">
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {mergedSlides.map((_, idx) => (
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

