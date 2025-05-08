const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quoteRoutes = require("./routes/quotes");

const app = express();

// ✅ Apply CORS middleware BEFORE all routes
app.use(
  cors({
    origin: "http://localhost:5175", // make sure this matches your Vite dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ API routes
app.use("/api/quotes", quoteRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
