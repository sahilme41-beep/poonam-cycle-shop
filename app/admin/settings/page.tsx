"use client";

import { FormEvent, useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [announcement, setAnnouncement] = useState("");
  const [heroTitle, setHeroTitle] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((items) => {
        const ann = items.find((i: any) => i.key === "announcement");
        const hero = items.find((i: any) => i.key === "heroTitle");
        setAnnouncement(ann?.value || "");
        setHeroTitle(hero?.value || "");
      });
  }, []);

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
      body: JSON.stringify({ key: "heroTitle", value: heroTitle })
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Site Settings</h1>
      <form onSubmit={save} className="mt-4 space-y-3 rounded bg-white p-4 shadow-sm">
        <input className="w-full rounded border p-2" placeholder="Announcement bar text" value={announcement} onChange={(e) => setAnnouncement(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Hero heading" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
        <button className="rounded bg-green-600 px-3 py-2 text-white">Save Settings</button>
      </form>
    </div>
  );
}
