import express from "express";
const app = express();
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

// app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello, Prisma Blog!");
});

app.post("/blogs", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const blog = await prisma.blog.create({
      data: { title, content },
    });

    res.json({ success: true, blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default app;
