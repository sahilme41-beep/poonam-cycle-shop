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
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-brand-green">Get in Touch</p>
      <h1 className="mb-8 text-4xl font-extrabold text-brand-ink">Contact Us</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-brand-ink">Visit or Call Us</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <p className="flex items-start gap-2"><span className="mt-0.5 text-brand-green">📍</span> Near Kaswam Hospital, Gandhinagar, Kolhapur, Maharashtra</p>
            <p className="flex items-center gap-2"><span className="text-brand-green">📞</span> <a href="tel:7588267528" className="hover:text-brand-green">7588267528</a> (Mobile)</p>
            <p className="flex items-center gap-2"><span className="text-brand-green">📞</span> <a href="tel:9359165468" className="hover:text-brand-green">9359165468</a> (Sales)</p>
            <p className="flex items-center gap-2"><span className="text-brand-green">📞</span> <a href="tel:9422043565" className="hover:text-brand-green">9422043565</a> (Inquiry)</p>
            <p className="flex items-center gap-2"><span className="text-brand-green">📞</span> <a href="tel:7057902565" className="hover:text-brand-green">7057902565</a> (Inquiry)</p>
            <p className="flex items-center gap-2"><span className="text-brand-green">📸</span> <a href="https://instagram.com/poonam_cycle" target="_blank" rel="noreferrer" className="hover:text-brand-green">@poonam_cycle</a></p>
          </div>
          <iframe
            className="mt-5 h-72 w-full rounded-xl border border-green-100"
            src="https://maps.google.com/maps?q=Poonam+Cycle+%26+Toy+World+Gandhinagar+Kolhapur&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-brand-ink">Send an Enquiry</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Your Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-slate-200 p-2.5 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="e.g. Rahul Patil" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
              <input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full rounded-lg border border-slate-200 p-2.5 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="e.g. 9876543210" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
              <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg border border-slate-200 p-2.5 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="What are you looking for?" rows={5} />
            </div>
            <button className="w-full rounded-lg bg-brand-green py-2.5 font-semibold text-white hover:bg-brand-green2">Send Enquiry</button>
          </div>
        </form>
      </div>
    </div>
  );
}
