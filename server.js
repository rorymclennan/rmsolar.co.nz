var nodemailer = require('nodemailer');
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const fileUpload = require('express-fileupload');

app.use(fileUpload( {useTempFiles : true,
   tempFileDir : '/tmp/'}))
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/Public')));
app.use('/Public', express.static(path.join(__dirname, '/Public')));

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })
 app.get('/about', function (req, res) {
   res.sendFile( __dirname + "/" + "about.html" );
}) 

app.get('/FAQ', function (req, res) {
   res.sendFile( __dirname + "/" + "FAQ.html" );
})

app.get('/contact', function (req, res) {
   res.sendFile( __dirname + "/" + "contact.html" );
})



app.post('/form', function(req,response ){

 
 // Create a transporter object using SMTP transport


if(!req.files || Object.keys(req.files).length === 0)
{
   const transporter = nodemailer.createTransport({
      host: 'smtp.mailersend.net',
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: 'MS_coN5SA@rmsolar.co.nz',
        pass: 'LzQwsLBSIK97Mfy4'
      }
    })
// Setup email data
 const mailOptions = {
	from: 'contactform@rmsolar.co.nz', // sender address
	to: 'rorymclennan@gmail.com', // list of receivers
	subject: 'New Message from Contact Form', // Subject line
	// text: 'Hey there! Welcome to Your Business, we\'re happy to have you here! You\'ll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing. Remember to check out our guides and contact support if you need anything. Regards, The Your Business Team', // plain text body
	html: `
   <p>From:`+req.body.name+`</p>
   <p>Message: `+req.body.message+`</p>
   <p> Email: `+req.body.email+` </p>
   <p> Phone: `+req.body.phone+`</p>
  `
   };
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      response.sendFile( __dirname + "/" + "messagesent.html" );
     
   });

}else{
   const transporter = nodemailer.createTransport({
      host: 'smtp.mailersend.net',
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: 'MS_coN5SA@rmsolar.co.nz',
        pass: 'LzQwsLBSIK97Mfy4'
      }
    })
  const  mailOptions = {
      from: 'contactform@rmsolar.co.nz', // sender address
      to: 'rorymclennan@gmail.com', // list of receivers
      subject: 'New Message from Contact Form', // Subject line
      // text: 'Hey there! Welcome to Your Business, we\'re happy to have you here! You\'ll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing. Remember to check out our guides and contact support if you need anything. Regards, The Your Business Team', // plain text body
      html: `
       <p>From:`+req.body.name+`</p>
       <p>Message: `+req.body.message+`</p>
       <p> Email: `+req.body.email+` </p>

       <p>The Your Business Team</p>ç
     `,
     attachments: [
      {
         filename: req.files.powerbill.name,
         path: req.files.powerbill.tempFilePath,
      }
      ]
      
      };
      transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            return console.log(error);
         }
         console.log('Message sent: %s', info.messageId);
         response.sendFile( __dirname + "/" + "messagesent.html" );
      });
}

// Send email


});


   // setup e-mail data with unicode symbols


var server = app.listen(3001, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
