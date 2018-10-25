import React, { Component, Image} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Paper from "material-ui/Paper";
import Background from "../_constants/images/careers.png";
import Background2 from "../_constants/images/careers2.png";


import Section from "../InstyBeta/components/Section";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { deepOrange500 } from "material-ui/styles/colors";

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
  border: "1px solid #009dd6",
  borderRadius: "25px",
  padding: "40px 10px 30px",
  margin: "10px 0",
  overflow: "hidden",

};
const labelStyle = {
  color: "#009dd6",
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
    zIndex: "10",
    width: "100%",
    display: "inline-block",
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: "2px"
  },
  paper2Style: {
    position: "relative",
    marginTop: "15%",
    marginBottom: "20%",
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
    borderRadius: "25px"
  },
  roundedButton2: {
    marginLeft: "35%",
    minWidth: "50px",
    position: "relative",
  },
  roundedButtonOverlay: {
    borderRadius: "25px"
  },
  headingStyle: {
    fontFamily: "Open Sans",
    fontSize: "18px",
    color: "#00ADF3",
    fontWeight: "500",
    marginBottom: "20px",
  },
  paragraphStyle: {
     fontFamily: "sans-serif",
     color:"#777474",
    fontSize: "12px",
    fontWeight: "300",
  },
  listStyle: {
    marginTop: "25px",
     fontFamily: "sans-serif",
     color:"#777474",
    fontSize: "12px",
    fontWeight: "300",
  }
};

class Careers extends React.Component {
  constructor(props) {
   
    super(props);


    this.state = { width: 0, height: 0 };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }

  componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}




  render() {
   console.log("VIEW : ",this.state);

   if(this.state.width >= 480){
    
    return (
      <div className="careers-container" style={{}}>
        <MuiThemeProvider muiTheme={muiTheme}>
       
       
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
                 
                  containerSize={'a'}
                  heading=" "
                  subHeading=" "
                  style={{marginBottom: "10px",paddingBottom:"50px", marginTop: "10px",paddingRight: "20px", }}
                  >

                    <div className="row">

                     

                       <div className="col-md-4 careers-hidden-section" style={{ background: "url(" + Background2 + ") ",
              backgroundSize: "fixed", }}>
                
                         <Section
                          containerSize={'a'}>
                           <Paper style={styles.paper2Style} zDepth={5}>

                            <div style={{padding: "20px"}}>

                              <h4 style={styles.headingStyle}> MJT: Your Destination Employer and Partner</h4>

                              <p style={styles.paragraphStyle}> Whether you are looking for a new, challenging gig, or to land a killer long-term career opportunity, MJT is your go-to partner. Join our team of savvy, talented professionals - We want to understand your talents and goals so we can match you with your next great move.

                              </p>

                              <div style={{marginTop: "20px"}}>
                                <h4 style={styles.headingStyle}> Reasons to join us</h4>

                                <p style={styles.paragraphStyle}> The well-being of every one of our team members is important to us. We care about having an inclusive, motivating and well-balanced environment with a global outlook and equal opportunity.


                              </p>

                                <ul style={styles.listStyle}>
                                  <li>- Medical, Dental, Vision </li>
                                  <li>- Commuter </li>
                                  <li>- SIMPLE IRA With Company Match Up To 3% </li>
                                   <li>-Dependent and Commuter</li>
                                  <li>- 15 days of PTO Your First Five Years</li>
                                  <li>- Nine Company Holidays</li>
                                  <li>- Referral Bonus Program</li>
                                  <li>- Employee Recognition</li>
                                  <li>-  Work Life Balance</li>
                                  <li>- Fun Social Events</li>



                                </ul>
                              </div>
                            </div>
                           </Paper>


                        </Section>

                      </div>

                       <div className="col-md-8">
                
                        <iframe src="./bullhorn/index.html" width="100%" height="780px" styscrolling="yes"> </iframe>

                      </div>

                    </div>
            
                </Section>
              </Paper>
          </Section>
           
           
        </MuiThemeProvider>
      </div>
    )
    }
    else return (

      <div className="col-md-8">
                
                        <iframe src="./bullhorn/index.html" width="100%" height="780px" styscrolling="yes"> </iframe>

                      </div>
      )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;


  return {
    loggingIn,
 
  };
}

const connectedCareers = connect(mapStateToProps)(Careers);
export { connectedCareers as Careers };
