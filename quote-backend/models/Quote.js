const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],
    pinned: { type: Boolean, default: false },
  });
  
  // ✅ Optional: expose `_id` as `id` in JSON responses
  quoteSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  });
  
  module.exports = mongoose.model("Quote", quoteSchema);
  