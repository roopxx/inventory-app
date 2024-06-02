const Category = require("../models/category");
const Items = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display home page
exports.index = asyncHandler(async (req, res, next) => {
  const items = await Items.aggregate().sample(10).exec();

  res.render("index", {
    title: "Pet Shop Home Page",
    items: items,
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

  await category.save();

  res.redirect("/store/categories");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const items = await Items.find({ category: req.params.id }).exec();

  res.render("category_delete", {
    category: category,
    items: items,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  await Category.findByIdAndDelete(req.body.id).exec();

  res.redirect("/store/categories");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  res.render("category_form", {
    title: "Update Category",
    category: category,
  });
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  const category = new Category({
    type: req.body.category_type,
    _id: req.params.id,
  });

  await Category.findByIdAndUpdate(req.params.id, category).exec();

  res.redirect(category.url);
});
