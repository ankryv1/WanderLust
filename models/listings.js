const mongoose = require("mongoose");
const Review = require("./review.js");
 

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,
  country: String,
  image: {
      url: String,
      filename: String
  },
  location: String,
  price: Number,
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

listSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

module.exports = mongoose.model("Listing", listSchema);
