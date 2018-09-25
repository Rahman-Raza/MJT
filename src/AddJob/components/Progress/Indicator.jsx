import React, { Component } from "react";

import { deepOrange700, grey300, grey500 } from "material-ui/styles/colors";

const indicatorStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "8px 0"
};

const iconStyle = {
  color: deepOrange700,
  display: "block",
  padding: "5px 2px",
  marginRight: "10px",
  fontSize: "30px"
};

const inactiveIconStyle = {
  ...iconStyle,
  color: grey300
};
const labelStyle = {
  color: grey500,
  display: "block",
  padding: "2px",
  marginRight: "10px",
  width: "auto",
  whiteSpace: "nowrap"
};

const dottedIcon = {
  display: "block",
  width: "100%",
  borderBottom: "4px dotted",
  borderColor: grey300
};

class Indicator extends Component {
  render() {
    return (
      <div style={indicatorStyle}>
        <i
          style={this.props.completed ? iconStyle : inactiveIconStyle}
          className="material-icons"
        >
          check_circle
        </i>
        <span style={labelStyle}>{this.props.label}</span>
        <i style={dottedIcon} />
      </div>
    );
  }
}

export default Indicator;
