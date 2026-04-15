const mongoose = require("mongoose");
const path = require("path");
// This specifically looks for the .env file in the folder ABOVE this one
require('dotenv').config({ path: path.join(__dirname, "../.env") });

const { data } = require("./data.js");
const Thought = require("../models/thought.js");

const dbUrl = process.env.ATLASDB_URL;

if (!dbUrl) {
    console.error("ERROR: ATLASDB_URL is undefined. Check your .env file content and location!");
    process.exit(1);
}

async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to Atlas for initialization...");

        await Thought.deleteMany({});
        console.log("Cleared existing thoughts...");

        await Thought.insertMany(data);
        console.log("SUCCESS: 100 thoughts have been uploaded to Atlas!");

        mongoose.connection.close();
    } catch (err) {
        console.error("Database Error:", err);
    }
}

main();