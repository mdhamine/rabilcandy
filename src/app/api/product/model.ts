import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    sizes: { type: [String], required: true },
    color: { type: [String], required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    outOfStock: { type: Boolean, default: false },
    description: { type: String },
    new: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", productSchema);
