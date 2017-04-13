
 var db = require('../models');

 var jwt = require('jsonwebtoken');

 var secret = "testsecret";
 var baseUrl = 'http://localhost:3000/';


 exports.index = function (req, res) {
    console.log(" =user2.id");

 };

 exports.signup = function (req, res) {
   console.log("start search for exsting user ");

   db.user.find({where: {'email': req.body.email}}).then(function (user)
   {
     if (!user) {
       console.log("start add user ");
       //console.log("token= " + token);
       var userInstance = db.user.build({
         //user_id: req.body.id,
         full_name: req.body.full_name,
         email: req.body.email,
         password: req.body.password
          //auth_token: token
       });

       userInstance.save().then(function (user) {
         var _userInstance = user.get({plain: true});
         console.log("inside then" + _userInstance);

         return res.redirect('/v1/user/login');

       });
     } else if (user) {
       console.log("email= " + req.body.email + ":is exist ");

       return res.redirect('/v1/user/login');
     }
   });
 };

 exports.login = function (req, res) {
   console.log("1-email= " + req.body.email + ":password= " + req.body.password);
   //var userf;
   db.user.find({where: {'email': req.body.email}}).then(function (user)
   {


     if (!user) {
       console.log("no user with this email " + req.body.email + ":password= " + req.body.password);
       //return done(null, false);

     }
     //userf = user;
     if (user.password !== req.body.password) {
       console.log("wrong password= " + req.body.password);
       //return done(null, false);
       res.redirect('/v1/user/login');
     } else {
       token = addtoken(user.email);
       console.log("sucsess = " + token);
       user.updateAttributes({auth_token: token}).then(function () {
         console.log("sucsess = " + token);
         //return done(null, user);
         return res.redirect('/v1/user/profile?user=' + user.email + '&token=' + token);
       }).catch(function (err) {
         console.log("err login " + err.message);
       });


     }
   }
   ).catch(function (err) {
     console.log("err login " + err.message);
     console.log("no user with this email " + req.body.email + ":password= " + req.body.password);
     //console.log("no user with this email " + userf.email + ":password= " + userf.password);

     //done(err);
   });
 };

 exports.getProfile = function (req, res) {
   console.log("success profile ");
   var email = req.query.user;
   var token = req.query.token;
   res.redirect('/profile.html?user=' + email + '&token=' + token);
   //console.log("logOut");

 };
 exports.profile = function () {};

 exports.logout = function (req, res) {

   console.log("start log out and delete the token ");
   var email = req.query.user;
   var token = req.query.token;
   db.user.find({where: {'email': email}}).then(function (user)
   {


     if (!user) {
       console.log("no user with this email " + email);


     } else {

       user.updateAttributes({auth_token: null}).then(function () {
         console.log("sucsess = " + 'token removed');

         return res.redirect(baseUrl);
       }).catch(function (err) {
         console.log("err login " + err.message);
         return res.redirect(baseUrl);
       });


     }
   }
   ).catch(function (err) {
     console.log("err login " + err.message);
     console.log("no user with this email " + req.query.email);
     return res.redirect(baseUrl);

   });



 };



 var addtoken = function (payload_email) {
   console.log('addtoken ' + payload_email);
   var jwt_payload = {email: payload_email};
   console.log('addtoken ' + jwt_payload);
   var expiresInDate = '3h';
   var token = jwt.sign(jwt_payload, secret, {expiresIn: expiresInDate});
   // var token = 'JWT ' + jwt.sign(jwt_payload, passport1.secret);

   return token;
 };

 var getToken = function (headers) {
   if (headers && headers.authorization) {
     var parted = headers.authorization.split(' ');
     if (parted.length === 2) {
       return parted[1];
     } else {
       return null;
     }
   } else {
     return null;
   }
 };
