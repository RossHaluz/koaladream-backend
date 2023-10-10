const { getHitsItems, getCategoryItems, getItemDetails, filterItems, getAllItems, updateItem, addItem, deleteItem } = require('../controllers/item');
const { validateBody, uploadAvatar } = require("../middleware");
const { itemSchema } = require("../modules/Item");
const route = require("express").Router();

//Filter items
route.get("/filter-items", filterItems);

//Get hits itams
route.get("/get-hitsItems", getHitsItems);

//Get all items from category
route.get("/get-items/:category", getCategoryItems);

//Get item details
route.get("/item-details/:itemId", getItemDetails);

//Get all items 
route.get('/all-items', getAllItems);

//Update item 
route.post('/update-item/:itemId', uploadAvatar.array("updateImage"), updateItem);

//Add item
route.post("/add-item", uploadAvatar.array("imageItem"), addItem);

// validateBody(itemSchema)

//Delete item 
route.delete('/delete-item/:itemId', deleteItem);

module.exports = route;
