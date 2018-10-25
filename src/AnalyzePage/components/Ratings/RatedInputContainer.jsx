import React, { Component } from "react";

import { deepOrange500 } from "material-ui/styles/colors";
import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import Skills from "../../output.js";
import Languages from "../../output2.js";

import RatedInput from "./RatedInput";

const col8Style = {
  marginLeft: "0"
};
const flattenedArraySkills = [].concat(...Skills.JSONData);
const flattenedArrayLanguages = [].concat(...Languages.JSONData);

const toggleStyle = {
  color: "#009dd6",
  cursor: "pointer",
  margin: "10px 0 10px 30px"
};
const roundedButton = {
    margin: "0 auto",
    minWidth: "100px",
    position: "relative",
    left: "10px",
    borderRadius: "25px"
  };
 const roundedButtonOverlay = {
    borderRadius: "25px"
  };

class RatedInputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource:
        this.props.dataType == "Skills"
          ? flattenedArraySkills
          : flattenedArrayLanguages,
      currentAddition: "",
      refs: this.props.formData.length ? [this.props.formData.length] : [],
      inputs:
        this.props.formData.length > 0
          ? this.props.formData.map(value => ({
              Name: value["Name"],
              Level: value["Level"]
            }))
          : this.props.defaultValues.map(value => ({
              Name: value,
              Level: 2
            })),
      showInput: false
    };

    this.autoCompleteUpdateHandler = this.autoCompleteUpdateHandler.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.removeSkillHandler = this.removeSkillHandler.bind(this);
    this.returnInfo = this.returnInfo.bind(this);
    this.toggleInputShow = this.toggleInputShow.bind(this);
  }

  autoCompleteUpdateHandler(value) {
    this.setState({
      currentAddition: value
    });
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  addSkill(name) {
    this.setState({
      inputs: [...this.state.inputs, { Name: name }],
      refs: [...this.state.refs, this.state.refs.length]
    });
  }

  removeSkillHandler(name, index) {
    this.setState({
      inputs: this.state.inputs.filter(current => current.Name !== name),
      refs: this.state.refs.filter((x, i) => i !== index)
    });
  }

  returnInfo() {
     this.state.refs.map((item, index) => {

   

      if (index < this.state.refs.length){
         
         let inputs = this.state.inputs;
         inputs[index]["Level"] = item.returnInfo();
         this.setState({inputs});
       }
          });



    let returnData = this.state.inputs;

    for (var i in returnData){
      returnData[i]["Level"] = String(returnData[i]["Level"]);
    }

    return returnData;
  }

  toggleInputShow() {
    this.setState(prevState => ({
      showInput: !prevState.showInput
    }));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div style={col8Style} className="col-md-12">
            {this.state.inputs.map((current, index) => (
              <div key={current.name} className="col-md-6">
                <RatedInput
                  onRef={ref => (this.state.refs[index] = ref)}
                  name={current.Name}
                  number={current.Level ? current.Level : 2}
                  index={index}
                  removeHandler={this.removeSkillHandler}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <p style={toggleStyle} onClick={this.toggleInputShow}>
            + Add {this.props.dataType}
          </p>
        </div>
        {this.state.showInput && (
          <div className="row" style={{ marginLeft: "20px" }}>
            <AutoComplete
              name="Add"
              dataSource={this.state.dataSource}
              onUpdateInput={this.autoCompleteUpdateHandler}
              maxSearchResults={10}
            />
           <RaisedButton
              Rounded={true}
           
             
                      
                   
                label="Add"
                
                onClick={() => {
                  this.addSkill(this.state.currentAddition);
                }}
                buttonStyle={{
                  margin: "0 auto",
                   color: "white",
                 
                  position: "relative",
                  height: "100%",
                  bordeRadius: "10px",
                  padding: "10px 10px",
                  boxShadow: "0px",
                  backgroundColor: "#79C239",
                }}
                
                labelStyle={{
                  position: "relative",
                  top: "5px",
                  color: "white",
                }}
              />
          </div>
        )}
      </div>
    );
  }
}

export default RatedInputContainer;
