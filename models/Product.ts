import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    notionKey: { type: String, default: "", index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    description: { type: String, default: "" },
    variants: [{ color: String, image: String, images: [{ type: String }] }],
    features: [{ type: String }],
    specs: [{ key: String, value: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    whatsappClicks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
