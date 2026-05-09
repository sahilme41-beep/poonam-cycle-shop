"use client";

import { FormEvent, useEffect, useState } from "react";
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
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "announcement", value: announcement })
    });
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "homeBannerImages", value: homeBannerImages })
    });
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "categoryCardImages", value: categoryCardImages })
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Site Settings</h1>
      <form onSubmit={save} className="mt-4 space-y-3 rounded bg-white p-4 shadow-sm">
        <input className="w-full rounded border p-2" placeholder="Announcement bar text" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} />
        <div className="rounded border p-3">
          <p className="mb-2 text-sm font-semibold">Home Banner Images (slider)</p>
          <input
            className="w-full rounded border p-2"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file, "banner");
            }}
          />
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-5">
            {homeBannerImages.map((img, idx) => (
              <div key={`${img}-${idx}`} className="rounded border p-1">
                <img src={img} alt={`Banner ${idx + 1}`} className="h-24 w-full rounded object-cover" />
                <button
                  type="button"
                  className="mt-1 w-full rounded border px-2 py-1 text-xs"
                  onClick={() => setHomeBannerImages((prev) => prev.filter((_, i) => i !== idx))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded border p-3">
          <p className="mb-2 text-sm font-semibold">Category Card Images</p>
          <div className="space-y-3">
            {STORE_CATEGORIES.map((c) => (
              <div key={c.slug} className="rounded border p-2">
                <p className="text-sm font-medium">{c.name}</p>
                {categoryCardImages[c.slug] ? (
                  <img src={categoryCardImages[c.slug]} alt={c.name} className="mt-2 h-24 w-40 rounded object-cover" />
                ) : null}
                <div className="mt-2 flex flex-wrap gap-2">
                  <input
                    className="rounded border p-2 text-sm"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadImage(file, "category", c.slug);
                    }}
                  />
                  {categoryCardImages[c.slug] ? (
                    <button
                      type="button"
                      className="rounded border px-3 py-1 text-sm"
                      onClick={() =>
                        setCategoryCardImages((prev) => {
                          const next = { ...prev };
                          delete next[c.slug];
                          return next;
                        })
                      }
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        {uploadingKey ? <p className="text-xs text-slate-500">Uploading...</p> : null}
        <button className="rounded bg-green-600 px-3 py-2 text-white">Save Settings</button>
      </form>
    </div>
  );
}
