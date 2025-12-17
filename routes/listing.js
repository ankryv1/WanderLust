const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
let {listingSchema} = require("../schema.js");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
let {valiListing} = require("../middlewear.js");
const passport = require("passport");
const {isLoggedIn} = require("../middlewear.js");
const ListingControllers = require("../controllers/listings.js")

//  Index Route
router.get("/", wrapAsync( ListingControllers.index ));

// New Route
router.get("/new", isLoggedIn , ListingControllers.renderNewForm );

//   Creating New Listing
router.post("/", isLoggedIn , valiListing ,wrapAsync( ListingControllers.addingNewListing ));


//  Show Route
router.get("/:id", wrapAsync(  ListingControllers.showListing ));

//  Edit Listing
router.get("/:id/edit", isLoggedIn ,wrapAsync( ListingControllers.showEditPage));


//   Update Route
router.put("/:id", wrapAsync( ListingControllers.updateListing ));

//   DELETE Listing
router.delete("/:id", isLoggedIn , wrapAsync(  ListingControllers.destroyListing));

module.exports = router;