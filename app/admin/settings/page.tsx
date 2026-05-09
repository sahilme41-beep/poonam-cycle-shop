"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { STORE_CATEGORIES } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [announcement, setAnnouncement] = useState("");
  const [homeBannerImages, setHomeBannerImages] = useState<string[]>([]);
  const [categoryCardImages, setCategoryCardImages] = useState<Record<string, string>>({});
  const [uploadingKey, setUploadingKey] = useState<string>("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((items) => {
        const ann = items.find((i: any) => i.key === "announcement");
        const banners = items.find((i: any) => i.key === "homeBannerImages");
        const categoryImages = items.find((i: any) => i.key === "categoryCardImages");
        setAnnouncement(ann?.value || "");
        setHomeBannerImages(Array.isArray(banners?.value) ? banners.value : []);
        setCategoryCardImages(categoryImages?.value && typeof categoryImages.value === "object" ? categoryImages.value : {});
      });
  }, []);

  async function uploadImage(file: File, target: "banner" | "category", slug?: string) {
    setUploadingKey(`${target}-${slug || "default"}`);
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

      if (target === "banner") {
        setHomeBannerImages((prev) => [...prev, data.url].slice(0, 10));
      } else if (slug) {
        setCategoryCardImages((prev) => ({ ...prev, [slug]: data.url }));
      }
    } finally {
      setUploadingKey("");
    }
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    await Promise.all([
      fetch("/api/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "announcement", value: announcement }) }),
      fetch("/api/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "homeBannerImages", value: homeBannerImages }) }),
      fetch("/api/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "categoryCardImages", value: categoryCardImages }) })
    ]);
    toast.success("Settings saved successfully!");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Admin</p>
          <h1 className="text-2xl font-extrabold text-brand-ink">Site Settings</h1>
        </div>
        <a href="/admin" className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-brand-green hover:bg-brand-greenlight">← Dashboard</a>
      </div>
      <form onSubmit={save} className="space-y-5">

        {/* Announcement */}
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="mb-2 font-bold text-brand-ink">📢 Announcement Bar</p>
          <p className="mb-3 text-xs text-slate-500">This text scrolls across the top of every page.</p>
          <input className="w-full rounded-xl border border-green-200 p-2.5 text-sm focus:border-brand-green focus:outline-none" placeholder="e.g. Free delivery on orders above ₹5000!" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} />
        </div>

        {/* Home Banners */}
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="mb-1 font-bold text-brand-ink">🖼️ Home Banner Slider</p>
          <p className="mb-3 text-xs text-slate-500">Upload up to 10 images for the homepage hero slider. Recommended size: 1200×600px.</p>
          <input className="w-full rounded-xl border border-green-200 p-2 text-sm" type="file" accept="image/*"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, "banner"); }} />
          {uploadingKey === "banner-default" && <p className="mt-1 text-xs text-brand-green">Uploading...</p>}
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
            {homeBannerImages.map((img, idx) => (
              <div key={`${img}-${idx}`} className="rounded-xl border border-green-100 p-1">
                <img src={img} alt={`Banner ${idx + 1}`} className="h-20 w-full rounded-lg object-cover" />
                <button type="button" className="mt-1 w-full rounded border px-2 py-1 text-xs text-red-500 hover:bg-red-50"
                  onClick={() => setHomeBannerImages((prev) => prev.filter((_, i) => i !== idx))}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/* Category Images */}
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="mb-1 font-bold text-brand-ink">🗂️ Category Card Images</p>
          <p className="mb-3 text-xs text-slate-500">Upload a custom image for each category card on the homepage.</p>
          <div className="space-y-4">
            {STORE_CATEGORIES.map((c) => (
              <div key={c.slug} className="rounded-xl border border-green-100 p-3">
                <p className="font-semibold text-brand-ink">{c.name}</p>
                {categoryCardImages[c.slug] && (
                  <img src={categoryCardImages[c.slug]} alt={c.name} className="mt-2 h-24 w-40 rounded-lg object-cover" />
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <input className="rounded-xl border border-green-200 p-2 text-sm" type="file" accept="image/*"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, "category", c.slug); }} />
                  {uploadingKey === `category-${c.slug}` && <span className="text-xs text-brand-green">Uploading...</span>}
                  {categoryCardImages[c.slug] && (
                    <button type="button" className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50"
                      onClick={() => setCategoryCardImages((prev) => { const n = { ...prev }; delete n[c.slug]; return n; })}>Remove</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full rounded-xl bg-brand-green py-3 font-bold text-white hover:bg-brand-green2">
          💾 Save All Settings
        </button>
      </form>
    </div>
  );
}
