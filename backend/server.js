const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const investigationRoutes = require("./routes/investigationRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/investigations", investigationRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "BrandShield AI Backend is running!"
  });
});

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BrandShield AI API is healthy",
    server: "running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected"
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas connected successfully!");

    app.listen(PORT, () => {
      console.log(
        `BrandShield AI backend running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Startup error:", error.message);
  }
}

startServer();