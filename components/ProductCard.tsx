import Link from "next/link";

type Variant = { color: string; image: string };
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
    <div className="rounded-xl bg-white p-3 shadow-sm">
      <img
        src={product.variants?.[0]?.image || "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600"}
        alt={product.name}
        className="h-56 w-full rounded-lg object-cover"
      />
      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="font-bold text-green-700">Rs {product.price}</p>
      <p className="text-sm text-slate-500">
        {product.category} | Stock: {product.stock}
      </p>
      <Link href={`/product/${product._id}`} className="mt-2 inline-block text-sm text-blue-600">
        View Details
      </Link>
    </div>
  );
}
