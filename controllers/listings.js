const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

const mapToken = process.env.MAP_TOKEN;
const maptilerClient = require("@maptiler/client");

maptilerClient.config.apiKey = mapToken;

module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
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
    req.flash("error", "Listing does not exists!");
    return res.redirect("/listing");
  }
  // Ensure legacy listings have geometry set for map rendering
  try {
    const hasCoordinates = Array.isArray(listing?.geometry?.coordinates) && listing.geometry.coordinates.length === 2;
    if (!hasCoordinates && listing.location) {
      const geoResult = await maptilerClient.geocoding.forward(listing.location, { limit: 1 });
      if (geoResult?.features?.[0]?.geometry) {
        listing.geometry = geoResult.features[0].geometry;
        await listing.save();
      }
    }
  } catch (err) {
    // Non-fatal: map just won't render if geocoding fails
    console.error("Failed to backfill geometry for listing", listing._id, err);
  }
  res.render("listings/show.ejs", { listing, mapToken });
};

module.exports.createListing = async (req, res) => {
  const result = await maptilerClient.geocoding.forward(
    req.body.listing.location,
    {
      limit: 1,
    }
  );

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = result.features[0].geometry;

  await newListing.save();
  req.flash("success", "New listing added successfully!");
  res.redirect("/listing");
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exists!");
    return res.redirect("/listing");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true,
  });
  // Refresh geometry if location is provided/updated
  try {
    if (req.body.listing.location) {
      const geoResult = await maptilerClient.geocoding.forward(req.body.listing.location, { limit: 1 });
      if (geoResult?.features?.[0]?.geometry) {
        listing.geometry = geoResult.features[0].geometry;
        await listing.save();
      }
    }
  } catch (err) {
    console.error("Failed to update geometry for listing", listing._id, err);
  }
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listing/${listing._id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listing");
};
