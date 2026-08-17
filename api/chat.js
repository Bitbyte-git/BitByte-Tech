import { DEFAULT_GROQ_MODEL, createChatReply } from "../server/chatCore.js";

function getRequestBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    return JSON.parse(req.body);
  }
  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "Groq API key is not configured" });
  }

  let message = "";

  try {
    const body = getRequestBody(req);
    message = typeof body.message === "string" ? body.message.trim() : "";
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await createChatReply(
      message,
      process.env.GROQ_API_KEY,
      process.env.VITE_GROQ_MODEL ||
        process.env.GROQ_MODEL ||
        DEFAULT_GROQ_MODEL,
    );
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Groq chat error:", error);
    return res.status(500).json({
      error: "Unable to generate a response right now",
    });
  }
}
