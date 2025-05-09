const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quoteRoutes = require("./routes/quotes");

const app = express();

// ✅ Apply flexible CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5175", "https://quote-generator-lovat-xi.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// ✅ Body parser middleware
app.use(express.json());

// ✅ Routes
app.use("/api/quotes", quoteRoutes);

// ✅ Test route
app.get("/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const env = process.env.NODE_ENV || "development";
    console.log(`🚀 Server running in ${env} mode on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
