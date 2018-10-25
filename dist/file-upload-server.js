const uuidv4 = require('uuid/v4');
const validator = require('express-validator')
const { matchedData } = require('express-validator/filter')
const { check, validationResult } = require('express-validator/check')
var global_file;
var  global_submit_result_data;
var global_resumeID = '';
var global_formData;
var global_file_put = false;
var global_resume_filename = '';
var global_file_extension = '';
var global_linkedIn_parse = false;
const fs = require('fs');

module.exports = (app) => {
    
  const multer = require('multer');
  var request = require('request-promise');
  var getRequestUrl = 'http://18.206.187.45:8080/presignedurl/';
  var getFormRequestUrlMatt = ' http://18.219.52.10:5000/';
  var getFormRequestUrlYev = ' http://18.206.187.45:8080/rawdata/';
  const storage = multer.memoryStorage();
  const upload = multer({storage: storage});
  var FormData = require('form-data');

    
 
  function auto_email(res,email){

    var options = {
      method: 'GET',
      uri:  'http://18.206.187.45:8080/confirmationemailuser/' + email
                  
      };

       request(options)
                  .then(function(body){
                    if (JSON.parse(body)["Code"] === 200){
                    console.log("succesfull POST to /confirmationemailuser", body);
                    res.send("Success");
                   
                  }
                  else{
                     res.status(500);
                  }
                   
                  
                    
                  })
                    .catch(function(err){
                      console.log("ERROR in sending autoemail", err);
                    }).finally(function () {
                     
                      console.log("done with AUTOEMAIL");
                       });



}


  function formData_POST(formData,resumeID,res){

    console.log("checking got to form POST function : ",formData, "checking resumeid: ", global_resumeID);
    global_resumeID = resumeID;


    var POST_FORM = {}

    POST_FORM["ResumeID"] = global_resumeID;
    POST_FORM["Name"] = formData["formData"]["Name"];
    POST_FORM["Email"] = formData["formData"]["Email"];
    POST_FORM["Mobile"] = formData["formData"]["Mobile"];
    POST_FORM["Salary"] = formData["formData"]["salary"];
    POST_FORM["Status"] = formData["formData"]["currentStatus"];
    POST_FORM["Location"] = formData["formData"]["Location"];
    POST_FORM["Relocation"] = formData["formData"]["relocationChecked"];
    POST_FORM["Travel"] = formData["formData"]["travelChecked"];

    console.log("checking POST_FORM", POST_FORM);
     var options= {
                    method: 'POST',
                    url: 'http://18.206.187.45:8080/submitbasicinfo',
                    body: JSON.stringify(POST_FORM),
                   
                  }

                  

                    request(options)
                      .then(function(body){

                        console.log("recieved ok from POST of form data", body);
                        global_linkedIn_parse = false;
                         res.send("got back to front client from /contact");
                      })
                        .catch(function(err){
                          console.log("no POST success for FORM Data ", err);
                        }).finally(function () {
                         
                          console.log("done with form POST request");
                           });
  }


function callParsers(res){
       var options = {
              method: 'GET',
              uri: getFormRequestUrlMatt,
                          
              };

              
                       
            request(options)
              .then(function (body) {
                      
                       
                         console.log("recieved ok from Mustafa parser for RESUME ID", body);

                            var options2 = {
                            method: 'GET',
                            uri: global_linkedIn_parse ? 'http://18.206.187.45:8080/rawdatalinkedin/'.concat(global_resumeID)+'/'.concat('"'+global_resume_filename+'"') :  getFormRequestUrlYev,
                                        
                            };



                            request(options2)
                              .then(function(body){


                                      console.log("recieved ok from Yevs parser FOR RESUME ID", body);
                                      global_resumeID = JSON.parse(body).Data;
                                      res.status(200).send( global_resumeID);
                                      
                                     


                              })
                              .catch(function(err){
                                console.log("GET no success for Yevs parser FOR RESUME ID ", err);
                              }).finally(function () {
                                  console.log("done with GET request for Yevs Parser FOR RESUME ID");
                                   
                                  
                                   });
                       // }
                       // else console.log("didnt get 200 from MUstafas parser, got", body);

                })
             .catch(function (err) {
                        // Delete failed...
              console.log("GET no success for Mustafa parser FOR RESUME ID", err);
                       
                       
              }).finally(function () {
                              console.log("done with GET request for Mustafas parser FOR RESUME ID");
                               });
    } //end function call_parsers


   



//POST request made from client side.  This sends a resume ID to backend server, recieves the parsed resume result, and sends it to client side.
  app.post('/analyze',(req,res) => {
      var url = 'http://18.206.187.45:8080/parsedresult/'+global_resumeID;
      console.log("checking analyze url",url);

       var options = {
              method: 'GET',
              uri: url,
      };
           
        request(options)
         .then(function (body){

          console.log("analyze GET body",body);
          res.send(JSON.parse(body)["Data"]);

        })
          .catch(function (err) {
                // Delete failed...
                console.log("FAIL for GET analyze ", err);
               
               
            })
            .finally(function () {
                      console.log("done with analyze GET");

              });
})

  //POST request that recieves job description from client side, and sends it to /jobposting backend endpoint.

  app.post('/submitJD',(req,res) => {
      var url = 'http://18.206.187.45:8080/jobposting';
      console.log("checking jobpost url",url);

       var options = {
              method: 'POST',
              uri: url,
              body: JSON.stringify(req.body)
      };
           
        request(options)
         .then(function (body){

          console.log("job posting body: ",body);
          res.send(JSON.parse(body)["Data"]);

        })
          .catch(function (err) {
                // Delete failed...
                console.log("FAIL for POST to job posting ", err);
               
               
            })
            .finally(function () {
                      console.log("done with POST to job posting");

              });
})

 // THIS POST endpoint recieves the reusume File from client side, stores it in virtual memory, creates a UUID for it, 
  // and makes the PUT call to send the resume to backend server.
       
   app.post('/uploadHandler', upload.any() , function (req, res, next) {
    if (req.files ) {

      var resumefile= {
       
      };

        var resfile = {
          value: req.files[0].buffer,
          options: {
            filename: req.files[0].originalname,
          }
        }

        resumefile["resumefile"] = resfile;
        console.log("checking resuemfile", resumefile);


        var options = {
              method: 'POST',
              uri: 'http://18.206.187.45:8080/resumeupload',
              
              formData: resumefile,
            
            };
           
        request(options)
        .then(function (body) {
            console.log("POST to resumeupload with success", body);
           

                   
                    global_file_put = true;
                    global_resumeID = JSON.parse(body)["Data"];
                    
                 res.send("Success");
              
                
                

        })

        .catch(function (err) {
            // Delete failed...
            console.log("POST no success for /resumeupload ", err);
           
           
        }).finally(function () {
                      console.log("done with all requests5");
                       });        
          
      }
       
    });


// this POST request recieves the basic contact details from the user and then calls the function formData_post which then sends it to the backend.
  app.post('/contact', (req, res) => {

    console.log("checking req body", req.body);
    global_formData = req.body;

         
    if (req.body) {
     
        formData_POST(global_formData,global_resumeID,res);
       
    }
  });

//this post request recieves the modified/analyzed resume data and sends it to the backend 
  app.post('/submitResult', (req, res) => {



    var sendBody = JSON.stringify(req.body.data);

        console.log("checking req body submitresult analyzepage \n", sendBody);
        var autoEmail = req.body.data.Personal.Email;
    global_submit_result_data = req.body;

         
    if (req.body) {



     
        var options = {
      method: 'PUT',
      uri:  'http://18.206.187.45:8080/submitresult',
      body: sendBody
                  
      };

      request(options)
        .then(function (body){

         if (JSON.parse(body)["Code"] === 200){
          
          console.log("Success to /submitresult");
         
          auto_email(res,autoEmail);
          //  res.send("Success");

         }
          else
          {
            console.log("some other error in POST to /instantmatcher");
            res.status(500);
              }
        })
         .catch(function (err) {
                // Delete failed...
      console.log("FAIL for PUT for analyze page ", err);
               
               
      }).finally(function () {
                      console.log("done with ANALYZE PUT");

                       });
    
    }
  });

app.get('/getResumeId', (req, res) => {
  res.send(global_resumeID);
});

  app.post('/linkedin', (req,res) => {



    console.log("checking linkedIn req body", req.body);
    console.log("checking if first file was recieved and the linkedIN url ", global_file_put, global_resumeID);

    
    if (req.body) {
       var options = {
      method: 'POST',
      uri: req.body["ResumeID"] ? 'http://18.206.187.45:8080/linkedinafterresume/'+req.body["ResumeID"] :'http://18.206.187.45:8080/linkedin',
      body: JSON.stringify(req.body["Response"])
                  
      };

      request(options)
        .then(function (body){

          // if (body[Code] == 200){
          console.log("heres the response for linkedIN post", body);


          global_resumeID = JSON.stringify(JSON.parse(body).Data);
           global_resumeID = global_resumeID.replace('"','');
          global_resumeID= global_resumeID.replace('"','');
          global_linkedIn_parse = true;
          console.log("checking global_resumeID", global_resumeID);


         
 
          res.status(200).send( global_resumeID);


        })
         .catch(function (err) {
                // Delete failed...
      console.log("FAIL for POST linkedIn ", err);
               
               
      }).finally(function () {
                      console.log("done with linkedIN POST");

                       });

    }

  });
}
