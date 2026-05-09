import Link from "next/link";

type Variant = { color: string; image: string; images?: string[] };
type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  subcategory?: string;
  variants: Variant[];
};

export default function ProductCard({ product }: { product: Product }) {
  const image = product.variants?.[0]?.images?.[0] || product.variants?.[0]?.image || "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600";
  const inStock = product.stock > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <Link href={`/product/${product._id}`} className="relative block overflow-hidden bg-slate-50">
        <img
          src={image}
          alt={product.name}
          className="h-44 w-full object-contain p-2 transition duration-500 group-hover:scale-105 sm:h-52"
        />
        {!inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white shadow">
            Out of Stock
          </span>
        )}
        {inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-bold text-white shadow">
            In Stock
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        <p className="mb-1 w-fit rounded-full bg-brand-greenlight px-2 py-0.5 text-xs font-semibold text-brand-green">
          {product.category}
        </p>
        <h3 className="line-clamp-2 flex-1 text-sm font-bold text-brand-ink sm:text-base leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 text-xl font-extrabold text-brand-green">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        <Link
          href={`/product/${product._id}`}
          className="mt-3 block rounded-xl bg-brand-green py-2 text-center text-sm font-bold text-white transition hover:bg-brand-green2"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
