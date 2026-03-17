import express from 'express';
const router = express.Router({ mergeParams: true });
import { wrapAsync } from '../utils/wrapasync.js';
import { isreviewvalid, validateReview } from '../middleware.js';
import Review from '../model/Review.js';
import Listing from '../model/listing.js';
import { loggedIn } from '../middleware.js';
import { createreviewdata, destroyreview } from '../controller/reviewcontroller.js';


// reviews

router.post('', loggedIn,validateReview, wrapAsync(createreviewdata));

// DELETE REVIEW

router.delete('/:reviewId',loggedIn,isreviewvalid , wrapAsync(destroyreview));

export default router;