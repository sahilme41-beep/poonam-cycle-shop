"use client";

import { FormEvent, useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  async function load() {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, subcategories: [] })
    });
    setName("");
    setSlug("");
    load();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <form onSubmit={add} className="mt-4 grid gap-2 rounded bg-white p-4 shadow-sm md:grid-cols-3">
        <input className="rounded border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="rounded border p-2" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        <button className="rounded bg-green-600 px-3 py-2 text-white">Add Category</button>
      </form>
      <div className="mt-4 rounded bg-white p-4 shadow-sm">
        {categories.map((c) => (
          <div key={c._id} className="border-b py-2">
            {c.name} ({c.slug})
          </div>
        ))}
      </div>
    </div>
  );
}
