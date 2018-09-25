import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

// Custom Components
import Header from "./components/Header";
import Progress from "./components/Progress/Progress";
import Section from "./components/Section";
import Info from "./components/Info";
import EducationContainer from "./components/Education/EducationContainer";
import EmploymentContainer from "./components/Employment/EmploymentContainer";
import RatedInputContainer from "./components/Ratings/RatedInputContainer";
import Expectation from "./components/Expectation";
import AttributeContainer from "./components/Attributes/AttributeContainer";
import Background from '../_constants/images/analyze.png';
// Material-UI
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from 'material-ui/RaisedButton';

import { BounceLoader } from 'react-spinners';

// Font
import { history } from '../_helpers';
import Paper from 'material-ui/Paper';

const styles = {
paperStyle: {
     position: 'relative',
     marginTop:"15%",
     zIndex: "10",
     
      display: 'inline-block',
      backgroundColor: 'white',
      
       borderStyle: "solid",
    
      borderColor: "white",
      borderWidth: "2px",
      
 },
}
// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class SubmitPage extends React.Component {

  constructor(props) {

        console.log("checking props",props);
    super(props);
    

    this.state = {
      formData: this.props.data,
      
    

    }

  

  }



  render() {

    
    return (
     <div style={{  }}>
      <MuiThemeProvider muiTheme={muiTheme}>
       
           <Section containerSize={100}>
            <Progress analyze={true} submit={true} submitted={"Submit"} />
          </Section>

            <Section containerSize={1} style={{background: "url(" + Background + ") no-repeat",
              backgroundSize: "cover",paddingBottom: "5%", }} >

           <div className="col-md-3" >
           </div>

           <div className="col-md-6" >
           <Paper style={styles.paperStyle} zDepth={5}> 
          <Section containerSize={100} style={{marginTop: "10%", marginBottom: "10%"}} >
            <h2>Thank you for your submission. </h2>
          </Section>
          <Section className="animated" data-animation="fadeInLeft" data-animation-delay="400" containerSize={100} style={{marginTop: "15%", marginBottom: "15%"}} >
           <h3>Our staff will reach out to you shortly. </h3>
          </Section>
          
          

          </Paper>
          </div>

          <div className="col-md-3" >
           </div>

          </Section>
          
          
       
      </MuiThemeProvider>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const emptyData = {
      "ResumeID": '',
    "Education": [{}],
    "Employment": [{}],
    "Personal" : {"Name" : '',"Email": '', "Mobile": '',"NativeTongue": '',"Status":undefined,"Location": ''},
    "Preference" : {"JobStatus": undefined,"PreferredLocation": undefined, "Relocation": false, "SalaryEnd": 0, "SalaryStart": 0, "Travel": false},
    "Skills" : [],
    "Patents" : [{}],
    "Publications" : [{}],
    "Licenses" : [{}],
  }

    const data = state.addForm["data"][0] ? state.addForm["data"][0] : emptyData;
    console.log("checking the mapStateToProps in analyze", data);
    return {
        loggingIn,
        data
    };
}


const connectedSubmitPage = connect(mapStateToProps)(SubmitPage);
export  { connectedSubmitPage as SubmitPage };
