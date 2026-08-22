import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const PORT = 3000;
const HOST = "0.0.0.0";

const nextApp = next({ dev, hostname: HOST, port: PORT });
const handle = nextApp.getRequestHandler();

async function startServer() {
  await nextApp.prepare();
  const app = express();

  app.set("trust proxy", true);

  // Allow cross-origin requests for proxy & preview environments
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Remove origin header on GET requests for /_next/ resources so Next.js dev server treats them as standard same-origin requests behind proxies
    if (req.method === "GET" && req.path.startsWith("/_next/")) {
      delete req.headers.origin;
    } else {
      const originOrReferer = (req.headers.origin as string) || (req.headers.referer as string);
      if (originOrReferer) {
        try {
          const url = new URL(originOrReferer);
          req.headers["host"] = url.host;
          req.headers["x-forwarded-host"] = url.host;
          req.headers["x-forwarded-proto"] = url.protocol.replace(":", "");
        } catch {
          // ignore invalid URL parsing
        }
      }
    }

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Delegate all page routing, 404s, metadata injection, sitemap, and robots to Next.js App Router
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
