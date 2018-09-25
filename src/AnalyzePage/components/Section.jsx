import React, { Component } from "react";

const containerStyle = {
  maxWidth: "100%",
  position: "relative",
  zIndex: "100"
};
const containerStyle2 = {
  maxWidth: "75%",
  position: "relative",
  zIndex: "100"
};

const headingStyle = {
  fontSize: "20px",
  fontWeight: "400",
  color: "#72C4CC",
  marginBottom: "30px"
};

function getContainerStyle(size) {
  if (size) {
    return containerStyle2;
  } else return containerStyle;
}

class Section extends Component {
  render() {
    return (
      <div style={this.props.style}>
        <section
          style={getContainerStyle(this.props.containerSize)}
          className="container"
        >
          {this.props.heading ? (
            <h1 style={headingStyle}>{this.props.heading}</h1>
          ) : null}

          <div>{this.props.children}</div>
        </section>
      </div>
    );
  }
}

export default Section;
