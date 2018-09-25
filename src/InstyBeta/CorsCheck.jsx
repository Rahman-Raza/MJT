import React, { Component } from "react";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import Section from "./components/Section";
import { connect } from "react-redux";


const pics = [
  'https://image.ibb.co/n1rDHp/bg_landing_1.png',
  'https://image.ibb.co/dANW3U/bg_landing_2.png',
  'https://image.ibb.co/frqJiU/bg_landing_3.png',
];

class CorsCheck extends Component {

   constructor(props) {
    super(props);
     const idxStart = 0;
     

     this.state = {
      index: idxStart,
      next: this.getNextIndex(idxStart),
      move: false,
    };

    this.getInfoPost = this.getInfoPost.bind(this);
    this.getInfoGet = this.getInfoGet.bind(this);
    }

   // confirmationemailuser/

   getNextIndex(idx) {
    if (idx >= pics.length - 1) {
      return 0;
    }
    return idx + 1;
  }

  setIndexes(idx) {
    this.setState({
      index: idx,
      next: this.getNextIndex(idx)
    });
  }
  componentDidMount() {
    
    setInterval(() => {
      // on
      this.setState({
        move: true
      });
      // off
      setTimeout(() => {
        this.setState({
          move: false
        });
        this.setIndexes(this.getNextIndex(this.state.index));
      }, 500); // same delay as in the css transition here
     
    }, 1300);
  }

    getInfoPost(){
	  axios.post('http://18.206.187.45:8080/instantmatcher/', { })
      .then(res => {
        console.log("checking POST with cors proxy",res);
        console.log(res.data);
      })
    }

      getInfoGet(){
	  

	  axios.get('/check-cors')

        	.then(res => {
        		console.log("done with GET to server", res);
        	});
    }


	render() {
		const move = this.state.move ? 'move' : '';

		return (
				
					 
		 <Section
                containerSize={0}
                style={{
                  marginTop: "30px",
                  height: "800px",
                  color: "#72C4CC"
                }}
              >

         
        <div className="pic-wrapper">
          <div className={'current pic ${move}'}>
            
            <img src={pics[this.state.index]} alt="" />
          </div>
          
        </div>

         <RaisedButton
                   
                    className="rounded-button"
                    onClick={this.getInfoGet}
                    label="Submit"
                    type="submit"
                    Rounded={true}
                    
                    primary={true}
                  />
      

				</Section>		

						
					

					
					
				

			
		);
	}
}

function mapStateToProps(state) {



  return {
    
 
  };
}

const connectedCorsCheck = connect(mapStateToProps)(CorsCheck);
export { connectedCorsCheck as CorsCheck };

