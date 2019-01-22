import React, { Component, Image} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
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

        },
        values: {

        },
        Employers: {

        },
        howWe:{

        },
        expertise:{

        },
        talent: {

        },
        contact: {

        },


      } 


    };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  this.fetchData = this.fetchData.bind(this);
  this.processData = this.processData.bind(this);

  }

  componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
  this.fetchData('http://34.221.180.21/wp-json/wp/v2/posts/6', 'home');
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}

 fetchData(url,component){

var self = this;

 axios({method: 'get',
    url: url
  
    })
 .then(function (response) {

  console.log("here is data from wp server call", response);

  if (response.data){
    self.processData(response.data,component);
  }

 })

 .catch(function (response) {
    console.log("here is catch error from wp server call", response);


 });



}


processData(data, component){

const {components} = this.state;

components[component]['text'] = data['content']['rendered'] ;

this.setState({components: components});

}



  render() {


  
    
    return (
      <div  classNameName="careers-container" style={{}}>


  <section  className="home pattern black-bg animated" id="home" data-animation="fadeIn" data-animation-delay="400" >
    <div id="slides"  >
      <div  className="home-details visible">

       

      <div id="fadeIn1"  className="fadeIn1">
        <div  className="hometexts-1 " style={{margin:"40px"}}>
    
            <ul  className="slide-text-1 ">
              <li  className="hometext-1 normal ">
              <div  className=" blue" dangerouslySetInnerHTML={{ __html: this.state.components['home']['text'] }}></div>

              </li>


              <li  className="clear"></li>
            </ul>
        </div>

        <div  className="in-line-container row">
   
          <div  className="in-line" style={{margin: "20px 40px"}}>
    
             <h3  className="mjt-orange feature-buttons uppercase"> Talent </h3> 
            <a href="#talent"   className=" mjt-orange home-button uppercase semibold ">meet your opportunity</a>

          </div>

           <div  className="in-line" style={{margin: "20px 40px"}}>
              <h3  className="mjt-orange feature-buttons uppercase"> Employers </h3>
       
              <a href="#Employers"  className="mjt-orange home-button uppercase semibold  ">meet your match</a>

            </div>

        </div>
        

      </div>


    </div>
  </div>
  </section>







  <section id="services"  className="container container-1 parallax1  parallax1 ">
    <div  className="inner mobile-inner">

        <h1  className="header   blue mobile-header">We Deliver Results. Better. Faster.</h1>
   
      <h3  className="grey subheader">My Job Tank offers AI-driven staffing solutions with extraordinary customer service coupled with our global network of elite talent with high-demand STEM skill sets.



      </h3>

      

            <div  className="boxes black">



        <div  className="row boxes-double-row" style={{marginBottom: "50px"}}>
          <div  className="col-xs-5 col-xs-offset-1 about-box animated" data-animation="fadeIn" data-animation-delay="100">

            <div  className="box-click-container">
              <img  src="MJT/images/icons/experts.png" style={{float: "left", width:"20%", margin: "0px 20px"}} />
              <p  className="uppercase normal  about-head"> Our People  <br/> Your Experts</p>
            </div>
            

            
              
                <div  className="collapse-box-content">
                  <br/><br/>
                  <p  className="grey about-text">Our teams of passionate, industry experts are experienced and well-versed in technology trends. </p>
                  <p  className="grey  about-text">Each team member is focused on providing the highest levels of innovative solutions for new enterprises through <br/>  globally iconic companies. </p>

                </div>
              

          </div>


          <div  className="col-xs-5 col-xs-offset-1 about-box animated" data-animation="fadeIn" data-animation-delay="100">

            <div  className="box-click-container">
              <img  src="MJT/images/icons/innovation.png" style={{float: "left", width:"20%", margin: "0px 20px"}} />
              <p  className="uppercase normal  about-head"> AI-Leveraged <br/>  Technology</p>
            </div>
            

            
              
                <div  className="collapse-box-content">
                <br/><br/>
                 <p  className="grey about-text">Our proprietary AI-enabled technology multiplies our talent network, eliminates human bias and greatly reduces talent matching and acquisition time.</p>
                </div>
              

          </div>

      </div>

        <div  className="row row-bottom"  style={{marginBottom: "50px"}}>
    
          <div  className="col-xs-5 col-xs-offset-1 about-box animated" data-animation="fadeIn" data-animation-delay="100">

            <div  className="box-click-container">
              <img  src="MJT/images/icons/focus.png" style={{float: "left", width:"20%", margin: "0px 20px"}} />
              <p  className="uppercase normal  about-head"> Customized,  <br/> Focused Processes </p>
            </div>
            

            
              
                <div  className="collapse-box-content">
                <br/><br/>
                 <p  className="grey about-text">We forecast talent needs and design proactive, customized solutions for today’s fast-moving human capital needs.</p>
            <p  className="grey about-text">We create individualized strategies for highly-skilled tech talent, connecting them to their next career challenge   and exciting opportunity.</p>
                </div>
              

          </div>

          <div  className="col-xs-5 col-xs-offset-1 about-box animated" data-animation="fadeIn" data-animation-delay="100">

            <div  className="box-click-container">
              <img  src="MJT/images/icons/network.png" style={{float: "left", width:"20%", margin: "0px 20px"}} />
              <p  className="uppercase normal  about-head"> International <br/>  Networks</p>
            </div>
            

            
              
                <div  className="collapse-box-content">
                <br/><br/>
                 <p  className="grey about-text">We have access to a deep well of the brightest technical talent from a wide network of international markets, top tier universities and hidden STEM networks. </p>
                </div>
              

          </div>

         </div>
      </div>
    </div>
  </section>





<div id='video-container'>


  <section   className=" how-we  " id="how-we">

    <div  className="inner">

     
        <h1  className="header blue meetheader" >How We Meet Your Needs</h1>

  
      <h3  className=" white subheader-bold" >We’ve separated our services to individually address the goals of each client and candidate.
At My Job Tank, we focus on four lines of business in order to 
identify, target, and meet the needs of our clients with accuracy and efficiency.</h3>


    </div>

  </section>

  <section  className="container" >
    
    <div  className="inner needs-inner">
      <div  className="service-boxes">
        
    
          <div  className="col-xs-3 service-box animated" data-animation="fadeIn" data-animation-delay="100"  >
          
           
      
             <img  src="MJT/images/icons/handshake.png" style={{width: "25%", margin: "20px"}}/> 
            <p  className="uppercase service-header grey extrabold" >Contract Services</p>

             <p  className=" normal  about-text grey text-space"> Staff Augmentation  <br/> Contract to Hire</p>
              
          </div>

          <div  className="col-xs-3 service-box animated" data-animation="fadeIn" data-animation-delay="100"  >
           
           
            
              <img  src="MJT/images/icons/meeting.png" style={{width: "20%", margin: "20px"}} />
            <p  className="uppercase service-header grey extrabold" >Managed Engagements</p>

             <p  className=" normal  about-text grey text-space"> Statement of Work <br/>  Project Based Consulting</p>
              
          </div>
          
          
           <div  className="col-xs-3 service-box animated" data-animation="fadeIn" data-animation-delay="100"  >
          
           
         
               <img  src="MJT/images/icons/human-resources.png" style={{width: "22%", margin: "20px"}} />
            <p  className="uppercase service-header grey extrabold" >Direct Hire</p>

             <p  className="normal  about-text grey text-space"> Contingent Search <br/>  Retained Search</p>
              
          </div>

          <div  className="col-xs-3 service-box animated" data-animation="fadeIn" data-animation-delay="100"  >
          
           
       
              <img  src="MJT/images/icons/connection.png" style={{width: "24%", margin: "20px"}} />
            <p  className="uppercase service-header grey extrabold " >Internship Programs</p>

             <p  className=" normal  about-text grey text-space"> Opportunities and <br/>  Campus Recruitment Programs</p>
              
          </div>




         

        



          <div  className="clear"></div>

        </div> 
      </div>
  </section>













  <section id="expertise"  className="container  industries ">
    <div  className="inner animated inner-bottom-margin"  >

        <h1  className="header blue Placingheader">Placing Specialty Talent Is Our Thing</h1>


      <h3  className=" white subheader subheader-2">We have developed a network of elite talent for in demand STEM skill sets globally.</h3>

    <div  className="wrap animated" data-animation="fadeInLeft" data-animation-delay="100">
      <div  className="tile longer"> 
       
        <div  className="text">

          <div  className="box-click-container">
             <img  src="MJT/images/icons/expertise%20icon%20finance.png"  className=""  />
            <h1  className=" uppercase grey extrabold" style={{marginTop: "20px"}}>Banking and Finance</h1>
          </div>

        <div  className="collapse-box-content">
             <li >ERP, CRM, and all other HR and banking applications infrastructure, storage, cloud support</li>
                  <li > Security and compliance roles </li>
                    <li > (IDS, IPS, Pen testing, SOX, Threat analysis)</li>
                      <li >Analytics, pricing and risk management including product specific tools </li>
                       <li > Quantitative Analysis and Desk/User Support</li>
                      <li >Product specific Business Analysis and Project Management Helpdesk and desktop support roles </li>
                      <li> Database design and support </li>
                       
        </div>     
             
        
      <div  className="dots">
           <span></span>
          <span></span>
          <span></span>
        </div>
        </div>


       </div>


      <div  className="tile longer"> 
              
              
        <div  className="text one-line-padding-high">

          <div  className="box-click-container">
             <img  src="MJT/images/icons/Combined%20Shape.png"  className=""  />
            <h1  className=" uppercase grey extrabold"  style={{marginTop: "20px"}}>High Tech</h1>
          </div>

        <div  className="collapse-box-content">
             
             <li >Software Engineering (Front-End, Back-End, Full stack)</li>
                  <li >Machine Learning &amp; Big Data</li>
                    <li >User Experience, UI/UX</li>
                      <li >Cloud Architecture</li>
                       <li >DevOps, Site Reliability Engineers, System Engineers</li>
                      <li >Project &amp; Program Management</li>
                        <li >Business Analysis</li>
                        <li >Cyber Security</li>
                       
        </div>     
             
        
      <div  className="dots">
        
        </div>
        </div>
       </div>
  
        <div  className="tile longer"> 
           
             
        <div  className="text">

          <div  className="box-click-container">
             <img  src="MJT/images/icons/broadcasting.png"  className=""  />
            <h1  className=" uppercase grey extrabold"  style={{marginTop: "20px"}}>Media and Broadcasting</h1>
          </div>

        <div  className="collapse-box-content">
            <li  className="">Creative &amp; Digital Roles</li>
                <li >Front-End Creative Applications (Ruby, Python, Java) Security &amp; Threat Analysis</li>
                  <li >Quantitative Analysis &amp; Desk/User Support</li>
                    <li >Quality Assurance &amp; Test Infrastructure Cloud &amp; Security</li>
                     <li >Product-Specific Business Analysis, Project Management Analytics, Business Intelligence, Data Scientists, Hadoop</li>
                       
        </div>     
             
        
      <div  className="dots">
        
        </div>
        </div>
          </div>
      </div>
        
  
    
    <div  className="wrap animated" data-animation="fadeInLeft" data-animation-delay="300">
      <div  className="tile shorter"> 
       
        <div  className="text one-line-padding-high">

          <div  className="box-click-container">
             <img  src="MJT/images/icons/expert.png"  className=""  />
            <h1  className=" uppercase white extrabold"  style={{marginTop: "20px"}}>Retail</h1>
          </div>

        <div  className="collapse-box-content">
          <li >POS Applications Support</li>
            <li >Analytics, Pricing &amp; Risk Management Component Development &amp; Support</li>
              <li >Security &amp; Compliance (PCI, SOX DFS)</li>
                <li >Product specific Business Analysis and Project Management End user support</li>
                 <li >Big Data Hadoop For Customer Analytics</li>
                  <br/>     
        </div>     
             
        
      <div  className="dots">
        
        </div>
        </div>
       </div>


      <div  className="tile shorter"> 
        
        <div  className="text one-line-padding">

          <div  className="box-click-container">
             <img  src="MJT/images/icons/industry.png"  className=""  />
            <h1  className=" uppercase white extrabold" style={{marginTop: "20px"}}>Additional  industries</h1>
          </div>
         
        <div  className="collapse-box-content">
          <li >Government Management Consulting</li>
            <li >Insurance</li>
              <li >Airlines and Transportation</li>
                 <br/>      
        </div>     
             
        
      <div  className="dots">
        
        </div>
        </div>
       </div>
  
        <div  className="tile shorter"> 
       
        <div  className="text one-line-padding-high">

          <div  className="box-click-container">
             <img  src="MJT/images/icons/phar.png"  className=""  />
            <h1  className=" uppercase white extrabold"  style={{marginTop: "20px"}}>Pharmaceutical</h1>
          </div>
         
        <div  className="collapse-box-content">
          <li >Compliance, Regulation &amp; Security</li>
            <li >Big Data, AI/Business Intelligence, ERP &amp; EMR Systems Testing &amp; Quality Control</li>
              <li >Quantitative Analysis &amp; Desk/User Support</li>
                   <br/>    
        </div>     
             
        
      <div  className="dots">
        
        </div>
        </div>
       </div>
      </div>





        <h1  style={{marginTop: "100px"}}  className="header   blue">AI-Fast Solutions</h1>
      
      <h3  style={{marginBottom: "100px"}}  className="grey subheader">We leverage AI, intensive screening, and vetting processes to ensure the best match. </h3>

      <div  className="row">
        <div  className="col-xs-12">
          <img src="MJT/images/ai-chart.png" alt="" />
        </div>
      </div>




    </div>
    


     
        
  
    
  </section>
  <section id="talent"  className="video  relative animated submit-resume  " data-animation="fadeInLeft" data-animation-delay="300">




  <div  className=" center-of-page">
    <div  className="row ">
      <div  className="col-xs-2 ">
      </div>
      <div  className="col-md-8  center-text mobile-text">
        <h1  className="header   blue" >Talent,  Meet  Your  Opportunity.</h1>
   
        <h3  className="white subheader">We will partner with you to create a long-term strategy to an exciting, successful career with today’s fast-moving companies. Have a conversation with us today about your career goals and where you’d like to be. We can help define your market value and advise you on your next big move.

        </h3>

         <h4  className=" white">Looking For a Job?

        </h4>

        
      </div>
      <div  className="col-xs-2 ">
      </div>
    </div>

  </div>

  <div  className="job-button home-details home-box">
    <div  className="in-line in-line-button" >

            <a href="/resume"   className="  clear-button scroll uppercase semibold home-button">
                    Submit your resume
            </a>

    </div>

     <div  className="in-line in-line-button" >
        
     
             <a href="/careers" target="_blank"  className=" clear-button-big scroll uppercase semibold  home-button">
           See Our Openings </a>

  </div>

 
</div>





  </section>













<section   className="container white-bg animated" data-animation="fadeInRight" data-animation-delay="300">
  <div  className="inner mobile-inner-1">
 
      <h1  className="header blue mobile-header">So, How Does Your Resume Stack Up?</h1>

     
      <h3  className=" subheader-1 grey sub-text">Let InstyMatch show you. In Seconds.</h3>

      <h3  className=" light blue ">Curious about your competition?   </h3>

        <h3  className=" grey subheader-3 max-width-75" >Our Instymatch app shows how your resume compares against others competing for
        that juicy gig - in literally seconds. Tell us what position you’re considering, upload your resume and see 
        where you stand in the rankings amongst the others in our database 
        who are vying for a similar position. 
      </h3>

      

       <a href="/instymatch"   className=" mjt-orange try-button uppercase semibold home-button">Try InstyMatch </a>
    </div>
</section>


<section id="Employers"  className="video submit-jd  relative animated  " data-animation="fadeInLeft" data-animation-delay="300">




  <div  className=" center-of-page">
    <div  className="row match-box">
      <div  className="col-xs-2 ">
      </div>
      <div  className="col-md-8  center-text">
        <h1  className="header  blue"  >Employers,  Meet  Your  Match.</h1>
    
        <h3  className="white meetyourmatch-subtext subheader"> 

          As a leader of technology initiatives, your project and outcomes are critically dependent on accessing and 
          having highly-skilled players on your team. MJT is well-placed to harness highly competitive 
            and elusive talent markets in the most important tech hubs in the US and in China.

             <br/>
            

            Using our proprietay AI/ML platform, we deliver efficicent, speedy matching 
            results and customized solutions.



        </h3>

      
     
      </div>

      <div  className="col-xs-2 ">
      </div>



  </div>

</div>
<div  className="home-details home-box">
  <div  className="in-line" >
    
         <h4   className="feature-buttons white"> Have a position to fill? </h4> 
          <a href="/joborder"   className="  clear-button scroll uppercase semibold home-button">
                  Tell us more
          </a>

  </div>

  <div  className="in-line">
          <h4  className="feature-buttons white"> Have a question? </h4>
     
             <a href="#contact"  className=" clear-button uppercase semibold home-button ">
           Contact us </a>

  </div>
</div>
     
      

  </section>

<section   className="container white-bg" data-animation="fadeInLeft" data-animation-delay="300">
  <div  className="inner bottom-instymatch">

      <h1  className="header blue blueheader">InstyMatch:   your unbiased candidate rating system. </h1>

    
      <h3  className=" subheader grey " >Super fast and free.</h3>

      
   
   
    
        <h1  className="header   blue blueheader">Seeking an impartial ranking of your candidate lineup?</h1>
 
        <h4   className=" grey max-width-75">Let InstyMatch show how your candidates stack up - in literally a few seconds. Upload up to ten resumes, click submit and you’ll see how each one ranks in terms of qualification, experience and suitability for the job. </h4>

         <h4   className=" grey max-width-75">
          Or, pit a single resume against up to the top ten in our extensive database who would be
          vying for a similar position.

        </h4>

        <h4   className="  grey max-width-75">
         Upload up to ten scoring requests a day.

        </h4>

        <div  style={{marginTop: "50px"}}>
          <a href="/instymatch"    className=" mjt-orange try-button uppercase semibold home-button">Try InstyMatch </a>
        </div>

        
  
   
 


     
    </div>
</section>

<section  id="values"  className="values-container  relative animated values-we-live-by  " data-animation="fadeInLeft" data-animation-delay="100">


  <div  className="inner">

        <h1  className="header blue blueheader">Because These Are Values We Live By</h1>



         <h3 style={{width: "65%", marginLeft: "17.5%"}}  className=" subheader white ">Our core values are embodied by our team members and fuel our approach to 
            delighting every client we serve.</h3>


    </div>

  </section>

  <section  style={{marginBottom: "20px"}}  className="container white-bg animated" data-animation="fadeInLeft" data-animation-delay="300">

    <div  className="inner-no-margin">


     <div  className="features-boxes black middle value-box">

       
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="100">
         
          <a  className="f-icon orange">
            <img src="MJT/images/icons/value/value-1.png"  style={{width: "30%"}} />
          </a>
          
          <p  className="feature-head uppercase extrabold grey">Superior customer service</p>
       

        </div>


       
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="200">
         
          <a  className="f-icon orange">
            <img src="MJT/images/icons/value/icon02.png" style={{width: "26%"}} />
          </a>
         
          <p  className="feature-head uppercase extrabold grey">Integrity</p>
       

        </div>


      
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="300">
         
          <a  className="f-icon orange">
            <img src="MJT/images/icons/value/icon03.png" style={{width: "26%"}} />
          </a>
          
          <p  className="feature-head uppercase extrabold grey">Gratitude and respect</p>
        

        </div>


       
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="400">
         
          <a  className="f-icon orange">
             <img src="MJT/images/icons/value/icon04.png" style={{width: "26%"}} />
          </a>
          
          <p  className="feature-head uppercase extrabold grey">Change in the lives of those we serve</p>
          

        </div>


        
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="500">
      
          <a  className="f-icon orange">
             <img src="MJT/images/icons/value/icon05.png" style={{width: "30%"}} />
          </a>
        
          <p  className="feature-head uppercase extrabold grey">Commitment to charities and our communities</p>
         

        </div>


        
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="600">
         
          <a  className="f-icon orange">
            <img src="MJT/images/icons/value/icon06.png" style={{width: "24%"}} />
          </a>
          
          <p  className="feature-head uppercase extrabold grey">International collaboration</p>
     

        </div>

       
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="700">
        
          <a  className="f-icon orange">
            <img src="MJT/images/icons/value/icon07.png" style={{width: "27%"}} />
          </a>
         
          <p  className="feature-head uppercase extrabold grey">Strength in Diversity</p>
        

        </div>

      
        <div  className="col-xs-9 f-box animated" data-animation="fadeIn" data-animation-delay="800">
         
          <a  className="f-icon orange">
            <img src="MJT/images/icons/value/icon08.png" style={{width: "27%"}} />
          </a>
        
          <p  className="feature-head uppercase extrabold grey">Fun along the way</p>
         

        </div>






      </div>

    </div> 

  </section>

  <section id="contact"  className=" contact-form-custom">
   
    <div  className="inner contact">

        <h1  className="header blue blueheader">Have A General Question? </h1>



      
     <h3 style={{width: "65%", marginLeft: "17.5%"}}  className=" subheader white ">Tell us how we can help you:</h3>

    
   

      
      <div  className="contact-form">
        
        <form id="contact-us" method="post" action="/contact_form">

          <div  className="row">
            <div  className="col-xs-6 animated" data-animation="fadeInLeft" data-animation-delay="300">
              
              <input type="text" name="firstname" id="firstname" required="required"  className="form " placeholder="First Name" />
            </div>

             <div  className="col-xs-6 animated" data-animation="fadeInLeft" data-animation-delay="300">
                
              <input type="text" name="lastname" id="lastname" required="required"  className="form " placeholder="Last Name" />
            </div>

          </div>
          
          <div  className="row">
            <div  className="col-xs-6 animated" data-animation="fadeInLeft" data-animation-delay="300">
               
              <input type="text" name="subject" id="subject" required="required"  className="form " placeholder="Job Position" />
            </div>

             <div  className="col-xs-6 animated" data-animation="fadeInLeft" data-animation-delay="300">
              
              <input type="text" name="company" id="company" required="required"  className="form " placeholder="Company" />
            </div>

          </div>
          <div  className="row">
            <div  className="col-xs-6 animated" data-animation="fadeInLeft" data-animation-delay="300">
              
                  <input type="email" name="email" id="email" required="required"  className="form " placeholder="Email Address" />
            </div>

             <div  className="col-xs-6 animated" data-animation="fadeInLeft" data-animation-delay="300">
                
              <input type="text" name="phone" id="phone" required="required"  className="form " placeholder="Phone Number" />
            </div>

          </div>
            

          
    
     
          <div  className="relative fullwidth col-xs-12">
             <textarea name="message" id="message"  className="form textarea "  placeholder="Type your message here"></textarea>
           
            <button type="submit" id="submit" name="submit"  className="form-btn ">Send Message</button> 
          </div>
          
          <div  className="clear"></div>
        </form>

    
        <div  className="mail-message-area">
      
          <div  className="alert gray-bg mail-message not-visible-message">
            <strong>Thank You !</strong> Your message has been delivered.
          </div>
        </div>

      </div>
    </div>
  </section>



  <section id="team"  className="container white-bg-circle-rotated parallax4">

   
    <div  className="inner team bottom-instymatch-1">

      <h1  className="header  blue blueheader">Our People.  Your Experts.  <br/> In A City Near You.</h1>
       
        <h5  className="  grey max-width-75 sub-grey">MJT teams are located in three prime tech and service hubs 
in the US and in China. With over 100 years of combined experience in the staffing industry, our 
leaders and teams of experts value superior customer and client service above all else. </h5> 

<h5  className=" grey max-width-75 sub-grey">
Let us help you actualize your upcoming project or long-term
technology initiatives with the right high-skilled talent. 
        </h5>

         <h1  className="header   blue blueheader">Contact Us Today!</h1>






     
      <div style={{marginTop: "100px", marginBottom: "10px"}}  className="team-members inner-details animated "   data-animation="fadeInRight" data-animation-delay="100">

      
        <div  className="row contact-detail-row" >
            

            <div  className="col-xs-2"></div>

          <div  className="col-xs-7 member" >
            <div  className="member-inner">
            
              <a  className="team-image">
           
                <img src="MJT/images/team/SF.png" alt=""  />
              </a>
              
            </div> 
           

          </div>

          <div  className="col-xs-6 col-xs-offset-1 member2">
           

                  <div  className="row">
                  <span  className="sameliny"> 

                   <a style={{marginRight: "20px"}} href="mailto:info@myjobtank.com">
                      <img src="MJT/images/icons/mail-black-envelope-symbol.png" />
                    </a>

                    <a href="mailto:info@myjobtank.com">
                      <h4  className="lefttt member-name normal black">info@myjobtank.com</h4> 
                    </a>
                  </span>

                    </div>

                    <div  className="row">
                 <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} >
                      <img src="MJT/images/icons/call.png"  />
                    </a>

                    <h4  className="lefttt member-name normal black">+1.415.795.7488</h4>

                  </span>

                </div>

            
              
            <div  className="row">
                <span  className="sameliny"> 

                     <a style={{marginRight: "20px"}} href="https://www.linkedin.com/company/my-job-tank-inc/">
                      <img src="MJT/images/icons/linkedin-logo.png"  />
                    </a>

                    <a  href="https://www.linkedin.com/company/my-job-tank-inc/">
                    <h4  className="lefttt member-name normal black overflow">https://www.linkedin.com/company/my-job-tank-inc/</h4>
                    </a>

                  </span>
                </div>

              <div  className="row">
                  <span  className="sameliny"> 

                      <a style={{marginRight: "20px"}} href="https://goo.gl/maps/xn9fyKKQzHD2">
                      <img src="MJT/images/icons/location.png"  />
                    </a>

                    <a  href="https://goo.gl/maps/xn9fyKKQzHD2">
                    <h4  className="lefttt member-name normal black">600 California St. FL 12, San Francisco, CA 94108</h4>
                  </a>
                  </span>

                </div>

              

          </div>

         
       </div>





       <div  className="row contact-detail-row" >
            

            <div  className="col-xs-2"></div>

          <div  className="col-xs-7 member" >
            <div  className="member-inner">
             
              <a  className="team-image">
               
                <img src="MJT/images/team/SEATTLE.png" alt=""  />
              </a>
              
            </div> 

           

          </div>

          <div  className="col-xs-6 col-xs-offset-1 member2">
           

           

                  <div  className="row">
                  <span  className="sameliny"> 

                   <a style={{marginRight: "20px"}} href="mailto:info@myjobtank.com">
                     <img src="MJT/images/icons/mail-black-envelope-symbol.png"  />
                    </a>

                    <a  href="mailto:info@myjobtank.com">
                    <h4  className="lefttt member-name normal black overflow">info@myjobtank.com</h4> 
                   </a>
                  </span>

                    </div>

                    <div  className="row">
                 <span  className="sameliny"> 

                   <a style={{marginRight: "20px"}} >
                      <img src="MJT/images/icons/call.png"  />
                    </a>

                    <h4  className="lefttt member-name normal black">+1.206.267.1122</h4>

                  </span>

                </div>

            

              
            <div  className="row">
                <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} href="https://www.linkedin.com/company/my-job-tank-inc/">
                      <img src="MJT/images/icons/linkedin-logo.png"  />
                    </a>

                    <a  href="https://www.linkedin.com/company/my-job-tank-inc/">
                    <h4  className="lefttt member-name normal black overflow">https://www.linkedin.com/company/my-job-tank-inc/</h4>
                    </a>

                  </span>
                </div>

              <div  className="row">
                  <span  className="sameliny"> 

                  <a style={{marginRight: "20px"}} href="https://goo.gl/maps/8ojC3v2ozNp">
                      <img src="MJT/images/icons/location.png"  />
                    </a>

                    <a  href="https://goo.gl/maps/8ojC3v2ozNp">
                    <h4  className="lefttt member-name normal black">10400 NE 4th Street Bellevue, WA 98004</h4>
                    </a>

                  </span>

                </div>

              

          </div>

         
       </div>

       <div  className="row contact-detail-row" >
            

            <div  className="col-xs-2"></div>

          <div  className="col-xs-7 member" >
            <div  className="member-inner">
              
              <a  className="team-image">
              
                <img src="MJT/images/team/NYC.png" alt=""  />
              </a>
              
            </div> 

           

          </div>

          <div  className="col-xs-6 col-xs-offset-1 member2">
           

                 

                  <div  className="row">
                  <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} href="mailto:info@myjobtank.com">
                      <img src="MJT/images/icons/mail-black-envelope-symbol.png"  />
                    </a>

                    <a href="mailto:info@myjobtank.com">
                      <h4  className="lefttt member-name normal black">info@myjobtank.com</h4> 
                    </a>

                  </span>

                    </div>

                    <div  className="row">
                 <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} >
                      <img src="MJT/images/icons/call.png"  />
                    </a>


                    <h4  className="lefttt member-name normal black">+1.646.568.4717</h4>

                  </span>

                </div>

              
            <div  className="row">
                <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} href="https://www.linkedin.com/company/my-job-tank-inc/">
                      <img src="MJT/images/icons/linkedin-logo.png"  />
                    </a>

                    <a  href="https://www.linkedin.com/company/my-job-tank-inc/">
                      <h4  className="lefttt member-name normal black overflow">https://www.linkedin.com/company/my-job-tank-inc/</h4>
                    </a>

                  </span>
                </div>

              <div  className="row">
                  <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} href="https://goo.gl/maps/SQvVXTUPQK62">
                      <img src="MJT/images/icons/location.png"  />
                    </a>

                    <a  href="https://goo.gl/maps/SQvVXTUPQK62">
                      <h4  className="lefttt member-name normal black">1460 Broadway, 5th floor, New York, NY 10036</h4>
                    </a>

                  </span>

                </div>

              

          </div>

         
       </div>

       <div  className="row contact-detail-row" >
            

            <div  className="col-xs-2"></div>

          <div  className="col-xs-7 member" >
            <div  className="member-inner">
             
              <a  className="team-image">
               
                <img src="MJT/images/team/SHANGHAI.png" alt=""  />
              </a>
              
            </div> 

           

          </div>

          <div  className="col-xs-6 col-xs-offset-1 member2">
           

            

                  <div  className="row">
                  <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} href="mailto:info@myjobtank.com">
                      <img src="MJT/images/icons/mail-black-envelope-symbol.png"  />
                    </a>

                    <a  href="mailto:info@myjobtank.com">
                      <h4  className="lefttt member-name normal black overflow">info@myjobtank.com</h4> 
                    </a>

                  </span>

                    </div>

                    <div  className="row">
                 <span  className="sameliny"> 

                     <a style={{marginRight: "20px"}} >
                      <img src="MJT/images/icons/call.png"  />
                    </a>

                    <h4  className=" lefttt member-name normal black">+86.21.5266.0132</h4>

                  </span>

                </div>

              
            <div  className="row">
                <span  className="sameliny"> 

                    <a style={{marginRight: "20px"}} href="https://www.linkedin.com/company/my-job-tank-inc/">
                       <img src="MJT/images/icons/linkedin-logo.png"  />
                    </a>

                    <a  href="https://www.linkedin.com/company/my-job-tank-inc/">
                     <h4  className=" lefttt member-name normal black overflow">https://www.linkedin.com/company/my-job-tank-inc/</h4>
                    </a>

                  </span>
                </div>

              <div  className="row">
                  <span  className="sameliny"> 

                     <a style={{marginRight: "28px"}} href="https://goo.gl/maps/qvCw4W9L9qT2">
                     <img src="MJT/images/icons/location.png"  />
                    </a>

                    <a style={{marginRight: "28px"}} href="https://goo.gl/maps/qvCw4W9L9qT2">
                      <h4 style={{marginLeft: "-7px"}}  className=" lefttt member-name normal black">No. 468 Nanjing West Road, Jing’an District, 
                        Shanghai, People's Republic of China</h4>
                    </a>

                  </span>

                </div>

              

          </div>

         
       </div>







       







       
        <div  className="clear"></div>
      </div>
    </div>
  </section>

  


