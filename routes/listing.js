const express = require("express");
const router = express.Router();
let wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, valiListing, isListingOwner } = require("../middlewear.js");
const ListingControllers = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//   All Listing shown and adding
router
  .route("/")
  .get(wrapAsync(ListingControllers.index))
  .post(
    isLoggedIn,
    upload.single("image"),
    valiListing,
    wrapAsync(ListingControllers.addingNewListing)
  );

// New Route
router.get("/new", isLoggedIn, ListingControllers.renderNewForm);

//  Show Route
router
  .route("/:id")
  .get( wrapAsync(ListingControllers.showListing))
  .put(
    isLoggedIn,
    isListingOwner,
    upload.single("image"),
    wrapAsync(ListingControllers.updateListing)
  )
  .delete(
    isLoggedIn,
    isListingOwner,
    wrapAsync(ListingControllers.destroyListing)
  );

//  Edit Listing
router.get("/:id/edit", isLoggedIn,isListingOwner, wrapAsync(ListingControllers.showEditPage));

module.exports = router;
