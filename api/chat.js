import { DEFAULT_MODEL, createChatReply, detectLanguage } from "../server/chatCore.js";

async function parseRequestBody(req) {
  if (req.body) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    if (Buffer.isBuffer(req.body)) {
      try {
        return JSON.parse(req.body.toString("utf8"));
      } catch {
        return {};
      }
    }
    if (typeof req.body === "object") {
      return req.body;
    }
  }

  // Support URL query parameters if present
  if (req.query && req.query.message) {
    return { message: req.query.message, history: [] };
  }

  // Fallback for native Node.js HTTP servers (e.g. server.js)
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", "POST, GET");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey =
    process.env.OPENROUTER_API_KEY ||
    process.env.VITE_OPENROUTER_API_KEY ||
    "";

  const body = await parseRequestBody(req);
  const message =
    (typeof body?.message === "string" ? body.message.trim() : "") ||
    (typeof req.query?.message === "string" ? req.query.message.trim() : "");
  const history = Array.isArray(body?.history) ? body.history : [];

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required" });
  }

  try {
    const model =
      process.env.OPENROUTER_MODEL ||
      process.env.VITE_OPENROUTER_MODEL ||
      DEFAULT_MODEL;

    const result = await createChatReply(message, apiKey, {
      model,
      history,
    });

    return res.status(200).json({
      success: true,
      reply: result.reply,
      sources: result.sources || [],
    });
  } catch (error) {
    console.error("AI chat error:", error);
    const lang = detectLanguage(message);
    const fallbackReply = lang === "tanglish"
      ? "BitByte Technologies Salem-la Custom Web Applications, Mobile Apps, AI Solutions, matrum Cloud Services provide panrom bro. Let's schedule a free discovery call—WhatsApp +91 99437 43136 or email reachus@bitbytetech.org."
      : "BitByte Technologies delivers premier Custom Web Applications, Mobile Apps, AI Solutions, and Cloud Architecture. Schedule a free technical discovery call with our team via WhatsApp at +91 99437 43136 or email reachus@bitbytetech.org.";

    return res.status(200).json({
      success: true,
      reply: fallbackReply,
      sources: [],
    });
  }
}
