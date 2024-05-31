const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/// CATEGORY ROUTES ///

router.get("/", category_controller.index); // Index page

router.get("/categories", category_controller.categories); // Get all categories

router.get("/category/create", category_controller.category_create_get); // Create category

router.post("/category/create", category_controller.category_create_post); // Create category

router.get("/category/:id", category_controller.category_detail); // Get category by ID

/// ITEM ROUTES ///

router.get("/items", item_controller.items_list); // Get all items

router.get("/item/create", item_controller.item_create_get); // Create item

router.get("/item/:id", item_controller.item_detail); // Get item by ID

module.exports = router;
