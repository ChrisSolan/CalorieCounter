const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdFoodItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItems"
    }
});

module.exports = { UserModel: mongoose.model("users", UserSchema) || mongoose.models.user };