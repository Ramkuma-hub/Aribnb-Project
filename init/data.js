
import Listing from '../model/listing.js';
import mongoose from 'mongoose';
import sampleListings from './index.js';



const mongouri = 'mongodb://localhost:27017/myapp';

main().then(() => {
    console.log("Connected to MongoDB");

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongouri);

}

async function seeDatabase() {
    sampleListings.map((obj) => ({
        ...obj,
        ower: "69a66d3ab2e78f0d8ddf0ea2"
    }))
    Listing.insertMany(sampleListings);
    console.log("Database seeded with sample data");

}

seeDatabase();
