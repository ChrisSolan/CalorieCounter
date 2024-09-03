const express = require('express');
const router = express.Router();
const { FoodItemModel } = require('../models/FoodItemModel.js');
const { UserModel } = require('./users.js');
const { verifyToken } = require('./users.js');

//route to create a food item, verifyToken makes it so that only authorized and logged in users can create foodItems
router.post('/', verifyToken, async (req, res) => {
    const foodItem = new FoodItemModel(req.body);
    try {
        const response = await foodItem.save();
        res.json(response);
    } catch (err) {
        res.json(err); 
    }
});

//returns all foodItems
router.get('/', async (req, res) => {
    try {
        const response = await FoodItemModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//gets a User's created food items
router.get('/createdfoodItems/:userID', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ createdFoodItems: user?.createdFoodItems});
    } catch (err) {
        res.json(err);
    }
})


//Used for the extended food details page
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await FoodItemModel.findById(id);

        if(!response) {
            return res.status(404).json({message: "Food Item Not Found"});
        }
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

module.exports = {foodItemRouter: router};