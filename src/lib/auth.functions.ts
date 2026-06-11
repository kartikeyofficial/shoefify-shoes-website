import { createServerFn } from "@tanstack/react-start";
import { setCookie, getCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";
import { User } from "./models";
import { getServerUser } from "./auth.server";

let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }
  return transporter;
}

function getJwtSecret() {
  return process.env.JWT_SECRET || "fallback_secret_please_change_in_production";
}

export const sendOtp = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ email: z.string().email() }).parse(input))
  .handler(async ({ data }) => {
    if (!process.env.MONGODB_URI) throw new Error("Database not configured. Please add MONGODB_URI to .env");
    if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
      throw new Error("Email provider not configured. Please add NODEMAILER credentials to .env");
    }

    await connectDB();
    const email = data.email.trim().toLowerCase();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, role: "user" });
    }
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // Send email
    await getTransporter().sendMail({
      from: `"Shoefify" <${process.env.NODEMAILER_EMAIL}>`,
      to: email,
      subject: "Your Shoefify Verification Code",
      text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your verification code is: <b style="font-size: 20px;">${otp}</b></p><p>It will expire in 10 minutes.</p>`,
    });

    return { success: true };
  });

export const verifyOtp = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ email: z.string().email(), otp: z.string().length(6) }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const email = data.email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user || user.otp !== data.otp) {
      throw new Error("Invalid verification code");
    }

    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new Error("Verification code has expired");
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      getJwtSecret(),
      { expiresIn: "30d" }
    );

    // Set HTTP-only cookie
    setCookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return { success: true, user: { id: user._id.toString(), email: user.email, role: user.role } };
  });



export const getUser = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getServerUser();
  });

export const updateProfile = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({
    full_name: z.string().optional(),
    phone: z.string().optional(),
    avatar_url: z.string().optional(),
  }).parse(input))
  .handler(async ({ data }) => {
    try {
      const token = getCookie("auth_token");
      if (!token) throw new Error("Unauthorized");
      
      const decoded = jwt.verify(token, getJwtSecret()) as { userId: string };
      await connectDB();
      await User.findByIdAndUpdate(decoded.userId, data);
      return { success: true };
    } catch (err) {
      throw new Error("Failed to update profile");
    }
  });

export const logoutUser = createServerFn({ method: "POST" })
  .handler(async () => {
    deleteCookie("auth_token", { path: "/" });
    return { success: true };
  });
