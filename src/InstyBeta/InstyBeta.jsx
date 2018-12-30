import React from "react";
import { connect } from "react-redux";
import { Collapse} from 'reactstrap';
import Swal from 'sweetalert2';
import ReactJson from 'react-json-view'
// const si = require('systeminformation');
import 'babel-polyfill';

import axios from "axios";
// Custom Components
import Utils from '../utils'
import Section from "./components/Section";
import Blockchain from "./components/Blockchain";

import DataVisualization from "./components/DataVisualization";
import DropzoneComponent from "react-dropzone-component";

// Material-UI
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

// Font
import Paper from "material-ui/Paper";
import Background from "../_constants/images/insty.png";
import viewButton from "../_constants/images/viewButton.png";
import viewButtonClosed from "../_constants/images/viewButtonClosed.png";
import Loadable from 'react-loading-overlay';
import {
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import IconButton from 'material-ui/IconButton';
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

const dottedContainer = {
  position: "relative",
  border: "1px solid #FFAA3B",
  borderRadius: "25px",
  padding: "40px 40px 40px",
  margin: "10px 0",
  overflow: "hidden",

};

const labelStyle = {
  color: "#00ADF3",
  position: "absolute",
  top: "-30px",
  fontSize: "18px",
  marginBottom: "5px",
};

const inputStyle = {
  backgroundColor: "rgba(243,243,243,0.4)",
  borderRadius: "25px",
  padding: "0 10px",
  color: "black",

  // textAlign: "right"
};

const hintStyle = {
left: "10px",
marginBottom:"50px",
color:"black",
};

const underlineStyle = {
  display: "none"
};

const iconStyle = {
  fontSize: "14px",
  position: "absolute",
  top: "17px",
  right: "10px",
  color: "#009dd6",
  cursor: "pointer",
};

const styles = {
  paperStyle: {
    position: "relative",
    marginTop: "10%",
    width: "100%",
    display: "inline-block",
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: "2px"
  },
  roundedButton: {
     margin: "0 auto",
     color: "white",
   
    position: "relative",
    height: "100%",
    bordeRadius: "10px",
    padding: "10px 50px",
    boxShadow: "0px",
    backgroundColor: "#79C239",
  },
  buttonDiv:{
    left: "-25px",
    color: "white",
  },
  roundedButton2: {
    marginLeft: "35%",
    minWidth: "50px",
    position: "relative",
  },
  roundedButtonOverlay: {
    
  },
  headingStyle: {
    fontSize: "24px",
    color: "#00ADF3",
    fontWeight: "500",
    textAlign: "center",
  },
  paragraphStyle: {
   fontSize: "16px",
   marginTop: "10px",
    textAlign: "center",
    color: "#666666",
  },
  linkStyle: {
    textDecoration: "underline",
    color: "#00ADF3 !important",
  },
  linkedInIcon: {
    position: "relative",

    display: "inline-block",

    margin: "2.0em 0 1.5em 0",
    paddingLeftt: "45px"
  },
};

class InstyBeta extends React.Component {
  constructor(props) {
   
    super(props);

    this.state = {
      resumeBlockChainObject: {},
      dialogOpen: false,
        instyData: {},
        resumeID: '',
        resumeTimestamp: '',
        resumeScore: '',
     
     showToolTip: false,
      analyzeButtonDisabled: true,
      loading: false,
      formData: {
        JobDescription: '',
      },
      loadingMessage: 'Uploading and Scoring Resume(s)...',
      resumeFiles:{},
      resumeCheck: false,
      resumesAdded: false,
       buttonState: '',
       collapseArrays: [],

    };
        
        this.componentConfig = {
      iconFiletypes: [".pdf", ".doc", ".txt"],
      showFiletypeIcon: true,
      postUrl: '/FileUploadHandler'
    };

    this.djsConfig = {
     autoProcessQueue: false,
     parallelUploads: 10,
      uploadMultiple: true,
      paramName: "myFiles",
      addRemoveLinks: true,
      params: {
        name: "testfile"
      },
      maxFiles: 1,
      dictDefaultMessage: "Drag and drop resume to upload",
      acceptedFiles: ".pdf,.doc,.docx,.txt"
    };
    this.resumeIDStored = React.createRef();

    this.eventHandlers = {
      // This one receives the dropzone object as the first parameter
      // and can be used to additional work with the dropzone.js
      // object
      init: dropzone => {
        this.initCallback(dropzone);
      },
      // All of these receive the event as first parameter:
      drop: this.onFileDrop(),
      dragstart: null,
      dragend: null,
      dragenter: null,
      dragover: null,
      dragleave: null,
      // All of these receive the file as first parameter:
      addedfile: file => {
        this.addedFileCallback(file);
      },
      removedfile: file => {
        this.removedFileCallback(file);
      },
      thumbnail: null,
      error:(response,serverResponse) => {
        this.fileUploadedError(response,serverResponse);
      },
      processing: null,
      uploadprogress: null,
      sending: null,
      success: (response,serverResponse) => {
        this.fileUploadedSuccess(response,serverResponse);
      },
      complete: response => {
        this.fileUploadedComplete(response);
      },
      canceled: null,
      maxfilesreached: null,
      maxfilesexceeded: null,
      // All of these receive a list of files as first parameter
      // and are only called if the uploadMultiple option
      // in djsConfig is true:
      processingmultiple: null,
      sendingmultiple: null,
      successmultiple: null,
      completemultiple: null,
      canceledmultiple: null,
      // Special Events
      totaluploadprogress: null,
      reset: input => {this.uploadReset()},
      queuecomplete: null
    };

    this.convertLanguages = this.convertLanguages.bind(this);
     this.onFileDrop = this.onFileDrop.bind(this);
     this.onDrop = this.onDrop.bind(this);
     this.addedFileCallback = this.addedFileCallback.bind(this);
     this.fileUploadedSuccess = this.fileUploadedSuccess.bind(this);
     this.removedFileCallback = this.removedFileCallback.bind(this);
     this.uploadReset = this.uploadReset.bind(this);
     this.initCallback = this.initCallback.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleFileSubmit = this.handleFileSubmit.bind(this);
     this.fileUploadedComplete = this.fileUploadedComplete.bind(this);
     this.handleResumes = this.handleResumes.bind(this);
     this.fileUploadedError = this.fileUploadedError.bind(this);
     this.sortResumes = this.sortResumes.bind(this);
     this.Comparator = this.Comparator.bind(this);
     this.median = this.median.bind(this);
     this.handleCollapse = this.handleCollapse.bind(this);
     this.mouseOverHandler = this.mouseOverHandler.bind(this);
     this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
     this.mouseOutHandler = this.mouseOutHandler.bind(this);
     this.createTooltip = this.createTooltip.bind(this);
     this.testFrontEndInstyBeta = this.testFrontEndInstyBeta.bind(this);
     this.handlePostSuccess = this.handlePostSuccess.bind(this);
     this.onGetResume = this.onGetResume.bind(this);
     this.onSubmitResumes = this.onSubmitResumes.bind(this);
     this.TronHelperFunction = this.TronHelperFunction.bind(this);
     this.submitResumeUpload = this.submitResumeUpload.bind(this);
     this.submitDataToTron = this.submitDataToTron.bind(this);
     this.handleDialogClose = this.handleDialogClose.bind(this);
  }

 initCallback (dropzone) {
    this.setState({myDropZone: dropzone});
}

mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key});
  }
   mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }
  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          The value of {this.state.key} is {this.state.value}
        </ToolTip>
      );
    }
    return false;
  }

  convertLanguages(langs) {
    var newLangs = [];
    var emptyLang = {};

    langs.map((item, index) => {
      emptyLang = {
        LanguageType: item.Name,
        Level: item.Level
      };

      newLangs.push(emptyLang);
    });

    return newLangs;
  }

  async onGetResume() {
    const resume = await Utils.contract.getResume(this.state.resumeID).call();
    //console.log(resume);
    await this.setState({resumeBlockChainObject: resume});
    await this.setState({dialogOpen: true});

  }

  async onSubmitResumes(resumeID, score) {
    var self = this;
   await Utils.contract.processResumes(resumeID, score*100, new Date().getTime()).send({
      shouldPollResponse: true,
      callValue: 0
  }).then(res => {

      Swal({
        title: 'Resume Processing Succeeded',
        type: 'success'
    });
    self.handlePostSuccess(self.state.instyData);


    }


  ).catch(err => Swal({
      title: 'Resume Processing Failed',
      type: 'error'
  }))
}


