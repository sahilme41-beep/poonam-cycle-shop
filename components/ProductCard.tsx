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
    <div className="card-surface group flex flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-white">
        <img
          src={product.variants?.[0]?.images?.[0] || product.variants?.[0]?.image || "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600"}
          alt={product.name}
          className="h-48 w-full object-contain transition duration-300 group-hover:scale-105 sm:h-56"
        />
        {product.stock <= 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">Out of stock</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="inline-block w-fit rounded-full bg-brand-greenlight px-2 py-0.5 text-xs font-semibold text-brand-green">{product.category}</p>
        <h3 className="mt-2 line-clamp-2 flex-1 text-sm font-semibold text-brand-ink sm:text-base">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-brand-green">₹{product.price.toLocaleString("en-IN")}</p>
        {product.stock > 0 && <p className="text-xs text-green-600">● In Stock</p>}
        <Link
          href={`/product/${product._id}`}
          className="mt-3 inline-block rounded-lg bg-brand-green px-3 py-2 text-center text-sm font-semibold text-white hover:bg-brand-green2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
