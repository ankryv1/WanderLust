const Listing = require("../models/listings");

module.exports.index = async (req, res) => {
  let { preferredCountry } = req.query;
  let alllistings;

  if (preferredCountry && preferredCountry.trim() !== "") {
     alllistings = await Listing.find({
      country: { $regex: preferredCountry, $options: "i" },
    });
    if (alllistings.length === 0) {
      return res.render("listings/noListingFound", { preferredCountry });
    }
  } else {
    alllistings = await Listing.find({});
  }

  res.render("listings/index.ejs", { alllistings, preferredCountry });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.addingNewListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let { title, description, country, location, price } = req.body;

  let newL = new Listing({
    title,
    description,
    country,
    image: {
      url: url,
      filename: filename,
    },
    location,
    price: price,
    owner: req.user._id,
  });

  await newL.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let nag = await Listing.findById(id)
    .populate("owner")
    .populate({ path: "review", populate: { path: "author" } });
  if (!nag) {
    req.flash("error", " Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  console.log(nag);
  res.render("listings/show.ejs", { nag });
};

module.exports.showEditPage = async (req, res) => {
  let { id } = req.params;
  let toEditC = await Listing.findById(id);
  if (!toEditC) {
    req.flash("error", " Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { toEditC });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let { title, description, country, location, price } = req.body;

  const updatedData = {
    title,
    description,
    country,
    price,
    location,
  };
  if (req.file) {
    updatedData.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  await Listing.findByIdAndUpdate(id, updatedData);

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let delListing = await Listing.findByIdAndDelete(id);
  console.log(delListing);
  req.flash("success", " Listing deleted!");
  res.redirect("/listings");
};
