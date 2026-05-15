import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow Vercel frontend to call this Render backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ─── Health Check ────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Render backend is alive!" });
});

// ─── Add your API routes below ───────────────────────────────────────────────
// Example:
// app.get("/api/shipments", async (req, res) => { ... });

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Nexus Logix backend running on port ${PORT}`);
});
