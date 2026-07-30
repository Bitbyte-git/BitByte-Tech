const VISITOR_COUNTER_ENV_KEYS = [
  "VISITOR_COUNTER_API",
  "VITE_VISITOR_COUNTER_API",
];

function getVisitorCounterApiUrl() {
  return VISITOR_COUNTER_ENV_KEYS
    .map((key) => process.env[key])
    .find((value) => typeof value === "string" && value.trim())
    ?.trim();
}

function parseCount(payload) {
  const bodyPayload =
    typeof payload?.body === "string" ? JSON.parse(payload.body) : payload;
  const rawCount =
    bodyPayload?.count ??
    bodyPayload?.value ??
    bodyPayload?.visits ??
    bodyPayload?.views ??
    bodyPayload?.total;
  const count = typeof rawCount === "string" ? Number(rawCount) : rawCount;

  if (!Number.isFinite(count)) {
    throw new Error("Visitor counter response did not include a count");
  }

  return count;
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiUrl = getVisitorCounterApiUrl();

  if (!apiUrl) {
    return res.status(500).json({
      success: false,
      error: "Visitor counter API URL is not configured",
    });
  }

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Visitor counter upstream request failed",
      });
    }

    return res.status(200).json({
      success: true,
      count: parseCount(payload),
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      error: error.message || "Visitor counter request failed",
    });
  }
}
