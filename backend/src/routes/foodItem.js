const express = require('express');
const router = express.Router();
const { FoodItemModel } = require('../models/FoodItemModel.js');

//route to create a food item
router.post('/', async (req, res) => {
    const foodItem = new FoodItemModel(req.body);
    try {
        const response = await foodItem.save();
        res.json(response);
    } catch (err) {
        res.json(err); 
    }
});

module.exports = {foodItemRouter: router};