const DEFAULT_VISITOR_COUNTER_API =
  "https://3xfbvykhe2.execute-api.ap-south-1.amazonaws.com/visitor";

function getVisitorCounterApiUrl() {
  return (
    process.env.VISITOR_COUNTER_API ||
    process.env.VITE_VISITOR_COUNTER_API ||
    DEFAULT_VISITOR_COUNTER_API
  );
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(getVisitorCounterApiUrl(), {
      method: req.method,
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();
    let payload;

    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = { success: false, error: "Invalid visitor counter response" };
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(response.status).json(payload);
  } catch (error) {
    console.error("Visitor counter proxy error:", error);
    return res.status(502).json({
      success: false,
      error: "Visitor counter service unavailable",
    });
  }
}
