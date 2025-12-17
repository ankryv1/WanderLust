const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listings.js");
let { validateReview, isLoggedIn, saveRedirectUrl, isReviewAuthor } = require("../middlewear.js");
let Review = require("../models/review.js");
const ReviewControllers = require("../controllers/review.js")

//  Post Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync( ReviewControllers.postReview )
);

//   To delete review
router.delete(
  "/:reviewId",
  isLoggedIn, 
  isReviewAuthor,
  wrapAsync( ReviewControllers.destroyReview )
);

module.exports = router;
