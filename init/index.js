const mongoose = require('mongoose');
const initData = require('./data.js');
const Thought = require('../models/thought.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/100DaysDB";

mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB successfully."))
    .catch((err) => console.log("MongoDB connection error:", err));

const initDB = async () => {
    await Thought.deleteMany({});
    await Thought.insertMany(initData.data);
    console.log("Database was initialized with thoughts!");
    mongoose.connection.close();
};

initDB();