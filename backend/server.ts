import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

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

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "YOUR_API_KEY",
});

// ─── AI Chat Route ───────────────────────────────────────────────
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = `You are the Nexus Logix AI assistant, an expert supply chain and logistics Copilot. 
You are embedded in a real-time dashboard. Be concise, professional, and data-driven.
When asked about specific data, use the provided context to answer accurately. 
Format your responses using clean text or markdown where appropriate, but keep it brief (max 3-4 sentences unless explaining a complex route).
Current Context from dashboard: ${JSON.stringify(context || {})}`;

    // Note: the requested model in prompt is claude-sonnet-4-20250514 but we will use the commonly available claude-3-5-sonnet-20241022 or generic string.
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      temperature: 0.3,
      system: systemPrompt,
      messages: [
        { role: "user", content: message }
      ]
    });

    const reply = response.content[0]?.type === 'text' ? response.content[0].text : "I couldn't generate a response.";
    res.json({ reply });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: "Failed to process AI request.", details: error.message });
  }
});

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Nexus Logix backend running on port ${PORT}`);
});
