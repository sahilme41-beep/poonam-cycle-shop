"use client";

import { useEffect, useMemo, useState } from "react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((items) => {
        const p = items.find((item: any) => item._id === params.id);
        setProduct(p);
        setSelected(p?.variants?.[0] || null);
      });
  }, [params.id]);

  const whatsapp = useMemo(() => {
    if (!product) return "#";
    const text = encodeURIComponent(
      `Hi, I want ${product.name}, Color: ${selected?.color || "NA"}, Price: Rs ${product.price}`
    );
    return `https://wa.me/917588267528?text=${text}`;
  }, [product, selected]);

  if (!product) return <div className="mx-auto max-w-7xl px-4 py-8">Loading...</div>;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2">
      <div>
        <img
          src={selected?.image || product.variants?.[0]?.image}
          alt={product.name}
          className="h-[420px] w-full rounded-xl object-cover"
        />
        <div className="mt-3 flex gap-2">
          {product.variants?.map((v: any) => (
            <button key={v.color} className="rounded border px-3 py-1" onClick={() => setSelected(v)}>
              {v.color}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-2xl font-bold text-green-700">Rs {product.price}</p>
        <p className="mt-1 text-sm text-slate-500">Stock: {product.stock}</p>
        <p className="mt-4">Selected Color: {selected?.color || "N/A"}</p>
        <ul className="mt-4 space-y-1">
          {(product.features || []).map((feature: string, idx: number) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
        <a className="mt-5 inline-block rounded bg-green-600 px-4 py-2 text-white" href={whatsapp} target="_blank" rel="noreferrer">
          WhatsApp Enquiry
        </a>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href="tel:7588267528" className="rounded border px-3 py-2">Call Mobile</a>
          <a href="tel:9359165468" className="rounded border px-3 py-2">Call Sales</a>
          <a href="tel:9422043565" className="rounded border px-3 py-2">Call Inquiry</a>
        </div>
      </div>
    </div>
  );
}
