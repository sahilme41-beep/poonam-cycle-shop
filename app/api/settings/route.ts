import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Setting } from "@/models/Setting";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Setting.find());
}

export async function POST(req: Request) {
  await connectDB();
  const { key, value } = await req.json();
  const saved = await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/about");
  revalidatePath("/category/[slug]", "page");
  return NextResponse.json(saved);
}
