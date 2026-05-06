"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      toast.success("Enquiry submitted");
      setForm({ name: "", mobile: "", message: "" });
    } else {
      toast.error("Failed to submit enquiry");
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2">Near Kaswam Hospital, Gandhinagar, Kolhapur, Maharashtra</p>
        <p className="mt-2">Mobile: <a href="tel:7588267528">7588267528</a> | Sales: <a href="tel:9359165468">9359165468</a></p>
        <p>Inquiry: <a href="tel:9422043565">9422043565</a> / <a href="tel:7057402575">7057402575</a></p>
        <p className="mt-2">Instagram: <a href="https://instagram.com/poonam_cycle">@poonam_cycle</a></p>
        <iframe
          className="mt-4 h-80 w-full rounded-xl border"
          src="https://maps.google.com/maps?q=Kolhapur&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>
      <form onSubmit={submit} className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded border p-2" placeholder="Name" />
        <input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full rounded border p-2" placeholder="Mobile" />
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded border p-2" placeholder="Message" rows={5} />
        <button className="rounded bg-green-600 px-4 py-2 text-white">Send Enquiry</button>
      </form>
    </div>
  );
}
