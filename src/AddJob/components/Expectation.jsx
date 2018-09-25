import React, { Component } from "react";

import { grey500 } from "material-ui/styles/colors";
import Checkbox from "material-ui/Checkbox";
import MenuItem from "material-ui/MenuItem";

import Dropdown from "./Dropdown";

const checkBoxStyles = {
  margin: "5px 20px",
  height: "48px"
};

const checkboxLableStyles = {
  color: grey500
};

class Expecation extends Component {


  constructor(props) {
        super(props);

        // reset login status
      

        this.state = {
              dataSource: [],
        };
        this.autoCompleteUpdateHandler = this.autoCompleteUpdateHandler.bind(this);
    }

  autoCompleteUpdateHandler(value) {
    this.setState({
      dataSource: [value, value + value, value + value + value],
      currentAddition: value
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="col-md-6">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Salary Range" />
              <MenuItem value={5000} primaryText="0 - 5000" />
              <MenuItem value={10000} primaryText="5000 - 10000" />
              <MenuItem value={15000} primaryText="10000 - 150000" />
            </Dropdown>
          </div>
          <div className="col-md-6">
            <Checkbox
              label="Accept Relocation"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-6">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Preferred location" />
              <MenuItem value={"Alabama"} primaryText="Alabama" />
              <MenuItem value={"Alaska"} primaryText="Alaska" />
              <MenuItem value={"Arizona"} primaryText="Arizona" />
            </Dropdown>
          </div>
          <div className="col-md-6">
            <Checkbox
              label="Willing to Travel"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-6">
            <Dropdown>
              <MenuItem value={undefined} primaryText="Visa Status" />
              <MenuItem value={true} primaryText="Require sponsorship" />
              <MenuItem
                value={false}
                primaryText="do NOT require sponsorship"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Expecation;
