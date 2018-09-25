import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";

import InputField from "../InputField";

const dottedContainer = {
  position: "relative",
  border: "1px solid #72C4CC",
  borderRadius: "25px",
  padding: "40px 10px 30px",
  margin: "10px 0",
  overflow: "hidden"
};

const iconStyle = {
  color: grey400,
  cursor: "pointer",
  display: "block",
  position: "absolute",
  top: "0",
  right: "0"
};

class AttributeInput extends Component {
  constructor(props) {
    super(props);

    var data = {};

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);

    if (this.props.data.Name) {
      data = {
        Name: this.props.data.Name,
        Date: this.props.data.Date
      };
    } else {
      data = {
        Name: "",
        Date: ""
      };
    }

    this.state = {
      formData: data
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  handleChange(event) {
    const { formData } = this.state;

    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  }

  returnInfo() {
    return this.state.formData;
  }
  render() {
    return (
      <div style={dottedContainer} className="col-sm-12">
        {this.props.number > 0 ? (
          <i
            style={iconStyle}
            className="material-icons"
            onClick={this.props.closeHandler}
          >
            cancel
          </i>
        ) : null}

        {this.props.labels.map(current => {
          return (
            <div key={current.labelText} className="col-sm-6">
              <InputField
                name={current.name}
                onChangeValue={this.handleChange}
                labelText={current.labelText}
                hintText={
                  this.state.formData[current.name] === ""
                    ? current.hintText
                    : this.state.formData[current.name]
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default AttributeInput;
