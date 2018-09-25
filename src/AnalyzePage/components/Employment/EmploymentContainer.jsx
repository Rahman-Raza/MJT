import React, { Component } from "react";

import { grey500 } from "material-ui/styles/colors";

import EmploymentInput from "./EmploymentInput";

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
  color: "#72C4CC"
};

class EmploymentContainer extends Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      inputs: this.props.formData.length > 0 ? this.props.formData : [{}],
      refs: [this.props.formData.length]
    };
    this.addEmployment = this.addEmployment.bind(this);
    this.removeEmployment = this.removeEmployment.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  addEmployment(evt) {
    evt.preventDefault();
    this.setState({
      inputs: [...this.state.inputs, this.state.inputs.length],
      refs: [...this.state.refs, this.state.refs.length]
    });
  }

  removeEmployment(index) {
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
      <div style={rowStyles} className="row">
        <div style={{ marginLeft: "0" }} className="col-md-12">
          {this.state.inputs.map((item, index) => (
            <EmploymentInput
              key={this.state.refs[index]}
              onRef={ref => (this.state.refs[index] = ref)}
              data={item}
              number={index}
              closeHandler={this.removeEmployment}
            />
          ))}
        </div>
        <div style={addButtonContainer} className="col-md-4">
          <a style={addButtonStyles} onClick={this.addEmployment}>
            + Add Employment History
          </a>
        </div>
      </div>
    );
  }
}

export default EmploymentContainer;
