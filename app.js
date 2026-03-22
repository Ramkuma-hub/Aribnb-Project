import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import { ExpressErr } from "./utils/Expresserr.js";
import listingRouter from "./route/listingroute.js";
import reviewRouter from "./route/reviewroute.js";
import userRouter from "./route/userroute.js";
import session from "express-session";
import flash from "connect-flash";
import User from "./model/user.js";
import passport from "passport";
import passportLocal from "passport-local";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
const AtlasUrl = process.env.Atlas_url;
const secretkey =process.env.Secret

const store = MongoStore.create({
  mongoUrl: AtlasUrl,
  crypto: {
    secret: secretkey,
  },
  touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("Error in Mongo Session Store ", error);
});
const sessionConfig = {
  store,
  secret: :secretkey ,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("", userRouter);

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(AtlasUrl, {
    tls: true,
  });
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.all(/.*/, (req, res, next) => {
  next(new ExpressErr("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
