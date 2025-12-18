const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateUser, saveRedirectUrl } = require("../middlewear.js");
const passport = require("passport");
const UserControllers = require("../controllers/users.js");

router
  .route("/signup")
  .get(UserControllers.renderSingupForm)
  .post(validateUser, UserControllers.signup);

router
  .route("/login")
  .get(UserControllers.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    UserControllers.login
  );


router.get("/logout", UserControllers.logout);

module.exports = router;
