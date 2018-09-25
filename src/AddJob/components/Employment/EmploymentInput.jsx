import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";

import Dropdown from "../Dropdown";
import InputField from "../InputField";

const dottedContainer = {
  position: "relative",
  border: "1px dashed #ccc",
  padding: "10px 10px 40px",
  margin: "10px 0",
  overflow: "hidden"
};

const iconStyle = {
  color: grey400,
  cursor: "pointer",
  display: "block",
  position: "absolute",
  top: "-5px",
  right: "-5px"
};

const dropdownContainerStyles = {
  height: "48px"
};

class EmploymentInput extends Component {
  render() {
    return (
      <div style={dottedContainer} className="col-12">
        {this.props.number > 0 ? (
          <i
            style={iconStyle}
            className="material-icons"
            onClick={this.props.closeHandler}
          >
            cancel
          </i>
        ) : null}

        <div className="col-6">
          <InputField labelText="Employer" hintText="or Project Name" />
        </div>
        <div className="col-6">
          <div style={dropdownContainerStyles}>
            <Dropdown>
              <MenuItem value={undefined} primaryText="Duration" />
              <MenuItem value={"01"} primaryText="0 - 1 Year" />
              <MenuItem value={"13"} primaryText="1 - 3 Year" />
              <MenuItem value={"35"} primaryText="3 - 5 Year" />
              <MenuItem value={"5+"} primaryText="5+ Year" />
            </Dropdown>
          </div>
        </div>
        <div className="col-6">
          <InputField labelText="Job Position" hintText="or Project Role" />
        </div>
        <div className="col-6">
          <InputField labelText="Startdate" hintText="MM/YYYY" />
        </div>
      </div>
    );
  }
}

export default EmploymentInput;
