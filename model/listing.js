
import mongoose from "mongoose";
import Review from "./Review.js";
import User from "./user.js"
import path from "path";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    image: {
        url: String,
        filename: String
    }
    ,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


})

listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await mongoose.model("Review").deleteMany({ _id: { $in: doc.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;