const Category = require("../models/category");
const Items = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    title: "Categories",
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

exports.category_create_post = [
  body(
    "category_type",
    "Category type required and it must be at least 3 characters long."
  )
    .trim()
    .isLength({ min: 3 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      type: req.body.category_type,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({
        type: req.body.category_type,
      })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const items = await Items.find({ category: req.params.id }).exec();

  res.render("category_delete", {
    title: "Delete Category",
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

exports.category_update_post = [
  body(
    "category_type",
    "Category type required and it must be at least 3 characters long."
  )
    .trim()
    .isLength({ min: 3 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      type: req.body.category_type,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Update Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await Category.findByIdAndUpdate(req.params.id, category).exec();
      res.redirect(category.url);
    }
  }),
];
