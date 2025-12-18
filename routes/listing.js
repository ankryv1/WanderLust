const express = require("express");
const router = express.Router();
let wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middlewear.js");
const ListingControllers = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//   Creating New Listing
router
  .route("/")
  .get(wrapAsync(ListingControllers.index))
  // .post(
  //   isLoggedIn,
  //   valiListing,
  //   wrapAsync(ListingControllers.addingNewListing)
  // );  .post((req, res)=> {
   .post( upload.single('image') , (req, res) =>{
      res.send(req.file)
   }) ;



// New Route
router.get("/new",isLoggedIn, ListingControllers.renderNewForm);


//  Show Route
router
  .route("/:id")
  .get(wrapAsync(ListingControllers.showListing))
  .put(   wrapAsync(ListingControllers.updateListing))
  .delete( isLoggedIn, wrapAsync(ListingControllers.destroyListing));

//  Edit Listing
router.get("/:id/edit", isLoggedIn, wrapAsync(ListingControllers.showEditPage));


module.exports = router;
