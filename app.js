var app=require('express')();
const mongoose=require('mongoose');
var bodyParser=require('body-parser');
var logger=require('morgan');
var route=require('./routes/app_route.js');

var port=process.env.PORT || 3000;
//process.env.NODE_ENV =environment.configuration;

mongoose.connect('mongodb://localhost:27017/assign_db');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'mongodb'));
db.once('open', () => console.log('database created'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use('/',route);
console.log("hi!! kaise ho!! khana khakr jana ha!!!");
app.listen(port,()=>{
	console.log('Server Started and running on port 3000');
})
