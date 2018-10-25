import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

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

// Material-UI
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Loadable from 'react-loading-overlay';



// Font
import Paper from "material-ui/Paper";
import { history } from "../_helpers";
import Background from "../_constants/images/analyze.png";

// Theme
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: "#ffb81b",
    primary: "#009dd6",
  }
});

const styles = {
  paperStyle: {
    position: "relative",
    marginTop: "10%",
    zIndex: "10",
    width: "100%",
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
    borderRadius: "10px",
    backgroundColor: "#7ac143",
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
   buttonDiv:{
   marginLeft: "25px",
  },
  analyzeButtonOverlay: {

  },
};

class AnalyzePage extends React.Component {
  constructor(props) {
    console.log("checking props", props);
    super(props);

    this.state = {
      formData: this.props.data,
      loadingMessage: 'Submitting your data to our team...',
      analyzeButtonDisabled: false,
      loading: false
    };

    console.log("checking Formmingngng", this.state.formData);

    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.convertLanguages = this.convertLanguages.bind(this);

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

  getInfo() {
    this.setState({ loading: true, analyzeButtonDisabled: true });

    var data = {
      ResumeID: this.props.data["ResumeID"],
      Personal: this.InfoContainer.returnInfo(),
      Education: this.EducationContainer.returnInfo(),
      Employment: this.EmploymentContainer.returnInfo(),
      Skills: this.SkillsContainer.returnInfo(),
      Languages: this.convertLanguages(this.LanguagesContainer.returnInfo()),
      Patents: this.PatentsContainer.returnInfo(),
      Publications: this.PublicationsContainer.returnInfo(),
      Licenses: this.LicensesContainer.returnInfo(),
      Preference: this.PreferenceContainer.returnInfo(),
      
    };
    console.log("checking FINAL DATA", data);

    if (this.props.data["ResumeID"] != "") {
      axios.post("/submitResult", { data })

        .then(res => {
          
          console.log("checking after /submitresult",res.data);
          this.setState({ loading: false });
          history.push("/confirm");
        });
    






    } 

    else {
      history.goBack();
    }
  }

  handleAnalyze() {
    console.log(this.props.data);

    this.props.dispatch(userActions.addComment(this.props.data));
  }

  render() {
    return (
      <div style={{}}>
        <MuiThemeProvider muiTheme={muiTheme}>
         <Loadable
        active={this.state.loading}
        spinner
        text={this.state.loadingMessage}
        >
          <Section containerSize={100}>
            <Progress analyze={true} submitted={"Submit"} />
          </Section>

          <Section
            containerSize={1}
            style={{
              background: "url(" + Background + ") repeat-x",
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
              <Section containerSize={100} heading="Personal Information">
                <Info
                  onRef={ref => (this.InfoContainer = ref)}
                  formData={this.props.data["Personal"]}
                />
              </Section>
              <Section containerSize={100} heading="Education">
                <EducationContainer
                  onRef={ref => (this.EducationContainer = ref)}
                  formData={this.props.data["Education"]}
                />
              </Section>
              <Section containerSize={100} heading="Employment History">
                <EmploymentContainer
                  onRef={ref => (this.EmploymentContainer = ref)}
                  formData={this.props.data["Employment"]}
                />
              </Section>
              <Section containerSize={100} heading="Key Skills">
                <RatedInputContainer
                  onRef={ref => (this.SkillsContainer = ref)}
                  dataType="Skills"
                  formData={this.props.data["Skills"]}
                  defaultValues={[]}
                />
              </Section>
              <Section containerSize={100} heading="Language">
                <RatedInputContainer
                  onRef={ref => (this.LanguagesContainer = ref)}
                  dataType="Languages"
                  formData={[]}
                  defaultValues={[]}
                />
              </Section>
              <Section containerSize={100} heading="Expectation">
                <Expectation
                  onRef={ref => (this.PreferenceContainer = ref)}
                  formData={this.props.data["Preference"]}
                />
              </Section>
              <Section containerSize={100} heading="Patent">
                <AttributeContainer
                  onRef={ref => (this.PatentsContainer = ref)}
                  formData={this.props.data["Patents"]}
                  labels={[
                    {
                      name: "Name",
                      labelText: "Patent Name",
                      hintText: "Patent Name"
                    },
                    {
                      name: "Date",
                      labelText: "Date",
                      hintText: "MM/DD/YYYY"
                    }
                  ]}
                />
              </Section>
              <Section containerSize={100} heading="Publication">
                <AttributeContainer
                  onRef={ref => (this.PublicationsContainer = ref)}
                  formData={this.props.data["Publications"]}
                  labels={[
                    {
                      name: "Name",
                      labelText: "Conference / Journal Name",
                      hintText: "Conference / Journal Name"
                    },
                    {
                      name: "Date",
                      labelText: "Date",
                      hintText: "MM/DD/YYYY"
                    }
                  ]}
                />
              </Section>
              <Section
                style={{ marginBottom: "5%" }}
                containerSize={100}
                heading="License and Certification"
              >
                <AttributeContainer
                  onRef={ref => (this.LicensesContainer = ref)}
                  formData={this.props.data["Licenses"]}
                  labels={[
                    {
                      name: "Name",
                      labelText: "License / Certifcation Name",
                      hintText: "License / Certifcation Name"
                    },
                    {
                      name: "Date",
                      labelText: "Date",
                      hintText: "MM/DD/YYYY"
                    }
                  ]}
                />
              </Section>

              <Section style={{ marginBottom: "5%", marginLeft: "25%" }}>
                <div className="col-md-1 col-md-offset-2">
                  

                  <RaisedButton
                  
                    onClick={this.getInfo}
                    label="Submit"
                    labelColor="white"
                    type="submit"
                    Rounded={true}
                    style={styles.buttonDiv}
                        buttonStyle={styles.analyzeButton}
                        overlayStyle={styles.analyzeButtonOverlay}
                    
                  />
                </div>
              </Section>
            </Paper>
          </Section>
             </Loadable>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const emptyData = {
    ResumeID: "",
    Education: [{}],
    Employment: [{}],
    Personal: {
      Name: "",
      Email: "",
      Mobile: "",
      NativeTongue: "",
      Status: undefined,
      Location: ""
    },
    Preference: {
      JobStatus: undefined,
      PreferredLocation: undefined,
      Relocation: false,
      SalaryEnd: 0,
      SalaryStart: 0,
      Travel: false
    },
    Skills: [],
    Patents: [{}],
    Publications: [{}],
    Licenses: [{}]
  };

  const data = state.addForm["data"][0] ? state.addForm["data"][0] : emptyData;
  console.log("checking the mapStateToProps in analyze", data);
  return {
    loggingIn,
    data
  };
}

const connectedAnalyzePage = connect(mapStateToProps)(AnalyzePage);
export { connectedAnalyzePage as AnalyzePage };
