const route = require("express").Router();
const {
  addItem,
  getHitsItems,
  getCategoryItems,
  getItemDetails,
  filterItems,
} = require("../controllers/item");
const { validateBody } = require("../middleware");
const { uploadAvatar } = require("../middleware/upload");
const { itemSchema } = require("../modules/Item");

//Add item
route.post(
  "/add-item",
  validateBody(itemSchema),
  uploadAvatar.single("imageItem"),
  addItem
);

//Get hits itams
route.get("/get-hitsItems", getHitsItems);

//Get all items from category
route.get("/get-items/:category", getCategoryItems);

//Get item details
route.get("/item-details/:itemId", getItemDetails);

//Filter items
route.get("/filter-items", filterItems);

module.exports = route;
