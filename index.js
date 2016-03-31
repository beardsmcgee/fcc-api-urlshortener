var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var url = "mongodb://user:user@ds011840.mlab.com:11840/tinytinyurl";
var short_url_base = "http://localhost:3000/";

mongoose.connect(url);
var Schema = mongoose.Schema;
var urlSchema = new Schema({
	urlId: String,
	url:String
});
var Url = mongoose.model('Url', urlSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function(req, res){
	var size = 0;
	Url.count({}, function(err, count){
		size = count+1;
	
		var newUrl = new Url({
			urlId: size,
			url: req.body.url
		});
		newUrl.save(function(e, docs){
			if(e) {throw e;}
			else {
				res.json({original_url:req.body.url, short_url:short_url_base+size});
			}
		});
	});
});

app.get('/:id', function(req, res){
	Url.findOne({'urlId': req.params.id}, function(e, url){
		if(e) throw e;
		res.redirect(url.url);
	});
});



app.listen(3000);