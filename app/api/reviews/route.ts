import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/Review";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Review.find().sort({ createdAt: -1 }));
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const review = await Review.create(body);
  revalidatePath("/");
  return NextResponse.json(review);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Review.findByIdAndDelete(id);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
