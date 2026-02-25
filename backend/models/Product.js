import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,

    price: { type: Number, required: true },
    stock: { type: Number, required: true },

    category: {
      type: String,
      enum: ["protein", "supplement", "accessory"],
    },

    image: {
      public_id: String,
      url: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

