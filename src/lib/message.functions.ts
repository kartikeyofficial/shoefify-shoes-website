import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDB } from "./db.server";
import { SupportMessage } from "./models.server";
import { getServerUser } from "./auth.server";
import { serialize } from "./utils";

export const getMessages = createServerFn({ method: "GET" }).handler(async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");

  const messages = await SupportMessage.find().sort({ createdAt: -1 }).lean();
  return serialize(messages.map(m => ({ ...m, _id: m._id.toString(), id: m._id.toString() })));
});

export const createMessage = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ name: z.string(), email: z.string().email(), subject: z.string().optional(), message: z.string(), type: z.string().optional() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const msg = new SupportMessage(data);
    await msg.save();
    return { success: true };
  });

export const updateMessage = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string(), status: z.string().optional(), admin_response: z.string().optional() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    const { id, ...updateData } = data;
    await SupportMessage.findByIdAndUpdate(id, updateData);
    return { success: true };
  });
