const asyncHandler = require("express-async-handler");
const Items = require("../models/item");
const Category = require("../models/category");

exports.items_list = asyncHandler(async (req, res, next) => {
  const items = await Items.find({}).exec();
  res.render("items_view", {
    items: items,
  });
});
