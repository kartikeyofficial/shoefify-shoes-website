import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  full_name: { type: String },
  phone: { type: String },
  avatar_url: { type: String },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sort_order: { type: Number, default: 0 },
});

export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

const ProductVariantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, default: 0 },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  compare_at_price: { type: Number },
  brand: { type: String },
  description: { type: String },
  images: [{ type: String }],
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  is_active: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: false },
  variants: [ProductVariantSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const OrderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  product_name: { type: String },
  size: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order_number: { type: String, required: true, unique: true },
  status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
  total: { type: Number, required: true },
  items: [OrderItemSchema],
  shipping_address: { type: Object },
  payment_method: { type: String, enum: ["cod", "razorpay"], default: "razorpay" },
  payment_status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

const SupportMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  type: { type: String, enum: ["question", "suggestion", "report"], default: "question" },
  status: { type: String, enum: ["new", "in_review", "resolved"], default: "new" },
  admin_response: { type: String },
  is_read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const SupportMessage = mongoose.models.SupportMessage || mongoose.model("SupportMessage", SupportMessageSchema);
