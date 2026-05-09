import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getReviews, getStoreMediaSettings } from "@/lib/storefront";
import Link from "next/link";
import HomeHeroSlider from "@/components/HomeHeroSlider";
import { BUSINESS, STORE_CATEGORIES } from "@/lib/constants";

const categoryCards: Record<string, string> = {
  "electric-cars-toys":
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=900&auto=format&fit=crop",
  tricycles:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
  "electric-cycles":
    "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=900&auto=format&fit=crop",
  "kids-mtb-cycles":
    "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=900&auto=format&fit=crop"
};

const categoryDescriptions: Record<string, string> = {
  "electric-cars-toys": "Ride-ons, cars, jeeps and scooters for kids",
  tricycles: "Stable and comfortable three-wheelers",
  "electric-cycles": "Daily comfort cycles with electric support",
  "kids-mtb-cycles": "Kids bicycles, MTB and gear cycles for all ages"
};

const trustBadges = [
  { icon: "🏆", label: "Trusted Store", sub: "Serving Kolhapur for years" },
  { icon: "🚚", label: "Home Delivery", sub: "Available on select orders" },
  { icon: "📞", label: "Expert Advice", sub: "Call us before you buy" },
  { icon: "✅", label: "Quality Products", sub: "Top brands guaranteed" },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredProducts, mediaSettings, reviews] = await Promise.all([
    getFeaturedProducts(8),
    getStoreMediaSettings(),
    getReviews(6)
  ]);
  // Always use STORE_CATEGORIES as source of truth so all 4 categories always appear
  // DB categoryCardImages override the default Unsplash images when admin uploads
  const mergedCategoryCards = { ...categoryCards, ...(mediaSettings.categoryCardImages || {}) };
  const categories = STORE_CATEGORIES;

  return (
    <div className="pb-10">
      {/* Hero */}
      <HomeHeroSlider images={mediaSettings.homeBannerImages} />

      {/* Trust badges */}
      <div className="border-b border-green-100 bg-white shadow-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px divide-x divide-green-100 md:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-3 px-5 py-4 sm:px-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-greenlight text-xl">{b.icon}</span>
              <div>
                <p className="text-sm font-bold text-brand-ink">{b.label}</p>
                <p className="text-xs text-slate-500">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Browse by Category</p>
          <h2 className="mt-1 text-4xl font-extrabold text-brand-ink">Explore Our Collection</h2>
          <p className="mt-2 text-slate-500">Find the perfect ride for every age and adventure</p>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group relative block overflow-hidden rounded-2xl shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={mergedCategoryCards[c.slug] || "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600"}
                alt={c.name}
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-56"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-lg font-extrabold text-white drop-shadow">{c.name}</p>
                <p className="mt-0.5 text-xs text-white/80">{categoryDescriptions[c.slug] || "Explore the latest collection"}</p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-green/90 px-2.5 py-0.5 text-xs font-semibold text-white">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Handpicked For You</p>
              <h2 className="mt-1 text-3xl font-extrabold text-brand-ink">Featured Products</h2>
            </div>
            <Link href="/shop" className="rounded-lg border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green hover:bg-brand-greenlight">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featuredProducts.map((p: any) => (
              <ProductCard key={String(p._id)} product={{ ...p, _id: String(p._id) }} />
            ))}
          </div>
          {!featuredProducts.length && (
            <p className="py-12 text-center text-slate-400">No featured products yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">What Customers Say</p>
              <h2 className="mt-1 text-3xl font-extrabold text-brand-ink">Customer Reviews</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r: any) => (
                <div key={String(r._id)} className="flex flex-col rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                  <div className="flex gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-lg">{s <= r.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 italic">&ldquo;{r.message}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
                      {r.name?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm font-bold text-brand-ink">{r.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map / Visit Us section */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Find Us</p>
            <h2 className="mt-1 text-3xl font-extrabold text-brand-ink">Visit Our Store</h2>
            <p className="mt-2 text-sm text-slate-500">Near Keswani Hospital, Gandhinagar, Kolhapur, Maharashtra</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-green-100 shadow-md">
            <iframe
              className="h-80 w-full md:h-96"
              src="https://maps.google.com/maps?q=Poonam+Cycle+%26+Toy+World+Gandhinagar+Kolhapur&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <a
              href="https://maps.app.goo.gl/Mgohw4hjo6Xd19YJ9"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-brand-green px-6 py-3 font-bold text-white hover:bg-brand-green2"
            >
              📍 Open in Google Maps
            </a>
            <a
              href="tel:7588267528"
              className="rounded-xl border border-brand-green px-6 py-3 font-semibold text-brand-green hover:bg-brand-greenlight"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Instagram / CTA strip */}
      <section className="bg-brand-ink py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Follow Us</p>
        <h2 className="mt-2 text-3xl font-extrabold text-white">@poonam_cycle</h2>
        <p className="mt-2 text-slate-400">Follow us on Instagram for new arrivals and offers</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://instagram.com/poonam_cycle"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white hover:opacity-90"
          >
            Follow on Instagram
          </a>
          <a
            href={`https://wa.me/91${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#1ebe5d]"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </div>
  );
}
