import React, { Component } from "react";

import DropDownMenu from "material-ui/DropDownMenu";
import {
  deepOrange500,
  grey300,
  grey400,
  grey500
} from "material-ui/styles/colors";

const rootStyle = {
  borderColor: grey300,
  backgroundColor: "#F3F3F3",
  borderRadius: "25px",
  color: grey500,
  height: "44px",
  width: "100%",
  position: "relative",
  top: "23px",

  "&:hover": {
    border: "1px solid",
    borderColor: deepOrange500
  }
};

const labelStyle = {
  top: "-5px",
  left: "-10px",
};

const iconStyle = {
  top: "-5px"
};

const underlineStyle = {
  display: "none"
};

const menuStyle = {
  position: "relative",
  borderRadius: "25px"
};

const menuItemStyle = {
  "&:hover": {
    backgroundColor: grey500
  }
};

const listStyle = {};

class Dropdown extends Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      value: this.props.startValue
    };

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
  }

  componentDidMount() {
    this.props.onRef ? this.props.onRef(this) : console.log("do nothing");
  }

  returnInfo() {
    return this.state.value;
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  render() {
    console.log("checking dropdown state", this.state.value);
    return (
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        autoWidth={false}
        menuStyle={menuStyle}
        menuItemStyle={menuItemStyle}
        labelStyle={labelStyle}
        iconStyle={iconStyle}
        listStyle={listStyle}
        underlineStyle={underlineStyle}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        style={rootStyle}
      >
        {this.props.children}
      </DropDownMenu>
    );
  }
}

export default Dropdown;
