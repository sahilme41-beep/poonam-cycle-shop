import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getStoreCategories, getStoreMediaSettings } from "@/lib/storefront";
import Link from "next/link";
import HomeHeroSlider from "@/components/HomeHeroSlider";

const categoryCards: Record<string, string> = {
  "electric-cars-toys":
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=900&auto=format&fit=crop",
  tricycles:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
  "electric-cycles":
    "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=900&auto=format&fit=crop"
};

const categoryDescriptions: Record<string, string> = {
  "electric-cars-toys": "Ride-ons, cars, jeeps and scooters for kids",
  tricycles: "Stable and comfortable three-wheelers",
  "electric-cycles": "Daily comfort cycles with electric support"
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, featuredProducts, mediaSettings] = await Promise.all([
    getStoreCategories(),
    getFeaturedProducts(8),
    getStoreMediaSettings()
  ]);
  const mergedCategoryCards = { ...categoryCards, ...(mediaSettings.categoryCardImages || {}) };

  return (
    <div className="pb-10">
      <HomeHeroSlider images={mediaSettings.homeBannerImages} />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-5 text-center text-2xl font-bold text-brand-ink">Explore Our Collection</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {categories.map((c: any) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group overflow-hidden rounded-xl border border-[#e9d8c7] bg-brand-cream shadow-sm hover:shadow-md"
            >
              <img
                src={mergedCategoryCards[c.slug] || "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600"}
                alt={c.name}
                className="h-28 w-full object-cover sm:h-40"
              />
              <div className="p-3">
                <p className="font-semibold text-brand-ink group-hover:text-brand-brown">{c.name}</p>
                <p className="mt-1 text-xs text-slate-600">{categoryDescriptions[c.slug] || "Explore the latest collection"}</p>
                <p className="mt-2 text-xs font-semibold text-brand-brown">
                  Explore Collection <span aria-hidden>→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-ink">Featured Products</h2>
          <Link href="/shop" className="text-sm font-semibold text-brand-brown hover:text-brand-brown2">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {featuredProducts.map((p: any) => (
            <ProductCard key={String(p._id)} product={{ ...p, _id: String(p._id) }} />
          ))}
        </div>
      </section>
    </div>
  );
}
