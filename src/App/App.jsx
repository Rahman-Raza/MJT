import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { Landing } from "../Landing";
import { AddJob } from "../AddJob";
import { LoginPage } from "../LoginPage";
import { DashBoard } from "../DashBoard";
import { RegisterPage } from "../RegisterPage";
import { AnalyzePage } from "../AnalyzePage";
import { InstyBeta } from "../InstyBeta";
import { Careers } from "../Careers";
import { CorsCheck } from "../InstyBeta";
import { SubmitPage } from "../AnalyzePage";
import { SubmitPageJD } from "../AddJob";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Paper from "material-ui/Paper";
import { orange500, blue500, orange700 } from "material-ui/styles/colors";
import Background from "../_constants/images/blacknav.png";

import Section from "../AnalyzePage/components/Section";
import logo from "../_constants/images/logo-mjt.png";
import question from "../_constants/images/question-mark.png";


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
    primary2Color: orange700,
    accent1Color: orange700
  },
  appBar: {
    height: 50
  }
});

const imgUrl = "src/_constants/images/background.jpg";

const styles = {
  paperStyle: {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "25px",
    borderStyle: "solid",

    borderColor: "orange",
    borderWidth: "5px"
  },
  jumbotron: {
    backgroundImage: "url(" + imgUrl + ")",
    backgroundSize: "cover"
  },
  container: {
    height: "auto",
    padding: "0px",
    margin: "0px",
    paddingLeft: "0px",
    paddingRight: "0px"
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    history.push("/");
  }

  render() {
    const { alert } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

       <div style={styles.container}>
      <nav id="menu" class=" navi" style={{zIndex: "100"}}>
   
    <div class="wrapy">
      
        <a href="Landing" class="brand">
          <img  src={logo} alt="Logo" class="site-logo" />
         
        </a>

    
            
        <button id="mobile-btn" class="hamburger-btn">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
          
        <ul class=" uppercase bold top-menu no-float" id="top-menu">

          <li class="nav-item2"><a href="/" >Home</a></li>
          <li class="nav-item2"><a href="/#services" >Services</a></li>
          
          
          <li class="nav-item2"><a href="#values" >Our Values</a></li>







          <li class="nav-item2"><a href="/#talent" >Job Seekers</a></li>
          <li class="nav-item2"><a href="/#Employers" >Employers</a></li>
          <li class="nav-item2"><a href="/#contact" >Contact</a></li>
          <li class="insty">
            <a href="/instymatch" target="_blank" >
           InstyMatch 
           <img src={question} style={{paddingLeft: "10px",width: "25%",marginRight: "-20px",marginBottom: "5px"}}/>
           </a>

          </li>







        </ul>
      </div>

  </nav>
  </div>

        <div style={styles.container} className="responsive-container">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <div >

               <Route exact path="/" component={Landing} />
              <Route path="/Resume" component={HomePage} />

            
              <Route path="/login" component={LoginPage} />
              <Route path="/joborder" component={AddJob} />
              <Route path="/instymatch" component={InstyBeta} />
              <Route path="/careers" component={Careers} />
              <Route path="/cors-check" component={CorsCheck} />
              <Route path="/dashboard" component={DashBoard} />
              <Route path="/confirm" component={SubmitPage} />
               <Route path="/confirmJD" component={SubmitPageJD} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/analyze" component={AnalyzePage} />
           
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
