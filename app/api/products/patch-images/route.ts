import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

const IMAGE_MAP: Record<string, string[]> = {
  "dope": [
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/dope/1.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/dope/2.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/dope/3.jpg",
  ],
  "x1": [
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/x1/1.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/x1/2.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/x1/3.jpg",
  ],
  "x2": [
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/x2/1.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/x2/2.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/x2/3.jpg",
  ],
  "legend": [
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/legend07/1.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/legend07/2.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/legend07/3.jpg",
  ],
  "t-rex+": [
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/t-rex%2B/1.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/t-rex%2B/2.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/t-rex%2B/3.jpg",
  ],
  "t-rex": [
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/t-rex/1.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/t-rex/2.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/t-rex/3.jpg",
  ],
  "viper": [
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/viper/1.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/viper/2.jpg",
    "https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/productPage/viper/3.jpg",
  ],
};

function getImagesForProduct(name: string): string[] | null {
  const lower = name.toLowerCase();
  // Order matters: check t-rex+ before t-rex
  if (lower.includes("t-rex+") || lower.includes("t rex+")) return IMAGE_MAP["t-rex+"];
  if (lower.includes("t-rex") || lower.includes("t rex")) return IMAGE_MAP["t-rex"];
  if (lower.includes("viper")) return IMAGE_MAP["viper"];
  if (lower.includes("legend")) return IMAGE_MAP["legend"];
  if (lower.includes("x2")) return IMAGE_MAP["x2"];
  if (lower.includes("x1")) return IMAGE_MAP["x1"];
  if (lower.includes("dope")) return IMAGE_MAP["dope"];
  return null;
}

export async function POST() {
  await connectDB();
  const products = await Product.find({ category: { $regex: /electric cycle/i } });
  const results: { name: string; updated: boolean; images: string[] }[] = [];

  for (const product of products) {
    const images = getImagesForProduct(product.name);
    if (images) {
      await Product.findByIdAndUpdate(product._id, {
        $set: {
          "variants.0.image": images[0],
          "variants.0.images": images,
        },
      });
      results.push({ name: product.name, updated: true, images });
    } else {
      results.push({ name: product.name, updated: false, images: [] });
    }
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/product/[id]", "page");
  revalidatePath("/category/[slug]", "page");

  return NextResponse.json({ ok: true, results });
}
