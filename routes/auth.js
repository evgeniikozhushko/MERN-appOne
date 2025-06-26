const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth')

// 🧾 Registration Page - Renders the registration form.
router.get("/register", (req, res) => res.render("register"));

// 🧾 Handle Registration
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashes the password with bcrypt (10 is the salt rounds).
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  await user.save(); // Saves the new user to MongoDB.
  res.redirect("/login"); // Redirects to login.
});

// 🔐 Login Page - Renders login form.
router.get("/login", (req, res) => res.render("login"));

// 🔐 Handle Local Login
router.post("/login",
  passport.authenticate("local", { // Uses Passport's "local" strategy to validate login.
    successRedirect: "/profile", // On success: go to /profile.
    failureRedirect: "/login", // On fail: return to login.
    failureFlash: true, // Optionally showing flash message.
  })
);

// 🐙 GitHub OAuth Login. Starts GitHub login flow — redirects user to GitHub.
router.get("/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }) 
);

router.get("/auth/github/callback", // GitHub redirects user here after login.
  passport.authenticate("github", { failureRedirect: "/login" }), // Passport processes the GitHub response.
  (req, res) => res.redirect("/profile") // Redirects to /profile if successful.
);

// 👤 Protected Profile Page
router.get("/profile", ensureAuth, (req, res) => { // Can only be accessed if logged in.
  res.render("profile", { user: req.user }); // Renders profile page with the current logged-in user (req.user is set by Passport).
});

// 🔓 Logout
router.get("/logout", (req, res) => {
  req.logout(() => { // Logs user out (destroys session).
    res.redirect("/login"); // Redirects back to login.
  });
});

// 📦 Export Router
module.exports = router;