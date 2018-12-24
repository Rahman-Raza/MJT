import React, { Component, Image} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Collapse} from 'reactstrap';
// const si = require('systeminformation');

import axios from "axios";
import MediaQuery from 'react-responsive';

// Custom Components
import Header from "./components/Header";

import Section from "./components/Section";
import DataVisualization from "./components/DataVisualization";
import Info from "./components/Info";
import EducationContainer from "./components/Education/EducationContainer";
import EmploymentInput from "./components/Employment/EmploymentInput";
import RatedInputContainer from "./components/Ratings/RatedInputContainer";
import Expectation from "./components/Expectation";
import AttributeContainer from "./components/Attributes/AttributeContainer";
import DropzoneComponent from "react-dropzone-component";
// Material-UI
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

import { BounceLoader } from "react-spinners";
import ProgressButton from 'react-progress-button'
// Font
import Paper from "material-ui/Paper";
import { history } from "../_helpers";
import Background from "../_constants/images/insty.png";
import viewButton from "../_constants/images/viewButton.png";
import viewButtonClosed from "../_constants/images/viewButtonClosed.png";
import { Line, Circle } from 'rc-progress';
import Loadable from 'react-loading-overlay';
import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import FlatButton from 'material-ui/FlatButton';
import {PieChart} from 'react-easy-chart';
import {Legend} from 'react-easy-chart';
import IconButton from 'material-ui/IconButton';
import FaTimesCircle from "react-icons/lib/fa/times-circle";

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

const legendStyle = {
    
      backgroundColor: '#f9f9f9',
      border: '1px solid #e5e5e5',
      borderRadius: '12px',
      fontSize: '0.8em',
      maxWidth: '300px',
      padding: '12px'
    
  };
const dottedContainer = {
  position: "relative",
  border: "1px solid #FFAA3B",
  borderRadius: "25px",
  padding: "40px 40px 40px",
  margin: "10px 0",
  overflow: "hidden",

};