onFileDrop() {
    //console.log("checking onFileDrop");
  }
  uploadReset(){
    //console.log("got to upload reset");
     this.setState({analyzeButtonDisabled: true});
  }

   onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...

    //this.setState({ files: acceptedFiles });
  }
  
  addedFileCallback(file) {
    //console.log("checking file", file);
    this.setState({ analyzeButtonDisabled: false });
  }
 fileUploadedSuccess(serverResponse) {
    
      //console.log("checking result from uploadhandler response from server", serverResponse);

      if (serverResponse === 'Limit Exceded'){

         this.setState({loadingMessage: 'You have exceded your daily limit of 10 server calls.'});
          setTimeout(
        function() {
            this.setState({loading: false});
        }
        .bind(this),
        4000
        );

      }
      else if (serverResponse === 'Error'){

         this.setState({loadingMessage: 'There was an internal error processing your resume(s).'});
          setTimeout(
        function() {
            this.setState({loading: false});
        }
        .bind(this),
        4000
        );

      }

      else{
            this.handleResumes(serverResponse);
      this.setState({loading: false});
      this.setState({resumeCheck: true});
      }
     
    }
   

  fileUploadedComplete(response,serverResponse) { 
  }

  fileUploadedError(response,serverResponse) {
    //console.log("checking result from uploadhandler due to error", serverResponse);

      this.setState({loadingMessage: 'There was an error processing your resumes.  Please try again.'});
      setTimeout(
    function() {
        this.setState({loading: false});
    }
    .bind(this),
    3000
);
  }

  removedFileCallback(file) {
    const resumeFiles = this.state.resumeFiles;
    //console.log("checking file when about to remove", file);
    if (file["status"] === 'success'){
    
      var temp = file["name"];
      delete resumeFiles[temp];

      if (Object.keys(resumeFiles).length > 0)

        this.setState({resumeFiles});
      else
        this.setState({resumeFiles, resumeCheck: false});
    } else {
      //console.log("got to else in removedfilecallback, heres the result", file.currentTarget.name);
       var temp = file.currentTarget.name;


      delete resumeFiles[temp];

      if (Object.keys(resumeFiles).length > 0)

        this.setState({resumeFiles});
      else
        this.setState({resumeFiles, resumeCheck: false});

    }
    //this.setState({resumeFiles});
  }

  handleSubmit(){
    //console.log("tried to submit");
    const formData = this.state.formData.JobDescription;
    this.setState({ loading: true, loadingMessage: 'Uploading,Scoring, and Submitting Resume to Blockchain...'});
    this.setState({ analyzeButtonDisabled: true });
   
      this.handleFileSubmit();
  }

  handlePostSuccess(data){
    if (data["Code"] == 429){
      //Limit exceded from server
      this.fileUploadedSuccess('Limit Exceded');
    } else if(data["Code"] == 200){
      this.fileUploadedSuccess(data["Data"]);
    } else {
      this.fileUploadedSuccess('Error');
    }
  }

  handleFileSubmit(){
     //console.log("got to handle file submit");
    if (this.state.myDropZone){     
      if (this.state.myDropZone.getQueuedFiles().length > 0 ) {
      
        var fileArray =  this.state.myDropZone.getQueuedFiles();
        //console.log("looking at files",fileArray);

        this.TronHelperFunction();
      } else this.setState({ loading: false });
    } else {
      //console.log("got to handle else");
       this.setState({ loading: false });
    }
  }
  handleFormErrors(errors){
    //console.log("there were errors here", errors);
  }

  handleChange(event){
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({formData});
  }

