import { parse } from "url";
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

  // Enable CORS and bypass cross-origin dev resource blocking for proxy environments
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === "GET" && req.url.startsWith("/_next/")) {
      delete req.headers.origin;
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
  app.all(/.*/, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    return handle(req, res, parsedUrl);
  });

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});

