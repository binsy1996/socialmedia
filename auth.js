const User = require("./../models/user.model");

let auth = (req, res, next) => {
  let token = req.get("Authorization");
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.status(400).json({
        error: true,
        message: "un authorized",
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
