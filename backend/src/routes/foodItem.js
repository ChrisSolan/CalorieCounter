const express = require('express');
const router = express.Router();
const { FoodItemModel } = require('../models/FoodItemModel.js');
const { UserModel } = require('./users.js');

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

router.get('/', async (req, res) => {
    try {
        const response = await FoodItemModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

module.exports = {foodItemRouter: router};