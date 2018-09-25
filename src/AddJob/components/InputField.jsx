import React, { Component } from "react";

import TextField from "material-ui/TextField";

import { deepOrange500, grey500 } from "material-ui/styles/colors";

const labelStyle = {
  color: grey500,

  top: "12px",
  fontSize: "20px",
  fontWeight: "700",
  color: "#666"
};
const headingStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#666",
  marginBottom: "30px"
};

const inputStyle = {
  textAlign: "left"
};

const hintStyle = {
  right: "0"
};

const underlineStyle = {
  borderColor: deepOrange500
};

class InputField extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <label style={labelStyle}>{this.props.labelText}</label>
        <TextField
          multiLine={this.props.multiLine}
          fullWidth={true}
          rows={this.props.rows}
          rowsMax={4}
          className="text-field"
          inputStyle={inputStyle}
          hintStyle={hintStyle}
          underlineFocusStyle={underlineStyle}
          hintText={this.props.hintText}
          style={{
            fontSize: "14px"
          }}
        />
      </div>
    );
  }
}

export default InputField;
