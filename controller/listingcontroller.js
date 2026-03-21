import Listing from "../model/listing.js";

export const index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listing/index.ejs", { allListings });
};

export const getnewlisting = async (req, res) => {
  res.render("listing/new.ejs");
};

export const postnewlisting = async (req, res) => {
  const url = req.file.path;
  const filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.image.url = url;
  newListing.image.filename = filename;
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "created new listing!");
  res.redirect("/listings");
};

export const showlistingdata = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listing/show.ejs", { listing });
};

export const getupdatedata = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  let originalimageurl = listing.image.url;
  originalimageurl = originalimageurl.replace("/upload", "/upload/w_250");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listing/edit.ejs", { listing, originalimageurl });
};

export const postupdatedata = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image.url = url;
    listing.image.filename = filename;
  }

  await listing.save();
  req.flash("success", "Successfully updated listing!");
  res.redirect(`/listings/${id}`);
};

export const destroylist = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted listing!");
  res.redirect("/listings");
};
