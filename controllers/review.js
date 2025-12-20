const Review= require("../models/review")  
const Listing = require("../models/listings")

module.exports.postReview = async (req, res) => {
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
  }

  module.exports.destroyReview = async (req, res) => {
      let { id, reviewId } = req.params;

      let review = await Review.findById(reviewId);
      if(!review){
        req.flash("error", "review not found");
        return res.redirect(`/listings/${id}`);
      }
      await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      req.flash("success", " Review Deleted");
      res.redirect(`/listings/${id}` );
        
    }