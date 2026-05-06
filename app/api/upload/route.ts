import { NextResponse } from "next/server";
import { uploadBase64Image } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json();
    if (!base64) {
      return NextResponse.json({ error: "base64 is required" }, { status: 400 });
    }
    const url = await uploadBase64Image(base64);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed", details: String(error) }, { status: 500 });
  }
}