handleResumes(resumes){
  const {resumeFiles} = this.state;
  var collapse = [];

  //console.log("check on resumes first", resumes);

var index = 0;
      for (var key in resumes){
        collapse[index] = false;
        resumeFiles[key] = resumes[key];
        index++;
      }

    this.setState({resumeFiles});
    this.setState({collapseArrays: collapse});

   this.setState({resumesAdded: true});
    
}

getColor(number){
 if (number >= 65)
    return '#00ADF3';
  else if( number < 65 && number >= 40)
    return 'orange';
  else if(number < 40)
    return 'red';
    else 
      return 'blue';
}

 Comparator(a, b) {
   if (a[1]["total"] > b[1]["total"]) return -1;
   if (a[1]["total"] < b[1]["total"]) return 1;
   return 0;
 }

 median(numbers) {
    return numbers[Math.floor((numbers.length - 1) / 2)];
}

sortResumes(resumes){
 var sortedResumes = resumes.sort(this.Comparator);
//console.log("in sortResumes checking sorted resumes", sortedResumes);

  return sortedResumes;
}

handleCollapse(event){

event.preventDefault();

//console.log("heres the event for view breakdown click", event.target.id);

const collapseArrays = this.state.collapseArrays;

collapseArrays[event.target.id] = !collapseArrays[event.target.id];

this.setState({collapseArrays: collapseArrays});
}

