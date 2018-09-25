import React, { Component } from "react";

import { grey500 } from "material-ui/styles/colors";

import AttributeInput from "./AttributeInput";

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

class AttributeContainer extends Component {


   constructor(props) {
        super(props);

        // reset login status
      

        this.state = {
             inputs: [0],
        };
        this.addAttribute = this.addAttribute.bind(this);
        this.removeAttribute = this.removeAttribute.bind(this);

    }


  addAttribute(evt){
    evt.preventDefault();
    this.setState({
      inputs: [...this.state.inputs, this.state.inputs.length]
    });
  };

  removeAttribute()  {
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
            <AttributeInput
              key={value}
              number={value}
              labels={this.props.labels}
              closeHandler={this.removeAttribute}
            />
          ))}
        </div>
        <div style={addButtonContainer} className="col-md-4">
          <a style={addButtonStyles} onClick={this.addAttribute}>
            + Add Attribute
          </a>
        </div>
      </div>
    );
  }
}

export default AttributeContainer;
