const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    const newuser = new User({
      username: username,
      email: email,
    });
    const savedUser = await User.register(newuser, password);
    req.login( savedUser, (err)=>{
        if(err){
            return next(err);
        }
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");
    })
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    let redirect = res.locals.redirectUrl || "/listings";
    res.redirect(redirect);
  }

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You successfully logged out");
    res.redirect("/listings");
  });
}