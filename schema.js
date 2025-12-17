const Joi = require('joi');

module.exports.listingSchema = Joi.object({

  title: Joi.string().required(),
  description: Joi.string().required(),
  country: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().required().min(0),
  image: Joi.string().allow("", null)

});


module.exports.valiRev = Joi.object({
    comment : Joi.string().required().min(5) ,
    rating: Joi.number().required().min(1).max(5)
})

module.exports.valiUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});
