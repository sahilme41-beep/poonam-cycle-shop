"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const baseProduct = {
  name: "",
  price: 0,
  stock: 0,
  category: "MTB Cycles",
  subcategory: "",
  visible: true,
  variants: [{ color: "Default", image: "" }],
  features: [],
  specs: []
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState<any>(baseProduct);
  const [uploading, setUploading] = useState(false);

  async function load() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      toast.success("Product added");
      setForm(baseProduct);
      load();
    } else toast.error("Failed to add product");
  }

  async function remove(id: string) {
    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      toast.success("Product deleted");
      load();
    } else toast.error("Delete failed");
  }

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("file read failed"));
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm({ ...form, variants: [{ ...form.variants[0], image: data.url }] });
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-2">
      <form onSubmit={submit} className="space-y-2 rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">Add Product</h1>
        <input className="w-full rounded border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded border p-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        <input className="w-full rounded border p-2" type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
        <input className="w-full rounded border p-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="w-full rounded border p-2" placeholder="Subcategory" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
        <input className="w-full rounded border p-2" placeholder="Variant color" value={form.variants[0].color} onChange={(e) => setForm({ ...form, variants: [{ ...form.variants[0], color: e.target.value }] })} />
        <input className="w-full rounded border p-2" placeholder="Variant image URL" value={form.variants[0].image} onChange={(e) => setForm({ ...form, variants: [{ ...form.variants[0], image: e.target.value }] })} />
        <input
          className="w-full rounded border p-2"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
          }}
        />
        {uploading ? <p className="text-sm text-slate-500">Uploading image...</p> : null}
        <button className="rounded bg-green-600 px-4 py-2 text-white">Save Product</button>
      </form>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="text-xl font-bold">Products</h2>
        <div className="mt-3 space-y-2">
          {products.map((p) => (
            <div key={p._id} className="flex items-center justify-between rounded border p-2">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-slate-500">Rs {p.price}</p>
              </div>
              <button onClick={() => remove(p._id)} className="rounded border px-3 py-1 text-sm">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
