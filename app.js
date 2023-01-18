const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const https =require ("https");
const { url } = require("inspector");
const { options } = require("request");
const { log } = require("console");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
     });

     app.post("/", function(req, res){
       var firstname = req.body.fname;
       var lastname = req.body.uname;
       var email = req.body.email;

       var data ={
           "update_existing":true,
           members :[
               {
                   email_address :email,
                   status : "subscribed",
                   merge_fields:{
                       FNAME: firstname,
                       LNAME: lastname
                }
               
                   
                }
               
           ]
       };


       const jsonData = JSON.stringify(data);

       const url ="https://us21.api.mailchimp.com/3.0/lists/3ba7e9be23"
       const options = {
           method : "POST",
           auth :"Opeyemi1:957c30dfab9f7efececf00f6606ce5f7-us21"
       }


         const request = https.request(url, options ,function(response){

            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }else {
                res.sendFile(__dirname + "/failure.html");
            }
           response.on("data", function(data){
               console.log(JSON.parse(data));
           })

       })
             request.write(jsonData);
              request.end();
     });

     app.post("/failure", function (req, res){
         res.redirect("/")
     });
     


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});


/*957c30dfab9f7efececf00f6606ce5f7-us21

3ba7e9be23.*/