// 🔐 Middleware: Auth Protection. Only allows access if user is authenticated (req.isAuthenticated() is provided by Passport).
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// 📦 Export Router
module.exports = ensureAuth;