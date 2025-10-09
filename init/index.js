const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');


main().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log("Database connection error");
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async ()=> {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
}

initDB();