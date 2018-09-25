import React, { Component } from "react";

import DropDownMenu from "material-ui/DropDownMenu";
import {
  deepOrange500,
  grey300,
  grey400,
  grey500
} from "material-ui/styles/colors";

const rootStyle = {
  borderBottom: "1px solid ",
  borderColor: grey300,
  color: grey500,
  height: "34px",
  width: "100%",
  position: "relative",
  top: "5px",

  "&:hover": {
    border: "1px solid",
    borderColor: deepOrange500
  }
};

const labelStyle = {
  border: "none",
  color: grey400,
  position: "relative",
  top: "-11px",
  height: "34px"
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
              value: undefined,
        };

        this.handleChange = this.handleChange.bind(this);
    }

  handleChange(event, index, value) {this.setState({ value })}

  render() {
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
