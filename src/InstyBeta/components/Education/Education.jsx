import React, { Component } from "react";

import { grey400 } from "material-ui/styles/colors";

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

class Education extends Component {
  constructor(props) {
    super(props);

    var data;

    this.handleChange = this.handleChange.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
    this.getDate = this.getDate.bind(this);
    this.convertUTCDateToLocalDate = this.convertUTCDateToLocalDate.bind(this);
    this.validate = this.validate.bind(this);
     this.handleDateChange = this.handleDateChange.bind(this);

    if (this.props.data.Institution) {
      data = {
        DegreeType: this.props.data.DegreeType,
        GraduationDate: this.getDate(),
        Institution: this.props.data.Institution,
        Major: this.props.data.Major
      };
    } else {
      data = {
        DegreeType: "",
        GraduationDate: "",
        Institution: "",
        Major: ""
      };
    }

    this.state = {
      formData: data
    };

    console.log("checking Formmingngng", this.state.formData);
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
    console.log("got to returnInfo in education", this.props.number);
    return this.state.formData;
  }
convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}
  getDate() {
     var ret;

      (this.props.data.GraduationDate && this.props.data.GraduationDate != 'unknown') ? ret = this.convertUTCDateToLocalDate(new Date(this.props.data.GraduationDate)).getFullYear().toString() : ret = ''




      if (ret === '0' || ret === '-1')
          return '';
      else 
        return ret;
  }
   validate(input){

      if (input === 'unknown')
        return '';
      else return input;

    }
  handleDateChange(item, date){

      const {formData} = this.state;

      console.log("heres the new date", date);
      formData["GraduationDate"] = date.toString();

      this.setState({formData});
    }

  render() {
     const { formData, submitted } = this.state;
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

        <div className="col-md-6">
          <InputField
            name="Institution"
            onChangeValue={this.handleChange}
            labelText="Institution"
            hintText={this.validate(formData.Institution)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            name="Major"
            onChangeValue={this.handleChange}
            labelText="Major"
            hintText={this.validate(formData.Major)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            name="DegreeType"
            onChangeValue={this.handleChange}
            labelText="Degree"
            hintText={this.validate(formData.DegreeType)}
          />
        </div>
        <div className="col-md-6">
          <InputField
            onChangeValue={this.handleDateChange}  
            openToYear={true} 
            DatesChecker={true} 
            labelText="Graduation Date" 
            hintText={this.validate(formData.GraduationDate)}
          />
        </div>
      </div>
    );
  }
}

export default Education;
