import React, { Component } from "react";

import { grey500 } from "material-ui/styles/colors";

import Education from "./Education";

const rowStyles = {
  position: "relative"
};

const addButtonContainer = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  margin: "20px 0",
  minHeight: "100%"
};

const addButtonStyles = {
  cursor: "pointer",
  color: "#009dd6"
};

class EducationContainer extends Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      inputs: this.props.formData.length > 0 ? this.props.formData : [{}],
      refs: [this.props.formData.length]
    };
    this.addEducation = this.addEducation.bind(this);
    this.removeEducation = this.removeEducation.bind(this);
    this.returnInfo = this.returnInfo.bind(this);

    console.log(
      "checking state in EducationContainer",
      this.props.formData["Education"]
    );
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  addEducation(evt) {
    evt.preventDefault();
    this.setState({
      inputs: [...this.state.inputs, this.state.inputs.length],
      refs: [...this.state.refs, this.state.refs.length]
    });
  }

  removeEducation(index) {
    let inputs = [...this.state.inputs];
    let refs = [...this.state.refs];
    inputs.pop();
    refs.pop();

    if (inputs.length > 0) {
      console.log("checking inputs length", inputs.length);
      this.setState({
        inputs,
        refs
      });
    }
  }

  returnInfo() {
    this.state.refs.map((item, index) => {
      let inputs = this.state.inputs;
      inputs[index] = item.returnInfo();
      this.setState({ inputs });
    });
    console.log(
      "checking returninfo in education container before sending it back",
      this.state.inputs
    );
    return this.state.inputs;
  }

  render() {
    return (
      <div>
        <div style={rowStyles} className="row">
          <div style={{ marginLeft: "0" }} className="col-sm-12">
            {this.state.inputs.map((item, index) => (
              <Education
                key={index}
                onRef={ref => (this.state.refs[index] = ref)}
                data={item}
                number={index}
                closeHandler={this.removeEducation}
              />
            ))}
          </div>
        </div>
        <div style={rowStyles} className="row">
          <div style={addButtonContainer} className="col-md-4">
            <a style={addButtonStyles} onClick={this.addEducation}>
              + Add Education
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default EducationContainer;
