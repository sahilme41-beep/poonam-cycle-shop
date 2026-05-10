"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { STORE_CATEGORIES } from "@/lib/constants";

const baseProduct = {
  name: "",
  price: 0,
  stock: 0,
  category: "Electric Cycles",
  subcategory: "",
  visible: true,
  featured: false,
  variants: [{ color: "Default", image: "", images: [] as string[] }],
  features: [] as string[],
  specs: [] as { key: string; value: string }[]
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState<any>(baseProduct);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const isEdit = Boolean(editingId);
    const payload = isEdit ? { ...form, id: editingId } : form;
    const res = await fetch("/api/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      toast.success(isEdit ? "Product updated" : "Product added");
      setForm(baseProduct);
      setEditingId(null);
      load();
    } else toast.error(isEdit ? "Failed to update product" : "Failed to add product");
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
      const existingImages = form.variants[0].images || [];
      setForm({
        ...form,
        variants: [{ ...form.variants[0], image: data.url, images: [...existingImages, data.url] }]
      });
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  const isDirty = JSON.stringify(form) !== JSON.stringify(baseProduct);

  function startEdit(product: any) {
    if (isDirty && !confirm("You have unsaved changes. Discard and edit this product?")) return;
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      subcategory: product.subcategory || "",
      visible: product.visible ?? true,
      featured: product.featured ?? false,
      variants: product.variants?.length
        ? product.variants.map((v: any) => ({
            ...v,
            images: v.images?.length ? v.images : v.image ? [v.image] : []
          }))
        : [{ color: "Default", image: "", images: [] }],
      features: product.features || [],
      specs: product.specs || []
    });
    setEditingId(product._id);
  }

  async function moveOrder(product: any, direction: "up" | "down") {
    const currentOrder = product.order || 0;
    const nextOrder = direction === "up" ? currentOrder - 1 : currentOrder + 1;
    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product._id, order: nextOrder })
    });
    if (res.ok) {
      toast.success("Product order updated");
      load();
    } else {
      toast.error("Unable to reorder");
    }
  }

  const v0 = form.variants[0];

  function setV0(patch: Partial<typeof v0>) {
    setForm({ ...form, variants: [{ ...v0, ...patch }] });
  }

  function addFeature() {
    setForm({ ...form, features: [...(form.features || []), ""] });
  }
  function setFeature(i: number, val: string) {
    const f = [...(form.features || [])];
    f[i] = val;
    setForm({ ...form, features: f });
  }
  function removeFeature(i: number) {
    setForm({ ...form, features: (form.features || []).filter((_: string, idx: number) => idx !== i) });
  }

  function addSpec() {
    setForm({ ...form, specs: [...(form.specs || []), { key: "", value: "" }] });
  }
  function setSpec(i: number, field: "key" | "value", val: string) {
    const s = [...(form.specs || [])];
    s[i] = { ...s[i], [field]: val };
    setForm({ ...form, specs: s });
  }
  function removeSpec(i: number) {
    setForm({ ...form, specs: (form.specs || []).filter((_: any, idx: number) => idx !== i) });
  }

  function removeProductImage(imgUrl: string) {
    const newImages = (v0.images || []).filter((u: string) => u !== imgUrl);
    setV0({ images: newImages, image: newImages[0] || "" });
  }

  const inputCls = "w-full rounded-xl border border-green-200 p-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green";
  const sectionCls = "rounded-2xl border border-green-100 bg-white p-4 shadow-sm space-y-3";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Admin</p>
          <h1 className="text-2xl font-extrabold text-brand-ink">{editingId ? "Edit Product" : "Add New Product"}</h1>
        </div>
        <a href="/admin" className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-brand-green hover:bg-brand-greenlight">← Dashboard</a>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

        {/* ── Left: Form ── */}
        <form onSubmit={submit} className="space-y-4">

          {/* Basic Info */}
          <div className={sectionCls}>
            <p className="font-bold text-brand-ink">📋 Basic Information</p>
            <input required className={inputCls} placeholder="Product name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Price (₹) *</label>
                <input required className={inputCls} type="number" min="0" placeholder="0" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Stock *</label>
                <input required className={inputCls} type="number" min="0" placeholder="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Category *</label>
                <select required className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {STORE_CATEGORIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Subcategory</label>
                {(() => {
                  const subs = STORE_CATEGORIES.find((c) => c.name === form.category)?.subcategories || [];
                  return subs.length > 0 ? (
                    <select className={inputCls} value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}>
                      <option value="">— None —</option>
                      {subs.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : (
                    <input className={inputCls} placeholder="Optional" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
                  );
                })()}
              </div>
            </div>
            <div className="flex gap-6 pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input type="checkbox" className="h-4 w-4 accent-brand-green" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                ⭐ Featured on Homepage
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input type="checkbox" className="h-4 w-4 accent-brand-green" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
                👁 Visible in Shop
              </label>
            </div>
          </div>

          {/* Images */}
          <div className={sectionCls}>
            <p className="font-bold text-brand-ink">🖼️ Product Images</p>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Variant / Color Name</label>
              <input className={inputCls} placeholder="e.g. Red, Blue, Default" value={v0.color} onChange={(e) => setV0({ color: e.target.value })} />
            </div>
            <div>
              <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-green-200 p-4 transition hover:border-brand-green hover:bg-brand-greenlight ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
                <span className="text-xl">📷</span>
                <span className="text-sm font-medium text-brand-green">
                  {uploading ? "Uploading image…" : "Click to upload product image"}
                </span>
                <input type="file" accept="image/*" className="hidden" disabled={uploading}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) { e.target.value = ""; uploadImage(f); } }} />
              </label>
            </div>
            {(v0.images || []).length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {(v0.images as string[]).map((img, i) => (
                  <div key={`${img}-${i}`} className="group relative overflow-hidden rounded-xl border border-green-100">
                    <img src={img} alt={`img-${i}`} className="h-20 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeProductImage(img)}
                      className="absolute right-1 top-1 rounded-full bg-red-500 p-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100"
                    >✕</button>
                    {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-brand-green py-0.5 text-center text-xs text-white">Main</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className={sectionCls}>
            <div className="flex items-center justify-between">
              <p className="font-bold text-brand-ink">✅ Key Features</p>
              <button type="button" onClick={addFeature} className="rounded-lg border border-green-200 px-3 py-1 text-xs font-semibold text-brand-green hover:bg-brand-greenlight">+ Add</button>
            </div>
            {(form.features || []).length === 0 && <p className="text-xs text-slate-400">No features added yet.</p>}
            {(form.features as string[]).map((f, i) => (
              <div key={i} className="flex gap-2">
                <input className={inputCls} placeholder={`Feature ${i + 1}`} value={f} onChange={(e) => setFeature(i, e.target.value)} />
                <button type="button" onClick={() => removeFeature(i)} className="rounded-xl border border-red-200 px-3 text-red-500 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>

          {/* Specs */}
          <div className={sectionCls}>
            <div className="flex items-center justify-between">
              <p className="font-bold text-brand-ink">📊 Specifications</p>
              <button type="button" onClick={addSpec} className="rounded-lg border border-green-200 px-3 py-1 text-xs font-semibold text-brand-green hover:bg-brand-greenlight">+ Add Row</button>
            </div>
            {(form.specs || []).length === 0 && <p className="text-xs text-slate-400">No specifications added yet.</p>}
            {(form.specs as { key: string; value: string }[]).map((s, i) => (
              <div key={i} className="flex gap-2">
                <input className={inputCls} placeholder="Label (e.g. Weight)" value={s.key} onChange={(e) => setSpec(i, "key", e.target.value)} />
                <input className={inputCls} placeholder="Value (e.g. 12kg)" value={s.value} onChange={(e) => setSpec(i, "value", e.target.value)} />
                <button type="button" onClick={() => removeSpec(i)} className="rounded-xl border border-red-200 px-3 text-red-500 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button type="submit" className="flex-1 rounded-xl bg-brand-green py-3 font-bold text-white hover:bg-brand-green2">
              {editingId ? "💾 Update Product" : "➕ Add Product"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm(baseProduct); }}
                className="rounded-xl border border-slate-200 px-5 py-3 font-medium hover:bg-slate-50">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ── Right: Products List ── */}
        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-brand-ink">All Products</h2>
            <span className="rounded-full bg-brand-greenlight px-2 py-0.5 text-xs font-semibold text-brand-green">{products.length} total</span>
          </div>
          <div className="space-y-2">
            {products.length === 0 && <p className="py-8 text-center text-sm text-slate-400">No products yet. Add one using the form.</p>}
            {products.map((p) => (
              <div key={p._id} className={`rounded-xl border p-3 transition ${editingId === p._id ? "border-brand-green bg-brand-greenlight" : "border-green-100 bg-white"}`}>
                <div className="flex items-start gap-2">
                  {p.variants?.[0]?.images?.[0] || p.variants?.[0]?.image ? (
                    <img src={p.variants[0].images?.[0] || p.variants[0].image} alt={p.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-greenlight text-xl">📦</div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-brand-ink">{p.name}</p>
                    <p className="text-xs text-slate-500">₹{p.price?.toLocaleString("en-IN")} · Stock: {p.stock}</p>
                    <div className="mt-0.5 flex flex-wrap gap-1">
                      {p.featured && <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">⭐ Featured</span>}
                      {p.visible === false && <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-xs text-red-600">🚫 Hidden</span>}
                      {p.stock <= 0 && <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-xs text-orange-600">Out of stock</span>}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex gap-1.5">
                  <button onClick={() => moveOrder(p, "up")} className="rounded-lg border border-green-200 px-2 py-1 text-xs hover:bg-brand-greenlight">↑</button>
                  <button onClick={() => moveOrder(p, "down")} className="rounded-lg border border-green-200 px-2 py-1 text-xs hover:bg-brand-greenlight">↓</button>
                  <button onClick={() => { startEdit(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="flex-1 rounded-lg border border-brand-green px-2 py-1 text-xs font-semibold text-brand-green hover:bg-brand-greenlight">
                    Edit
                  </button>
                  <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) remove(p._id); }}
                    className="rounded-lg border border-red-200 px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
