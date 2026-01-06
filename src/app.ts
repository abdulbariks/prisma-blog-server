import express from "express";
const app = express();
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
import { postRouter } from "./modules/post/post.router";

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/posts", postRouter);

// app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello, Prisma Blog!");
});

export default app;
