const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listings.js");
let { validateReview, isLoggedIn, saveRedirectUrl, isReviewAuthor } = require("../middlewear.js");
let Review = require("../models/review.js");

//  Post Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { rating, comment } = req.body;

    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing not found")
      return res.redirect("/listings")
    }
    const rev = new Review({
      comment: comment,
      rating: rating,
      author : req.user._id ,
    });
    listing.review.push(rev);

    await rev.save();
    await listing.save();
    console.log("review saved");
    req.flash("success", "New Review Added");
    res.redirect(`/listings/${id}`);
  })
);

//   To delete review
router.delete(
  "/:reviewId",
  isLoggedIn, 
  isReviewAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    if(req.user.username.equals(Review.findById(reviewId).author))
      {
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    let review = await Review.findByIdAndDelete(reviewId);
    req.flash("success", " Review Deleted");
    res.redirect(`/listings/${id}` );
      }
  })
);

module.exports = router;
