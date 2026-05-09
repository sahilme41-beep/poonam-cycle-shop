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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <form onSubmit={add} className="mt-4 grid gap-2 rounded bg-white p-4 shadow-sm md:grid-cols-4">
        <input className="rounded border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="rounded border p-2" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        <input
          className="rounded border p-2"
          placeholder="Subcategories comma separated"
          value={subcategories}
          onChange={(e) => setSubcategories(e.target.value)}
        />
        <button className="rounded bg-green-600 px-3 py-2 text-white">{editingId ? "Update" : "Add Category"}</button>
      </form>
      <div className="mt-4 rounded bg-white p-4 shadow-sm">
        {categories.map((c) => (
          <div key={c._id} className="border-b py-2 last:border-b-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{c.name} ({c.slug})</p>
                <p className="text-xs text-slate-500">Subcategories: {(c.subcategories || []).join(", ") || "None"}</p>
              </div>
              <div className="flex gap-1">
                <button className="rounded border px-2 text-xs" onClick={() => moveOrder(c, "up")}>Up</button>
                <button className="rounded border px-2 text-xs" onClick={() => moveOrder(c, "down")}>Down</button>
                <button
                  className="rounded border px-2 text-xs"
                  onClick={() => {
                    setEditingId(c._id);
                    setName(c.name);
                    setSlug(c.slug);
                    setSubcategories((c.subcategories || []).join(", "));
                  }}
                >
                  Edit
                </button>
                <button className="rounded border px-2 text-xs text-red-600" onClick={() => remove(c._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
