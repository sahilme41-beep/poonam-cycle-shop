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
    <div className="pb-12">
      {/* Hero */}
      <div className="bg-brand-ink px-4 py-10 text-center md:py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Get in Touch</p>
        <h1 className="mt-1 text-4xl font-extrabold text-white md:text-5xl">Contact Us</h1>
        <p className="mt-2 text-slate-400">We&apos;re here to help — call, WhatsApp, or drop by</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href="tel:7588267528" className="rounded-xl bg-brand-green px-5 py-2.5 font-bold text-white hover:bg-brand-green2">📞 Call Now</a>
          <a href="https://wa.me/917588267528" target="_blank" rel="noreferrer" className="rounded-xl bg-[#25D366] px-5 py-2.5 font-bold text-white hover:bg-[#1ebe5d]">💬 WhatsApp</a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Info + Map */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-brand-ink">Visit or Call Us</h2>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                  <span className="mt-0.5 text-xl">📍</span>
                  <p>Near Keswani Hospital, Gandhinagar, Kolhapur, Maharashtra</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:7588267528" className="flex items-center gap-2 rounded-xl border border-green-100 p-3 hover:border-brand-green hover:text-brand-green">
                    <span>📞</span><div><p className="font-semibold">7588267528</p><p className="text-xs text-slate-400">Mobile</p></div>
                  </a>
                  <a href="tel:9359165468" className="flex items-center gap-2 rounded-xl border border-green-100 p-3 hover:border-brand-green hover:text-brand-green">
                    <span>📞</span><div><p className="font-semibold">9359165468</p><p className="text-xs text-slate-400">Sales</p></div>
                  </a>
                  <a href="tel:9422043565" className="flex items-center gap-2 rounded-xl border border-green-100 p-3 hover:border-brand-green hover:text-brand-green">
                    <span>📞</span><div><p className="font-semibold">9422043565</p><p className="text-xs text-slate-400">Inquiry</p></div>
                  </a>
                  <a href="tel:7057902565" className="flex items-center gap-2 rounded-xl border border-green-100 p-3 hover:border-brand-green hover:text-brand-green">
                    <span>📞</span><div><p className="font-semibold">7057902565</p><p className="text-xs text-slate-400">Inquiry</p></div>
                  </a>
                </div>
                <a href="https://instagram.com/poonam_cycle" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-green-100 p-3 hover:border-brand-green hover:text-brand-green">
                  <span>📸</span><p className="font-semibold">@poonam_cycle</p>
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-green-100 shadow-sm">
              <iframe
                className="h-64 w-full"
                src="https://maps.google.com/maps?q=Poonam+Cycle+%26+Toy+World+Gandhinagar+Kolhapur&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              />
            </div>
            <a href="https://maps.app.goo.gl/Mgohw4hjo6Xd19YJ9" target="_blank" rel="noreferrer" className="block rounded-xl bg-brand-green py-3 text-center font-bold text-white hover:bg-brand-green2">
              📍 Open in Google Maps
            </a>
          </div>

          {/* Enquiry form */}
          <form onSubmit={submit} className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-bold text-brand-ink">Send an Enquiry</h2>
            <p className="mb-5 text-sm text-slate-500">Fill the form and we&apos;ll get back to you on WhatsApp or call.</p>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Your Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="e.g. Rahul Patil" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
                <input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="e.g. 9876543210" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="What are you looking for?" rows={5} />
              </div>
              <button className="w-full rounded-xl bg-brand-green py-3 font-bold text-white hover:bg-brand-green2">Send Enquiry →</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
