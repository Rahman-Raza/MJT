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
          <Indicator label="上传文件" completed={true} />
        </div>
        <div style={colStyle} className="col-md-4">
          <Indicator label="分析与反馈" completed={this.props.analyze} />
        </div>
        <div style={colStyle} className="col-md-4">
          <Indicator label="提交文件" completed={this.props.submit ==true ? true : false} />
        </div>
      </div>
    );
  }
}

export default Progress;
