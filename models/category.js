const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
});

CategorySchema.virtual("url").get(function () {
  return `/store/category/${this._id}`;
});

CategorySchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "category",
});

module.exports = mongoose.model("Category", CategorySchema);
