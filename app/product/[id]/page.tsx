import { getStoreProducts } from "@/lib/storefront";
import ProductDetailsClient from "./product-details-client";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const products: any[] = await getStoreProducts();
  const product = products.find((item: any) => String(item._id) === params.id);
  if (!product) return <div className="mx-auto max-w-7xl px-4 py-8">Product not found.</div>;
  return <ProductDetailsClient product={JSON.parse(JSON.stringify(product))} />;
}
