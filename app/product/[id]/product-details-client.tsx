"use client";

import { useMemo, useState } from "react";
import { BUSINESS } from "@/lib/constants";
import ImageCarousel from "@/components/ImageCarousel";

export default function ProductDetailsClient({ product }: { product: any }) {
  const [selected, setSelected] = useState<any>(product?.variants?.[0] || null);
  const currentImages = selected?.images?.length ? selected.images : selected?.image ? [selected.image] : [];

  const whatsapp = useMemo(() => {
    const text = encodeURIComponent(
      `Hi, I want ${product.name}, Color: ${selected?.color || "NA"}, Price: Rs ${product.price}`
    );
    return `https://wa.me/91${BUSINESS.whatsapp}?text=${text}`;
  }, [product, selected]);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2">
      <div className="rounded-2xl border border-[#e9d8c7] bg-brand-cream p-3 shadow-sm">
        <ImageCarousel
          images={currentImages.length ? currentImages : [selected?.image || product.variants?.[0]?.image].filter(Boolean)}
          alt={product.name}
          className="bg-white"
          imageClassName="h-[420px] w-full sm:h-[460px]"
          autoPlayMs={0}
          showDots
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {product.variants?.map((v: any) => (
            <button
              key={v.color}
              className={`rounded-full border px-3 py-1 text-sm ${
                (selected?.color || "") === v.color ? "border-brand-brown bg-[#f1e3d6] text-brand-brown" : "border-[#e0cdbb] bg-white hover:border-brand-brown"
              }`}
              onClick={() => {
                setSelected(v);
              }}
            >
              {v.color}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-[#e9d8c7] bg-brand-cream p-6 shadow-sm">
        <p className="inline-block rounded-full bg-[#f1e3d6] px-2 py-0.5 text-xs font-semibold text-brand-brown">{product.category}</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-ink">{product.name}</h1>
        <div className="mt-3 flex items-end gap-3">
          <p className="text-3xl font-extrabold text-brand-brown">Rs {product.price}</p>
          {product.specs?.find((s: any) => s.key === "MRP") ? (
            <p className="text-sm text-slate-400 line-through">{product.specs.find((s: any) => s.key === "MRP").value}</p>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-slate-500">Stock: {product.stock > 0 ? "Available" : "Out of stock"}</p>
        <p className="mt-4 text-sm text-slate-600">Selected Color: {selected?.color || "Default"}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {(product.features || []).map((feature: string, idx: number) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
        <a
          className="mt-5 inline-block rounded-lg bg-brand-brown px-4 py-2 font-semibold text-white hover:bg-brand-brown2"
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp Enquiry
        </a>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={`tel:${BUSINESS.mobile}`} className="rounded-lg border border-[#e0cdbb] bg-white px-3 py-2 text-sm font-medium hover:border-brand-brown">Call Mobile</a>
          <a href={`tel:${BUSINESS.sales}`} className="rounded-lg border border-[#e0cdbb] bg-white px-3 py-2 text-sm font-medium hover:border-brand-brown">Call Sales</a>
          <a href={`tel:${BUSINESS.inquiry[0]}`} className="rounded-lg border border-[#e0cdbb] bg-white px-3 py-2 text-sm font-medium hover:border-brand-brown">Call Inquiry</a>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-[#e0cdbb] bg-white">
          <table className="w-full text-sm">
            <tbody>
              {(product.specs || []).map((s: any) => (
                <tr key={`${s.key}-${s.value}`} className="border-b last:border-b-0">
                  <td className="bg-[#fbf3ea] px-3 py-2 font-medium">{s.key}</td>
                  <td className="px-3 py-2">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
