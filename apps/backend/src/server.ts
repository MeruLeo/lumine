import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";

// Load environment variables
dotenv.config();

const productionMode = process.env.NODE_ENV === "production";

function startServer() {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(
      `Server is running in ${
        productionMode ? "production" : "development"
      } mode on port ${port}`
    );
  });
}

async function run() {
  await connectDB();
  startServer();
}

run();
