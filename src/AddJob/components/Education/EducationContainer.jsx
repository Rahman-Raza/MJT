import React, { Component } from "react";

import { grey500 } from "material-ui/styles/colors";

import Education from "./Education";

const rowStyles = {
  position: "relative"
};

const addButtonContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "0",
  right: "0",
  minHeight: "100%"
};

const addButtonStyles = {
  cursor: "pointer",
  color: grey500
};

class EducationContainer extends Component {
 

  constructor(props) {
        super(props);

        // reset login status
      

        this.state = {
              inputs: [0],
        };
        this.addEducation = this.addEducation.bind(this);
        this.removeEducation = this.removeEducation.bind(this);

    }

  addEducation (evt){
    evt.preventDefault();
    this.setState({
      inputs: [...this.state.inputs, this.state.inputs.length]
    });
  }

  removeEducation() {
    let inputs = [...this.state.inputs];
    inputs.pop();

    if (inputs.length > 0) {
      this.setState({
        inputs
      });
    }
  };

  render() {
    return (
      <div style={rowStyles} className="row">
        <div style={{ marginLeft: "0" }} className="col-md-8">
          {this.state.inputs.map(value => (
            <Education
              key={value}
              number={value}
              closeHandler={this.removeEducation}
            />
          ))}
        </div>
        <div style={addButtonContainer} className="col-md-4">
          <a style={addButtonStyles} onClick={this.addEducation}>
            + Add Attribute
          </a>
        </div>
      </div>
    );
  }
}

export default EducationContainer;
