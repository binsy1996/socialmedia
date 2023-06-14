const User = require("../models/user.model");


const { auth } = require("./../middlewares/auth");
// taking a user

exports.register= (req,res)=>{
  const newuser = new User(req.body);

  if (newuser.password != newuser.password2)
    return res.status(400).json({ message: "password not match" });

  User.findOne({ email: newuser.email }).then(( user,err) => {
    if (user)
      return res.status(400).json({ auth: false, message: "email exits" });

    newuser.save().then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        success: true,
        user: doc,
      });
    });
  });};
//login user
exports.login=function(req,res){
  let token = req.cookies.auth;

  User.findOne({ email: req.body.email }).then((user, err) => {
    if (!user)
      return res.status(400).json({
        isAuth: false,
        message: " Auth failed ,email not found",
      });

    user.comparepassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "password doesn't match",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.json({
          isAuth: true,
          id: user._id,
          email: user.email,
          token: user.token,
        });
      });
    });
  });};

  //get loged in user
exports.view=function(req,res){
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });};

  //logout user
  exports.logout=function(req,res){

   req.user.deleteToken(req.token, (err, user) => {
     if (err) return res.status(400).send(err);
     res.send({ status: "success" });
   });
};