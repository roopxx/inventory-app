const express = require("express");
const router = express.Router();

/// CATEGORY ROUTES ///

router.get("/", category_controller.index);
router.get("/categories", category_controller.categories);

/// ITEM ROUTES ///

router.get("/items", item_controller.items_list);

module.exports = router;
