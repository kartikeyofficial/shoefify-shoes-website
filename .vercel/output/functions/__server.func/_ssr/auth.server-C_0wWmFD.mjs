import { T as TSS_SERVER_FUNCTION, d as getCookie } from "./server-N1mLFSER.mjs";
import { j as jwt } from "../_libs/jsonwebtoken.mjs";
import { m as mongoose } from "../_libs/mongoose.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    return;
  }
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    throw new Error("MONGODB_URI is required");
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  full_name: { type: String },
  phone: { type: String },
  avatar_url: { type: String },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sort_order: { type: Number, default: 0 }
});
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const ProductVariantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, default: 0 }
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
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const OrderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  product_name: { type: String },
  size: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});
const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order_number: { type: String, required: true, unique: true },
  status: { type: String, enum: ["pending", "packed", "shipped", "out_for_delivery", "delivered", "cancelled"], default: "pending" },
  total: { type: Number, required: true },
  items: [OrderItemSchema],
  shipping_address: { type: Object },
  payment_method: { type: String, enum: ["cod", "razorpay"], default: "razorpay" },
  payment_status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
const SupportMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  type: { type: String, enum: ["question", "suggestion", "report"], default: "question" },
  status: { type: String, enum: ["new", "in_review", "resolved"], default: "new" },
  admin_response: { type: String },
  is_read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const SupportMessage = mongoose.models.SupportMessage || mongoose.model("SupportMessage", SupportMessageSchema);
async function getServerUser() {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_please_change_in_production";
    await connectDB();
    const token = getCookie("auth_token");
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).lean();
    if (!user) return null;
    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      full_name: user.full_name || "",
      phone: user.phone || "",
      avatar_url: user.avatar_url || ""
    };
  } catch (e) {
    return null;
  }
}
export {
  Category as C,
  Order as O,
  Product as P,
  SupportMessage as S,
  User as U,
  connectDB as a,
  createServerRpc as c,
  getServerUser as g
};
