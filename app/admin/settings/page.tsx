"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { STORE_CATEGORIES } from "@/lib/constants";

async function saveSettingKey(key: string, value: unknown) {
  const res = await fetch("/api/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value })
  });
  if (!res.ok) throw new Error("Save failed");
}

export default function AdminSettingsPage() {
  const [announcement, setAnnouncement] = useState("");
  const [homeBannerImages, setHomeBannerImages] = useState<string[]>([]);
  const [categoryCardImages, setCategoryCardImages] = useState<Record<string, string>>({});
  const [uploadingKey, setUploadingKey] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const annRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((items: any[]) => {
        const ann = items.find((i) => i.key === "announcement");
        const banners = items.find((i) => i.key === "homeBannerImages");
        const catImgs = items.find((i) => i.key === "categoryCardImages");
        setAnnouncement(ann?.value || "");
        setHomeBannerImages(Array.isArray(banners?.value) ? banners.value : []);
        setCategoryCardImages(catImgs?.value && typeof catImgs.value === "object" ? catImgs.value : {});
        setLoaded(true);
      })
      .catch(() => {
        toast.error("Failed to load settings");
        setLoaded(true);
      });
  }, []);

  async function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });
  }

  async function uploadAndSaveBanner(file: File) {
    const key = "banner-uploading";
    setUploadingKey(key);
    try {
      const base64 = await readFileAsBase64(file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const newList = [...homeBannerImages, data.url].slice(0, 10);
      setHomeBannerImages(newList);
      await saveSettingKey("homeBannerImages", newList);
      toast.success("Banner image uploaded & saved!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingKey("");
    }
  }

  async function removeBanner(idx: number) {
    const newList = homeBannerImages.filter((_, i) => i !== idx);
    setHomeBannerImages(newList);
    await saveSettingKey("homeBannerImages", newList);
    toast.success("Banner removed");
  }

  async function uploadAndSaveCategoryImage(file: File, slug: string) {
    setUploadingKey(`category-${slug}`);
    try {
      const base64 = await readFileAsBase64(file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const newMap = { ...categoryCardImages, [slug]: data.url };
      setCategoryCardImages(newMap);
      await saveSettingKey("categoryCardImages", newMap);
      toast.success("Category image uploaded & saved!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingKey("");
    }
  }

  async function removeCategoryImage(slug: string) {
    const newMap = { ...categoryCardImages };
    delete newMap[slug];
    setCategoryCardImages(newMap);
    await saveSettingKey("categoryCardImages", newMap);
    toast.success("Category image removed");
  }

  async function saveAnnouncement(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettingKey("announcement", announcement);
      toast.success("Announcement saved!");
    } catch {
      toast.error("Failed to save announcement");
    } finally {
      setSaving(false);
    }
  }

  if (!loaded) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="skeleton mb-4 h-8 w-56 rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-32 w-full rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Admin</p>
          <h1 className="text-2xl font-extrabold text-brand-ink">Site Settings</h1>
          <p className="mt-1 text-xs text-slate-500">All changes save instantly to the live website.</p>
        </div>
        <a href="/admin" className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-brand-green hover:bg-brand-greenlight">
          ← Dashboard
        </a>
      </div>

      <div className="space-y-6">

        {/* ── Announcement Bar ── */}
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="mb-1 text-base font-bold text-brand-ink">📢 Announcement Bar</p>
          <p className="mb-3 text-xs text-slate-500">This text scrolls across the top of every page. Save after editing.</p>
          <form onSubmit={saveAnnouncement} className="flex gap-2">
            <input
              ref={annRef}
              className="flex-1 rounded-xl border border-green-200 p-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              placeholder="e.g. Free delivery on orders above ₹5000! | New stock arrived!"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-brand-green px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-green2 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </form>
        </div>

        {/* ── Home Banner Slider ── */}
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-base font-bold text-brand-ink">🖼️ Home Banner Slider</p>
            <span className="rounded-full bg-brand-greenlight px-2 py-0.5 text-xs font-semibold text-brand-green">
              {homeBannerImages.length} / 10 images
            </span>
          </div>
          <p className="mb-3 text-xs text-slate-500">Upload images for the homepage hero slider. Best size: 1200×500px. Images save automatically on upload.</p>

          {homeBannerImages.length < 10 && (
            <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-green-200 p-4 transition hover:border-brand-green hover:bg-brand-greenlight ${uploadingKey === "banner-uploading" ? "opacity-60 pointer-events-none" : ""}`}>
              <span className="text-2xl">📷</span>
              <span className="text-sm font-medium text-brand-green">
                {uploadingKey === "banner-uploading" ? "Uploading… please wait" : "Click to upload banner image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingKey === "banner-uploading"}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) { e.target.value = ""; uploadAndSaveBanner(f); } }}
              />
            </label>
          )}

          {homeBannerImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {homeBannerImages.map((img, idx) => (
                <div key={`${img}-${idx}`} className="group relative overflow-hidden rounded-xl border border-green-100">
                  <img src={img} alt={`Banner ${idx + 1}`} className="h-24 w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => removeBanner(idx)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-xs font-bold text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="bg-black/60 py-0.5 text-center text-xs text-white">#{idx + 1}</p>
                </div>
              ))}
            </div>
          )}

          {homeBannerImages.length === 0 && (
            <p className="mt-3 text-center text-sm text-slate-400">No banner images yet. Upload one above.</p>
          )}
        </div>

        {/* ── Category Card Images ── */}
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <p className="mb-1 text-base font-bold text-brand-ink">🗂️ Category Card Images</p>
          <p className="mb-4 text-xs text-slate-500">Upload a custom image for each category card on the homepage. Saves automatically on upload.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {STORE_CATEGORIES.map((c) => (
              <div key={c.slug} className="rounded-xl border border-green-100 bg-brand-beige p-4">
                <p className="mb-2 font-semibold text-brand-ink">{c.name}</p>
                {categoryCardImages[c.slug] ? (
                  <div className="group relative mb-3 overflow-hidden rounded-xl">
                    <img
                      src={categoryCardImages[c.slug]}
                      alt={c.name}
                      className="h-32 w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => removeCategoryImage(c.slug)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-xs font-bold text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
                      ✓ Set
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-green-200 bg-white">
                    <p className="text-xs text-slate-400">No image — using default</p>
                  </div>
                )}
                <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-200 bg-white p-2.5 transition hover:border-brand-green hover:bg-brand-greenlight ${uploadingKey === `category-${c.slug}` ? "opacity-60 pointer-events-none" : ""}`}>
                  <span className="text-sm">
                    {uploadingKey === `category-${c.slug}` ? "⏳ Uploading…" : categoryCardImages[c.slug] ? "🔄 Replace Image" : "📷 Upload Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingKey === `category-${c.slug}`}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) { e.target.value = ""; uploadAndSaveCategoryImage(f, c.slug); } }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