</div>




  <section   className="  relative animated footer-section  " data-animation="fadeInLeft" data-animation-delay="100">




  
    <div  className="row " style={{width: "85%", marginLeft: "7.5%", marginTop: "75px"}}>
      <div  className="col-xs-2">
       
          <a href="#home"  className="scroll logo">
         
            <img  src="MJT/images/logo-mjt.png" alt="Logo"  />
          </a>
        
      </div>

      <div  className="col-xs-6  center-text">
    

        
      </div>
      <div  className="col-xs-4 ">

        <div  className="col-xs-6 animated" data-animation="fadeIn" data-animation-delay="300">
          <a href="/careers"> <h4  className="uppercase green">Careers at MJT </h4> </a>
          </div>
          <div  className="col-xs-6 animated" data-animation="fadeIn" data-animation-delay="300">
          <a href="https://www.linkedin.com/company/my-job-tank-inc/"><h4  className="uppercase green">LinkedIn</h4> </a>
          </div>
      </div>


    </div>
    <div  className="row footer-text" style={{width: "85%", marginLeft: "7.5%"}}>
 
     <h3  className="  white">My Job Tank is a technology-driven human capital resource specializing in high-skilled technical talent solutions. MJT offers strategic partnerships with dynamic companies, leveraging an innovative AI platform that offers fast, efficient talent matching paired with exceptional personalized service. Our specialist teams in San Francisco, New York City, Seattle, and Shanghai deliver results as we delight today's fast-moving organizations and highly skilled talent with advanced strategies on an international scale.

          </h3>
 
    </div>



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
