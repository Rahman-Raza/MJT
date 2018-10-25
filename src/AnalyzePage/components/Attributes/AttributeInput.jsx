import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";


import TextField from "material-ui/TextField";

const dottedContainer = {
  position: "relative",
  border: "1px solid #ffb81b",
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

const root = {
  position: "relative",
  margin: "20px 0"
};

const labelStyle = {
  color: "#009dd6",
  position: "absolute",
  top: "-30px",
  fontSize: "12px"
};

const inputStyle = {
  backgroundColor: "rgba(243,243,243,0.4)",
  borderRadius: "25px",
  padding: "0 10px",
  color: "black",

  // textAlign: "right"
};

const hintStyle = {
left: "10px",
color:"black",
};

const underlineStyle = {
  display: "none"
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
            <div key={current.labelText} className="col-sm-6 attribute-container">
              <label className="attribute-label" style={labelStyle}>{current.labelText}</label>
              <TextField
            
           
            name={current.name}
            onChange={this.handleChange}
            fullWidth={true}
            className="text-field"
            inputStyle={inputStyle}
            hintStyle={hintStyle}
            underlineFocusStyle={underlineStyle}
             underlineStyle={underlineStyle}
            hintText={current.hintText}
            value={current.name == 'Date'? this.state.formData['Date'] : this.state.formData['Name']}
            style={{
              fontSize: "14px"
            }}
          />
              
            </div>
          );
        })}
      </div>
    );
  }
}

export default AttributeInput;
