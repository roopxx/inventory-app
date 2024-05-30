const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/// CATEGORY ROUTES ///

router.get("/", category_controller.index);
router.get("/categories", category_controller.categories);

/// ITEM ROUTES ///

router.get("/items", item_controller.items_list);

module.exports = router;
