import React, { Component } from "react";

import MenuItem from "material-ui/MenuItem";

import InputField from "./InputField";
import Dropdown from "./Dropdown";

const colStyle = {
  boxSizing: "border-box"
};

const labelStyle = {
  fontSize: "12px",
  height: "40px",
  fontWeight: "700",
  color: "#72C4CC",
  position: "absolute",
  top: "-8px",
  left: "15px",
};


class Info extends Component {
  constructor(props) {
    console.log("checking props", props);
    super(props);

    this.state = {
      formData: this.props.formData
    };

    console.log("checking Formmingngng", this.state.formData);

    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  handleInfoChange(event) {
    const { formData } = this.state;

    formData[event.target.name] = event.target.value;

    console.log(
      "checking handleInfoChange",
      event.target.name,
      event.target.value
    );
    console.log("checking new formData in HandleInfoChange ", formData);
    this.setState({ formData });
  }

  returnInfo() {
    console.log("got to returnInfo");
    const { formData } = this.state;

    formData["Status"] = this.CurrentStatus.returnInfo();

    this.setState({ formData });
    return this.state.formData;
  }

  render() {
    const formData = this.state.formData;
    console.log("checking form data on analyze page", formData);
    return (
      <div>
        <div className="row">
          <div style={colStyle} className="col-md-4">
            <InputField
              name="Name"
              onChangeValue={this.handleInfoChange}
              hintText={formData.Name}
              labelText="Name"
            />
          </div>
          <div style={colStyle} className="col-md-4">
            <InputField
              name="NativeTongue"
              onChangeValue={this.handleInfoChange}
              hintText={formData.NativeTongue}
              labelText="Language"
            />
          </div>
          <div style={colStyle} className="col-md-4">
            <InputField
              name="Phone Number"
              onChangeValue={this.handleInfoChange}
              hintText={formData.Mobile}
              labelText="Phone Number"
            />
          </div>
        </div>
        <div className="row">
          <div style={colStyle} className="col-md-4">
            <InputField
              name="Email"
              onChangeValue={this.handleInfoChange}
              hintText={formData.Email}
              labelText="Email"
            />
          </div>
          <div style={colStyle} className="col-md-4">
            <InputField
              name="Location"
              onChangeValue={this.handleInfoChange}
              hintText={formData.Location}
              labelText="Current Location"
            />
          </div>
          <div style={colStyle} className="col-md-4">
            <label style={labelStyle}>Current Status</label>
            <Dropdown
              onRef={ref => (this.CurrentStatus = ref)}
              startValue={formData.Status}
            >
              <MenuItem value={undefined} primaryText="Current Status" />
              <MenuItem value={"Part Time"} primaryText="Part Time" />
              <MenuItem value={"Full Time"} primaryText="Full Time" />
              <MenuItem value={"Contract"} primaryText="Contract" />
              <MenuItem value={"Unemployed"} primaryText="Unemployed" />
              <MenuItem value={"Intern"} primaryText="Intern" />
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
