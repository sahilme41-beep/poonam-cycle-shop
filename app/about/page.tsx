export const metadata = {
  title: "About | Poonam Cycle & Toy World",
  description: "Your trusted destination for premium cycles, kids electric ride-ons and toys in Kolhapur. Near Keswani Hospital, Gandhinagar, Kolhapur, Maharashtra."
};

const categories = [
  { icon: "⚡", name: "Electric Cycles", desc: "Premium e-cycles from top brands like EMotorad for daily commutes and adventure rides.", href: "/category/electric-cycles" },
  { icon: "🚗", name: "Electric Cars & Toys", desc: "Battery-operated jeeps, cars, scooters, and bikes for kids — in multiple fun colours.", href: "/category/electric-cars-toys" },
  { icon: "🚲", name: "Tricycles", desc: "Stable and comfortable three-wheelers for toddlers and young children of all ages.", href: "/category/tricycles" },
  { icon: "🚵", name: "Kids & MTB Cycles", desc: "Kids bicycles, mountain bikes, and gear cycles for all age groups.", href: "/category/kids-mtb-cycles" },
];

const whyUs = [
  "Fair and transparent pricing with no hidden charges",
  "Trusted by hundreds of families in Kolhapur",
  "Wide variety — from kids ride-ons to adult e-cycles",
  "Personal service and expert advice on every purchase",
  "Easy WhatsApp enquiry — get answers instantly",
  "Home delivery available on select orders",
];

export default function AboutPage() {
  return (
    <div className="pb-12">
      {/* Hero */}
      <div className="relative h-48 w-full overflow-hidden bg-brand-ink sm:h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">About Us</p>
            <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">Poonam Cycle &amp; Toy World</h1>
            <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">
              Your trusted destination for premium cycles, kids electric ride-ons &amp; toys in Kolhapur.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Intro */}
        <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <p className="text-base leading-8 text-slate-600">
            Your trusted destination for premium cycles, kids electric ride-ons and toys in Kolhapur.
            Located near Keswani Hospital, Gandhinagar, Kolhapur, Maharashtra — serving hundreds of
            families for years with honest pricing and expert guidance.
          </p>
        </div>

        {/* Category cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((c) => (
            <a key={c.name} href={c.href} className="group rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-green hover:shadow-md">
              <div className="mb-3 text-4xl">{c.icon}</div>
              <h3 className="font-bold text-brand-ink group-hover:text-brand-green">{c.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
            </a>
          ))}
        </div>

        {/* Why us */}
        <div className="mt-8 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-extrabold text-brand-ink">Why Choose Us?</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {whyUs.map((w) => (
              <div key={w} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs text-white">✓</span>
                <p className="text-sm text-slate-700">{w}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { n: "500+", label: "Happy Customers" },
            { n: "4", label: "Product Categories" },
            { n: "100+", label: "Products Available" },
            { n: "10+", label: "Years of Service" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-green-100 bg-white p-4 text-center shadow-sm">
              <p className="text-3xl font-extrabold text-brand-green">{s.n}</p>
              <p className="mt-1 text-xs font-medium text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/shop" className="rounded-xl bg-brand-green px-6 py-3 font-bold text-white hover:bg-brand-green2">Browse Products</a>
          <a href="/contact" className="rounded-xl border border-brand-green px-6 py-3 font-bold text-brand-green hover:bg-brand-greenlight">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
