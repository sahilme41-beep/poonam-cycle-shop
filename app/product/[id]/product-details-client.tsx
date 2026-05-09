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

  const inStock = product.stock > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb + back */}
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <a href="/" className="hover:text-brand-green">Home</a>
          <span>›</span>
          <a href="/shop" className="hover:text-brand-green">Shop</a>
          <span>›</span>
          <a href={`/category/${product.category?.toLowerCase().replace(/ /g,"-")}`} className="hover:text-brand-green">{product.category}</a>
          <span>›</span>
          <span className="font-medium text-brand-ink line-clamp-1">{product.name}</span>
        </div>
        <a href="/shop" className="shrink-0 rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-brand-green hover:bg-brand-greenlight">← Back</a>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Images */}
        <div className="rounded-2xl border border-green-100 bg-white p-3 shadow-sm">
          <ImageCarousel
            images={currentImages.length ? currentImages : [selected?.image || product.variants?.[0]?.image].filter(Boolean)}
            alt={product.name}
            className="bg-white"
            imageClassName="h-[380px] w-full sm:h-[440px]"
            autoPlayMs={0}
            showDots
          />
          {product.variants?.filter((v: any) => v.color && v.color !== "Default").length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Choose Variant</p>
              <div className="flex flex-wrap gap-2">
                {product.variants?.map((v: any) => (
                  <button
                    key={v.color}
                    className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                      (selected?.color || "") === v.color
                        ? "border-brand-green bg-brand-greenlight text-brand-green"
                        : "border-slate-200 bg-white hover:border-brand-green"
                    }`}
                    onClick={() => setSelected(v)}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-brand-greenlight px-2.5 py-0.5 text-xs font-semibold text-brand-green">{product.category}</span>
              {inStock
                ? <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">✓ In Stock</span>
                : <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600">Out of Stock</span>
              }
            </div>
            <h1 className="mt-3 text-2xl font-extrabold text-brand-ink sm:text-3xl">{product.name}</h1>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-3xl font-extrabold text-brand-green">₹{product.price.toLocaleString("en-IN")}</p>
              {product.specs?.find((s: any) => s.key === "MRP") && (
                <p className="text-sm text-slate-400 line-through">{product.specs.find((s: any) => s.key === "MRP").value}</p>
              )}
            </div>

            {(product.features || []).length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {(product.features as string[]).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-brand-green">✓</span>{feature}
                  </li>
                ))}
              </ul>
            )}

            <a
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 font-bold text-white hover:bg-[#1ebe5d]"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Enquiry
            </a>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <a href={`tel:${BUSINESS.mobile}`} className="rounded-xl border border-green-200 py-2 text-center text-xs font-medium hover:border-brand-green hover:bg-brand-greenlight hover:text-brand-green">📞 Mobile</a>
              <a href={`tel:${BUSINESS.sales}`} className="rounded-xl border border-green-200 py-2 text-center text-xs font-medium hover:border-brand-green hover:bg-brand-greenlight hover:text-brand-green">📞 Sales</a>
              <a href={`tel:${BUSINESS.inquiry[0]}`} className="rounded-xl border border-green-200 py-2 text-center text-xs font-medium hover:border-brand-green hover:bg-brand-greenlight hover:text-brand-green">📞 Inquiry</a>
            </div>
          </div>

          {(product.specs || []).length > 0 && (
            <div className="rounded-2xl border border-green-100 bg-white shadow-sm overflow-hidden">
              <p className="border-b border-green-100 bg-brand-greenlight px-4 py-2.5 text-sm font-bold text-brand-ink">Specifications</p>
              <table className="w-full text-sm">
                <tbody>
                  {(product.specs as any[]).map((s: any) => (
                    <tr key={`${s.key}-${s.value}`} className="border-b border-green-50 last:border-b-0">
                      <td className="w-2/5 bg-slate-50 px-4 py-2.5 font-medium text-slate-700">{s.key}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
