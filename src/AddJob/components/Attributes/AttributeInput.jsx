import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";

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

class AttributeInput extends Component {
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

        {this.props.labels.map(current => {
          return (
            <div key={current.labelText} className="col-12">
              <InputField
                labelText={current.labelText}
                hintText={current.hintText}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default AttributeInput;
