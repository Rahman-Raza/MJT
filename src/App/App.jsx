import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";




import { DashBoard } from "../DashBoard";



import { InstyBeta } from "../InstyBeta";




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
      /*<MuiThemeProvider muiTheme={muiTheme}>

       <div style={styles.container}>
     
  </div>*/

        <div style={styles.container} className="responsive-container">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          <Router history={history}>
            <div >
           
             
              <Route path="/" component={InstyBeta} />

         
            </div>
          </Router>
        </div>
      /*</MuiThemeProvider>*/
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
