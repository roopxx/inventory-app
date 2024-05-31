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

exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
    .populate("items")
    .exec();

  res.render("category_detail", {
    category: category,
    category_items: category.items,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
  });
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  const category = new Category({
    type: req.body.category_type,
  });

  category.save();

  res.redirect(category.url);
});
