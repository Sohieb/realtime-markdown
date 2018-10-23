/* server.js */

var express = require('express');
var app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');


// public folder to store assets
app.use(express.static(__dirname + '/public'));


// routes for app
app.get('/', function(req, res) {
    res.render('pad');
});

app.get('/(:id)', function(req, res) {
    res.render('pad');
});


// get sharejs dependencies
var sharejs = require('share');
require('redis');


// set up redis server
var redisClint;
console.log(process.env.REDISTIGI_URL);
if (process.env.REDISTIGI_URL) {
    var rtg = require("url").parse(process.env.REDISTIGI_URL);
    redisClint = require("redis").createClient(rtg.port, rtg.hostname);
    redisClint.auth(rtg.auth.split(":")[1]);
} else {
    redisClint = require("redis").createClient();
}


// options for sharejs
var options = {
    db: {type: 'redis', clint: redisClint}
};


// attach the express server to sharejs
sharejs.server.attach(app, options);


// listen on port 8000 (for localhost) or the port  defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);