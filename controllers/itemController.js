const asyncHandler = require("express-async-handler");
const Items = require("../models/item");
const Category = require("../models/category");
const upload = require("../utils/mutler");
const { imagesToUpload } = require("../utils/cloudinary");

exports.items_list = asyncHandler(async (req, res, next) => {
  const items = await Items.find({}).exec();
  res.render("items_view", {
    title: "Items",
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

exports.item_create_post = [
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    console.log(req.file);
    let imageURL = null;
    if (req.file) {
      try {
        imageURL = await imagesToUpload(req.file.path);
      } catch (error) {
        return next(error);
      }
    }

    const item = new Items({
      item_name: req.body.item_name,
      description: req.body.description,
      imageURL: `${imageURL}`,
      category: req.body.category,
      price: req.body.price,
      stock_availability: req.body.stock_in_hand > 0 ? true : false,
      stock_in_hand: req.body.stock_in_hand,
    });

    await item.save();

    res.redirect(item.url);
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Items.findById(req.params.id).populate("category").exec();

  res.render("item_delete", {
    title: "Delete Item",
    item: item,
  });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Items.findByIdAndDelete(req.body.id).exec();
  res.redirect("/store/items");
});

exports.item_stock_in_hand = asyncHandler(async (req, res, next) => {
  const item = await Items.findById(req.params.id).exec();
  res.render("item_stock", {
    title: "Stock In Hand",
    item: item,
  });
});

exports.item_stock_in_hand_post = asyncHandler(async (req, res, next) => {
  const item = await Items.findById(req.params.id).exec();
  item.stock_in_hand = req.body.stock_in_hand;

  await item.save();
  res.redirect(item.url);
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const item = await Items.findById(req.params.id).populate("category").exec();
  const categories = await Category.find({}, "type").exec();

  res.render("item_form", {
    title: "Update Item",
    item: item,
    categories: categories,
  });
});

exports.item_update_post = [
  upload.single("image"),
  asyncHandler(async (req, res, next) => {
    let imageURL = null;

    if (req.file) {
      imageURL = await imagesToUpload(req.file.path);
    }
    console.log(imageURL);

    const item = new Items({
      item_name: req.body.item_name,
      description: req.body.description,
      imageURL: `${imageURL}`,
      category: req.body.category,
      price: req.body.price,
      stock_availability: req.body.stock_in_hand > 0 ? true : false,
      stock_in_hand: req.body.stock_in_hand,
      _id: req.params.id,
    });

    await Items.findByIdAndUpdate(req.params.id, item).exec();
    res.redirect(item.url);
  }),
];