TronHelperFunction(){
//this.testFrontEndInstyBeta();

this.submitResumeUpload()
}

async submitResumeUpload(){
   var form = new FormData();
    var self = this;
    var fileArray = this.state.myDropZone.getQueuedFiles();
    form.append('resumefile', fileArray[0]);
    //console.log("checking file", fileArray[0]);

    await axios ("http://18.206.187.45:8080/resumeupload",{
            method: 'post',
            data:  form,
            //headers: { "Content-Type": "application/json" }
    })
      
      .then(function (response) {
        //console.log("heres the response from /resumeupload", response);
        
        if(response["status"]  == 200){
          //console.log("sucessfull call to /resumeupload");
         // console.log("response data for /resumeupload", response.data);
          self.setState({resumeID : response.data["Data"]});
          //console.log("checking state tron", self.state.resumeID);
          self.testFrontEndInstyBeta();

          

            }
      })
      .catch(function (error) {
        //console.log('error in /resumeupload ', error);
        
      });
}

  async testFrontEndInstyBeta(myfiles){
    var data = new FormData();

   var fileArray = this.state.myDropZone.getQueuedFiles();

 

      data.append("myfiles", fileArray[0], fileArray[0]["name"]);
    
    data.append("JD",this.state.formData.JobDescription);

   var self=this;

    

   await axios({
    method: 'post',
    url: 'http://18.206.187.45:8080/instybeta',
    data: data,
    headers: {
      "Content-type": "multipart/form-data",
    }
    })
    .then(function (response) {
        //handle success
       // console.log("here is front end insty response",response);
       //console.log("sucessfull call to /instybeta");
        self.setState({instyData: response.data});
        
        self.submitDataToTron(response.data);
    })
    .catch(function (response) {
        //handle error
        //console.log("error on front end insty response",response);
    });
  }




  async submitDataToTron(resumeData){
  


    for (var key in resumeData["Data"]){
      this.setState({resumeScore: resumeData["Data"][key]["total"]});
      }

    //console.log("checking TRON values from state in function submitDataToTron", " resumeID: ",this.state.resumeID," resumeScore: ", this.state.resumeScore, " resumeTimestamp: ", this.state.resumeTimestamp);


    // make Submit call to tron here
    await this.onSubmitResumes(this.state.resumeID, this.state.resumeScore)
    //and then call this function once that is complete:
     
    
  }

