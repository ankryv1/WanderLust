const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateUser, saveRedirectUrl } = require("../middlewear.js");
const passport = require("passport");
const UserControllers = require("../controllers/users.js")

router.get("/signup", UserControllers.renderSingupForm );

router.post("/signup", validateUser, UserControllers.signup );

router.get("/login", UserControllers.renderLoginForm );

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
   UserControllers.login
);

router.get("/logout",  UserControllers.logout);

module.exports = router;
