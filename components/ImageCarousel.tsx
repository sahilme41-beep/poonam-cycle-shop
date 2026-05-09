"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  autoPlayMs?: number;
  showDots?: boolean;
};

export default function ImageCarousel({
  images,
  alt,
  className = "",
  imageClassName = "h-[420px] sm:h-[460px]",
  autoPlayMs = 0,
  showDots = true
}: Props) {
  const safeImages = useMemo(() => (images || []).filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0);
  }, [safeImages.length]);

  useEffect(() => {
    if (!autoPlayMs || safeImages.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % safeImages.length), autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, safeImages.length]);

  const goPrev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const goNext = () => setIndex((i) => (i + 1) % safeImages.length);

  if (!safeImages.length) return null;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div
        className="flex w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={(e) => {
          startX.current = e.touches?.[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const endX = e.changedTouches?.[0]?.clientX ?? null;
          const sx = startX.current;
          startX.current = null;
          if (sx == null || endX == null) return;
          const dx = endX - sx;
          if (Math.abs(dx) < 30) return;
          if (dx > 0) goPrev();
          else goNext();
        }}
      >
        {safeImages.map((src, i) => (
          <div key={`${src}-${i}`} className="min-w-full">
            <img src={src} alt={`${alt} ${i + 1}`} className={`w-full bg-white object-contain ${imageClassName}`} />
          </div>
        ))}
      </div>

      {safeImages.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-brand-ink shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-brand-ink shadow hover:bg-white"
          >
            ›
          </button>
        </>
      ) : null}

      {showDots && safeImages.length > 1 ? (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/55"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

