const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");

// Get all saved quotes
router.get("/saved", async (req, res) => {
  const quotes = await Quote.find().sort({ pinned: -1 });
  res.json(quotes);
});

// Save a quote
router.post("/saved", async (req, res) => {
  const quote = new Quote(req.body);
  await quote.save();
  res.status(201).json(quote);
});

// Delete a quote
router.delete("/saved/:id", async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Toggle pin
router.put("/saved/:id/pin", async (req, res) => {
  const quote = await Quote.findById(req.params.id);
  quote.pinned = !quote.pinned;
  await quote.save();
  res.json(quote);
});

module.exports = router;
