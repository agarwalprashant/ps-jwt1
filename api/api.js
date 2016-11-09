var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('./services/jwt.js');
var app = express();

app.use(bodyParser.json());
	
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});


app.post("/register",function(req,res){
	var user = req.body;
	console.log(user);
	var newUser = new User.model({
		email: user.email,
		password:user.password
	})

	newUser.save(function(error){
		res.status(200).send(newUser.toJSON());
	})
})

mongoose.connect("mongodb://localhost/psjwt");
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	console.log("we are connected");
})

// var server = app.listen(3000,function(){
// 	console.log("api listening on ",server.address().port);
// });

console.log(jwt.encode("hi",'secret'));
