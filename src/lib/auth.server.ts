import { getCookie } from "@tanstack/react-start/server";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import { User } from "./models";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_please_change_in_production";

export async function getServerUser() {
  try {
    await connectDB();
    const token = getCookie("auth_token");
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
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
