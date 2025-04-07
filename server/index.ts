import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// 设置环境变量，使用本地LLM或DeepSeek API
// 检测到Replit环境，默认使用DeepSeek API而不是本地Ollama
// 因为Replit无法直接连接到用户本地的Ollama服务

// 检查是否存在DeepSeek API密钥
if (process.env.DEEPSEEK_API_KEY) {
  // 如果有DeepSeek API密钥，默认使用DeepSeek API
  process.env.USE_LOCAL_LLM = process.env.USE_LOCAL_LLM || 'false';
  console.log('检测到DeepSeek API密钥，默认使用DeepSeek API');
} else {
  // 如果没有DeepSeek API密钥，仍然设置为使用本地模型（最终会使用回退响应）
  process.env.USE_LOCAL_LLM = process.env.USE_LOCAL_LLM || 'true';
  console.log('未检测到DeepSeek API密钥，将使用回退响应');
}

// 这些变量仍然保留，以便在用户本地环境运行代码时可以正常连接到Ollama
process.env.OLLAMA_HOST = process.env.OLLAMA_HOST || 'localhost';
process.env.OLLAMA_PORT = process.env.OLLAMA_PORT || '11434';
process.env.OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'deepseek-r1';

console.log(`LLM Mode: ${process.env.USE_LOCAL_LLM === 'true' ? 'Local Ollama' : 'DeepSeek API'}`);
if (process.env.USE_LOCAL_LLM === 'true') {
  console.log(`Ollama Config: ${process.env.OLLAMA_HOST}:${process.env.OLLAMA_PORT} model:${process.env.OLLAMA_MODEL}`);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
