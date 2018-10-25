import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";

import Dropdown from "../Dropdown";
import InputField from "../InputField";

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

const dropdownContainerStyles = {
  height: "48px"
};

class EmploymentInput extends Component {
  constructor(props) {
    super(props);

    var data;

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
    this.getDate = this.getDate.bind(this);
    this.convertUTCDateToLocalDate = this.convertUTCDateToLocalDate.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.validate = this.validate.bind(this);

    if (this.props.data.Employer) {
      data = {
        Employer: this.props.data.Employer,
        Length: this.props.data.Length,
        Title: this.props.data.Title,
        StartDate: this.getDate(),
        JobDescription: this.props.data.JobDescription,
      };
    } else {
      data = {
        Employer: "",
        Length: "",
        Title: "",
        StartDate: "",
        JobDescription: "",

      };
    }

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
      console.log("heres the formated date", ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()).toString());
      formData["StartDate"] = ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()).toString();

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
      console.log("employment object data for checking JobDescription", formData);
    return (
      <div style={dottedContainer} className="col-12">
        {this.props.number > 0 ? (
          <i
            style={iconStyle}
            className="material-icons"
            onClick={() => this.props.closeHandler(this.props.number)}
          >
            cancel
          </i>
        ) : null}

        <div className="col-sm-6">
          <InputField
            name="Employer"
            onChangeValue={this.handleChange}
            labelText="Employer"
            hintText={formData.Employer}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="Length"
            onChangeValue={this.handleChange}
            labelText="Duration"
            hintText={formData.Length}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="Title"
            onChangeValue={this.handleChange}
            labelText="Job Position"
            hintText={formData.Title}
          />
        </div>
        <div className="col-sm-6">
          <InputField
            name="StartDate" 
            onChangeValue={this.handleDateChange}  
            openToYear={true} DatesChecker={true} 
            
            
            labelText="Start Date" hintText={this.validate(formData.StartDate)}
          />
        </div>
        <div className="col-sm-12">
          <InputField
            name="JobDescription"
            onChangeValue={this.handleChange}
            labelText="Job Description"
            hintText={formData.JobDescription}
            multiLine={true}
            rows={5}
          />
        </div>
      </div>
    );
  }
}

export default EmploymentInput;
