 'use strict';
var express = require('express');
 var path = require('path');
 var logger = require('morgan');
 var bodyParser = require('body-parser');

 var models = require('./models');
 var app = express();
 app.use(logger('dev'));
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static(path.join(__dirname, 'public')));
 // Enable CORS from client-side
 app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
 });

 var routes = require('./routes/index');
 var user = require('./routes/user');
app.use('/', routes);
 app.use('/v1/user', user);
module.exports = app;
 var port = 3000;
app.set('port', port);
 var http = require('http');

 var server = http.createServer(app);
 server.listen(port);
 //if you want to disable sync and cleanup the database replace true by false in he next line
 //models.sequelize.sync({force: false})
 models.sequelize.sync({force: true})
        .then(function (err) {
    console.log('sequelize ready');
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
 console.log("Server listening on port" + port);
