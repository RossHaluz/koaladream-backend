 const {  HttpError, CtrlWrapperr } = require("../healpers");
const { FilterModel } = require("../modules/Filter");
const { ItemModel } = require("../modules/Item");
const { OptionModel } = require("../modules/Option");
const { CategoriesModel } = require("../modules/Сategories");
const pagination = require("../utils/pagination");

const addItem = async (req, res) => {
  const { categoryName } = req.body;
  const findCategory = await CategoriesModel.findOne({ title: categoryName });
  if (!findCategory) {
    throw HttpError(404, "Category not found");
  }

  if(req.files){
    const imgArray = [];
    req.files.map(item => imgArray.push(item.path))
   const createItemWithImg = await ItemModel.create({
    ...req.body,
    images: imgArray,
    category: findCategory._id,
   })

   return res.json(createItemWithImg)
  }

  const newItem = await ItemModel.create({
    ...req.body,
    category: findCategory._id,
  });

  res.json(newItem);
};

const getHitsItems = async (req, res) => {
  const getHitsItems = await ItemModel.find({ hitSales: true }).limit(8);
  if (!getHitsItems) {
    throw HttpError(404, "Hits items not found");
  }

  res.json(getHitsItems);
};

const getCategoryItems = async (req, res) => {
  const { page: currentPage, limit: currentLimit } = req.query;
  const { page, limit, skip } = pagination(currentPage, currentLimit);
  const { category } = req.params;
  const findCategory = await CategoriesModel.findOne({ title: category });
  if (!findCategory) {
    throw HttpError(404, "Category not found");
  }
  const getItems = await ItemModel.find({ category: findCategory._id }, "", {
    skip,
    limit,
  });
  const totalItems = await ItemModel.find({
    category: findCategory._id,
  }).count();
  if (!getItems) {
    throw HttpError(404, "Items not found");
  }

  res.json({
    getItems,
    meta: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  });
};

const getItemDetails = async (req, res) => {
  const { itemId } = req.params;
  const getItem = await ItemModel.findOne({ _id: itemId });
  if (!getItem) {
    throw HttpError(404, "Item not found");
  }

  res.json(getItem);
};

const filterItems = async (req, res) => {
   const {filters} = req.query;
   
  };
   
  
  

const getAllItems = async(req, res) => {
  const items = await ItemModel.find();
  if(!items){
    throw HttpError(404, 'Items not found');
  }

  res.json(items)
}

const updateItem = async(req, res) => {
  const {itemId} = req.params;
  const {categoryName} = req.body;
  const category = await CategoriesModel.findOne({title: categoryName});
  if(!category){
    throw HttpError(404, 'Category not found');
  }

  if(req.files){
const {updateImage} = req.body;
   const imgArray = [];
   req.files.map(item => imgArray.push(item.path));
    const updateItemWithImg = await ItemModel.findByIdAndUpdate(itemId, {
      ...req.body,
      images: imgArray.length > 0 ? imgArray : updateImage,
    category: category._id,
    }, {new: true})

  return res.json(updateItemWithImg);

  }

  const item = await ItemModel.findByIdAndUpdate(itemId, {
    ...req.body,
    images: req.body.images,
    category: category._id
  }, {new: true})

  res.json(item);
}

const deleteItem = async(req, res) => {
    const {itemId} = req.params;
    const item = await ItemModel.findByIdAndDelete(itemId)
    if(!item){
        throw HttpError(404, 'Item not found');
    }

    res.json({
        item,
        message: 'Item success delete'
    })
}

module.exports = {
  getHitsItems: CtrlWrapperr(getHitsItems),
  getCategoryItems: CtrlWrapperr(getCategoryItems),
  getItemDetails: CtrlWrapperr(getItemDetails),
  filterItems: CtrlWrapperr(filterItems),
  getAllItems: CtrlWrapperr(getAllItems),
  updateItem: CtrlWrapperr(updateItem),
  addItem: CtrlWrapperr(addItem),
  deleteItem: CtrlWrapperr(deleteItem)
};
