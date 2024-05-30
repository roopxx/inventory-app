const Category = require("../models/category");
const Items = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display home page
exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "Pet Shop Home Page",
  });
});

exports.categories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}, "type").exec();

  res.render("category_view", {
    categories: categories,
  });
});
