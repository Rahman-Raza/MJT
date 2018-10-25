const uuidv4 = require('uuid/v4');
var FormData = require('form-data');
var get_ip = require('ipware')().get_ip;
const publicIp = require('public-ip');
const validator = require('express-validator')
const { matchedData } = require('express-validator/filter')
const { check, validationResult } = require('express-validator/check')
const multer = require('multer');
var request = require('request-promise').defaults({ simple: false });
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
var global_JD_obj = '';






   

module.exports = (app) => {

//get endpoint used in testing CORS functionality
  app.get('/check-cors',(req,res) => {
    
       if (req.body) {

          console.log("check-cors incoming", req);
     
        console.log("sucessful GET to /cors-check");
       res.status(200).send("Succesfull GET to /cors-check");

    
    }
    else{
         res.status(400).send("Error posting form Data");
    }

  });


// This is the POST endpoint that recieves the resume files from dropzone component, stores them temporarily in memory storage, 
  // attaches the Job Description to the resumes and makes the outgoing request to backend server.
  app.post('/FileUploadHandler', upload.any(), function (req, res, next) {

     var myfiles = {
    
     myfiles: [],


      };
    if (req.files ) {
        for (var i = 0; i < req.files.length; i++){
          
            var file = {
                value: req.files[i].buffer,
                options: {
                    filename: req.files[i].originalname,

                }
            }
           myfiles["myfiles"][i] = file;

        }

      myfiles["JD"] = global_JD_obj;
       
              
      var options2 = {
        method: 'POST',
                
        url: 'http://18.206.187.45:8080/instybeta',
        formData: myfiles,
               
      };
      request(options2).then(function (body) {
         // POST succeeded...
        // console.log("GOOD POST to /instantmatcher", body);
        console.log("checking body[code] ", JSON.parse(body)["Code"]);
        console.log("checking body ", JSON.parse(body));

       
        if (JSON.parse(body)["Code"] === 200){
          console.log("succesfull POST to /instantmatcher");
          res.send(JSON.parse(body)["Data"]);
        }
        else if (JSON.parse(body)["Code"] === 429){
            console.log("limit exceded in POST to /instantmatcher");
            res.send('Limit Exceded');

        }
        else if (JSON.parse(body)["Code"] === 400){
            console.log("400 error in /instantmatcher");
            res.send('Error');

        }
        else{
            console.log("some other error in POST to /instantmatcher",body);
            res.status(500);
        }
      
                    
      })
        .catch(function (err) {
          
          console.log("Unsuccessful POST call to /instantmatcher resulting in error", err);
                    
          res.status(500);
                   
        })

        .finally(function () {
                     
                     
        }); 
    }
       
 });

   // This is the POST endpoint to recieve the JD from user, and save it in a global file temporarily.

   app.post('/contactJD', (req, res) => {
    
    global_JD_obj = req.body["formData"];

         
    if (req.body) {



     
        console.log("sucessful post to /contact");
       res.status(200).send("JD was recieved by server");

    
    }
    else{
         res.status(400).send("Error posting form Data");
    }
  });
}