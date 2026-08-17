import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { DEFAULT_GROQ_MODEL, createChatReply } from "./server/chatCore.js";

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function bitbyteLocalChatApi() {
  return {
    name: "bitbyte-local-chat-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");

      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.setHeader("Allow", "POST");
          sendJson(res, 405, { error: "Method not allowed" });
          return;
        }

        let message = "";

        try {
          const rawBody = await readRequestBody(req);
          const body = rawBody ? JSON.parse(rawBody) : {};
          message = typeof body.message === "string" ? body.message.trim() : "";
        } catch {
          sendJson(res, 400, { error: "Invalid JSON body" });
          return;
        }

        if (!message) {
          sendJson(res, 400, { error: "Message is required" });
          return;
        }

        try {
          const reply = await createChatReply(
            message,
            process.env.GROQ_API_KEY || env.GROQ_API_KEY,
            process.env.VITE_GROQ_MODEL ||
              env.VITE_GROQ_MODEL ||
              process.env.GROQ_MODEL ||
              env.GROQ_MODEL ||
              DEFAULT_GROQ_MODEL,
          );
          sendJson(res, 200, { reply });
        } catch (error) {
          server.config.logger.error(`Groq local chat error: ${error.message}`);
          sendJson(res, 500, {
            error: "Unable to generate a response right now",
          });
        }
      });
    },
  };
}

function visitorCounterDevProxy(mode) {
  const env = loadEnv(mode, process.cwd(), "");
  const visitorCounterApi =
    env.VITE_COUNTER_API_URL || env.VITE_VISITOR_COUNTER_API;

  if (!visitorCounterApi) return undefined;

  try {
    const apiUrl = new URL(visitorCounterApi);

    return {
      "/__visitor-counter": {
        target: apiUrl.origin,
        changeOrigin: true,
        secure: true,
        rewrite: () => `${apiUrl.pathname}${apiUrl.search}`,
      },
    };
  } catch {
    return undefined;
  }
}

function groqChatDevProxy(mode) {
  const env = loadEnv(mode, process.cwd(), "");
  const groqChatApi = env.VITE_GROQ_API_URL || env.VITE_CHAT_API_URL;

  if (!groqChatApi) return undefined;

  try {
    const apiUrl = new URL(groqChatApi);

    return {
      "/__groq-chat": {
        target: apiUrl.origin,
        changeOrigin: true,
        secure: true,
        rewrite: () => `${apiUrl.pathname}${apiUrl.search}`,
      },
    };
  } catch {
    return undefined;
  }
}

function buildDevProxy(mode) {
  return {
    ...visitorCounterDevProxy(mode),
    ...groqChatDevProxy(mode),
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), bitbyteLocalChatApi()],
  server: {
    proxy: buildDevProxy(mode),
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 700,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    sourcemap: false,
    target: "es2020",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        manualChunks(id) {
          if (id.includes("vite/preload-helper")) return "preload-helper";
          if (
            id.includes("/src/i18n") ||
            id.includes("/src/defaultTranslations")
          )
            return "translations";
          if (id.includes("pdfmake")) return "pdfmake";
          if (id.includes("@splinetool")) return "spline";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/scheduler")
          )
            return "react-vendor";
          if (id.includes("node_modules")) return "vendor";
          if (
            id.includes("/src/components/WebDevelopment") ||
            id.includes("/src/components/CustomWebApplications")
          )
            return "services-web";
          if (
            id.includes("/src/components/DigitalMarketing") ||
            id.includes("/src/components/BusinessAnalytics")
          )
            return "services-growth";
          if (id.includes("/src/components/CareersPage")) return "careers";
          if (
            id.includes("/src/components/Founder") ||
            id.includes("/src/components/BitByteHero")
          )
            return "cinematic";
          return undefined;
        },
      },
    },
  },
}));
