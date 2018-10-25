import React, { Component } from "react";

import { grey500 } from "material-ui/styles/colors";

import AttributeInput from "./AttributeInput";

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

class AttributeContainer extends Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      inputs: this.props.formData ? this.props.formData : [{}],
      refs: [this.props.formData ? this.props.formData.length : 0]
    };
    this.addAttribute = this.addAttribute.bind(this);
    this.removeAttribute = this.removeAttribute.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  addAttribute(evt) {
    this.setState({
      inputs: [...this.state.inputs, this.state.inputs.length],
      refs: [...this.state.refs, this.state.refs.length]
    });
  }

  removeAttribute() {
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

    return this.state.inputs;
  }

  render() {
    return (
      <div>
        <div style={rowStyles} className="row">
          <div style={{ marginLeft: "0" }} className="col-md-12">
            {this.state.inputs.map((item, index) => (
              <AttributeInput
                key={item}
                onRef={ref => (this.state.refs[index] = ref)}
                data={item}
                number={index}
                labels={this.props.labels}
                closeHandler={this.removeAttribute}
              />
            ))}
          </div>
        </div>
        <div style={rowStyles} className="row">
          <div style={addButtonContainer} className="col-md-4">
            <a style={addButtonStyles} onClick={this.addAttribute}>
              + Add Attribute
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributeContainer;
