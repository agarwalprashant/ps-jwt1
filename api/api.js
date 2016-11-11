var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('./services/jwt.js');
var app = express();
var request = require('request');

app.use(bodyParser.json());
	
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});


app.post("/register",function(req,res){
	var user = req.body;
	console.log(req.hostname);
	console.log(user);
	var newUser = new User.model({
		email: user.email,
		password:user.password
	})

	var payload = {
		iss:req.hostname,
		sub:user._id
	}

	var token = jwt.encode(payload,"shh...");

	newUser.save(function(error){
		res.status(200).send({
			user: newUser.toJSON(),
			token:token
		});
	})
})
var jobs = [
	"Cook",
	"Superhero",
	"Unicorn Whisperer",
	"Toast Inspector"
]; 

app.get('/jobs',function(req,res){
	if(!req.headers.authorization){
		return res.status(401).send({
			message:"You are not authorized"
		});
	}
	// res.json(jobs);

})

// app.get('/jobs',function(req,res){
// 	res.send(jobs);
// })

app.post('/auth/google',function(req,res){
	
	var url = "https://www.googleapis.com/oauth2/v4/token";
	var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
	var params = {
		client_id:req.body.clientId,
		redirect_uri:req.body.redirect_uri,
		code:req.body.code,
		grant_type:'authorization_code',
		client_secret:'BPYqopId9ypZnHFYIQIM1tFP'
	}

	console.log(req.body.code);

	request.post(url,{
		json:true,
		form:params
	},function(err,response,token){
		console.log(token);
		var accessToken = token.access_token;
		var headers = {
			Authorization:"Bearer " + accessToken
		};

		request.get({
			url:apiUrl,
			headers:headers,
			json:true
		},function(err,response,profile){
				console.log("nldks");
				console.log(profile);
			})
	});
})

mongoose.connect("mongodb://localhost/psjwt");
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
	console.log("we are connected");
})

var server = app.listen(3000,function(){
	console.log("api listening on ",server.address().port);
});

