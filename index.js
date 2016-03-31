var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var urls = {};
var size = 0;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function(req, res){
	size++;
	urls[size] = req.body.url;
	res.json({words:req.body.url});
});

app.get('/:id', function(req, res){
	res.redirect(urls[req.params.id]);
});



app.listen(3000);