import React, { Component, Image} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";





import Paper from "material-ui/Paper";
import Background from "../_constants/images/insty.png";


import Section from "./components/Section";



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
       
     
          <Section style={{padding: "20px"}}containerSize={100}>
           
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
                  color: "#72C4CC"
                }}
              />
              
                <Section
                containerSize={1}
                heading="Insty-Beta"
                subHeading=" "
                style={{marginBottom: "10px"}}
                >
                <h4 style={{marginTop: "10px",marginBottom:"10px", fontSize: "14px !important"}}> Insty-Beta is a free tool that helps match recruiters to candidates by finding a correlation score between a job description and up to 10 resumes.  
                Limited to 10 scoring requests per day. We encourage you to <a style={{textDecoration: "underline"}} href="mailto:sf@myjobtank.com">contact us</a> for further usage.</h4>
                     
                   
              </Section> 
              


             

            
            }
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
