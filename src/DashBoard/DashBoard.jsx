import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {HorizontalNonLinearStepper} from './HorizontalNonLinearStepper.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {orange500, blue500,orange700} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Dropzone from 'react-dropzone';
import LinkedinSDK from 'react-linkedin-sdk';
import FontIcon from 'material-ui/FontIcon';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import '../_constants/stylesheets/tooltip.css';
import {Icon} from 'semantic-ui-react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import SelectField from 'material-ui/SelectField';




import Popover from 'material-ui/Popover';


import { userActions } from '../_actions';
import DropzoneComponent from 'react-dropzone-component';
import HelpIcon from 'material-ui/svg-icons/action/help';
import Paper from 'material-ui/Paper';

import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
    primary2Color: orange700,
    accent1Color: orange700,
  },
  appBar: {
    height: 50,
  },
});


const authUrl = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=863aiqifi703ql&redirect_uri=http://13.58.19.185:8888&state=987654321&scope=r_basicprofile "
const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },

  form1Style : {
    marginTop: "5%",

    maxWidth: "250px",
  },
  form2Style : {
    marginTop: "5%",
  },

  formInputStyle : {
    margin: "5px",
  },
  dropDown1: {
    borderRadius: "25px",
    
  },
  dropDown: {
   borderRadius: "25px",
    


  },
   checkbox1: {
     marginTop: "15px",
     color: orange500,
  },
   checkbox2: {
     marginTop: "15px",
     
     color: orange500,
  },
  dividerRow: {
    marginTop: "15%",
  },
  dropZone: {
    width: "100%",
    height: "00%",
    border: "1px solid orange",
    borderRadius: "5px",
    backgroundColor: "white",
  },
  iconStyles: {
    marginRight: 24,
  },
    holder: { 
        border: "2px dashed #FFA500",
        borderRadius: "5px" ,
        backgroundColor: "white",
       minHeight: "60px", 
       padding: "5px",
       textAlign: "center",
  },
  linkedInLink: {
    margin: "45px",
  },
  toolTipPaper: {
    height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  },
  toolTipPopOver:{
    backgroundColor: "transparent",
   maxHeight: "60px", 
   padding: "5px",
   textAlign: "center",
  },
  orStyle:{
    marginTop: "7%",
    marginLeft: "2.5%",
    textAlign:"center",

  },
  linkedInIcon:{
   position: "relative",

    display: "inline-block",

    margin: "2.0em 0 1.5em 0",
    paddingLeftt: "45px",
  },
  linkStyle:{
    color: "black",
    marginBottom: "22px",
  },
  popOver:{
    margin: "5px",
    textAlign: "center",
    display: "inline-block",

  },
  analyzeButton: {
    marginTop: "2.5%",
    marginBottom: "7.5%",
    marginLeft:"2.5%",
    
       

  },
  selectField: {
    fontSize: 21,
    
    
    maxWidth: "100%",
    marginTop: "20px",
    fontWeight: 700,
    borderRadius: 25,
  },
  singleField: {
    
  }

};

