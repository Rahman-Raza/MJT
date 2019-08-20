import React, { Component, Image} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Paper from "material-ui/Paper";
import Background from "../_constants/images/careers.png";
import Background2 from "../_constants/images/careers2.png";

import Parser from 'html-react-parser';
import Section from "../InstyBeta/components/Section";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { deepOrange500 } from "material-ui/styles/colors";
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
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

 class Landing extends React.Component {
  constructor(props) {

    super(props);


    this.state = { width: 0,
      height: 0,
      components: {
        home: {
          text: 'hello world',
        },
        services: {
          text: 'hello world',
        },
        values: {
           text: 'hello world',
        },
        valuesContinued:{
           text: 'hello world',
        },
        employers: {
           text: 'hello world',
        },

        howWe:{
          text: 'hello world',
        },

        howWeServices:{
          text: 'hello world',
        },

        instyAd1:{
           text: 'hello world',
        },

        instyAd2:{
          text: 'hello world',
        },

        talent: {
          text: 'hello world',
        },
        team: {
          text: 'hello world',
        },
        contact: {
          text: 'hello world',
        },
        footer: {
          text: 'hello world',
        },


      }


    };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  this.fetchData = this.fetchData.bind(this);
  this.processData = this.processData.bind(this);
  this.createHTML = this.createHTML.bind(this);


}



  componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);

}

componentWillMount(){
   this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/5', 'home');
  this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/7', 'services');
    this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/9', 'howWe');
     this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/11', 'howWeServices');
      this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/13', 'talent');
       this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/15', 'instyAd1');
        this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/17', 'employers');
         this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/19', 'instyAd2');
          this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/21', 'values');
          this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/23', 'valuesContinued');
          this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/25', 'team');
          this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/27', 'contact');
          this.fetchData('https://mjtwordpress.tk/wp-json/wp/v2/posts/29', 'footer');

}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}

 fetchData(url,component){


    if (component == 'home'){
      console.log("checking home api call");
  }

var self = this;

 axios({method: 'get',
    url: url

    })
 .then(function (response) {

 // console.log("here is data from wp server call", response);

  if (response.data){
    self.processData(response.data,component);

    if (component === 'home'){
      console.log("checking home api call", response.data);
  }

  }

 })

 .catch(function (response) {
    console.log("here is catch error from wp server call", response);


 });



}


processData(data, component){

const {components} = this.state;

//console.log('checking response data',data );

components[component]['text'] = data['content']['rendered'] ;

this.setState({components: components});

}

createHTML(component){

  //console.log("checking component", component);

  //console.log("checking raw html",this.state.components['home']['text']  );
    //console.log("checking parsed html",Parser( this.state.components['home']['text'] )  );
var decodeData = this.state.components[component]['text'] ;

return ({__html: decodeData});
}

  render() {




    return (
      <div  className="careers-container" style={{}}>



<section dangerouslySetInnerHTML={this.createHTML('home')} className="home pattern black-bg animated" id="home" data-animation="fadeIn" data-animation-delay="400" >

</section>





  <section dangerouslySetInnerHTML={this.createHTML('services')} id="services"  className="container container-1 parallax1  ">

  </section>








  <section  dangerouslySetInnerHTML={this.createHTML('howWe')} className=" how-we  " id="how-we">



  </section>

  <section dangerouslySetInnerHTML={this.createHTML('howWeServices')} className=" how-we-services  " id="how-we-services" className="container" >


  </section>






  <section dangerouslySetInnerHTML={this.createHTML('talent')} id="talent"  className="video  relative animated submit-resume  " data-animation="fadeInLeft" data-animation-delay="300">




  </section>



<section   dangerouslySetInnerHTML={this.createHTML('instyAd1')} className="container white-bg animated" data-animation="fadeInRight" data-animation-delay="300">

</section>


<section dangerouslySetInnerHTML={this.createHTML('employers')} id="Employers"  className="video submit-jd  relative animated  " data-animation="fadeInLeft" data-animation-delay="300">



  </section>

<section  dangerouslySetInnerHTML={this.createHTML('instyAd2')} id="instyAd2" className="container white-bg" data-animation="fadeInLeft" data-animation-delay="300">

</section>

<section  id="values" dangerouslySetInnerHTML={this.createHTML('values')} className="values-container  relative animated values-we-live-by  " data-animation="fadeInLeft" data-animation-delay="100">


  </section>

  <section id="valuesContinued" dangerouslySetInnerHTML={this.createHTML('valuesContinued')} style={{marginBottom: "20px"}}  className="container white-bg animated" data-animation="fadeInLeft" data-animation-delay="300">



  </section>

  <section id="contact" dangerouslySetInnerHTML={this.createHTML('contact')} className=" contact-form-custom">


  </section>



  <section id="team"  dangerouslySetInnerHTML={this.createHTML('team')} className="container white-bg-circle-rotated parallax4">



  </section>



  <section  id="footer" dangerouslySetInnerHTML={this.createHTML('footer')}  className="  relative animated footer-section  " data-animation="fadeInLeft" data-animation-delay="100">




  </section>



    <footer  className="footer animated"  data-animation="fadeIn" data-animation-delay="300">


    <p  className="copyright normal grey" style={{fontSize: "14px", width: "85%", marginLeft: "7.5%", padding: "10px"}}>© 2018 MyJobTank. All Rights Reserved. Please find the Terms of Service and Privacy and Security Statement regarding MyJobTank's services.</p>
  </footer>


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

const connectedLanding = connect(mapStateToProps)(Landing);
export { connectedLanding as Landing };
