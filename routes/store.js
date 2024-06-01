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

router.get("/category/:id/delete", category_controller.category_delete_get); // Delete category

router.post("/category/:id/delete", category_controller.category_delete_post); // Delete category

/// ITEM ROUTES ///

router.get("/items", item_controller.items_list); // Get all items

router.get("/item/create", item_controller.item_create_get); // Create item

router.post("/item/create", item_controller.item_create_post); // Create item

router.get("/item/:id", item_controller.item_detail); // Get item by ID

router.get("/item/:id/delete", item_controller.item_delete_get); // Delete item

router.post("/item/:id/delete", item_controller.item_delete_post); // Delete item

router.get("/item/:id/stock_in_hand", item_controller.item_stock_in_hand); // Update stock in hand'

router.post("/item/:id/stock_in_hand", item_controller.item_stock_in_hand_post); // Update stock in hand'

module.exports = router;
