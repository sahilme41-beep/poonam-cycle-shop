import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Category.find().sort({ order: 1 }));
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Category.create(body));
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Category.findByIdAndUpdate(body.id, body, { new: true }));
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
