import Listing from "../model/listing.js";
import Review from "../model/Review.js";



export const createreviewdata = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newreview = new Review(req.body.review);
    newreview.author = req.user._id
    await newreview.save();
    listing.reviews.push(newreview._id);
    await listing.save();
    req.flash('success', 'created new review!');
    res.redirect(`/listings/${id}`);
}

export const destroyreview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/listings/${id}`);
};