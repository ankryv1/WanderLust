let mongoose = require("mongoose");
let dbStore = require('./data.js')
let Listing = require('../models/listings.js')

main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initiDB = async() =>{
    await Listing.deleteMany({});
    dbStore.data = dbStore.data.map((obj) =>({ ...obj, owner: '694162a398e441680e82d1d5'}));
    await Listing.insertMany(dbStore.data);
}

initiDB();
