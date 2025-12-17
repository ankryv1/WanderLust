const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateUser, saveRedirectUrl } = require("../middlewear.js");
const passport = require("passport");

router.get("/signup", (req, res, next) => {
  res.render("users/signup.ejs");
});

router.post("/signup", validateUser, async (req, res) => {
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
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    let redirect = res.locals.redirectUrl || "/listings";
    res.redirect(redirect);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You successfully logged out");
    res.redirect("/listings");
  });
});

module.exports = router;
