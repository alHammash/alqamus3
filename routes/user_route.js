 var express = require('express');
 var router = express.Router();
 var user = require('../controllers/user_control');
 router.post("/", user.signup);
 router.post("/login", user.login);
 //router.get("/login", function (req, res) {   console.log("login");   res.redirect('/login.html'); });
// router.post("/profile", user.profile);

 router.get("/profile", user.getProfile);

 router.put("/profile", user.putProfile);

 router.post("/logout", user.logout);

 module.exports = router;