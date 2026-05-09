"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e: FormEvent) {
    e.preventDefault();
    const payload = {
      name,
      slug,
      subcategories: subcategories
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    };
    const res = await fetch("/api/categories", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload)
    });
    if (!res.ok) {
      toast.error("Could not save category");
      return;
    }
    setName("");
    setSlug("");
    setSubcategories("");
    setEditingId(null);
    toast.success("Category saved");
    load();
  }

  async function remove(id: string) {
    const res = await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    if (!res.ok) return toast.error("Delete failed");
    toast.success("Category deleted");
    load();
  }

  async function moveOrder(category: any, dir: "up" | "down") {
    const order = category.order || 0;
    const res = await fetch("/api/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: category._id, order: dir === "up" ? order - 1 : order + 1 })
    });
    if (!res.ok) return toast.error("Reorder failed");
    load();
  }

  const inputCls = "w-full rounded-xl border border-green-200 p-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Admin</p>
          <h1 className="text-2xl font-extrabold text-brand-ink">Manage Categories</h1>
          <p className="mt-1 text-xs text-slate-500">These control the main navigation. Subcategories appear as filter pills on category pages.</p>
        </div>
        <a href="/admin" className="rounded-xl border border-green-200 px-4 py-2 text-sm font-semibold text-brand-green hover:bg-brand-greenlight">← Dashboard</a>
      </div>

      {/* Form */}
      <form onSubmit={add} className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm space-y-3">
        <p className="font-bold text-brand-ink">{editingId ? "✏️ Edit Category" : "➕ Add Category"}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Category Name *</label>
            <input required className={inputCls} placeholder="e.g. Electric Cycles" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Slug * (URL-friendly)</label>
            <input required className={inputCls} placeholder="e.g. electric-cycles" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Subcategories (comma-separated)</label>
          <input className={inputCls} placeholder="e.g. Geared Cycles, E-Cycles, Foldable" value={subcategories} onChange={(e) => setSubcategories(e.target.value)} />
          <p className="mt-1 text-xs text-slate-400">These appear as filter buttons inside the category page</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-xl bg-brand-green py-2.5 font-bold text-white hover:bg-brand-green2">
            {editingId ? "Update Category" : "Add Category"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setName(""); setSlug(""); setSubcategories(""); }}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="mt-5 space-y-3">
        {categories.length === 0 && (
          <p className="rounded-2xl border border-green-100 bg-white p-6 text-center text-sm text-slate-400">No categories yet. Add one above.</p>
        )}
        {categories.map((c) => (
          <div key={c._id} className={`rounded-2xl border bg-white p-4 shadow-sm transition ${editingId === c._id ? "border-brand-green" : "border-green-100"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-brand-ink">{c.name}</p>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">{c.slug}</span>
                </div>
                {(c.subcategories || []).length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(c.subcategories as string[]).map((s: string) => (
                      <span key={s} className="rounded-full bg-brand-greenlight px-2.5 py-0.5 text-xs font-medium text-brand-green">{s}</span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-xs text-slate-400">No subcategories</p>
                )}
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button onClick={() => moveOrder(c, "up")} className="rounded-lg border border-green-200 px-2.5 py-1.5 text-xs hover:bg-brand-greenlight" title="Move up">↑</button>
                <button onClick={() => moveOrder(c, "down")} className="rounded-lg border border-green-200 px-2.5 py-1.5 text-xs hover:bg-brand-greenlight" title="Move down">↓</button>
                <button
                  onClick={() => { setEditingId(c._id); setName(c.name); setSlug(c.slug); setSubcategories((c.subcategories || []).join(", ")); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-brand-green hover:bg-brand-greenlight"
                >
                  Edit
                </button>
                <button
                  onClick={() => { if (confirm(`Delete "${c.name}"?`)) remove(c._id); }}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
