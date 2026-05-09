import { NextResponse } from "next/server";
import { uploadBase64Image } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary environment variables are not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to your .env.local file." },
        { status: 500 }
      );
    }
    const body = await req.json();
    const { base64 } = body;
    if (!base64) {
      return NextResponse.json({ error: "No image data received" }, { status: 400 });
    }
    const url = await uploadBase64Image(base64);
    return NextResponse.json({ url });
  } catch (error: any) {
    const message = error?.message || String(error);
    console.error("[upload] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
