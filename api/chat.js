import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are the BitByte Technologies AI Sales Assistant. Your goal is to turn visitors into leads. We specialize in 4 areas:
1. Web App Development (MERN, PERN, MEAN, MEVN stacks, DevOps, APIs, Security).
2. Product Innovation (SaaS, Cloud, Containers, Custom Web Apps).
3. Digital Marketing (SEO, SMM, Meta/Google Ads, Answer Engine Optimization).
4. Business Analytics (KPIs, Market Analysis, Revenue Intelligence).
We have completed over 50+ projects for 200+ clients with a 98% satisfaction rate.
Keep your answers brief (under 3 sentences). Always direct users to use the interactive buttons on our widget for Pricing, Showcases, or Booking Consultations when relevant.`;

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
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.35,
      max_completion_tokens: 160,
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Thanks for reaching out. Please use the buttons below for pricing, showcases, or booking a consultation.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Groq chat error:", error);
    return res.status(500).json({
      error: "Unable to generate a response right now",
    });
  }
}
