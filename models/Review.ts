import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

export const Review = models.Review || model("Review", ReviewSchema);
