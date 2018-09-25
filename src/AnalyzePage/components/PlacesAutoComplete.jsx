import React, { Component } from "react";

import TextField from "material-ui/TextField";

import { deepOrange500, grey500 } from "material-ui/styles/colors";
import Autocomplete from 'react-google-autocomplete';

const rootStyle = {
  border: "1px solid",
  borderColor: grey300,
  borderRadius: "25px",
  color: grey300,
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
  color: grey500,
  position: "absolute",
  top: "12px",
  fontSize: "12px"
};

const inputStyle = {
  textAlign: "right"
};

const hintStyle = {
  right: "0"
};

const underlineStyle = {
  borderColor: deepOrange500
};

class PlacesAutoComplete extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <label style={labelStyle}>{this.props.labelText}</label>

        <Autocomplete
          style={rootStyle}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          types={['(regions)']}
          componentRestrictions={{country: "us"}}/>
      </div>
    );
  }
}

export default PlacesAutoComplete;
