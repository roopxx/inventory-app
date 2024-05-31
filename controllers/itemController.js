const asyncHandler = require("express-async-handler");
const Items = require("../models/item");
const Category = require("../models/category");

exports.items_list = asyncHandler(async (req, res, next) => {
  const items = await Items.find({}).exec();
  res.render("items_view", {
    items: items,
  });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Items.findById(req.params.id).exec();
  res.render("item_detail", {
    item: item,
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}, "type").exec();

  res.render("item_form", {
    title: "Create Item",
    categories: categories,
  });
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  const item = new Items({
    item_name: req.body.item_name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    stock_availability: req.body.stock_in_hand > 0 ? true : false,
    stock_in_hand: req.body.stock_in_hand,
  });

  item.save();

  res.redirect(item.url);
});
