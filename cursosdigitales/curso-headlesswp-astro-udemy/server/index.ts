import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
const app = new Hono();

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use("*", cors({
  origin: "http://localhost:5173", // Vite default port
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
}));

app.post("/api/orders", async (c) => {
  try {
    const body = await c.req.json();
    const { cart, userId, total } = body;
    
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return c.json({ error: "Cart is empty" }, 400);
    }

    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        totalAmount: total,
        items: {
          create: cart.map((item: any) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.basePrice,
            size: item.size,
            milk: item.milk,
            sweetness: item.sweetness,
          }))
        }
      },
      include: { items: true }
    });

    return c.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
