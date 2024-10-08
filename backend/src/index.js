require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const URI = process.env.MONGODB_URI;
const port = process.env.PORT || 3010;
const path = require('path');
const { userRouter } = require('./routes/users.js');
const { foodItemRouter } = require('./routes/foodItem.js');

app.use(express.json()); //converts data from the Frontend to JSON for the server to understand it
app.use(cors()); //allows for API requests from the frontend

app.use('/auth', userRouter);
app.use('/foodItems', foodItemRouter);

app.use(express.static(path.join(__dirname, '..', 'public'))); //Serves the static files provided from the build version of the React frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}); 

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello World!"});
});

mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => console.log(`SERVER STARTED at ${port}!`))

module.exports = app;