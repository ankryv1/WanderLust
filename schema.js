const Joi = require("joi");

/*    LISTING VALIDATION  */
module.exports.listingSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().trim().min(1).required(),
  country: Joi.string().trim().min(1).required(),
  location: Joi.string().trim().min(1).required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().allow("", null)
}).required();


/*    REVIEW VALIDATION  */
module.exports.valiRev = Joi.object({
  comment: Joi.string().trim().min(5).required(),
  rating: Joi.number().min(1).max(5).required()
}).required();


/*    USER Validation  */
module.exports.valiUser = Joi.object({
  username: Joi.string().trim().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
}).required();
