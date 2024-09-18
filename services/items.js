const ItemsModel = require('../models/items');

const { InvalidLimitError, InvalidOffsetError, NoItemsError, MissingFieldsError } = require('../core/errors');


class ItemsService {
  static async getAllItems(offset, limit, options = {}) {
    if (!isFinite(offset)) {
      throw new InvalidOffsetError();

    }
    if (!isFinite(limit)) {
      throw new InvalidLimitError();

    }

    const result = await ItemsModel.find().skip(offset).limit(limit).exec();
    if (!result.length) {
      throw new NoItemsError();
    }
    return result;
  }

  static async getItemById(id) { // object state is not modified
    const result = await ItemsModel.findById(id);
    if (!result) {
      throw new NoItemsError();
    };
    return result;
  };


  static async createItem(itemData) {
    if (!itemData.title) {
      throw new MissingFieldsError();
    }

    const newItem = new ItemsModel({
      title: itemData.title,
      createdAt: new Date()
    });

    return await newItem.save();
  }




  static async updateItem(id, updateData) {
    const result = await ItemsModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      throw new NoItemsError();
    }
    return result;
  }

  static async deleteItem(id) {
    const result = await ItemsModel.findByIdAndDelete(id);
    if (!result) {
      throw new NoItemsError();
    }
    return result;
  }
}

module.exports = ItemsService;

