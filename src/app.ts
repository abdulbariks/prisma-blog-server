import express from "express";
const app = express();
import { json } from "body-parser";
import cors from "cors";

app.get("/", (req, res) => {
  res.send("Hello, Prisma Blog!");
});

export default app;
