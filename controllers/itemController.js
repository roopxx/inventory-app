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
