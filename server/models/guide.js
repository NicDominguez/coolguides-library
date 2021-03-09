const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guideSchema = new Schema({
  title: String,
  imageURL: String,
  postDate: String,
  author: String,
  tags: String,
});

module.exports = mongoose.model("Guide", guideSchema);
