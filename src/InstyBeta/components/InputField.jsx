import React, { Component } from "react";

import TextField from "material-ui/TextField";
import { deepOrange500, grey500 } from "material-ui/styles/colors";
import MdClose from "react-icons/lib/md/close";
import DatePicker from 'material-ui/DatePicker';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
marginBottom:"50px",
color:"black",
};

const underlineStyle = {
  display: "none"
};

const iconStyle = {
  fontSize: "14px",
  position: "absolute",
  top: "17px",
  right: "10px",
  color: "#009dd6",
  cursor: "pointer",
};

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData:{
     
      }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const {formData} = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({formData});


  }
  render() {

    const {formData} = this.state;
     const Validation = this.props.Validation;
     const DateTrue = this.props.DatesChecker;
      let textFieldComponent;



      if(Validation == true){


      
        textFieldComponent = 
        <TextValidator
          multiline={this.props.multiline}
          rows={this.props.rows}
          name={this.props.name}
          value={this.props.hintText}
          onChange={this.props.onChangeValue}
          fullWidth={true}
          className="text-field"
          inputStyle={inputStyle}
          hintStyle={hintStyle}
          underlineFocusStyle={underlineStyle}
          underlineStyle={underlineStyle}
          hintText={this.props.hintText}
          style={{
            fontSize: "14px",
            color:"black",
          }}
          validators={this.props.Validators}
          errorMessages={this.props.ErrorMessages}

                />
      }
      else{


        if(DateTrue === true){
          textFieldComponent =
          <DatePicker name={this.props.name} 
          openToYearSelection={this.props.openToYear} 
          onChange={this.props.onChangeValue} 
           underlineStyle={underlineStyle}
          inputStyle={inputStyle} 
          fullWidth={true} 
          hintStyle={hintStyle} 
          hintText={this.props.hintText} />
          
        }
        else{
          textFieldComponent = 
          <TextField
            multiline={this.props.multiline}
            rows={this.props.rows}
            name={this.props.name}
            onChange={this.props.onChangeValue}
            fullWidth={true}
            className="text-field"
            inputStyle={inputStyle}
            hintStyle={hintStyle}
            underlineFocusStyle={underlineStyle}
             underlineStyle={underlineStyle}
            hintText={this.props.hintText}
            style={{
              fontSize: "14px"
            }}
          />

        }
      }
    return (
      <div style={root}>
        <label style={labelStyle}>{this.props.labelText}</label>

         {textFieldComponent}
       
       
      </div>
    );
  }
}

export default InputField;
