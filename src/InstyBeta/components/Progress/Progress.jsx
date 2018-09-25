import React from "react";

import Indicator from "./Indicator";

const rowStyle = {
  padding: "40px 0",
  borderBottom: "1px solid #e9e9e9"
};

const colStyle = {
  margin: ""
};

class Progress extends React.Component {
  render() {
    return (
      <div style={rowStyle} className="row">
        <div style={colStyle} className="col-md-4">
          <Indicator label="Upload" completed={true} />
        </div>
        <div style={colStyle} className="col-md-4">
          <Indicator label="Analyze & Review" completed={this.props.analyze} />
        </div>
        <div style={colStyle} className="col-md-4">
          <Indicator label="Submit" completed={this.props.submit ==true ? true : false} />
        </div>
      </div>
    );
  }
}

export default Progress;
