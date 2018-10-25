import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";
import { grey500 } from "material-ui/styles/colors";
// Custom Components
import Section from "./components/Section";
import Info from "./components/Info";
import CheckBoxes from "./components/CheckBoxes";
import RatedInputContainer from "./components/Ratings/RatedInputContainer";
import { ValidatorForm } from "react-material-ui-form-validator";
import RaisedButton from "material-ui/RaisedButton";

import Loadable from 'react-loading-overlay';

const checkBoxStyles = {
  margin: "5px 20px",
  height: "48px"
};

const checkboxLableStyles = {
  color: grey500
};

// Material-UI
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Paper from "material-ui/Paper";
import { history } from "../_helpers";
import Background from "../_constants/images/analyze.png";

// Font

const colStyle = {
  boxSizing: "border-box",
  diplay: "flex",
  marginTop: "25px"
};
const col2Style = {
  boxSizing: "border-box",
  marginLeft: "70px",
  paddingRight: "50px",
  marginTop: "15px",
  diplay: "flex",
  width: "71%"
};

const styles = {
  paperStyle: {
    position: "relative",
    zIndex: "10",
    marginTop: "50px",

    display: "inline-block",
    backgroundColor: "white",

    borderStyle: "solid",

    borderColor: "white",
    borderWidth: "2px"
  },
  roundedButton: {
    margin: "0 auto",
    minWidth: "150px",
    position: "relative",
    left: "-20px",
    borderRadius: "25px"
  },
  roundedButtonOverlay: {
    borderRadius: "25px"
  },
   headingStyle :{
  fontSize: "20px",
  fontWeight: "400",
  color: "#009dd6",
  marginTop: "50px",

  },
   analyzeButton: {
    
     margin: "0 auto",
     color: "white",
   
    position: "relative",
    height: "100%",
    bordeRadius: "10px",
    padding: "10px 50px",
    boxShadow: "0px",
    backgroundColor: "#79C239",
    
  },
};

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class AddJob extends React.Component {
  constructor(props) {
    console.log("checking props", props);
    super(props);

    this.state = {
      submitButtonDisabled: false,
      loading: false,
      loadingMessage: "Submitting your job requirements to our team..."
    };

    console.log("checking Formmingngng", this.state.formData);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.convertToArray = this.convertToArray.bind(this);
    this.handleFormErrors = this.handleFormErrors.bind(this);
    this.makePost = this.makePost.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  convertToArray(langs) {
    var newLangs = [];

    langs.map((item, index) => {
      newLangs.push(item.Name);
    });

    return newLangs;
  }

  makePost(obj) {
    axios.post("/submitJD", obj).then(res => {
      console.log("checking result from submit JD response", res.data);
      this.setState({ loading: false, submitButtonDisabled: false });
      history.push("/confirmJD");
    });
  }

  handleSubmit() {
    var obj = {};
    this.setState({ loading: true, submitButtonDisabled: true });

    var skills = this.convertToArray(this.SkillsContainer.returnInfo());
    var info = this.InfoContainer.returnInfo();
    var langs = this.convertToArray(this.LanguagesContainer.returnInfo());
    var checks = this.CheckBoxesContainer.returnInfo();

    console.log("pre flat check", skills, info, langs, checks);

    // info.map((item, index) => {
    //      obj.push(item);
    // });

    // checks.map((item, index) => {
    //      obj.push(item);
    // });

    for (var key in info) {
      obj[key] = info[key];
    }
    for (var key in checks) {
      obj[key] = checks[key];
    }
    obj["Language"] = JSON.stringify(langs);
    obj["RequiredSkills"] = JSON.stringify(skills);

    this.makePost(obj);
  }

  goBack(event) {
    event.preventDefault();

    history.push("/");
  }

  handleFormErrors(errors) {
    console.log("there were errors in the form ", errors);
  }

  render() {
    console.log("about to render ");
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
            <Section
              style={{
                marginBottom: "2.5%",
                marginTop: "2.5%",
                marginLeft: "10%"
              }}
              containerSize={"85%"}
            >
              
            </Section>
            <Section
              containerSize={"85%"}
              style={{
                 background: "url(" + Background + ") repeat-x",
              backgroundSize: "fixed",
              paddingBottom: "5%",
                marginTop: "-5px",
                marginBottom: "5%"
              }}
            >
              <Paper style={styles.paperStyle} zDepth={5}>
              
              
                <Section
                containerSize={"80%"}
                heading="Job Description"
                subHeading=" "
                style={{ marginTop: "30px",marginBottom: "10px",
                 }}
                >
                <h3 style={{marginTop: "10px", }}> Please fill the following:</h3>
                     
                   
                </Section> 
             
                <Section
                  
                  containerSize={"80%"}
                  heading=" Your Details"
                >
                  <Info onRef={ref => (this.InfoContainer = ref)} />
                </Section>

                <Section containerSize={"80%"} heading="Languages">
                  <RatedInputContainer
                    onRef={ref => (this.LanguagesContainer = ref)}
                    dataType="Languages"
                    formData={[]}
                    defaultValues={["English", "Spanish"]}
                  />
                </Section>

                <Section containerSize={"80%"} heading="Key Skills">
                  <RatedInputContainer
                    onRef={ref => (this.SkillsContainer = ref)}
                    dataType="Skills"
                    formData={[]}
                    defaultValues={["Python", "Java"]}
                  />
                </Section>

                <Section containerSize={"80%"} heading="Compensation">
                  <CheckBoxes onRef={ref => (this.CheckBoxesContainer = ref)} />
                </Section>

                <Section
                  style={{
                    marginBottom: "5%",
                    marginTop: "5%",
                    marginLeft: "25%"
                  }}
                >
                  <div className="col-md-1 col-md-offset-2">
                    

                    <RaisedButton
                      className="submit-button-addjob"
                      labelColor="white"
                      disabled={this.state.submitButtonDisabled}
                      label="Submit"
                      type="submit"
                      Rounded={true}
                      buttonStyle={styles.analyzeButton}
                      
                     
                    />
                  </div>
                </Section>
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
    loggingIn
  };
}

const connectedAddJob = connect(mapStateToProps)(AddJob);
export { connectedAddJob as AddJob };
