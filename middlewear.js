let {valiRev} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema");
const {valiUser} =require("./schema.js");
const Review = require("./models/review.js")

module.exports.validateReview = ( req, res, next) =>{
    let { error} =valiRev.validate(req.body);

    if(error) {
       return next( new ExpressError(400 , error.details[0].message))
    }
    next();
}

module.exports.valiListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400 , error.details[0].message);
    }
    next();
}

module.exports.validateUser = (req, res, next) => {

    let { error} = valiUser.validate(req.body);
    if(error){
       return next (new ExpressError(400 , error.details[0].message));
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) =>{
   if(!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl; 
      req.flash("error" , "You are not logged in");
      return res.redirect("/login");
    }
   next();
   
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next();
}

module.exports.isReviewAuthor  = async(req, res, next) =>{
    let {id} = req.params;
    let review = Review.findById( id);
    if(!res.locals.currUser._id.equals(review.author)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