handleDialogClose() {
    this.setState({ dialogOpen: false});
  };

  render() {
    const {formData} = this.state;
    const {resumeFiles} = this.state;

    const collapseArrays = this.state.collapseArrays;

    return (
      <div style={{}}>
       <Blockchain></Blockchain>
        
         <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
        
          
          <DialogContent>
           <ReactJson src={this.state.resumeBlockChainObject} />
          </DialogContent>
       
        </Dialog>


        <MuiThemeProvider muiTheme={muiTheme}>
        <Loadable
        active={this.state.loading}
        spinner
        text={this.state.loadingMessage}
        >
        <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => this.handleFormErrors(errors)}
              >
          <Section style={{padding: "20px"}}containerSize={100}>
           
          </Section>

          <Section
            containerSize={1}
            style={{
              background: "url(" + Background + ") no-repeat",
              backgroundSize: "fixed",
              paddingBottom: "5%"
            }}
          >
            <Paper style={styles.paperStyle} zDepth={5}>
              <Section
                containerSize={100}
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  color: "#009dd6"
                }}
              />
              
                <Section
                containerSize={1}
               
                style={{marginBottom: "10px"}}
                >

                 <div style={{width: "75%", marginLeft: "12.5%"}}>

                <h6 style={styles.headingStyle}> InstyMatch:  </h6>

                <h6 style={styles.headingStyle}> Simple, impartial, decentralized and lightning-fast. </h6>

                <p style={{marginTop: "50px", textAlign: "center", fontSize: "16px", color: "#666666"}}> InstyMatch is a Tron Dapp that finds a correlation score between a job description and a resume. </p>
                <p style={styles.paragraphStyle}> If you're a candidate, rate your resume against the competition of candidates in the blockchain.  If you're a recruiter or employer, upload resumes to compare the candidates for a position you need to fill, and access previous resume submissions in the blockchain.</p>
          
                <p style={styles.paragraphStyle}> InstyMatch is limited to 10 scoring requests per day.</p>
                 </div>  
              </Section> 
              <Section
                containerSize={1}
                heading="Step 1."
                subHeading="Provide position or job description (at least 10 characters)." >
                    <div style={dottedContainer} className="col-12 scores-dotted-container">
                      <label style={labelStyle}>Job Description</label>
                      <TextValidator
                          multiLine={true}
                          rows={4}
                          rowsMax={15}
                          name="JobDescription"
                          value={formData.JobDescription}
                          onChange={this.handleChange}
                          fullWidth={true}
                          className="text-field"
                          inputStyle={inputStyle}
                          hintStyle={hintStyle}
                          underlineFocusStyle={underlineStyle}
                          underlineStyle={underlineStyle}
                          hintText="Please insert a brief summary of the role here..."
                          style={{
                            fontSize: "14px",
                            color:"black",
                          }}
                          validators={["required", "minStringLength:10"]}
                          errorMessages={[
                            "this field is required",
                            "Please enter at least 10 characters"
                          ]}/>
                  </div>
              </Section> 
              
              <Section
                style={{paddingBottom: "50px"}}
                containerSize={1}
                heading="Step 2."
                subHeading="Upload resume." >
                <div  style={dottedContainer} className="col-md-12 insty-step2-dotted-container">
                    <div   className="col-md-12 insty-step2-box">
                    <DropzoneComponent
                      config={this.componentConfig}
                      eventHandlers={this.eventHandlers}
                      djsConfig={this.djsConfig}
                    />
                    </div>
                  </div>  
                 
                 

              </Section> 
              {
                  !this.state.analyzeButtonDisabled &&
              <Section style={{ marginBottom: "5%", marginTop: "2.5%", }} className="insty-submit-button-container">
                <div className="col-md-1 col-md-offset-5 analyze-button-container">
                 
                  <RaisedButton
                    disabledBackgroundColor="rgba(0,0,0,0);"
                    onClick={this.getInfo}
                    label="Submit"
                    type="submit"
                    Rounded={true}
                    buttonStyle={styles.roundedButton}
                    labelColor="white"
                    style={styles.buttonDiv}
                    overlayStyle={styles.roundedButtonOverlay}
                    disableTouchRipple={true}
                  />
                </div>
              </Section>}
              { this.state.resumeCheck &&

                <div>
                 <Section
                
                containerSize={1}
                heading="Step 3."
                subHeading="Here are the results of your resume's..."
                score={true}
                >
                </Section>
                 <Section
                 style={{ marginBottom: "5%",}}
                
                heading=" "
                subHeading=" "
               
                >
                <div  style={dottedContainer} className="col-md-12 data-visualize-container ">
                  { 
                   this.sortResumes(

                      Object.keys(resumeFiles).map(function(key) 
                        {
                         //console.log("resumeFiles size", resumeFiles.length);
                          return [key, resumeFiles[key]];
                        })

                    )
                   .map((item, index) => (
                  <div className="row" style={{margin:"15px"}} className="score-row">
                    
                      <div style={{marginBottom:"2%"}} className="col-md-11">
                       <label style={labelStyle}> {item[1]["total"]} / 100</label>
                     <Progress percent={item[1]["total"] } style={{overflowWrap: "break-word",}} status="success"  theme={{success: {symbol: item[0], color: this.getColor(item[1]["total"])}}}/>
                      </div>
                      <div className="col-md-1 close-button-insty" style={{marginBottom:"25px !important"}}>
                      
                        <IconButton name={item[0]}   onClick={this.removedFileCallback}  >
                          <FaTimesCircle
                            onClick={this.removedFileCallback}
                            name={item[0]}
                            style={styles.linkedInIcon}
                            color="red"
                            size={30} >
                           
                          </FaTimesCircle>
                  
                         </IconButton>

                       </div>
                      <div style={{marginBottom:"1.5%"}} className="col-md-12 view-score-breakdown">
                          
                             <a> <img id={index}
                            onClick={this.handleCollapse}
                            style={styles.roundedButton2} className="view-score-breakdown-button" src={this.state.collapseArrays[index]?viewButton:viewButtonClosed}/> </a>
                        
                            <Collapse isOpen={this.state.collapseArrays[index]}>
                               
                                 { this.state.collapseArrays[index] &&

                                  <DataVisualization
                                  data={item}
                                  id={index}
                                  fileName={item[0]}/>
         
                                 }

                            </Collapse>
                      </div>
                    </div>
                    ))


                  }
                    

                  </div>
   
              </Section> 

               <Section
                containerSize={1}
               
                style={{marginBottom: "100px",}}
                >

                 <div className="insty-help-h6" style={{width: "60%", marginLeft: "37.5%"}}>

                <label>
                    ResumeID:
                    <br/>
                     <input type="text" value={this.state.resumeID} />
                  </label>
                  <br/>
                  <br/>
                  <button className="btn btn-primary" onClick={(event) => {event.preventDefault()
                                                                this.onGetResume() }  }>Get Resume </button>

              
               
                
                 </div>  
              </Section> 

              </div>
            }
            </Paper>
          </Section>
           </ValidatorForm>
           </Loadable>
        </MuiThemeProvider>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;

  return {
    loggingIn,
 
  };
}

const connectedInstyBeta = connect(mapStateToProps)(InstyBeta);
export { connectedInstyBeta as InstyBeta };
