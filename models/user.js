const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;  //  wrote default because mongoose cant read directly in object containing default we use passport-local-mongoose    

const userSchema = new mongoose.Schema({

    email:{
        type: String ,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);
 
module.exports = mongoose.model("User", userSchema);