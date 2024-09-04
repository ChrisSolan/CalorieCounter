const express = require('express');
const router = express.Router();
const { FoodItemModel } = require('../models/FoodItemModel.js');
const { UserModel } = require('../models/UserModel.js');
const { verifyToken } = require('./users.js');

//route to create a food item, verifyToken makes it so that only authorized and logged in users can create foodItems
router.post('/', verifyToken, async (req, res) => {
    try {
        const foodItem = new FoodItemModel(req.body);
        const response = await foodItem.save();
        res.json(response);
    } catch (err) {
        res.json(err); 
    }
});

//route to add a foodItem to yourMeals //add verifyToken back to the parameters
router.put('/', verifyToken, async (req, res) => {
    try {
        const foodItem = await FoodItemModel.findById(req.body.foodItemID);
        const user = await UserModel.findById(req.body.userID);

        user.createdFoodItems.push(foodItem._id);
        await user.save();

        res.json({ createdFoodItems: user.createdFoodItems });

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
        const user = await UserModel.findById(req.params.userID).populate('createdFoodItems');
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