var componentConfig = {
    iconFiletypes: ['.pdf', '.doc', '.txt'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};

    var callbackArray = [
        function () {
            console.log('Look Ma, I\'m a callback in an array!');
        },
        function () {
            console.log('Wooooow!');
        }
    ];

    var simpleCallBack = function () {
        this.addedFileCallback();

    };

    var djsConfig = {
        addRemoveLinks: true,
            params: {
                name: 'testfile'
            },
          maxFiles: 1,
          dictDefaultMessage: "Drag and drop resume to upload",
          acceptedFiles: ".pdf,.doc,.docx,.txt",
        };

    var eventHandlers = {
        // This one receives the dropzone object as the first parameter
        // and can be used to additional work with the dropzone.js
        // object
        init: null,
        // All of these receive the event as first parameter:
        drop: callbackArray,
        dragstart: null,
        dragend: null,
        dragenter: null,
        dragover: null,
        dragleave: null,
        // All of these receive the file as first parameter:
        addedfile: simpleCallBack,
        removedfile: null,
        thumbnail: null,
        error: null,
        processing: null,
        uploadprogress: null,
        sending: null,
        success: null,
        complete: null,
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
        reset: null,
        queuecomplete: null
    }


class DashBoard extends React.Component {

    constructor(props) {

        console.log("checking props",props);
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleSalarySelect = this.handleSalarySelect.bind(this);
    this.handleCurrentStatusSelect = this.handleCurrentStatusSelect.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleToolTipClick = this.handleToolTipClick.bind(this);
    this.handleToolTopClose = this.handleToolTopClose.bind(this);
    this.linkedInImport = this.linkedInImport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addedFileCallback = this.addedFileCallback.bind(this);

  
  
    

    this.state = {
    stepIndex: 0,
    salary: 0,
    currentStatus: 0,
    preferredLocation: 0,
    relocationChecked: false,
    travelChecked: false,
    files: [],
    toolTipOpen: false,
    analyzeButtonDisabled: true,
    formData: {
                name: '',
                email: '',
                phone_number: '',
                relocationChecked: false,
                travelChecked: false,
            },
    submitted: false,

    };
  }

  
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        console.log("checking state", this.state);
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleSalarySelect(event,index,value){
        console.log("checking salary", value);
        this.setState({salary: value});
       
    }

     handleLocationSelect(event,index,value){
        this.setState({preferredLocation: value});
    }

    handleCurrentStatusSelect(event,index,value){
        this.setState({currentStatus: value});
    }

    responseLinkedin(response){
        console.log("heres response:", response);
    }
   

    handleNext(){
   
    console.log(this.state.stepIndex);
    if (this.state.stepIndex < 2) {
      this.setState({stepIndex: this.state.stepIndex + 1});
    }
  };



  handlePrev() {
    const {stepIndex} = this.state.stepIndex;
    if (stepIndex > 0) {
      this.setState({stepIndex: this.state.stepIndex - 1});
    }
  };

  relocationUpdateCheck(event) {
     const {formData} = this.state;
   formData[event.target.name] = !formData[event.target.name];

   this.setState({formData});
  }

    travelUpdateCheck(event) {
   const {formData} = this.state;

   formData[event.target.name] = !formData[event.target.name];

   this.setState({formData});
  }

  onDrop(acceptedFiles, rejectedFiles) {
  // do stuff with files...

  this.setState({files: acceptedFiles});
}

handleToolTipClick(event){
    event.preventDefault();
    this.setState({
      toolTipOpen: true,
      anchorEl: event.currentTarget,
    });
}

handleToolTopClose(){
    this.setState({
      toolTipOpen: false,
    });
}

linkedInImport(){
    console.log("imported resume");
    this.setState({analyzeButtonDisabled: false});

}

handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;

        if( (event.target.name == 'travelChecked') || (event.target.value == 'relocationChecked')){
             formData[event.target.name] = !formData[event.target.name];
        }
        console.log("checking ", event.target.name);
        this.setState({ formData });

    }

handleSubmit() {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

addedFileCallback(){

}





   

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Upload file';
      case 1:
        return 'Analyze and Review?';
      case 2:
        return 'Submit file';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  };


    



    render() {
        const { user, users } = this.props;
         const {stepIndex} = this.state;
         const { formData, submitted } = this.state;
    const contentStyle = {margin: '0 16px'};
        return (
        <div>
            <div className="row"> 
                <MuiThemeProvider muiTheme={muiTheme}>
                <div className="col-md-12" style={{marginTop:"5%"}}>

                
                          <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                                <Stepper linear={true} activeStep={stepIndex} connector={<img src={require('../_constants/images/connector.png')} />}>
                                  <Step>
                                    <StepButton onClick={() =>this.handleNext() }>
                                      {this.getStepContent(0)}
                                    </StepButton>
                                  </Step>
                                  <Step>
                                    <StepButton onClick={() => this.handleNext()}>
                                       {this.getStepContent(1)}
                                    </StepButton>
                                  </Step>
                                  <Step>
                                    <StepButton onClick={() => this.handleNext()}>
                                       {this.getStepContent(2)}
                                    </StepButton>
                                  </Step>
                                </Stepper>
                               
                             </div>

                            
                

                </div>
                </MuiThemeProvider>


            </div>



             <div className="row" >
               <div className="col-md-11 col-md-offset-1" >
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Divider />
                    </MuiThemeProvider>
                </div>
            </div>

            <div className="row" style={{marginTop: "5%", fontSize: "2em"}}>
               <div className="col-md-11 col-md-offset-2" >
                    Please complete the following
                </div>
            </div>

            <div className="row" style={{marginBottom: "5%"}}>
                <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <div className="col-md-4 col-md-offset-2" style={styles.form1Style}>

                            
                              <TextValidator
                                floatingLabelText="Name"
                                onChange={this.handleChange}
                                floatingLabelStyle={styles.singleField}
                                name="name"
                                 style={styles.dropDown1}
                                value={formData.name}
                                validators={['required', 'isString']}
                                errorMessages={['this field is required', 'please enter a valid name']}/>
                                <TextValidator
                                floatingLabelText="Phone Number"
                                floatingLabelStyle={styles.singleField}
                                onChange={this.handleChange}
                                name="phone_number"
                                value={formData.phone_number}
                                validators={['required', 'isNumber','minStringLength:10','maxStringLength:10']}
                                errorMessages={['this field is required', 'Phone Number is not valid', 'Please enter a 10 digit phone number','Please enter a 10 digit phone number']}/>
                                <TextValidator
                                floatingLabelText="Email"
                                floatingLabelStyle={styles.singleField}
                                onChange={this.handleChange}
                                name="email"
                                value={formData.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}/>
                                  <Checkbox
                                  name="relocationChecked"
                                  label="Accept relocation"
                                  checked={formData.relocationChecked}
                                  onCheck={this.relocationUpdateCheck.bind(this)}
                                  style={styles.checkbox1}/>
                               
                        </div>

                        <div className="col-md-4 col-md-offset-2" style={styles.form2Style}>

                                    <SelectField
                                      floatingLabelText="Salary Range"
                                      value={this.state.salary} onChange={this.handleSalarySelect} style={styles.dropDown1}
                                      floatingLabelStyle={styles.selectField}
                                      >
                                      
                                      <MenuItem value={1} primaryText="$0-$50,000" />
                                      <MenuItem value={2} primaryText="$50,000 - $100,000" />
                                      <MenuItem value={3} primaryText="$100,000 - $250,000" />
                                      <MenuItem value={4} primaryText="$250k+" />
                                    </SelectField>

                                     <SelectField
                                      floatingLabelText="Current Status"
                                      value={this.state.currentStatus} onChange={this.handleCurrentStatusSelect} style={styles.dropDown}
                                       floatingLabelStyle={styles.selectField}
                                       >
    
                                      <MenuItem value={1} primaryText="Part Time" />
                                      <MenuItem value={2} primaryText="Full Time" />
                                      <MenuItem value={3} primaryText="Contract" />
                                      <MenuItem value={4} primaryText="Unemployed" />
                                    </SelectField>

                                   

                                    <SelectField floatingLabelText="Preferred Location" value={this.state.preferredLocation} onChange={this.handleLocationSelect} style={styles.dropDown}
                                     floatingLabelStyle={styles.selectField}
                                     >
                                      
                                      <MenuItem value={1} primaryText="California" />
                                      <MenuItem value={2} primaryText="New York" />
                                      <MenuItem value={3} primaryText="Washington" />
                                      <MenuItem value={4} primaryText="Seattle" />
                                    </SelectField>

                                     <Checkbox
                                     name="travelChecked"
                                  label="Willing to travel"
                                  checked={formData.travelChecked}
                                  onCheck={this.travelUpdateCheck.bind(this)}
                                  style={styles.checkbox2}/>
                        </div>
                    </div>
                </MuiThemeProvider>
                </ValidatorForm>
            </div>

            <div className="row" >
                <div className="col-md-4 ">
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Badge
                              badgeContent={<IconButton tooltip="Why submit your resume to us?"> <HelpIcon /> </IconButton> }
                              onClick={this.handleToolTipClick}>

                              </Badge>
                        <Popover
                          open={this.state.toolTipOpen}
                          anchorEl={this.state.anchorEl}
                          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                          targetOrigin={{horizontal: 'left', vertical: 'top'}}
                          onRequestClose={this.handleToolTopClose}
                          style={styles.toolTipPopOver}>

                           <div style={styles.popOver}>  

                           
                               
                                    <p>By submitting your resume to us, you create a profile in our database. Our recruiters will come across your resume during their search and offer possible internal referral job opportunities in well-known companies.
                                        </p>

                            <p>By submitting your resume to us, you will get a free one time resume enhancement session to help you create a perfect resume and land your dream job. 
                            </p>
                                 
                               
                            </div>
                        </Popover>
                    </MuiThemeProvider>
                </div>
            </div>

            <div className="row" style={{marginBottom: "5%"}}>
               <div className="col-md-11 col-md-offset-1" >
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Divider />
                    </MuiThemeProvider>
                </div>
            </div>
            <div className="row" style={{marginBottom: "5%"}}>
                <div className="col-md-4 col-md-offset-2">

                 <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig}
                        />
                </div>
                <div className="col-md-1 " style={styles.orStyle}>
                        OR
                </div>
                <div className="col-md-4" style={{marginLeft: "2.5%"}}>
                    <div style={styles.holder}>
                         <div className="row" >
                            <FaLinkedinSquare style={styles.linkedInIcon} color="#0077B5" size={50}/>
                        </div>

                        <div className="row" style={styles.linkStyle} >
                         <a  href={authUrl} onClick={this.linkedInImport} style={{color:"black"}}target="_blank">Connect with LinkedIn</a>
                        </div>                
                    </div>  
                </div>
            </div>


            <div className="row" style={styles.analyzeButton}>
                <div className="col-md-1 col-md-offset-5" >
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <RaisedButton label="Analyze" disabled={this.state.analyzeButtonDisabled} Rounded={true} style={{marginLeft: "50px",borderRadius: "5px", }} primary={true}  />
                    </MuiThemeProvider>
                </div>
            </div>



        </div>


        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedDashBoard = connect(mapStateToProps)(DashBoard);
export { connectedDashBoard as DashBoard };