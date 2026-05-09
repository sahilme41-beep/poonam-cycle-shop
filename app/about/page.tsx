export const metadata = {
  title: "About | Poonam Cycle & Toy World",
  description: "About Poonam Cycle & Toy World, Kolhapur — your trusted destination for cycles, electric ride-ons, and kids toys."
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-green">About Us</p>
        <h1 className="mt-2 text-4xl font-extrabold text-brand-ink">Poonam Cycle &amp; Toy World</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Your trusted local destination for premium cycles, electric ride-ons, and kids toys &mdash; located near Kaswam Hospital, Gandhinagar, Kolhapur, Maharashtra.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-green-100 bg-[#F1F8F1] p-5">
            <div className="mb-3 text-3xl">🚲</div>
            <h3 className="font-bold text-brand-ink">Electric Cycles</h3>
            <p className="mt-1 text-sm text-slate-600">Premium e-cycles from top brands like EMotorad for daily commutes and adventure rides.</p>
          </div>
          <div className="rounded-xl border border-green-100 bg-[#F1F8F1] p-5">
            <div className="mb-3 text-3xl">🚗</div>
            <h3 className="font-bold text-brand-ink">Electric Cars &amp; Toys</h3>
            <p className="mt-1 text-sm text-slate-600">Battery-operated jeeps, cars, scooters, and bikes for kids &mdash; in multiple fun colours.</p>
          </div>
          <div className="rounded-xl border border-green-100 bg-[#F1F8F1] p-5">
            <div className="mb-3 text-3xl">🛺</div>
            <h3 className="font-bold text-brand-ink">Tricycles</h3>
            <p className="mt-1 text-sm text-slate-600">Stable and comfortable three-wheelers for toddlers and young children of all ages.</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-green-100 bg-[#F1F8F1] p-6">
          <h2 className="mb-4 text-xl font-bold text-brand-ink">Why Choose Us?</h2>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-brand-green">✓</span> Fair and transparent pricing with no hidden charges</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-brand-green">✓</span> Trusted by hundreds of families in Kolhapur</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-brand-green">✓</span> Wide variety &mdash; from kids ride-ons to adult e-cycles</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-brand-green">✓</span> Personal service and expert advice on every purchase</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-brand-green">✓</span> Easy WhatsApp enquiry &mdash; get answers instantly</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/shop" className="rounded-lg bg-brand-green px-5 py-2.5 font-semibold text-white hover:bg-brand-green2">Browse Products</a>
          <a href="/contact" className="rounded-lg border border-brand-green px-5 py-2.5 font-semibold text-brand-green hover:bg-brand-greenlight">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
