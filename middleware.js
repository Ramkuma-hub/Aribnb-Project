import Listing from "./model/listing.js";
import { ExpressErr } from './utils/Expresserr.js';
import { listschema, reviewSchema, } from './schemajoi.js';
import Review from "./model/Review.js";

export const loggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    else {
        next();
    }
}

export const saveurl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}
export const owneracess = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "you are not owner of the list")
        return res.redirect(`/listings/${id}`)
    }
    next()

}


export const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let msg = error.details.map(el => el.message).join(',');
        throw new ExpressErr(msg, 400);
    }
    next();
}

export const validateListing = (req, res, next) => {
    const { error } = listschema.validate(req.body.listing);
    if (error) {
        let msg = error.details.map(el => el.message).join(',');
        throw new ExpressErr(msg, 400);
    }

    next();
}

export const isreviewvalid = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "you are not owner of this review")
        return res.redirect(`/listings/${reviewId}`)

    }
    next()

}



