var express = require('express');
var aws = require('aws-sdk');


var app = express();
app.set('views', './views');
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3000);


var S3_BUCKET = "dmg0";


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
    'Bucket': 'dmg0',
    'Key': 'a.jpg',
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  
   s3.upload(s3Params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to myBucket/myKey");
    }
  });
  



  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
       url: `https://dmg0.s3.amazonaws.com/${fileName}`
    };
          console.log(s3Params);
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
   
    
 res.send('ok');
});
