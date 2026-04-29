import app from "./app";
import { initDatabase } from "./config/db";

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await initDatabase();
  app.listen(port, () => {
    console.log(`🔥 Server running at http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});