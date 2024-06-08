const asyncHandler = require("express-async-handler");
const Items = require("../models/item");
const Category = require("../models/category");
const upload = require("../utils/mutler");
const { imagesToUpload } = require("../utils/cloudinary");
const { body, validationResult } = require("express-validator");

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
  body("item_name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Item name is required."),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .escape()
    .withMessage("Description is required. A short description is needed."),
  body("category")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Category is required."),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),
  body("stock_in_hand")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer."),
  asyncHandler(async (req, res, next) => {
    let imageURL = null;
    if (req.file) {
      try {
        imageURL = await imagesToUpload(req.file.path);
      } catch (error) {
        return next(error);
      }
    }

    const errors = validationResult(req);

    const item = new Items({
      item_name: req.body.item_name,
      description: req.body.description,
      imageURL: `${imageURL}`,
      category: req.body.category,
      price: req.body.price,
      stock_availability: req.body.stock_in_hand > 0 ? true : false,
      stock_in_hand: req.body.stock_in_hand,
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find({}, "type").exec();
      return res.render("item_form", {
        title: "Create Item",
        categories: categories,
        item: item,
        errors: errors.array(),
      });
      return;
    } else {
      const itemExists = await Items.findOne({ item_name: req.body.item_name })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (itemExists) {
        res.redirect(itemExists.url);
      } else {
        await item.save();
        res.redirect(item.url);
      }
    }
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
  body("item_name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Item name is required."),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .escape()
    .withMessage("Description is required. A short description is needed."),
  body("category")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Category is required."),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),
  body("stock_in_hand")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer."),
  asyncHandler(async (req, res, next) => {
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
      _id: req.params.id,
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await Category.find({}, "type").exec();
      const items = await Items.findById(req.params.id).exec();
      return res.render("item_form", {
        title: "Update Item",
        item: item,
        categories: categories,
        errors: errors.array(),
      });
      return;
    } else {
      await Items.findByIdAndUpdate(req.params.id, item).exec();
      res.redirect(item.url);
    }
  }),
];
