
import express from "express";
const router = express.Router();
import { wrapAsync } from "../utils/wrapasync.js";
import { owneracess, loggedIn } from "../middleware.js";
import { validateListing } from "../middleware.js";
import { storage } from "../cloudinaryconfig.js";
import {
    destroylist,
    getnewlisting,
    getupdatedata,
    index,
    postnewlisting,
    postupdatedata,
    showlistingdata,
} from "../controller/listingcontroller.js";
import multer from "multer";
const upload = multer({ storage });

router
    .route("")
    .get(wrapAsync(index))
    .post(loggedIn, upload.single("listing[image]"), validateListing, wrapAsync(postnewlisting));

// create data
router.get("/new", loggedIn, wrapAsync(getnewlisting));

router
    .route("/:id")
    .get(wrapAsync(showlistingdata))
    .post(loggedIn, owneracess, upload.single("listing[image]"), wrapAsync(postupdatedata))
    .delete(loggedIn, owneracess, wrapAsync(destroylist));

// update data
router.get("/:id/edit", loggedIn, owneracess, wrapAsync(getupdatedata));

export default router;