const dottedContainer2 = {
  position: "relative",
  border: "1px solid #FFAA3B",
  borderRadius: "25px",
  padding: "40px 40px 40px",
  marginTop: "10px",
  marginBottom: "50px",
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
      maxFiles: 10,
      dictDefaultMessage: "Drag and drop resume to upload",
      acceptedFiles: ".pdf,.doc,.docx,.txt"
    };

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
onFileDrop() {
    console.log("checking onFileDrop");
  }
  uploadReset(){
    console.log("got to upload reset");
     this.setState({analyzeButtonDisabled: true});
  }

   onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...

    //this.setState({ files: acceptedFiles });
  }
  addedFileCallback(file) {
    console.log("checking file", file);
    this.setState({ analyzeButtonDisabled: false });
  }
 fileUploadedSuccess(response,serverResponse) {
    if (response.accepted && serverResponse) {
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
    else{

      console.log("checking result from uploadhandler due to error", serverResponse);

      this.setState({loadingMessage: 'There was an error processing your resumes.  Please refresh the page and try again.'});

    }
  }
  fileUploadedComplete(response,serverResponse) {
   


   
  }
  fileUploadedError(response,serverResponse) {
    console.log("checking result from uploadhandler due to error", serverResponse);

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

    console.log("checking file when about to remove", file);
    if (file["status"] === 'success'){
      
      
      var temp = file["name"];


      delete resumeFiles[temp];

      if (Object.keys(resumeFiles).length > 0)

        this.setState({resumeFiles});
      else
        this.setState({resumeFiles, resumeCheck: false});
      
    }

    else{
      console.log("got to else in removedfilecallback, heres the result", file.currentTarget.name);
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
    console.log("tried to submit");
    const formData = this.state.formData.JobDescription;
    this.setState({ loading: true, loadingMessage: 'Uploading and Scoring Resume(s)...'});
    this.setState({ analyzeButtonDisabled: true });
   


    //axios.post("http://localhost:8080/contactJD", { formData }).then( res => {
      //console.log("checking req", req);

      //console.log("heres the response from server for JD: ", res.data);
    
    
   


      this.handleFileSubmit();
  //  });

    

  }

  testFrontEndInstyBeta(myfiles){

    


    var data = new FormData();

   var fileArray = this.state.myDropZone.getQueuedFiles();

   console.log("checking fileArray", fileArray);

     

          data.append("resumefiles", fileArray);
    data.append("JD",this.state.formData.JobDescription);

    for(var pair of data.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
      }

    
   var self=this;

   axios({
    method: 'post',
    url: 'http://18.206.187.45:8080/instybeta',
    data: data,
    headers: {
      "Content-type": "multipart/form-data",
    }
    
    
    })
    .then(function (response) {
        //handle success
        console.log("here is front end insty response",response);
    })
    .catch(function (response) {
        //handle error
        console.log("error on front end insty response",response);
    });

  }

  handleFileSubmit(){
     console.log("got to handle file submit");
    if (this.state.myDropZone){

     // console.log("mydropzone quueue", this.state.myDropZone.getQueuedFiles());
     
      if (this.state.myDropZone.getQueuedFiles().length > 0 )
      {
        

        var fileArray =  this.state.myDropZone.getQueuedFiles();
        console.log("looking at files",fileArray);

        


      
        this.testFrontEndInstyBeta();


        //this.state.myDropZone.processQueue()
      }
      else this.setState({ loading: false });

    }

    else{
      console.log("got to handle else");
       this.setState({ loading: false });
    }
  }
  handleFormErrors(errors){
    console.log("there were errors here", errors);
  }

  handleChange(event){
    const { formData } = this.state;


    formData[event.target.name] = event.target.value;

    this.setState({formData});
  }




handleResumes(resumes){

  const {resumeFiles} = this.state;
  var collapse = [];

  console.log("check on resumes first", resumes);

var index = 0;
  
      for (var key in resumes){
        collapse[index] = false;
        resumeFiles[key] = resumes[key];
        index++;


      }

    

    this.setState({resumeFiles});
    this.setState({collapseArrays: collapse});

   this.setState({resumesAdded: true});
      //console.log("checking new state with res files", this.state.resumeFiles);
    
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
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
 
    return numbers[Math.floor((numbers.length - 1) / 2)];
}



sortResumes(resumes){
 
 //console.log("in sortResumes checking", resumes);
 var sortedResumes = resumes.sort(this.Comparator);
console.log("in sortResumes checking sorted resumes", sortedResumes);












  return sortedResumes;
}

handleCollapse(event){

event.preventDefault();

console.log("heres the event for view breakdown click", event.target.id);

const collapseArrays = this.state.collapseArrays;

collapseArrays[event.target.id] = !collapseArrays[event.target.id];

this.setState({collapseArrays: collapseArrays});


//   const collapseArrays = this.state.collapseArrays;
//   collapseArrays[index] = !collapseArrays[index];

// this.setState({collapseArrays: collapseArrays});


}


  render() {
    const {formData} = this.state;
    const {resumeFiles} = this.state;

    const collapseArrays = this.state.collapseArrays;

    //console.log("here is the collapseArrays ", collapseArrays);
    
    
    return (
      <div style={{}}>
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

                <h6 style={styles.headingStyle}> Meet InstyMatch:  </h6>



                <h6 style={styles.headingStyle}> Simple, impartial, and lightning-fast. </h6>

               
                <p style={{marginTop: "50px", textAlign: "center", fontSize: "16px", color: "#666666"}}> InstyMatch is a free ranking tool that finds a correlation score between a job description and up to ten other resumes in MJT's extensive candidate database. </p>
                <p style={styles.paragraphStyle}> If you're a candidate, rate your resume against the competition in our talent lineup.  If you're a recruiter or employer, upload up to ten resumes to compare the candidates for a position you need to fill.</p>
          
                <p style={styles.paragraphStyle}> InstyMatch is limited to 10 scoring requests per day.</p>
                 </div>  
              </Section> 
              <Section
                containerSize={1}
                heading="Step 1."
                subHeading="Provide position or job description (at least 10 characters)."
                >
                     
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
                          ]}

                      />
                  </div>
              </Section> 


              <Section
                style={{paddingBottom: "50px"}}
                containerSize={1}
                heading="Step 2."
                subHeading="Upload resume(s) (up to 10)."
                >
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
                 style={{ marginBottom: "5%",}}
                containerSize={1}
                heading="Step 3."
                subHeading="Here are the results of your resume's..."
                score={true}
                >
                <div  style={dottedContainer} className="col-md-12 data-visualize-container ">
                  { 


                   this.sortResumes(

                      Object.keys(resumeFiles).map(function(key) 
                        {
                         console.log("resumeFiles size", resumeFiles.length);
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
                            size={30}
                          >
                           
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
                                  fileName={item[0]}

                                  />
                                 

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

                 <div className="insty-help-h6" style={{width: "60%", marginLeft: "20%"}}>

                <h6   style={styles.headingStyle}> Want help sharpening your resume?  </h6>



                <div style={{textAlign: "center", marginTop: "25px"}}>
                  <RaisedButton
                      disabledBackgroundColor="rgba(0,0,0,0);"
                    
                      buttonStyle={styles.roundedButton}
                      href="mailto:info@myjobtank.com?Subject=Tried%20Insty%20Beta%20and%20would%20like%20some%20advice..."
                      label="Talk to us"
                      type="submit"
                      Rounded={true}
                       labelColor="white"
                      overlayStyle={styles.roundedButtonOverlay}
                      disableTouchRipple={true}
                    />
                </div>
               
                <p style={{marginTop: "50px", width: "80%", marginLeft: "10%",textAlign: "center", fontSize: "16px"}}> If you've tried InstyMatch and want to finetune your resume, reach out to one of our recruitment specialists.   We'd be delighted to advise and help define your market value, with no obligation whatsoever. </p>
              
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
