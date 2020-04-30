const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model("Blog", blogSchema);
