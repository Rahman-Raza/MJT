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
  border: "1px solid #72C4CC",
  borderRadius: "25px",
  padding: "40px 10px 30px",
  margin: "10px 0",
  overflow: "hidden",

};
const labelStyle = {
  color: "#72C4CC",
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
  color: "#72C4CC",
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
     fontFamily: "Open Sans",
     color:"#777474",
    fontSize: "12px",
    fontWeight: "300",
  }
};

class Careers extends React.Component {
  constructor(props) {
   
    super(props);


    this.state = {
}

  }




  render() {
   
    
    return (
      <div style={{}}>
        <MuiThemeProvider muiTheme={muiTheme}>
       
          <Section
                containerSize={1}
                heading="Open Positions"
                subHeading=" "
                style={{marginBottom: "10px", marginTop: "10px", }}
                >

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
                 
                  containerSize={'a'}
                  heading=" "
                  subHeading=" "
                  style={{marginBottom: "10px",paddingBottom:"50px", marginTop: "10px",paddingRight: "20px", }}
                  >

                    <div className="row">

                     

                       <div className="col-md-4" style={{ background: "url(" + Background2 + ") ",
              backgroundSize: "fixed", height: "950px"}}>
                
                         <Section
                          containerSize={'a'}>
                           <Paper style={styles.paper2Style} zDepth={5}>

                            <div style={{padding: "20px"}}>

                              <h4 style={styles.headingStyle}> Diversity and Inclusion </h4>

                              <p style={styles.paragraphStyle}> We seek attract and retain top talent and strive to create an inclusive atmosphere, free from unlawful discrimination and harassment. We aim to provide all employees with equal opportunity without regard to race, gender, color, national origin, citizenship status, creed, religion, sex, age, marital status, physical or mental disability, sexual orientation and/or gender identity, union membership, veteran status, or any other basis protected by law.

                              </p>

                              <div style={{marginTop: "20px"}}>
                                <h4 style={styles.headingStyle}> Reasons to join us</h4>

                                <ul style={styles.paragraphStyle}>
                                  <li>- Medical, Dental, Vision </li>
                                  <li>- Health Savings Account </li>
                                  <li>- Flexible Spending Accounts, including </li>
                                   <li>-Dependent and Commuter</li>
                                  <li>- Short & Long Term Disability</li>
                                  <li>- Life Insurance</li>
                                  <li>- 401k with company match of 50% of 
                                     contributions up to the first 6%</li>
                                  <li>- 15 days of PTO your first five years; 20 days of 
                                     PTO from year five to ten; 25 days of PTO after 
                                     that</li>
                                  <li>- 5 days of Floating Holidays for your first five   
                                     years, and 7 Floating Holidays after that</li>
                                  <li>- 8 Company Holidays</li>
                                  <li>- Employee Assistance Program</li>
                                  <li>- Referral Bonus Program</li>
                                  <li>- Employee Recognition</li>
                                  <li>- Work Life Balance</li>
                                  <li>- Waterfront View (Kirkland)</li>
                                  <li>- Fun Social Events</li>



                                </ul>
                              </div>
                            </div>
                           </Paper>


                        </Section>

                      </div>

                       <div className="col-md-8">
                
                        <iframe src="./bullhorn/index.html" width="100%" height="950px" scrolling="yes"> </iframe>

                      </div>

                    </div>
            
                </Section>
              </Paper>
          </Section>
           
           
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

const connectedCareers = connect(mapStateToProps)(Careers);
export { connectedCareers as Careers };
