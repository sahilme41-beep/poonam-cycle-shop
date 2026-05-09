import Link from "next/link";

type Variant = { color: string; image: string; images?: string[] };
type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  subcategory: string;
  variants: Variant[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-surface p-3 hover:-translate-y-0.5 hover:shadow-md">
      <img
        src={product.variants?.[0]?.images?.[0] || product.variants?.[0]?.image || "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600"}
        alt={product.name}
        className="h-56 w-full rounded-xl bg-white object-contain"
      />
      <p className="mt-3 inline-block rounded-full bg-[#f1e3d6] px-2 py-0.5 text-xs font-semibold text-brand-brown">{product.category}</p>
      <h3 className="mt-2 line-clamp-2 text-base font-semibold text-brand-ink">{product.name}</h3>
      <p className="mt-1 text-lg font-bold text-brand-brown">Rs {product.price.toLocaleString("en-IN")}</p>
      <p className="text-sm text-slate-500">Stock: {product.stock > 0 ? "Available" : "Out of stock"}</p>
      <Link
        href={`/product/${product._id}`}
        className="mt-3 inline-block rounded-lg bg-brand-brown px-3 py-2 text-sm font-semibold text-white hover:bg-brand-brown2"
      >
        View Details
      </Link>
    </div>
  );
}
