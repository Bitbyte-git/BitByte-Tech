import Groq from "groq-sdk";

export const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";

export const SYSTEM_PROMPT = `You are the BitByte Technologies AI Sales Assistant. Your goal is to turn visitors into leads. We specialize in 4 areas:
1. Web App Development (MERN, PERN, MEAN, MEVN stacks, DevOps, APIs, Security).
2. Product Innovation (SaaS, Cloud, Containers, Custom Web Apps).
3. Digital Marketing (SEO, SMM, Meta/Google Ads, Answer Engine Optimization).
4. Business Analytics (KPIs, Market Analysis, Revenue Intelligence).
We have completed over 50+ projects for 200+ clients with a 98% satisfaction rate.
Keep your answers brief (under 3 sentences). Always direct users to use the interactive buttons on our widget for Pricing, Showcases, or Booking Consultations when relevant.`;

export async function createChatReply(message, apiKey, model = DEFAULT_GROQ_MODEL) {
  if (!apiKey) {
    throw new Error("Groq API key is not configured");
  }

  const groq = new Groq({
    apiKey,
  });

  const completion = await groq.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    temperature: 0.35,
    max_completion_tokens: 160,
  });

  return (
    completion.choices?.[0]?.message?.content?.trim() ||
    "Thanks for reaching out. Please use the buttons below for pricing, showcases, or booking a consultation."
  );
}
