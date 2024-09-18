const express = require('express');
const Router = express.Router();
const ItemsService = require('../services/items');

Router.use((req, res, next) => {
  req.start = Date.now();
  next();
});

Router.get('/', async (req, res) => {
  let { offset, limit } = req.query;

  offset = parseInt(offset) || 0;
  limit = parseInt(limit) || 5;

  try {
    const items = await ItemsService.getAllItems(offset, limit);
    const end = Date.now();
    const result = {
      count: items.length,
      data: items,
      duration: end - req.start
    };
    res.status(200).json(result);
  } catch (error) {
    return res.status(error.getCode()).json({ message: error.getMessage() });
  }
});


Router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemsService.getItemById(id);
    const end = Date.now();
    const result = {
      count: 1,
      data: [item],
      duration: end - req.start
    };
    res.status(200).json(result);
  } catch (error) {
    return res.status(error.getCode()).json({ message: error.getMessage() });
  }
});


Router.post('/', async (req, res) => {
  try {
    const itemData = req.body;
    const newItem = await ItemsService.createItem(itemData);
    const end = Date.now();
    const result = {
      count: 1,
      data: [newItem], 
      duration: end - req.start
    };
    res.status(201).json(result);
  } catch (error) {
    return res.status(error.getCode()).json({ message: error.getMessage() });
  }
});


Router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = req.body;
    const updatedItem = await ItemsService.updateItem(id, updateData);
    const end = Date.now();
    const result = {
      count: 1,
      data: [updatedItem],
      duration: end - req.start
    };
    res.status(200).json(result);
  } catch (error) {
    return res.status(error.getCode()).json({ message: error.getMessage() });
  }
});


Router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await ItemsService.deleteItem(id);
    const end = Date.now();
    const result = {
      count: 0,
      data: [],
      duration: end - req.start
    };
    res.status(204).json(result);
  } catch (error) {
    return res.status(error.getCode()).json({ message: error.getMessage() });
  }
});

module.exports = Router;
