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
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <a href="/" className="hover:text-brand-green">Home</a>
        <span>›</span>
        <a href="/shop" className="hover:text-brand-green">Shop</a>
        <span>›</span>
        <span className="font-medium text-brand-ink line-clamp-1">{product.name}</span>
      </div>
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl border border-green-100 bg-white p-3 shadow-sm">
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
                (selected?.color || "") === v.color ? "border-brand-green bg-brand-greenlight text-brand-green" : "border-slate-200 bg-white hover:border-brand-green"
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
      <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <p className="inline-block rounded-full bg-brand-greenlight px-2 py-0.5 text-xs font-semibold text-brand-green">{product.category}</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-ink">{product.name}</h1>
        <div className="mt-3 flex items-end gap-3">
          <p className="text-3xl font-extrabold text-brand-green">₹{product.price.toLocaleString("en-IN")}</p>
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
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 font-semibold text-white hover:bg-[#1ebe5d]"
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Enquiry
        </a>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={`tel:${BUSINESS.mobile}`} className="rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium hover:border-brand-green hover:text-brand-green">📞 Mobile</a>
          <a href={`tel:${BUSINESS.sales}`} className="rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium hover:border-brand-green hover:text-brand-green">📞 Sales</a>
          <a href={`tel:${BUSINESS.inquiry[0]}`} className="rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium hover:border-brand-green hover:text-brand-green">📞 Inquiry</a>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-green-100 bg-white">
          <table className="w-full text-sm">
            <tbody>
              {(product.specs || []).map((s: any) => (
                <tr key={`${s.key}-${s.value}`} className="border-b last:border-b-0">
                  <td className="bg-brand-greenlight px-3 py-2 font-medium">{s.key}</td>
                  <td className="px-3 py-2">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
