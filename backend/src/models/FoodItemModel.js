const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    servingSize: { 
        size: {type:Number, required: true},
        unit: {type: String, required:true}
    },
    calories: {type:Number, required: true},
    macros: {
        carbs: {type:Number, require: true},
        fat: {type:Number, require: true},
        protein: {type:Number, require: true}
    }
});

module.exports = { FoodItemModel: mongoose.model("foodItems", FoodItemSchema) || mongoose.models.foodItems };