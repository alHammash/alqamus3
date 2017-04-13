 'use strict';
 var db = require('../models');
 var passportJWT = require('passport-jwt');
 var ExtractJwt = passportJWT.ExtractJwt;
 var JwtStrategy = passportJWT.Strategy;

 var secret = "testsecret";
 exports.secret = secret;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();

 jwtOptions.secretOrKey = secret;

   var token = 0;

 function JwtStrategy(passport) {
 
   

 passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, next) {
   console.log('payload received' + jwt_payload.email + " " + jwt_payload);
   // usually this would be a database call:

   db.user.find({where: {email: jwt_payload.email}}).then(function (user)
   {
     console.log('payload received' + jwt_payload);
     if (user) {
       next(null, user);
       console.log('user', user.email);
     } else {
       next(null, false);
     }
   });
 }
   ));
 }


 module.exports = JwtStrategy;