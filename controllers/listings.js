const Listing = require("../models/listings");

module.exports.index = async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
};

module.exports.renderNewForm = (req, res) => {
   res.render("listings/new");
 
}

module.exports.addingNewListing = async (req, res, next) => {
  console.log(req.body);
    let { title, description, country, image, location, price } = req.body;

    // if (!title) throw new ExpressError(410, "Title is required");                             //    server side validation ke liye hai ye checkings laga rahe hai
    // if (!description) throw new ExpressError(410, "Description is important");
    // if (!price) throw new ExpressError(410, "Price is required");
    // if (!location) throw new ExpressError(410, "Location is required");
    // if (!country) throw new ExpressError(410, "Country is required");

    let newL = new Listing({
      title,
      description,
      country,
      image: {
        url: image || undefined, //  lets default apply if empty   kuki agar image "" empty hua to js me empty ek value hota hai js to vo undefined nhi hoga so mongoose will not give default value to image if it cantains empty string
        filename: "listingimage",
      },
      location,
      price: price,
      owner: req.user._id,
    });

    await newL.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  }

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let nag = await Listing.findById(id).populate({ path: "review" , populate: {path: "author"} });
  if(!nag){
    req.flash("error", " Listing you requested for does not exist!");
    return res.redirect("/listings/new.ejs");
  }
  console.log(nag);
  res.render("listings/show.ejs", { nag });
  
}

module.exports.showEditPage =  async (req, res) => {
  let { id } = req.params;
  let toEditC = await Listing.findById(id);
    if(!toEditC){
    req.flash("error", " Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { toEditC });
}

module.exports.updateListing =  async (req, res) => {
  let { id } = req.params;
  let {
    utitle: title,
    udescription: description,
    ucountry: country,
    uimage: image,
    ulocation: location,
    uprice: price,
  } = req.body;

  
  await Listing.findByIdAndUpdate(id, {
    title,
    description,
    country,
    image: {
      url: image,
      filename: "listing",
    },
    price,
    location,
  });
   
   req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let delListing = await Listing.findByIdAndDelete(id);
  console.log(delListing);
  req.flash("success", " Listing deleted!");
  res.redirect("/listings");
}