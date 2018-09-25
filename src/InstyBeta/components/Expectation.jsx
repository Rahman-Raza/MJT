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

function getSalary(start,end){

  if(!start || !end){
    console.log("there was no salary start or end");
    return undefined;
  }
var string = '';
      switch(start + end){

        case 0:
        string = undefined;
        break;

      case 50000:
        string = "$0 - $50,000+";
        break;
       
      case 150000:
        string = "$50,000 - $100,000";
        break;
        
      case 350000:
        string = "$100,000 - $250,000";
        break;
        
      case 250000:
        string = "$250k+";
        break;
         




    }

    return string;
}

function getSalaryStart(string){
 if(!string){
    console.log("there was no salary start or end");
    return undefined;
  }
var num = 0;
      switch(string){

        case undefined:
        num = 0;
        break;

      case "$0 - $50,000+":
        num = 0;
        break;
       
      case "$50,000 - $100,000":
        num = 50000;
        break;
        
      case "$100,000 - $250,000":
        num = 100000;
        break;
        
      case "$250k+":
        num = 250000;
        break;
         




    }

    return num;

}

function getSalaryEnd(string){
  if(!string){
    console.log("there was no salary start or end");
    return undefined;
  }
var num = 0;
      switch(string){

        case undefined:
        num = 0;
        break;

      case "$0 - $50,000+":
        num = 50000;
        break;
       
      case "$50,000 - $100,000":
        num = 100000;
        break;
        
      case "$100,000 - $250,000":
        num = 250000;
        break;
        
      case "$250k+":
        num = 250000;
        break;
         




    }

    return num;

}

class Expecation extends Component {


  constructor(props) {
        super(props);

        // reset login status
      

        this.state = {
              dataSource: [],
              formData: this.props.formData,
        };
        this.autoCompleteUpdateHandler = this.autoCompleteUpdateHandler.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

     componentDidMount(){
    this.props.onRef(this);
  }

  handleInfoChange(event) {
        const { formData } = this.state;
 
  formData[event.target.name] = event.target.value;

    
        console.log("checking handleInfoChange", event.target);
        console.log("checking new formData in HandleInfoChange ", formData); 
        this.setState({ formData });

    }

    handleCheckChange(event){
      console.log("checking handleInfoChange checbkbox", event.target.value);

      const { formData } = this.state;


          formData[event.target.name] = !formData[event.target.name];
        
        this.setState({formData});
    }

  

    returnInfo(){
      var obj = {
        "SalaryStart": getSalaryStart(this.SalaryRange.returnInfo()),
        "SalaryEnd" : getSalaryEnd(this.SalaryRange.returnInfo()),
        "PreferredLocation" : this.PrefLoc.returnInfo(),
        "Relocation": this.state.formData.Relocation,
        "Travel" : this.state.formData.Travel,
        "VisaStatus" : this.VisaStat.returnInfo(),
      };

      return obj;
    }

  autoCompleteUpdateHandler(value) {
    this.setState({
      dataSource: [value, value + value, value + value + value],
      currentAddition: value
    });
  }
  render() {
    const formData = this.state.formData;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-8">
            <Dropdown onRef={ref => (this.SalaryRange = ref)} handleChange={this.handleInfoChange} startValue={getSalary(formData.SalaryStart,formData.SalaryEnd)}>
              <MenuItem value={undefined} primaryText="Salary Range" />
              <MenuItem value={"$0 - $50,000"} primaryText="$0 - $50,000" />
              <MenuItem value={"$50,000 - $100,000"} primaryText="$50,000 - $100,000" />
              <MenuItem value={"$100,000 - $250,000"} primaryText="$100,000 - $250,000" />
               <MenuItem value={"$250k+"} primaryText="$250k+" />
            </Dropdown>
          </div>
          <div className="col-md-4">
            <Checkbox onRef={ref => (this.AcceptReloc = ref)}
            name="Relocation"
            onCheck={this.handleCheckChange}
            checked={this.state.formData.Relocation}
              label="Accept Relocation"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-8">
            <Dropdown onRef={ref => (this.PrefLoc = ref)}  startValue={formData.PreferredLocation}>
              <MenuItem value={undefined} primaryText="Preferred location" />
              <MenuItem value={"California"} primaryText="California" />
              <MenuItem value={"New York"} primaryText="New York" />
              <MenuItem value={"Washington"} primaryText="Washington" />
              <MenuItem value={"Seattle"} primaryText="Seattle" />
            </Dropdown>
          </div>
          <div className="col-md-4">
            <Checkbox onRef={ref => (this.WillTrav = ref)}
             onCheck={this.handleCheckChange}
              name="Travel"
              checked={this.state.formData.Travel}
              label="Willing to Travel"
              style={checkBoxStyles}
              labelStyle={checkboxLableStyles}
            />
          </div>
          <div className="col-md-8">
            <Dropdown onRef={ref => (this.VisaStat = ref)}  startValue={formData.VisaStatus}>
              <MenuItem value={''} primaryText="Visa Status" />
              <MenuItem value={"Require sponsorship"} primaryText="Require sponsorship" />
              <MenuItem
                value={"Do Not require sponsorship"}
                primaryText="Do NOT require sponsorship"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Expecation;
