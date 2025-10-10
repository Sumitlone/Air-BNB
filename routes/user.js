const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirecrUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// Signup
router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signup));

// Login

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirecrUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// Logout

router.get("/logout", userController.logout);

module.exports = router;
