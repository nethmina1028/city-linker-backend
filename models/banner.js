const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, 
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
