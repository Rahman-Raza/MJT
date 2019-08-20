import React, { Component } from "react";

import MenuItem from "material-ui/MenuItem";
import { grey500 } from "material-ui/styles/colors";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import Checkbox from "material-ui/Checkbox";

const checkboxContainerStyle = {
  display: "inline-block",
  border: "1px solid #ffb81b",
  borderRadius: "35px",
  margin: "10px",
  paddingRight: "20px"
};

const checkBoxStyles = {
  display: "inline-block",
  margin: "5px 10px",
  width: "auto"
};

const checkboxLableStyles = {
  whiteSpace: "nowrap",
  color: "#666666",
  top: "4px"
};

const iconStyle = {
  color: "#287784",
  fontSize: "30px"
};

const closeIconStyle = {
  color: "#009dd6",
  cursor: "pointer",
  display: "inline-block",
  fontSize: "18px",
  position: "relative",
  left: "10px"
};

const colStyle = {
  boxSizing: "border-box",
  paddingLeft: "0"
};

const toggleStyle = {
  color: "#009dd6",
  cursor: "pointer",
  margin: "10px 0 10px 30px"
};

class CheckBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        Comissions: false,
        OvertimePay: false,
        Bonuses: false,
        TravelMealHousingAllowance: false,
        HealthBenefits: false,
        Wellness: false
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  handleChange(event) {
    const { formData } = this.state;

    console.log("checking checkbox", event.target.name, event.target.value);

    formData[event.target.name] = !formData[event.target.name];

    this.setState({ formData });
  }

  returnInfo() {
    return this.state.formData;
  }

  render() {
    return (
      <div>
        <div className="row">
          {[
            {
              name: "OvertimePay",
              label: "加班"
            },
            {
              name: "Commisions",
              label: "佣金"
            },
            {
              name: "Bonuses",
              label: "奖金"
            },
            {
              name: "HealthBenefits",
              label: "医疗"
            },
            {
              name: "Wellness",
              label: "健康福利"
            },
            {
              name: "TravelMealHousingAllowance",
              label: "旅行/餐饮/住房额度"
            }
          ].map(current => (
            <div style={checkboxContainerStyle}>
              <Checkbox
                checkedIcon={
                  <i style={iconStyle} className="material-icons">
                    done
                  </i>
                }
                uncheckedIcon={<i className="material-icons" />}
                name={current.name}
                onCheck={this.handleChange}
                label={current.label}
                style={checkBoxStyles}
                inputStyle={{
                  height: "25px"
                }}
                labelStyle={checkboxLableStyles}
              />
              
            </div>
          ))}
        </div>
        <div className="row">
          
        </div>
      </div>
    );
  }
}

export default CheckBoxes;
