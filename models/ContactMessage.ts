import { Schema, model, models } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

export const ContactMessage = models.ContactMessage || model("ContactMessage", ContactMessageSchema);
