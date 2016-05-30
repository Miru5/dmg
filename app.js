/*var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
var port = process.env.PORT || 8080;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
mongo = require('mongodb');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var request = require('request');

var MongoClient = require("mongodb").MongoClient
var db;
var users;
var categories;

MongoClient.connect("mongodb://miru:toor@ds015713.mlab.com:15713/heroku_g52f05j9", function(err, database) {
  if(err) throw err;
  db = database;
  users = db.collection("Users");
  categories = db.collection("Categories");
});

app.get("/main",function(req,res){
    res.json({"message" : "Hello World!"});
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var staticPath = 'public';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', posts);
app.use('/api/', users);
app.use('/categories/', categories);
app.use(express.static(staticPath));
app.use('/', express.static(staticPath));
app.use('/posts/*', express.static(staticPath));
app.use('/categories/*', express.static(staticPath));
app.use('/new/*', express.static(staticPath));
app.use('/validateEmail/*', express.static(staticPath));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.dir(err);
  res.status(err.status || 500);
  if(err.status === 500) {
    console.error(err.stack);
    res.json({error: 'Internal Server Error'});
  }
  else if(err.status === 404) {
    res.render('error');
  } else {
    res.json({error: err.message})
  }
});

app.listen(port);
*/

const express = require('express');
const aws = require('aws-sdk');


const app = express();
app.set('views', './views');
app.use(express.static('./public'));
app.use(express.bodyParser( { keepExtensions: true, uploadDir: './views' } ));
 app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'super-duper-secret-secret' }));
    app.use(app.router);
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3000);


const S3_BUCKET = process.env.S3_BUCKET;


app.get('/account', (req, res) => res.render('account.html'));

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
    console.log(req.body);
    console.log(req.files);
    
  s3.config.update({
    accessKeyId: "2ksime7s6d37rkpqocr9dfctki",
    secretAccessKey: "1k5fh5ik9i2qgomhfiuef6ddog5mcfgs1e54d5ogsi2jamjgbt4h",
    "region": "us-east-1"  
});

  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    'Bucket': S3_BUCKET,
    'Key': 'a',
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  



  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
          console.log(s3Params);
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
   
    
 res.send('ok');
});
