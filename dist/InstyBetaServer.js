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


  app.get('/check-cors',(req,res) => {
    
       if (req.body) {

          console.log("check-cors incoming", req);

        //   var
        //   CircularJSON = require('circular-json'),
        //   obj = req,
        //   str
        // ;
          
        //   obj.self = obj;
        //   str = CircularJSON.stringify(obj);

        //   fs.writeFile("./object.json", str, (err) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     };
        //     console.log("File has been created");
        // });

     
        console.log("sucessful GET to /cors-check");
       res.status(200).send("Succesfull GET to /cors-check");

    
    }
    else{
         res.status(400).send("Error posting form Data");
    }

  });

   app.post('/FileUploadHandler', upload.any(), function (req, res, next) {

     // console.log("checking clients ip", req.headers);

     var myfiles = {
    
     myfiles: [],


    };
    

    if (req.files ) {

       

        for (var i = 0; i < req.files.length; i++){
           //console.log("checking original filenames", req.files[i].originalname);
            var file = {
                value: req.files[i].buffer,
                options: {
                    filename: req.files[i].originalname,

                }
            }
           myfiles["myfiles"][i] = file;

        }

        myfiles["JD"] = global_JD_obj;
       
        // console.log("checking myfiles", myfiles);
              
              var options2 = {
                method: 'POST',
                
                url: 'http://18.206.187.45:8080/instybeta',
                formData: myfiles,

               
               
               
              };
              request(options2).then(function (body) {
                    // POST succeeded...
                   // console.log("GOOD POST to /instantmatcher", body);
                    console.log("checking body[code] ", JSON.parse(body)["Code"]);
                   
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
                   
                }).finally(function () {
                     
                     
                       });
       
     
      
      
              // form.submit('http://18.206.187.45:8080//matchernobody', function(err, res) {
              //   if (res)
              //       console.log("heres response from form.submit", res);
              //   else if (err)
              //       console.log("there was an error in form.submit",err);
              //   res.resume();
              // });
        

       
          
      }
       
    });

   app.post('/contactJD', (req, res) => {
     // var ip_info = get_ip(req.headers);
     
     // console.log("HERE IS CLIENT IP: ", ip_info);
     
   // console.log("checking req body", req.body);
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