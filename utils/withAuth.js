const jwt = require("jsonwebtoken");
const withAuth = (req, res, next) => {
  // const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token...", token);
  if (!token) {
    res.redirect("/login");
  } else {
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return res.status(403).send("You are not authenticated");
      console.log("user info inside verify token", user);
      req.user = user;
      next();
    });
    // next();
  }
};

// if (!req.session.logged_in) {
//   res.redirect("/login");
// } else {
//   next();
// }

module.exports = withAuth;
