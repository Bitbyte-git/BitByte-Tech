

import http from "node:http";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const routes = {
  "/api/career-apply": "./api/career-apply.js",
  "/api/career-applications": "./api/career-applications.js",
  "/api/career-resume": "./api/career-resume.js",
  "/api/chat": "./api/chat.js",
  "/api/visitor-counter": "./api/visitor-counter.js",
};

const handlers = {};

for (const [route, modulePath] of Object.entries(routes)) {
  const module = await import(modulePath);
  handlers[route] = module.default;
}

function createResponse(req, res) {
  res.req = req;

  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.json = (data) => {
    if (!res.headersSent) {
      res.setHeader("Content-Type", "application/json");
    }
    res.end(JSON.stringify(data));
  };

  return res;
}

const server = http.createServer(async (req, res) => {

console.log("Incoming API request:", {
  method: req.method,
  url: req.url,
  contentType: req.headers["content-type"],
  contentLength: req.headers["content-length"],
});

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    req.query = Object.fromEntries(url.searchParams.entries());
    const handler = handlers[url.pathname];

    if (!handler) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "API route not found" }));
    }

    createResponse(req, res);

    await handler(req, res);
  } catch (error) {
    console.error("API error:", error);

    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  }
});

const PORT = process.env.API_PORT || 3000;

server.listen(PORT, "127.0.0.1", () => {
  console.log(`BitByte API running on http://127.0.0.1:${PORT}`);
});
