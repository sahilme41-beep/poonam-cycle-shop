import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Category.find().sort({ order: 1 }));
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/shop");
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const result = await Category.create(body);
  revalidateAll();
  return NextResponse.json(result);
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  const result = await Category.findByIdAndUpdate(body.id, body, { new: true });
  revalidateAll();
  return NextResponse.json(result);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Category.findByIdAndDelete(id);
  revalidateAll();
  return NextResponse.json({ ok: true });
}
