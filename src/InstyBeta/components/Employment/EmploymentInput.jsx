import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";

import Dropdown from "../Dropdown";
import InputField from "../InputField";

const dottedContainer = {
  position: "relative",
  border: "1px solid #009dd6",
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

const dropdownContainerStyles = {
  height: "48px"
};

class EmploymentInput extends Component {
  constructor(props) {
    super(props);

    var data = {};

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
    this.getDate = this.getDate.bind(this);
    this.convertUTCDateToLocalDate = this.convertUTCDateToLocalDate.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.validate = this.validate.bind(this);



    this.state = {
      formData: data
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  handleDateChange(item, date){

      const {formData} = this.state;

      console.log("heres the new date", date);
      formData["StartDate"] = date.toString();

      this.setState({formData});
    }

  handleChange(event) {
    const { formData } = this.state;

    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  }

  returnInfo() {
    return this.state.formData;
  }

 convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}


    getDate(){

     var ret;
     
      this.props.data.StartDate ? ret = this.convertUTCDateToLocalDate(new Date(this.props.data.StartDate)).getFullYear().toString() : ret = ''





      if (ret === '0' || ret === '-1' || ret === '')
          return '';
      else{
        ret = (this.convertUTCDateToLocalDate(new Date(this.props.data.StartDate)).getMonth()+'/'+ this.convertUTCDateToLocalDate(new Date(this.props.data.StartDate)).getFullYear()).toString();
        return ret;
      }
    }

    validate(input){

      if (input === 'unknown')
        return '';
      else return input;

    }
  render() {
      const {formData} = this.state;
    return (
      <div style={dottedContainer} className="col-12">
       

        <div className="col-sm-12">
          <InputField
            Validators={this.props.Validators}
            Validation={this.props.Validation}
            ErrorMesseges={this.props.ErrorMesseges}
            name="JobDescription"
            onChangeValue={this.handleChange}
            labelText={this.props.labelText}
            hintText={this.props.hintText}
            hintStyle
            multiLine={true}
            rows={5}
          />
        </div>
      </div>
    );
  }
}

export default EmploymentInput;
