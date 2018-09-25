import React from "react";

import AppBar from "material-ui/AppBar";

// Material UI Imports

import blueGrey800 from "material-ui/styles/colors";

const titleStyle = {
  color: blueGrey800,
  fontFamily: "Roboto",
  position: "relative",
  left: "20%"
};

const style = {
  backgroundColor: "#FFF"
};

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <AppBar
          title="My Job Tank"
          iconStyleLeft={{ display: "none" }}
          titleStyle={titleStyle}
          style={style}
        />
      </header>
    );
  }
}

export default Header;
