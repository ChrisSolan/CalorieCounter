require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const URI = process.env.MONGODB_URI;
const port = process.env.PORT || 3005;
const  { userRouter } = require('./routes/users.js');

app.use(express.json()); //converts data from the Frontend to JSON for the server to understand it
app.use(cors()); //allows for API requests from the frontend
app.get("/", (req, res) => {
    res.status(200).json({message: "Hello World!"});
});

app.use("/auth", userRouter);

mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => console.log(`SERVER STARTED at ${port}!`))

module.exports = app;