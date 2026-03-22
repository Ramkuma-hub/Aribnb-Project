
import express from 'express';
import { wrapAsync } from '../utils/wrapasync.js';
const router = express.Router();

import passport from 'passport';
import { saveurl } from '../middleware.js';
import { getlogin, getsignup, logout, postlogin, postsignup } from '../controller/usercontroller.js';
import { index } from '../controller/listingcontroller.js';

router.route("")
    .get(wrapAsync(index))


router.route("/signup")
.get(getsignup)
.post( wrapAsync(postsignup))


router.route("/login")
.get(getlogin )
.post(saveurl,
     passport.authenticate("local", 
        { failureRedirect: "/login", failureFlash: true }
    ),postlogin 
    )


router.get("/logout",logout );

export default router
